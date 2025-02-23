import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",

    height: 60,
    backgroundColor: "#fff",
    padding: 0,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  menuIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  gptBadge: {
    marginLeft: 40,
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  pencilIcon: {
    height: 24,
    width: 24,
  },
  threeDotIconWrapper: {
    height: 24,
    width: 24,
    transform: [{ rotate: "90deg" }],
  },
  threeDotIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
