import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantsDetailsScreen from '../screens/RestaurantsDetailsScreen';
import RestaurantBookingScreen from '../screens/RestaurantBookingScreen';
import RestaurantLocationScreen from '../screens/RestaurantLocationScreen';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import PlayScreen from '../screens/PlayScreen';
import EventsScreen from '../screens/EventsScreen';
import EventsListScreen from '../screens/EventsListScreen';
import AdventureScreen from '../screens/AdventureScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyScreen from '../screens/MyScreen';
import ProfileScreen from '../screens/ProfileScreen';

import MapContainer from '../container/MapContainer';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RestaurantsStack = createStackNavigator(
  {
    Restaurants: RestaurantsScreen,
    RestaurantsDetails: RestaurantsDetailsScreen,
    RestaurantBooking: RestaurantBookingScreen,
    RestaurantLocationScreen: RestaurantLocationScreen,
    MapContainer: MapContainer,
    RestaurantMenuScreen: RestaurantMenuScreen,
  },
  config
);

RestaurantsStack.navigationOptions = {
  tabBarLabel: 'Restaurants',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'} tintColor={{ tintColor }} />
  ),
};

RestaurantsStack.path = '';

const PlayStack = createStackNavigator(
  {
    Play: PlayScreen,
  },
  config
);

PlayStack.navigationOptions = {
  tabBarLabel: 'Play',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-football' : 'md-football'} />
  ),
};

PlayStack.path = '';

const SubscriptionStack = createStackNavigator(
  {
    Subscription: SubscriptionScreen,
  },
  config
);

SubscriptionStack.navigationOptions = {
  tabBarLabel: 'Subscription',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bookmark' : 'md-bookmark'} />
  ),
};

SubscriptionStack.path = '';

const AdventureStack = createStackNavigator(
  {
    Adventure: AdventureScreen,
  },
  config
);

AdventureStack.navigationOptions = {
  tabBarLabel: 'Adventure',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bicycle' : 'md-bicycle'} />
  ),
};

AdventureStack.path = '';

const EventsStack = createStackNavigator(
  {
    Events: EventsScreen,
    EventsListScreen: EventsListScreen,
  },
  config
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}  />
  ),
};

EventsStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
}

ProfileStack.path = '';


const tabNavigator = createBottomTabNavigator({
  RestaurantsStack,
  EventsStack,
  ProfileStack,
  },
  {
  activeTintColor: '#f5824a',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    style:{
      elevation: 10,
      backgroundColor:'#fafafa',
      height: 50
    },
    activeTabStyle: {
      backgroundColor: '#f5824a',
      borderBottomWidth: 4,
      borderColor: '#f5824a'
    }
  },
  }
);

tabNavigator.path = '';

export default tabNavigator;
