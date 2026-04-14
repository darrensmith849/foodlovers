import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { palette } from '@/constants/Colors'

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={20} style={{ marginBottom: -2 }} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.yuzuLime,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: {
          backgroundColor: palette.blackFig,
          borderTopWidth: 0,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Shop', tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} /> }}
      />
      <Tabs.Screen
        name="budget"
        options={{ title: 'Budget', tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: 'Orders', tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} /> }}
      />
    </Tabs>
  )
}
