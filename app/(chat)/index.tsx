import { styles } from "@/src/components/main-structure/styles";
import MaxWidthContainer from "@/src/components/MaxWidthContainer";
import PromptInput from "@/src/components/prompt-input";
import TextWidget from "@/src/widget/text-widget";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

const Index = () => {
  return (
    <MaxWidthContainer
      outerViewProps={{
        style: { flex: 1 },
        contentInsetAdjustmentBehavior: "automatic",
        contentContainerStyle: {
          flex: 1,
        },
      }}
      innerViewProps={{ style: { backgroundColor: "white" } }}
    >
      <Animated.View style={styles.mainWrapper}>
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
    </MaxWidthContainer>
  );
};

export default Index;
