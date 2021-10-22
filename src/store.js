import { createStore } from "zmp-core/lite";
import { zmp } from "zmp-framework/react";
import { follow, getAccessToken } from "./api/zalo";
import {
  login,
  getCurrentUser,
  getProducts,
  checkout,
  getHistory,
} from "./api/api";

const store = createStore({
  state: {
    // Users
    jwt: null,
    user: null,

    // Products
    loadingProducts: true,
    cloudinaryUrl: "",
    products: [],

    // Checkout
    cart: [],
    totalQuantity: 0,
    totalAmount: 0,
    showCheckout: false,
    note: "",

    // Orders
    loadingOrders: true,
    orders: [],
  },
  getters: {
    // Users
    user({ state }) {
      return state.user;
    },

    // Products
    loadingProducts({ state }) {
      return state.loadingProducts;
    },
    cloudinaryUrl({ state }) {
      return state.cloudinaryUrl;
    },
    products({ state }) {
      return state.products;
    },

    // Checkout
    cart({ state }) {
      return state.cart;
    },
    totalQuantity({ state }) {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    totalAmount({ state }) {
      return state.cart.reduce((total, item) => total + item.subtotal, 0);
    },
    showCheckout({ state }) {
      return state.showCheckout;
    },
    note({ state }) {
      return state.note;
    },

    // Orders
    loadingOrders({ state }) {
      return state.loadingOrders;
    },
    orders({ state }) {
      return state.orders;
    },
  },
  actions: {
    // Users
    async login({ dispatch }) {
      // TODO: cache
      // const cachedUser = await loadUserFromCache()
      // if (cachedUser) {
      //   dispatch('setUser', cachedUser)
      // }
      const token = await getAccessToken();
      const success = await login(token);
      if (success) {
        const user = await getCurrentUser();
        if (user) {
          dispatch("setUser", user);
        }
      }
    },
    setUser({ state }, data) {
      const initData = {
        phone: "",
        address: "",
      };
      state.user = { ...initData, ...state.user, ...data };
    },
    setJwt({ state }, jwt) {
      state.jwt = jwt;
    },

    // Products
    async fetchProducts({ state }) {
      state.loadingProducts = true;
      const products = await getProducts();
      state.products = products.products;
      state.cloudinaryUrl = products.cloudinaryUrl;
      state.loadingProducts = false;
    },

    // Checkout
    addToCart({ state }, item) {
      const existedIndex = state.cart.findIndex((cart) => {
        return cart.product._id === item.product._id;
      });
      if (existedIndex !== -1) {
        store.dispatch("updateCartItem", { index: existedIndex, item });
      } else {
        state.cart = state.cart.concat(item);
      }
    },
    updateCartItem({ state }, { index, item }) {
      state.cart[index] = item;
      state.cart = [...state.cart];
    },
    removeCartItem({ state }, index) {
      state.cart = state.cart.filter((item, i) => i !== index);
      if (state.cart.length === 0) {
        state.showCheckout = false;
      }
    },
    setShowCheckout({ state }, value) {
      state.showCheckout = value;
    },
    setNote({ state }, value) {
      state.note = value;
    },
    async checkout({ state }) {
      let errorText = "";
      const { user, cart, note } = state;
      // Check user info is filled
      if (user.name === "") {
        errorText = "Vui lòng nhập tên!";
      } else if (user.phone === "") {
        errorText = "Vui lòng nhập số điện thoại!";
      } else if (user.address === "") {
        errorText = "Vui lòng nhập địa chỉ!";
      }

      if (errorText !== "") {
        zmp.toast
          .create({
            text: errorText,
            closeTimeout: 3000,
            position: "center",
          })
          .open();
        return;
      }

      // Call API checkout
      const result = await checkout({
        cart,
        name: user.name,
        phone: user.phone,
        address: user.address,
        note,
      });
      if (!result.error) {
        state.showCheckout = false;
        state.cart = [];
        // Success
        zmp.toast
          .create({
            text: result.message,
            closeTimeout: 3000,
            position: "center",
          })
          .open();
        setTimeout(() => {
          zmp.views.main.router.navigate("/history");
        }, 2000);
      } else {
        zmp.toast
          .create({
            text: "Đã có lỗi xảy ra! Mã lỗi:" + result.message,
            closeTimeout: 3000,
            position: "center",
          })
          .open();
      }
    },

    // Orders
    async fetchOrders({ state }) {
      state.loadingOrders = true;
      while (!state.jwt) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      const orders = await getHistory();
      state.orders = orders;
      state.loadingOrders = false;
    },
  },
});

export default store;
