import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import SubmitBtn from './SubmitBtn'
import { textLight, textSecondary, lightPrimary } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'

const initialState = {
  title: '',
  isValid: false,
  validated: false
}

class AddDeck extends Component {
  state = {
    ...initialState
  }

  onChange = (value) => {
    this.setState({
      title: value
    })
    this.validate()
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
    this.titleInput.blur()

    setTimeout(() => {
      this.titleInput.focus()
    }, 100)
  }

  submit = () => {
    const { title, isValid } = this.state

    this.validate()

    console.log('Add Deck -- submit', title, isValid)

    if (isValid) {
      this.setState({
        ...initialState
      })

      this.props.dispatch(
        addDeck({
          [title]: {
            title: title,
            questions: []
          }
        })
      )

      saveDeckTitle(title)

      // navigation to the new deck
    }
  }

  validate = () => {
    const { title } = this.state
    this.setState({
      isValid: title.length > 0,
      validated: true
    })
  }

  render = () => {
    const { title, validated } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <Text style={styles.titleText}>
            What is the title on your new deck?
          </Text>
          <View style={styles.deckContainer}>
            <View style={styles.deckTitleContainer}>
              <TextInput
                style={[
                  styles.textField,
                  title.length === 0 && validated ? styles.textFieldError : {}
                ]}
                placeholder={'Deck Title'}
                onChangeText={(value) => this.onChange(value)}
                value={title}
                ref={(ref) => (this.titleInput = ref)}
                blurOnSubmit={false}
              />
            </View>
            <SubmitBtn onPress={this.submit} btnText={'Create Deck'} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textFieldError: {
    borderBottomColor: 'red'
  },
  textFieldSuccess: {
    borderBottomColor: 'green'
  },
  textField: {
    backgroundColor: textLight,
    borderBottomColor: textSecondary,
    borderBottomWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 17
  },
  deckContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17
  },
  deckTitleContainer: {
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
  titleText: {
    fontSize: 40,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center'
  }
})

export default connect()(AddDeck)
