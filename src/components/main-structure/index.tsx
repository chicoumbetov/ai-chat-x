import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { chatListMockData } from "../../constants/mock-data/chatlistmockdata";
import { CommonState } from "../../context/common-provider";
import TextWidget from "../../widget/text-widget";
import MainHeader from "../header/main-header";
import NavigationItem from "../navigation-item";
import PromptInput from "../prompt-input";
import SearchComponent from "../search-component";
import { styles } from "./styles";

const MainStructure = () => {
  const gestureHandlerWidth = useSharedValue(0);
  const { width } = Dimensions.get("screen");
  const {
    setNavigationContextMenuPosition,
    setIsNavigationContextMenuOpen,
    isNavigationContextMenuOpen,
    navigationContextMenuPosition,
  } = CommonState();
  const [defaultCategory, setDefaultCategory] = useState(true);
  const [categoryAnimationFlag, setCategoryAnimationFlag] = useState(true);
  const openMenu = () => {
    gestureHandlerWidth.value = withTiming(width - 70);

    /**
     * 1) withSprint(1)
     * 2) withTiming(1)
     * 3) withDelay(500, func)
     */
  };
  const onNewChatPress = () => {
    gestureHandlerWidth.value = withTiming(0);
    setCategoryAnimationFlag(!categoryAnimationFlag);
    setDefaultCategory(true);
  };
  const mainAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        gestureHandlerWidth.value === 0
          ? { translateX: withTiming(0) }
          : { translateX: gestureHandlerWidth.value },
      ],
    };
  });

  const onGestureEvent = Gesture.Pan()
    .onBegin((e) => {
      // : any, ctx: any) => {
      // ctx.startX = gestureHandlerWidth.value;
      e.x = gestureHandlerWidth.value;
    })
    .onChange((e) => {
      // , ctx: any) => {
      const value = e.x + e.translationX; // ctx.startX + e.translationX;

      if (value <= width - 70 && value > 0) {
        gestureHandlerWidth.value = value;
        // ctx.value = value;
        e.x = value;
      }
    })
    .onFinalize((e, ctx: any) => {
      if (ctx.value > width - 200) {
        gestureHandlerWidth.value = withTiming(width - 70, { duration: 500 });
      }

      if (e.translationX < 0) {
        gestureHandlerWidth.value = withTiming(0, { duration: 500 });
      }

      if (ctx.value < width - 200) {
        gestureHandlerWidth.value = withTiming(0, { duration: 500 });
      }
    });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    let value = Math.floor((gestureHandlerWidth.value / width) * 100) / 100;
    return {
      display: gestureHandlerWidth.value ? "flex" : "none",
      opacity: Math.min(value, 0.5),
    };
  });

  const onActivated = () => {
    gestureHandlerWidth.value = withTiming(0, { duration: 300 });
    hideNavigationContextMenu();
  };
  const contextMenuStyle = {
    top: navigationContextMenuPosition?.absoluteY,
    left: navigationContextMenuPosition?.absoluteX + 70,
  };
  const hideNavigationContextMenu = () => {
    setIsNavigationContextMenuOpen(false);
    setTimeout(() => {
      setNavigationContextMenuPosition({
        ...navigationContextMenuPosition,
        absoluteX: 0,
        absoluteY: -500,
      });
    });
  };

  const handleMorePress = () => {
    setDefaultCategory(!defaultCategory);
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={onGestureEvent}>
        <Animated.View style={[styles.container, mainAnimatedStyle]}>
          <TapGestureHandler
            maxDelayMs={250}
            numberOfTaps={1}
            onActivated={hideNavigationContextMenu}
          >
            {/* navigation container */}
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
          </TapGestureHandler>
          {/* main container */}
          <TapGestureHandler
            maxDelayMs={250}
            numberOfTaps={1}
            onActivated={onActivated}
          >
            <Animated.View style={styles.mainWrapper}>
              {/* 
            <Animated.View
              style={[styles.mainWrapperOverlay, overlayAnimatedStyle]}
            />
            
            <TouchableOpacity onPress={openMenu} style={styles.openBtn}>
                                <TextWidget style={styles.btnText}>Open Menu</TextWidget>
                            </TouchableOpacity> */}
              <MainHeader
                onMenuPress={openMenu}
                onNewChatPress={() => {}}
                onRightMenuPress={() => {}}
              />
              <View style={styles.categoryBadgesWrapper}>
                <TextWidget type="SemiBold" style={styles.categoryBadgesTitle}>
                  What can I help with?
                </TextWidget>
                {/* render all categories 
              TODO category badges
              */}
              </View>
              <PromptInput />
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default MainStructure;
