import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { textPrimary, textSecondary } from '../utils/colors'

export default function Deck({ title, count, type = 'row' }) {
  const countText = count === 1 ? 'card' : 'cards'

  return (
    <View style={styles.container}>
      {type === 'card' ? (
        <Text numberOfLines={2} style={[styles.title, styles.cardTitle]}>
          {title}
        </Text>
      ) : (
        <Text numberOfLines={1} style={[styles.title, styles.itemTitle]}>
          {title}
        </Text>
      )}

      <Text
        style={[
          styles.subTitle,
          type === 'card' ? styles.cardText : styles.itemText
        ]}
      >
        {count} {countText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 5
  },
  itemTitle: {
    fontSize: 15,
    paddingBottom: 5
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center'
  },
  itemText: {
    fontSize: 12
  },
  title: {
    color: textPrimary
  },
  subTitle: {
    color: textSecondary
  }
})
