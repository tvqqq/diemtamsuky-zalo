import React from "react";
import { Text, useStore, List, ListItem, Avatar } from "zmp-framework/react";

const Heading = () => {
  const user = useStore("user");

  if (!user) return null;

  return (
    <List className="m-0">
      <ListItem>
        <Avatar src={user.picture} />
        <div className="flex-1 ml-4">
          <Text bold className="mb-0">
            {user.name}
          </Text>
          <Text className="ellipsis mb-0">ID: {user.zaloId}</Text>
        </div>
      </ListItem>
    </List>
  );
};

Heading.displayName = "zmp-history-heading";

export default Heading;
