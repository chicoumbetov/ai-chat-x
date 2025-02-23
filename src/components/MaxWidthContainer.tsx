/**
 * Container component to cover dummy components
 *
 * @author: Shynggys UMBETOV
 */
import * as React from "react";
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

type MaxWidthContainerProps = (
  | {
      withScrollView?: "simple";
      outerViewProps?: ScrollViewProps;
    }
  | {
      withScrollView: "keyboardAware";
      outerViewProps?: KeyboardAwareScrollViewProps;
    }
  | {
      withScrollView: false;
      outerViewProps?: ViewProps;
    }
) & {
  innerViewProps?: ViewProps;
  children?: React.ReactNode;
  maxWidth?: number;
};

type OuterViewType =
  | typeof View
  | typeof ScrollView
  | typeof KeyboardAwareScrollView;
type OuterViewPros = ViewProps | ScrollViewProps | KeyboardAwareScrollViewProps;

export default function MaxWidthContainer(
  props: MaxWidthContainerProps
): JSX.Element {
  const {
    withScrollView,
    outerViewProps,
    innerViewProps,
    children,
    maxWidth = 780,
  } = props;
  /**
   First option around dummy data - View
   */
  let OuterView: OuterViewType = View;
  let finalOuterProps: OuterViewPros = {};
  /**
   Second and third options around dummy data - ScrollView or KeyboardAwareScrollView
   */
  if (withScrollView === undefined || withScrollView === "simple") {
    OuterView = ScrollView;
  } else if (withScrollView === "keyboardAware") {
    OuterView = KeyboardAwareScrollView;
  }

  /**
   Applied style depending on boolean of withScrollView
   */
  if (withScrollView === false) {
    const { style: outerViewStyle, ...otherOuterViewProps } =
      outerViewProps || {};
    const finalOuterViewStyle = StyleSheet.flatten([
      styles.outerBaseStyle,
      { flex: 1 },
      outerViewStyle,
    ]);
    finalOuterProps = { style: finalOuterViewStyle, ...otherOuterViewProps };
  } else {
    const {
      style: scrollViewStyle,
      contentContainerStyle: outerViewStyle,
      ...otherOuterViewProps
    } = (outerViewProps as ScrollViewProps) || {};
    const finalOuterViewStyle = StyleSheet.flatten([
      styles.outerBaseStyle,
      outerViewStyle,
    ]);
    const finalScrollViewStyle = StyleSheet.flatten([
      { width: "100%" },
      scrollViewStyle,
    ]);

    finalOuterProps = {
      style: finalScrollViewStyle,
      contentContainerStyle: finalOuterViewStyle,
      ...otherOuterViewProps,
    };
    if (withScrollView === "keyboardAware") {
      finalOuterProps = {
        enableOnAndroid: true,
        enableAutomaticScroll: true,
        extraHeight: 20,
        ...finalOuterProps,
      };
    }
  }

  /**
   Apply styles anyway
   */
  const { style: innerViewStyle, ...otherInnerViewProps } =
    innerViewProps || {};

  const finalInnerViewStyle = StyleSheet.flatten([
    styles.innerBaseStyle,
    {
      maxWidth,
    },
    innerViewStyle,
  ]);

  return (
    <OuterView {...finalOuterProps}>
      <View style={finalInnerViewStyle} {...otherInnerViewProps}>
        {children}
      </View>
    </OuterView>
  );
}

const styles = StyleSheet.create({
  outerBaseStyle: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#FFF",
    marginBottom: 20,
  },
  innerBaseStyle: {
    flex: 1,
    paddingTop: Platform.OS === "web" ? 0 : 70,
    paddingHorizontal: 16,
  },
});
