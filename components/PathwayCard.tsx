import {
  View,
  StyleSheet,
  ImageBackground,
  Linking,
  Pressable,
} from "react-native";

import { Pathway } from "@/types/types";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@react-navigation/native";
import { capitalizeFirstLetter } from "@/utils/utils";

interface PathwayCardProps {
  pathway: Pathway;
}

export const PathwayCard = ({
  pathway: { title, url, intro, duration, image, type },
}: PathwayCardProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => Linking.openURL(url)}
      role="button"
      aria-label={`Navigate to ${title}`}
    >
      <View>
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <View style={styles.pill}>
            <ThemedText type="overlay">{`${capitalizeFirstLetter(type)} - ${duration}`}</ThemedText>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <ThemedText type="title">{title}</ThemedText>
        <ThemedText numberOfLines={3}>{intro}</ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: 320,
    width: 300,
  },
  content: {
    margin: 8,
  },
  image: {
    height: 170,
    width: "100%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: 4,
    borderRadius: 8,
    justifyContent: "center",
    opacity: 0.7,
  },
});
