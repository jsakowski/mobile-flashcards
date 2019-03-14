import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native'
import SubmitBtn from './SubmitBtn'
import { textSecondary, lightPrimary, divider } from '../utils/colors'
import { isBlank } from '../utils/validation'
import { addCard, updateCard } from '../actions'
import { addCardToDeck, editCard } from '../utils/api'

const initialState = {
  question: '',
  questionError: '',
  answer: '',
  answerError: '',
  isNew: true
}
class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { card } = navigation.state.params

    return {
      title: card === undefined ? 'New Question' : card.question
    }
  }

  state = {
    question: this.props.card !== null ? this.props.card.question : '',
    questionError: '',
    answer: this.props.card !== null ? this.props.card.answer : '',
    answerError: '',
    isNew: this.props.card === null
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: this.validate(name, value)
    })
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.workaroundFocus()
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  workaroundFocus() {
    this.questionInput.blur()

    setTimeout(() => {
      this.questionInput.focus()
    }, 100)
  }

  submit = () => {
    const { question, answer, isNew } = this.state
    const { goBack, handleAddCard, handleEditCard, cardIndex } = this.props

    //validate
    const questionError = this.validate('question', question)
    const answerError = this.validate('answer', answer)
    this.setState({
      questionError: questionError,
      answerError: answerError
    })

    if (questionError !== '' || answerError !== '') return

    this.setState({
      ...initialState
    })

    // update Redux
    if (isNew)
      handleAddCard({
        question: question.trim(),
        answer: answer.trim()
      })
    else
      handleEditCard(cardIndex, {
        question: question.trim(),
        answer: answer.trim()
      })

    // redirect back to deck
    goBack()
  }

  validate = (type, value) => {
    return isBlank(value) ? `Please enter the ${type}` : ''
  }

  render = () => {
    const { question, answer, questionError, answerError, isNew } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={120}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.cardContainer}>
            <View style={styles.fieldContainer}>
              <TextInput
                style={[
                  styles.textField,
                  questionError !== '' ? styles.textFieldError : {}
                ]}
                placeholder={'Question'}
                placeholderTextColor={textSecondary}
                onChangeText={(value) => this.handleChange('question', value)}
                value={question}
                ref={(ref) => (this.questionInput = ref)}
                multiline={true}
                onBlur={() => {
                  this.setState({
                    questionError: this.validate(
                      'question',
                      this.state.question
                    )
                  })
                }}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: divider,
                marginBottom: 10,
                marginTop: 5
              }}
            />
            <View style={styles.fieldContainer}>
              <TextInput
                id='answer'
                style={[
                  styles.textField,
                  answerError !== '' ? styles.textFieldError : {}
                ]}
                placeholder={'Answer'}
                placeholderTextColor={textSecondary}
                onChangeText={(value) => this.handleChange('answer', value)}
                value={answer}
                multiline={true}
                onBlur={() => {
                  this.setState({
                    answerError: this.validate('answer', this.state.answer)
                  })
                }}
              />
            </View>
          </View>
          <SubmitBtn
            onPress={this.submit}
            btnText={isNew ? 'Submit' : 'Save'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { card, deckId } = navigation.state.params

  return {
    card: card !== undefined ? card : null,
    cardIndex:
      card !== undefined
        ? state[deckId].questions
            .map((item) => item.question)
            .indexOf(card.question)
        : -1
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    handleAddCard: (card) => {
      dispatch(addCard(deckId, card))
      addCardToDeck(deckId, card)
    },
    handleEditCard: (index, card) => {
      dispatch(updateCard(deckId, index, card))
      editCard(deckId, index, card)
    }
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
  textField: {
    padding: 10
  },
  fieldContainer: {
    marginTop: 17,
    marginBottom: 17
  },
  cardContainer: {
    backgroundColor: lightPrimary,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginBottom: 17
  },
  textFieldError: {
    borderBottomColor: 'red',
    borderBottomWidth: 2
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)
