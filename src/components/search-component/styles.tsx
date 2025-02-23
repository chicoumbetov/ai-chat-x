import { COLORS } from "@/src/constants/Colors";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "82%",
    borderRadius: 50,
    paddingVertical: Platform.OS === "android" ? 4 : 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.grey_v1,
    columnGap: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  searchInput: {
    width: "85%",
    fontSize: 17,
  },
  pencilIconWrapper: {
    width: 30,
    height: 30,
  },
  pencilIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
