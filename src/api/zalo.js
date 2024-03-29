import { zmp } from "zmp-framework/react";
import apis from "zmp-sdk";
import config from "../config";
import store from "../store";
import { generateChallenge } from "pkce-challenge";

export const getAccessToken = () =>
  new Promise((resolve) => {
    apis.getAuthCode({
      // FIXME: waiting zmp-sdk update loginZaloV4 documentation
      success: (getAuthCode) => {
        // getAuthCode.authCodeVerify = "123";
        getAuthCode.authCodeVerify = generateChallenge(getAuthCode.authCode);
        console.log("getAuthCode", getAuthCode);
        apis.login({
          success: (loginData) => {
            console.log("loginData", loginData);
            // apis.getAccessToken({
            //   success: (token) => {
            //     if (
            //       token === "DEFAULT ACCESS TOKEN" &&
            //       config.DEFAULT_ACCESS_TOKEN
            //     ) {
            //       // eslint-disable-next-line no-param-reassign
            //       token = config.DEFAULT_ACCESS_TOKEN; // For testing purpose only
            //     }
            //     resolve(token);
            //   },
            //   fail: (error) => {
            //     console.error(error);
            //   },
            // });
          },
          fail: (error) => {
            console.error(error);
          },
        });
      },
      fail: (error) => {
        console.error(error);
      },
    });
  });

export const follow = () => {
  apis.followOA({
    id: config.OA_ID,
    success: () => {
      store.dispatch("setUser", {
        ...store.state.user,
        isFollowing: true,
      });
      zmp.toast
        .create({
          text: "Cảm ơn bạn đã theo dõi OA thành công!",
          closeTimeout: 3000,
        })
        .open();
      // UpdateFollowStatus(true) // Không cần gửi status về backend vì mình đã có webhook
    },
    fail: (err) => {
      console.log("Failed to follow OA. Details: ", err);
    },
  });
};
