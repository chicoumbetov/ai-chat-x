import MaxWidthContainer from "@/src/components/MaxWidthContainer";
import PromptInput from "@/src/components/prompt-input";
import React from "react";

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
      <PromptInput />
    </MaxWidthContainer>
  );
};

export default Index;
