import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Drawer, DrawerItem } from "@ui-kitten/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function findIndexByRouteName(name?: string) {
  switch (name) {
    case "/":
      return 0;
    default:
      return null;
  }
}

const CustomDrawerContent = (props: any) => {
  const { state } = props;

  const [selectedIndex, setSelectedIndex] = React.useState();
  const inset = useSafeAreaInsets();
  const linkTo = useRouter();

  const onSelectProps = (index: any) => {
    switch (index.row) {
      case 0:
        linkTo.push("/");
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, marginTop: inset.top, marginBottom: inset.bottom }}>
      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <Drawer
          selectedIndex={selectedIndex}
          onSelect={(index: any) => {
            setSelectedIndex(index);
            onSelectProps(index);
          }}
          screenOptions={{
            drawerStyle: {},
          }}
          {...props}
        >
          <DrawerItem title="Chat" />
        </Drawer>
      </GestureHandlerRootView>
    </View>
  );
};

export default React.memo(CustomDrawerContent);
