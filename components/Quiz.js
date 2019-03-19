import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  YellowBox
} from 'react-native'
import { darkPrimary, accent } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import Score from './Score'
import Card from './Card'
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notification'

const initialState = {
  index: 0,
  correct: 0
}

class Quiz extends Component {
  state = {
    ...initialState
  }

  animatedValue = new Animated.Value(0)

  handleAnswer = (correctAnswer) => {
    const { questions } = this.props

    this.setState(
      (currentState) => ({
        correct: correctAnswer
          ? currentState.correct + 1
          : currentState.correct,
        index:
          questions.length > currentState.index
            ? currentState.index + 1
            : currentState.index
      }),
      this.handleNotification
    )

    this.animatedValue = new Animated.Value(0)
  }

  handleNotification = () => {
    const { questions } = this.props
    YellowBox.ignoreWarnings([
      'Ability to schedule an automatically repeated notification'
    ])

    if (this.state.index === questions.length)
      clearLocalNotification().then(setLocalNotification)
  }

  correctAnswer = () => {
    this.handleAnswer(true)
  }

  incorrectAnswer = () => {
    this.handleAnswer(false)
  }

  toggle = () => {
    this.setState((currentState) => ({
      displayQuestion: !currentState.displayQuestion
    }))
  }

  restart = () => {
    this.animatedValue = new Animated.Value(0)

    this.setState({
      ...initialState
    })
  }

  slide = () => {
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 800
    }).start()
  }

  render = () => {
    const { questions } = this.props
    const { index, correct } = this.state
    const completed = questions.length === index

    const width = Dimensions.get('window').width

    const itemMovement = this.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [width, 0]
    })

    let transformStyle = {
      transform: [{ translateX: itemMovement }]
    }

    this.slide()

    if (completed) {
      const amount = Math.round((correct * 100) / questions.length)

      return (
        <Animated.View style={[transformStyle, { flex: 1 }]}>
          <Score amount={amount} restartQuiz={this.restart} />
        </Animated.View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {index + 1}/{questions.length}
        </Text>

        <Animated.View style={transformStyle}>
          <Card card={questions[index]} index={index} />
        </Animated.View>

        <View style={{ marginTop: 20 }}>
          <SubmitBtn
            onPress={this.correctAnswer}
            btnText={'Correct'}
            color={darkPrimary}
            align={'centered'}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <SubmitBtn
            onPress={this.incorrectAnswer}
            btnText={'Incorrect'}
            color={accent}
            align={'centered'}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    questions: state[deckId].questions
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 15
  }
})

export default connect(mapStateToProps)(Quiz)
