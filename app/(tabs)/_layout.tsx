import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      tabBarActiveBackgroundColor:"#5200A3",
      tabBarInactiveBackgroundColor: "#40146B",
    }} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'List',
          headerTitle: 'Shopping List',
          tabBarActiveTintColor:"#F5A318",
          tabBarInactiveTintColor: "#F5A318",
          headerTintColor:"#F5A318",
          headerTitleAlign: "center",
          headerTransparent: true,
          tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" color={"#F5A318"} size={28} style={{marginBottom: -3}} />,
        }}

      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarActiveTintColor:"#F5A318",
          tabBarInactiveTintColor: "#F5A318",
          headerTintColor:"#F5A318",
          headerTitleAlign: "center",
          headerTransparent: true,
          tabBarIcon: ({ color }) => <AntDesign name="book" color={"#F5A318"} size={28} style={{marginBottom: -3}} />,
        }}
      />
    </Tabs>
    
  );
}
