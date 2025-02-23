import React, { useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { chatListMockData } from "@/src/constants/mock-data/chatlistmockdata";
import { CommonState } from "@/src/context/common-provider";
import { Drawer } from "@ui-kitten/components";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import ContextMenu from "../context-menu";
import { styles } from "../main-structure/styles";
import NavigationHeading from "../navigation-heading";
import NavigationItem from "../navigation-item";
import SearchComponent from "../search-component";

function findIndexByRouteName(name?: string) {
  switch (name) {
    case "/":
      return 0;
    default:
      return null;
  }
}

const CustomDrawerContent = (props: any) => {
  const { isNavigationContextMenuOpen, navigationContextMenuPosition } =
    CommonState();
  const gestureHandlerWidth = useSharedValue(0);

  const [selectedIndex, setSelectedIndex] = React.useState();
  const inset = useSafeAreaInsets();
  const linkTo = useRouter();

  const [defaultCategory, setDefaultCategory] = useState(true);
  const [categoryAnimationFlag, setCategoryAnimationFlag] = useState(true);

  const onSelectProps = (index: any) => {
    switch (index.row) {
      case 0:
        linkTo.push("/");
        break;

      default:
        break;
    }
  };

  const onNewChatPress = () => {
    gestureHandlerWidth.value = withTiming(0);
    setCategoryAnimationFlag(!categoryAnimationFlag);
    setDefaultCategory(true);
  };

  const contextMenuStyle = {
    top: navigationContextMenuPosition?.absoluteY,
    left: navigationContextMenuPosition?.absoluteX + 70,
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
          <ContextMenu
            isToggle={isNavigationContextMenuOpen}
            customStyle={contextMenuStyle}
          />
          <Animated.View style={styles.navigationWrapper}>
            <View style={styles.navigationContentWrapper}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <SearchComponent onNewChatPress={onNewChatPress} />
                <NavigationHeading title="GPTs" />
                <NavigationItem enableIcon title="Explore GPTs" />
                <NavigationHeading title="Chats" />
                <View>
                  {chatListMockData?.map((title, idx) => {
                    return <NavigationItem key={idx} title={title} />;
                  })}
                </View>
              </ScrollView>
            </View>
          </Animated.View>
        </Drawer>
      </GestureHandlerRootView>
    </View>
  );
};

export default React.memo(CustomDrawerContent);
