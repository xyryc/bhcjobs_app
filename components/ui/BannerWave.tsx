import { useColorScheme } from "nativewind";
import React from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedView = Animated.createAnimatedComponent(View);
const WAVE_WIDTH = 240;
const SEAM_OVERLAP = 2;

export const BannerWave = () => {
  const { colorScheme } = useColorScheme();
  const waveFill = colorScheme === "dark" ? "#030712" : "#F8FAFC";
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-WAVE_WIDTH, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <AnimatedView
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: -20,
          bottom: -2,
          flexDirection: "row",
          width: WAVE_WIDTH * 3,
        },
        animatedStyle,
      ]}
    >
      <Svg width={WAVE_WIDTH} height="92" viewBox="0 0 240 92" fill="none">
        <Path
          d="M0 40C40 52 80 52 120 40C160 28 200 28 240 40V92H0V40Z"
          fill={waveFill}
        />
      </Svg>
      <Svg
        width={WAVE_WIDTH}
        height="92"
        viewBox="0 0 240 92"
        fill="none"
        style={{ marginLeft: -SEAM_OVERLAP }}
      >
        <Path
          d="M0 40C40 52 80 52 120 40C160 28 200 28 240 40V92H0V40Z"
          fill={waveFill}
        />
      </Svg>
      <Svg
        width={WAVE_WIDTH}
        height="92"
        viewBox="0 0 240 92"
        fill="none"
        style={{ marginLeft: -SEAM_OVERLAP }}
      >
        <Path
          d="M0 40C40 52 80 52 120 40C160 28 200 28 240 40V92H0V40Z"
          fill={waveFill}
        />
      </Svg>
    </AnimatedView>
  );
};
