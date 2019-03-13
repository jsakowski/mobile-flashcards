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
import { isBlank } from '../utils/validation'

const initialState = {
  title: '',
  titleError: ''
}

class AddDeck extends Component {
  state = {
    ...initialState
  }

  onChange = (value) => {
    this.setState({
      title: value,
      titleError: this.validate(value)
    })
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({
        ...initialState
      })

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
    const { title } = this.state

    const titleError = this.validate(title)
    this.setState({ titleError: titleError })

    if (titleError !== '') return

    this.setState({
      ...initialState
    })

    const deckTitle = title.trim()

    this.props.dispatch(
      addDeck({
        [deckTitle]: {
          title: deckTitle.trim(),
          questions: []
        }
      })
    )

    saveDeckTitle(deckTitle)

    // navigation to the new deck
  }

  validate = (value) => {
    return isBlank(value) ? 'Please enter the title' : ''
  }

  render = () => {
    const { title, titleError } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={100}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Text style={styles.titleText}>
            What is the title on your new deck?
          </Text>
          <View style={styles.deckContainer}>
            <View style={styles.deckTitleContainer}>
              <TextInput
                style={[
                  styles.textField,
                  titleError !== '' ? styles.textFieldError : {}
                ]}
                placeholder={'Deck Title'}
                placeholderTextColor={'#cccccc'}
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
    borderBottomColor: 'red',
    borderBottomWidth: 2
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
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center'
  }
})

export default connect()(AddDeck)
