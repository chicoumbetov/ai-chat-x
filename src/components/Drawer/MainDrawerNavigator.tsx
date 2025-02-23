import { useNavigationState } from "@react-navigation/native";
import React from "react";
import { getStackInfos } from "./NavigationUtils";

import { Dimensions } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import MainHeader from "../header/main-header";
import CustomDrawerContent from "./CustomDrawerContent";
import Drawer from "./Drawer";

const MainDrawerNavigator = () => {
  const navigationState = useNavigationState((state) => state);
  const gestureHandlerWidth = useSharedValue(0);
  const { width } = Dimensions.get("screen");
  const openMenu = () => {
    gestureHandlerWidth.value = withTiming(width - 70);
  };
  return (
    <Drawer
      screenOptions={() => {
        const { showBack, currentRouteName } = getStackInfos(navigationState);

        return {
          drawerStyle: {
            width: 270,
          },
          header: (headerProps) => (
            <MainHeader
              onMenuPress={openMenu}
              onNewChatPress={() => {}}
              onRightMenuPress={() => {}}
              {...headerProps}
            />
          ),
        };
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    ></Drawer>
  );
};

export default MainDrawerNavigator;
