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
import decks from './reducers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import { primary, textLight, darkPrimary } from './utils/colors'

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
      ),
      swipeEnabled: false
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-add' size={30} color={tintColor} />
      ),
      swipeEnabled: false
    }
  }
}

const TabNavigatorConfig = {
  lazy: true,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? darkPrimary : textLight,
    style: {
      height: 58,
      backgroundColor: Platform.OS === 'ios' ? textLight : primary,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    safeAreaInset: true
  },
  navigationOptions: {
    swipeEnabled: false
  }
}

const Tabs = createAppContainer(
  Platform.OS === 'ios'
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
)
const mainNavigationOptions =
  Platform.OS === 'ios'
    ? {
        title: 'Flashcards',
        headerBackTitle: 'Home'
      }
    : {
        header: null
      }

const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      home: {
        screen: Tabs,
        navigationOptions: mainNavigationOptions
      },
      DeckDetail: {
        screen: DeckDetail
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: {
          title: 'Add Card'
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          title: 'Quiz'
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTintColor: textLight,
        headerStyle: {
          backgroundColor: primary
        }
      }
    }
  )
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(decks)}>
        <View style={styles.container}>
          <FlashcardsStatusBar
            backgroundColor={primary}
            barStyle='light-content'
          />
          <SafeAreaView style={styles.container}>
            <MainNavigator />
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
