import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../constants/IMAGES";
import debounce from "../../utils/debounce";
import GptBadge from "../gpt-badge";
import { styles } from "./styles";

type MainHeaderTypes = {
  onMenuPress: () => void;
  onNewChatPress: () => void;
  onRightMenuPress: () => void;
};
const MainHeader = (props: MainHeaderTypes) => {
  const navigation = useNavigation();

  const openDrawer = React.useCallback(
    debounce(() => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    }, 50),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.container}>
        <TouchableOpacity
          style={{ paddingLeft: 20 }}
          onPress={() => {
            openDrawer();
          }}
        >
          <Image source={IMAGES.menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.gptBadge}>
          <GptBadge />
        </View>
        <View style={styles.rightWrapper}>
          <TouchableOpacity onPress={props?.onNewChatPress}>
            <Image source={IMAGES.pencilIcon} style={styles.pencilIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props?.onRightMenuPress}
            style={styles.threeDotIconWrapper}
          >
            <Image source={IMAGES.three_dotsIcon} style={styles.threeDotIcon} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainHeader;
