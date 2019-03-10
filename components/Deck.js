import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { lightGrey, darkGrey } from '../utils/colors'

export default function Deck({ title, count }) {
  const cardText = count === 1 ? 'card' : 'cards'

  return (
    <View style={styles.item}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitle}>
        {count} {cardText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: lightGrey,
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
  titleText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: darkGrey
  }
})
