import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { textLight, lightPrimary, textPrimary, primary } from '../utils/colors'
import Divider from './Divider'

const Card = ({ cardText, isFront, height, flip }) => {
  return (
    <View
      style={[
        styles.cardContainer,
        isFront ? styles.questionContainer : styles.answerContainer,
        { height: height }
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            isFront ? styles.questionText : styles.answerText
          ]}
        >
          {cardText}
        </Text>
      </View>
      <Divider />
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action} onPress={flip}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
            size={22}
            color={textPrimary}
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: textPrimary }}>
            {isFront ? 'Answer' : 'Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginBottom: 17
  },
  questionContainer: {
    backgroundColor: primary
  },
  answerContainer: {
    backgroundColor: lightPrimary
  },
  textContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  actionContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  action: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
    textAlign: 'center'
  },
  questionText: {
    color: textLight
  },
  answerText: {
    color: textPrimary
  }
})

export default Card
