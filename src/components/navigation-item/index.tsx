import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { IMAGES } from "../../constants/IMAGES";
import { CommonState } from "../../context/common-provider";
import TextWidget from "../../widget/text-widget";
import { styles } from "./styles";

type NavigationItemPropsTypes = {
  title: string;
  enableIcon?: boolean;
};
const NavigationItem = (props: NavigationItemPropsTypes) => {
  const rippleScaleAnimation = useSharedValue(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isNavigationContextMenuOpen,
    navigationContextMenuPosition,
    setIsNavigationContextMenuOpen,
    setNavigationContextMenuPosition,
  } = CommonState();
  useEffect(() => {
    rippleScaleAnimation.value = withTiming(70, { duration: 300 });
    setTimeout(() => {
      rippleScaleAnimation.value = 0;
    }, 500);
  }, [isMenuOpen]);

  const onBegan = (event: any) => {
    setNavigationContextMenuPosition({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
      absoluteX: event.nativeEvent.absoluteX,
      absoluteY: event.nativeEvent.absoluteY,
    });
    setIsMenuOpen(!isMenuOpen);
  };
  const onLongPress = (event: any) => {
    setNavigationContextMenuPosition({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
      absoluteX: event.nativeEvent.absoluteX,
      absoluteY: event.nativeEvent.absoluteY,
    });
    setIsNavigationContextMenuOpen(!isNavigationContextMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: const rippleScaleStyle

  return (
    <LongPressGestureHandler onBegan={onBegan} onActivated={onLongPress}>
      <View
        style={
          props?.enableIcon ? styles.container : styles.containerWithoutBorder
        }
      >
        {props?.enableIcon ? (
          <Image source={IMAGES.exploreIcon} style={styles.icon} />
        ) : null}
        <Animated.View
          style={[
            styles.rippleStyle,
            // , rippleScaleStyle
          ]}
        />
        <TextWidget style={styles.titleText}>{props?.title}</TextWidget>
      </View>
    </LongPressGestureHandler>
  );
};

export default NavigationItem;
