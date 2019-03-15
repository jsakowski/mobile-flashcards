import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { textLight, lightPrimary } from '../utils/colors'
import DeckTitle from './DeckTitle'

const DeckItem = ({ deck, onPressItem }) => {
  let scaleValue = new Animated.Value(0)
  const itemScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1.4]
  })

  let transformStyle = {
    transform: [{ scale: itemScale }]
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        scaleValue.setValue(0)
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        }).start(() => {
          onPressItem(deck)
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 1,
            easing: Easing.linear,
            useNativeDriver: true
          }).start()
        })
      }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Animated.View style={transformStyle}>
            <MaterialCommunityIcons
              name={'cards-variant'}
              size={30}
              style={styles.itemIcon}
            />
          </Animated.View>
          <DeckTitle
            title={deck.title}
            cardCount={deck.questions.length}
            numberOfLines={1}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightPrimary
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginRight: 40
  },
  itemIcon: {
    color: textLight,
    paddingLeft: 10
  }
})

export default DeckItem
