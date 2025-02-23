import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../constants/IMAGES";
import { styles } from "./styles";

type SearchComponentTypes = {
  onNewChatPress: () => void;
};
const SearchComponent = (props: SearchComponentTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Image source={IMAGES.search_2Icon} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChange={(v) => v}
        />
      </View>
      <TouchableOpacity
        onPress={props?.onNewChatPress}
        style={styles.pencilIconWrapper}
      >
        <Image source={IMAGES.pencilIcon} style={styles.pencilIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;
