import { View, Pressable, StyleSheet, Text } from "react-native";

import { PathwayFilters } from "@/types/types";
import { capitalizeFirstLetter } from "@/utils/utils";

interface FilterPillBarProps {
  filters: PathwayFilters;
  handleFilterPress: (filter: keyof PathwayFilters) => void;
}

export const FilterPillBar = ({
  filters,
  handleFilterPress,
}: FilterPillBarProps) => {
  return (
    <View style={styles.filterContainer}>
      {Object.entries(filters).map(([filter, value]) => {
        const backgroundColor = value ? "#AD98F1" : "grey";
        return (
          <Pressable
            style={[styles.filterPills, { backgroundColor: backgroundColor }]}
            key={filter}
            onPress={() => handleFilterPress(filter as keyof PathwayFilters)}
          >
            <Text>{capitalizeFirstLetter(filter)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  filterPills: {
    color: "white",
    borderRadius: 12,
    opacity: 0.7,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
