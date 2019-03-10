import React from 'react'
import { StyleSheet, View } from 'react-native'
import Decks from './components/Decks'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import { darkGrey } from './utils/colors'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlashcardsStatusBar
          backgroundColor={darkGrey}
          barStyle='light-content'
        />
        <Decks />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
