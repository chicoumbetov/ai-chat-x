import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import MainDrawerNavigator from "@/src/components/Drawer/MainDrawerNavigator";
import CommonProvider from "@/src/context/common-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "../src/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <CommonProvider>{loaded && <RootLayoutNav />}</CommonProvider>
      </ThemeProvider>
    </ApplicationProvider>
  );
}

const RootLayoutNav = () => {
  return <MainDrawerNavigator />;
};
