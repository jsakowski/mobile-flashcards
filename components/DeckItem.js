import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  textLight,
  lightPrimary,
  textPrimary,
  textSecondary
} from '../utils/colors'

const DeckItem = ({ deckTitle, cardCount, onPressItem }) => {
  const countText = cardCount === 1 ? 'card' : 'cards'

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
          duration: 80,
          easing: Easing.linear,
          useNativeDriver: true
        }).start(() => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 1,
            easing: Easing.linear,
            useNativeDriver: true
          }).start()
          onPressItem(deckTitle)
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
          <View style={styles.itemContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {deckTitle}
            </Text>
            <Text style={styles.subTitle}>
              {cardCount} {countText}
            </Text>
          </View>
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
  itemContainer: {
    padding: 10
  },
  title: {
    color: textPrimary,
    fontSize: 15,
    paddingBottom: 5
  },
  subTitle: {
    color: textSecondary,
    fontSize: 12
  },
  itemIcon: {
    color: textLight,
    paddingLeft: 10
  }
})

export default DeckItem
