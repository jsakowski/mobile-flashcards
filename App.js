import React from 'react'
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import { darkGrey, white } from './utils/colors'
import reducer from './reducers'

const RouteConfigs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name='cards-playing-outline'
          size={30}
          color={tintColor}
        />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-add' size={30} color={tintColor} />
      )
    }
  }
}

const TabNavigatorConfig = {
  lazy: true,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? darkGrey : white,
    style: {
      height: 58,
      backgroundColor: Platform.OS === 'ios' ? white : darkGrey,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    safeAreaInset: true
  }
}

const Tabs = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashcardsStatusBar
            backgroundColor={darkGrey}
            barStyle='light-content'
          />
          <SafeAreaView style={styles.container}>
            <Tabs />
          </SafeAreaView>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
