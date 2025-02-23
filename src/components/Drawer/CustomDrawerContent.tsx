import React, { useState } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { chatListMockData } from "@/src/constants/mock-data/chatlistmockdata";
import { Drawer } from "@ui-kitten/components";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { styles } from "../main-structure/styles";
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
  const { state } = props;
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
          <Animated.View style={styles.navigationWrapper}>
            <View style={styles.navigationContentWrapper}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <SearchComponent onNewChatPress={onNewChatPress} />
                {/*
                TODO
                NavigationHeading
                NavigationItem
                NavigationHeading
                */}
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
