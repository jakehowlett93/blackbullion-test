import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PathwayCard } from '@/components/card';
import { useLearningPathways } from '@/hooks/useLearningPathways';
import { Pathway } from '@/types/types';
import { FlatList } from 'react-native-gesture-handler';
import { useCallback } from 'react';


export default function LibraryScreen() {
  const {data: pathways, isLoading: isPathwaysLoading, isError: isPathwaysError} = useLearningPathways();
  const renderItem = useCallback(({item}: {item: Pathway}) => <PathwayCard key={item.id} pathway={item} />, [])

  if (isPathwaysLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      {isPathwaysError && <Text>An error has occured</Text>}
      <FlatList
        columnWrapperStyle={{flexWrap: 'wrap', flex: 1}}
        data={pathways}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListEmptyComponent={<Text>No pathways available</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
