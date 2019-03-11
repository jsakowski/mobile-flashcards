import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { textPrimary, textSecondary } from '../utils/colors'

export default function Deck({ title, count, type = 'row' }) {
  const cardText = count === 1 ? 'card' : 'cards'

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, type === 'card' ? styles.cardTitle : {}]}>
        {title}
      </Text>
      <Text style={[styles.subTitle, type === 'card' ? styles.cardTitle : {}]}>
        {count} {cardText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  cardTitle: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 20,
    paddingBottom: 5,
    color: textPrimary
  },
  subTitle: {
    fontSize: 16,
    color: textSecondary
  }
})
