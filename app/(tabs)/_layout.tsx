import React from 'react';
import { Image, StyleSheet } from 'react-native'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const {colors} = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer 
        screenOptions={{
          headerLeft: () => null,
          headerRight: () => <DrawerToggleButton tintColor='white' />,
          headerStyle: {backgroundColor: colors.background}
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Learning Pathways',
            headerTitle: () => <Image source={require('@/assets/images/blackbullion.png')} style={styles.headerImage} resizeMode='contain' />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 60,
    width: 200,
  }
})
