import {Image} from 'react-native'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        headerLeft: () => null,
        headerRight: () => <DrawerToggleButton tintColor='white' />,
        headerStyle: {backgroundColor: 'black'}
        
      }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Learning Pathways',
            headerTitle: () => <Image source={require('@/assets/images/blackbullion.png')} style={{height: 60, width: 200, resizeMode: 'contain'}} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
