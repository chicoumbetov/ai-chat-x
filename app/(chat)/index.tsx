import CategoryBadges from "@/src/components/category-badges";
import { styles } from "@/src/components/main-structure/styles";
import MaxWidthContainer from "@/src/components/MaxWidthContainer";
import PromptInput from "@/src/components/prompt-input";
import TextWidget from "@/src/widget/text-widget";
import React, { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

const Index = () => {
  const [defaultCategory, setDefaultCategory] = useState(true);
  const [categoryAnimationFlag, setCategoryAnimationFlag] = useState(true);
  const onMorePress = () => {
    setDefaultCategory(!defaultCategory);
  };

  return (
    <MaxWidthContainer
      outerViewProps={{
        style: { flex: 1, backgroundColor: "white" },
        contentInsetAdjustmentBehavior: "automatic",
        contentContainerStyle: {
          flex: 1,
        },
      }}
    >
      <Animated.View style={styles.mainWrapper}>
        <View style={styles.categoryBadgesWrapper}>
          <TextWidget type="SemiBold" style={styles.categoryBadgesTitle}>
            What can I help with?
          </TextWidget>
          <CategoryBadges
            categoryAnimationFlag={categoryAnimationFlag}
            defaultCategory={defaultCategory}
            onMorePress={onMorePress}
          />
        </View>
        <PromptInput />
      </Animated.View>
    </MaxWidthContainer>
  );
};

export default Index;
