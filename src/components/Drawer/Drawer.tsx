import { createDrawerNavigator } from "@react-navigation/drawer";

import { withLayoutContext } from "expo-router";

const { Navigator } = createDrawerNavigator();

const Drawer = withLayoutContext(Navigator);

export default Drawer;
