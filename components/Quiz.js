import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { darkPrimary, accent } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import Score from './Score'
import Card from './Card'

const initialState = {
  index: 0,
  displayQuestion: true,
  correct: 0
}

class Quiz extends Component {
  state = {
    ...initialState
  }

  handleAnswer = (correctAnswer) => {
    const { questions } = this.props

    this.setState((currentState) => ({
      correct: correctAnswer ? currentState.correct + 1 : currentState.correct,
      displayQuestion: true,
      index:
        questions.length > currentState.index
          ? currentState.index + 1
          : currentState.index
    }))
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
    this.setState({
      ...initialState
    })
  }

  render = () => {
    const { questions } = this.props
    const { index, displayQuestion, correct } = this.state
    const completed = questions.length === index
    const height = Math.round(Dimensions.get('window').height / 2) - 20

    if (completed) {
      const amount = Math.round((correct * 100) / questions.length)
      return <Score amount={amount} restartQuiz={this.restart} />
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {index + 1}/{questions.length}
        </Text>

        <Card
          cardText={
            displayQuestion
              ? questions[index].question
              : questions[index].answer
          }
          isFront={displayQuestion}
          height={height}
          flip={this.toggle}
        />

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
