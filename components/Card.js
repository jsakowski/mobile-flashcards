import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  textLight,
  lightPrimary,
  darkPrimary,
  textPrimary,
  textSecondary,
  primary
} from '../utils/colors'
import Divider from './Divider'

class Card extends Component {
  state = {
    isFront: true
  }

  flip = () => {
    const { isFront } = this.state

    isFront ? this.toAnswer() : this.toQuestion()

    this.setState((current) => ({
      isFront: !current.isFront
    }))
  }

  toAnswer = () => {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 300
    }).start()
  }

  toQuestion = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 300
    }).start()
  }

  componentWillMount = () => {
    this.animatedValue = new Animated.Value(0)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.index !== this.props.index) {
      this.setState({ isFront: true })
      this.animatedValue = new Animated.Value(0)
    }
  }

  render = () => {
    const { card } = this.props
    const { isFront } = this.state

    const height = Math.round(Dimensions.get('window').height / 2) - 20

    const itemColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(33, 150, 243)', 'rgb(187, 222, 251)']
    })

    let transformStyle = {
      backgroundColor: itemColor
    }
    return (
      <Animated.View
        style={[styles.cardContainer, transformStyle, { height: height }]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
                isFront ? styles.questionText : styles.answerText
              ]}
            >
              {isFront ? card.question : card.answer}
            </Text>
          </View>
        </ScrollView>
        <Divider />
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.action} onPress={() => this.flip()}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
              size={22}
              color={isFront ? lightPrimary : darkPrimary}
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: isFront ? lightPrimary : darkPrimary }}>
              {isFront ? 'Answer  ' : 'Question'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    justifyContent: 'center'
  },
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
    margin: 10
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
    color: textLight,
    fontSize: 20
  },
  answerText: {
    color: textPrimary
  }
})

export default Card
