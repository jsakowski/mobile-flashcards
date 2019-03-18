import React from 'react'
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native'
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import EditDeck from './components/EditDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import { primary, textLight, darkPrimary, textSecondary } from './utils/colors'

const RouteConfigs = {
  Home: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  lazy: true,
  swipeEnabled: false,

  tabBarOptions: {
    activeTintColor: darkPrimary,
    inactiveTintColor: textSecondary,
    upperCaseLabel: Platform.OS === 'ios' ? false : true,
    labelStyle: {
      fontSize: 16
    },
    indicatorStyle: {
      backgroundColor: darkPrimary
    },
    style: {
      height: 55,
      backgroundColor: textLight,

      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 1
    },
    safeAreaInset: true
  },
  navigationOptions: {
    swipeEnabled: false
  }
}

const Tabs = createAppContainer(
  createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
)
const mainNavigationOptions = {
  title: 'Flashcards',
  headerBackTitle: 'Home'
}

const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Tabs,
        navigationOptions: mainNavigationOptions
      },
      DeckDetail: {
        screen: DeckDetail
      },
      AddCard: {
        screen: AddCard
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          title: 'Quiz'
        }
      },
      EditDeck: {
        screen: EditDeck,
        navigationOptions: {
          title: 'Edit Deck Title'
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
