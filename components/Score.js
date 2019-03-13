import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkPrimary, accent } from '../utils/colors'
import SubmitBtn from './SubmitBtn'

const Score = ({ amount, restartQuiz }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score</Text>
      <Text style={styles.score}>{amount}%</Text>
      <View style={{ marginTop: 60 }}>
        <SubmitBtn
          onPress={restartQuiz}
          btnText={'Restart Quiz'}
          color={accent}
          align={'centered'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 60,
    color: darkPrimary,
    marginBottom: 20
  },
  score: {
    textAlign: 'center',
    fontSize: 80,
    color: accent
  }
})

export default Score
