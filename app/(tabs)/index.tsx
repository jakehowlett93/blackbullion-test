import { useMemo, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useTheme } from "@react-navigation/native";

import { PathwayCard } from "@/components/PathwayCard";
import { useLearningPathways } from "@/hooks/useLearningPathways";
import { Pathway, PathwayFilters } from "@/types/types";
import { FilterPillBar } from "@/components/FilterPillBar";

export default function LibraryScreen() {
  const [filters, setFilters] = useState<PathwayFilters>({
    assessment: false,
  });
  const {
    data: pathways,
    isLoading: isPathwaysLoading,
    isError: isPathwaysError,
  } = useLearningPathways();
  const { colors } = useTheme();

  const handleFilterPress = (filter: keyof PathwayFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const filteredPathways = useMemo(() => {
    if (!pathways) return [];
    return pathways.filter((pathway) => {
      if (filters.assessment && !pathway.has_summative_assessment) {
        return false;
      }

      //more filters could be added here in a similar manner

      return true;
    });
  }, [filters, pathways]);

  if (isPathwaysLoading) {
    return (
      <View>
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {isPathwaysError && <Text>An error has occurred</Text>}
      <FilterPillBar filters={filters} handleFilterPress={handleFilterPress} />
      {filteredPathways && filteredPathways.length > 0 ? (
        <FlatGrid
          itemDimension={300}
          itemContainerStyle={styles.itemContainerStyle}
          spacing={10}
          data={filteredPathways}
          renderItem={({ item }: { item: Pathway }) => (
            <PathwayCard key={item.id} pathway={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ color: "white" }}>No pathways available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  filterPills: {
    color: "white",
    borderRadius: 12,
    backgroundColor: "grey",
    opacity: 0.7,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
