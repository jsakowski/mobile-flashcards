import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {
  textLight,
  lightPrimary,
  textPrimary,
  textSecondary
} from '../utils/colors'

const DeckTitle = ({ title, cardCount, numberOfLines, display = 'inList' }) => {
  const countText = cardCount === 1 ? 'card' : 'cards'

  return (
    <View style={[styles.container, styles[`${display}Container`]]}>
      <Text
        numberOfLines={numberOfLines}
        style={[styles.title, styles[`${display}Title`]]}
      >
        {title}
      </Text>
      <Text style={[styles.subTitle, styles[`${display}SubTitle`]]}>
        {cardCount} {countText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  inListContainer: {},
  detailContainer: {
    backgroundColor: lightPrimary,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginTop: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  title: {
    color: textPrimary
  },
  subTitle: {
    color: textSecondary
  },
  inListTitle: {
    fontSize: 15,
    paddingBottom: 5
  },
  inListSubTitle: {
    fontSize: 12
  },
  detailTitle: {
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  detailSubTitle: {
    fontSize: 15,
    textAlign: 'center'
  }
})

export default DeckTitle
