import { useLearningPathways } from '@/hooks/useLearningPathways';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LibraryScreen() {
  const {data: pathways, isLoading: isPathwaysLoading, isError: isPathwaysError} = useLearningPathways();

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
