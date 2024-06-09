import { View, StyleSheet, Image, Linking } from 'react-native';

import { Pathway } from '@/types/types';
import { ThemedText } from './ThemedText';

interface PathwayCardProps {
  pathway: Pathway
}

export const PathwayCard = ({pathway}: PathwayCardProps) => {
  const {title, url, intro, duration, image, type} = pathway;

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={{height: 60, width: 200, resizeMode: 'contain'}} />
      <View style={{flexDirection: 'row'}}>
        <ThemedText style={{color: 'grey', fontSize: 8}}>{type}</ThemedText>
        <ThemedText>{duration}</ThemedText>
      </View>
      <ThemedText type='title'>{title}</ThemedText>
      <ThemedText>{intro}</ThemedText>
      <ThemedText type='link' onPress={() => Linking.openURL(url)}>View pathway</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 300,
    width: 200,
    margin: 30
  } 
});
