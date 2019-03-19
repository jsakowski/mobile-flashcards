import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TextInput,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { addDeck, updateDeckTitle } from '../actions'
import SubmitBtn from './SubmitBtn'
import { textSecondary, lightPrimary } from '../utils/colors'
import { saveDeck, formatDeck, saveDeckTitle } from '../utils/api'
import { isBlank } from '../utils/validation'

const initialState = {
  title: '',
  titleError: ''
}

class EditDeck extends Component {
  state = {
    title: this.props.deck !== null ? this.props.deck.title : '',
    titleError: ''
  }

  onChange = (value) => {
    this.setState({
      title: value,
      titleError: this.validate(value)
    })
  }

  componentDidMount() {
    const { deck } = this.props

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (deck === null)
        this.setState({
          ...initialState
        })

      setTimeout(() => {
        this.workaroundFocus()
      }, 100)
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
    const { handleAddDeck, handleEditTitle, navigation, deck } = this.props

    const titleError = this.validate(title)
    this.setState({ titleError: titleError })

    if (titleError !== '') return

    this.setState({
      ...initialState
    })
    const deckTitle = title.trim()

    if (deck === null) {
      const deckId = handleAddDeck(deckTitle)

      //navigation to Decks Tab and then to the new deck
      Promise.all([navigation.goBack()]).then(() => {
        navigation.navigate('DeckDetail', {
          deckId: deckId,
          title: deckTitle
        })
      })
    } else {
      handleEditTitle(deckTitle)
      navigation.dispatch(
        navigation.navigate('DeckDetail', {
          deckId: deck.id,
          title: deckTitle
        })
      )
    }
  }

  validate = (value) => {
    return isBlank(value) ? 'Please enter the title' : ''
  }

  render = () => {
    const { title, titleError } = this.state
    const { deck } = this.props

    const submitText = deck === null ? 'Create Deck' : 'Submit'

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={160}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          {deck === null && (
            <Text style={styles.titleText}>
              What is the title on your new deck?
            </Text>
          )}
          <View style={styles.deckContainer}>
            <View style={styles.deckTitleContainer}>
              <TextInput
                style={[
                  styles.textField,
                  titleError !== '' ? styles.textFieldError : {}
                ]}
                placeholder={'Deck Title'}
                placeholderTextColor={textSecondary}
                onChangeText={(value) => this.onChange(value)}
                value={title}
                autoFocus={true}
                ref={(ref) => (this.titleInput = ref)}
                blurOnSubmit={false}
                maxLength={50}
                onSubmitEditing={this.submit}
                returnKeyType={'done'}
              />
            </View>
            <SubmitBtn onPress={this.submit} btnText={submitText} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } =
    navigation.state.params !== undefined ? navigation.state.params : {}

  return {
    deck: deckId !== undefined ? state[deckId] : null
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } =
    navigation.state.params !== undefined ? navigation.state.params : {}

  return {
    handleAddDeck: (deckTitle) => {
      const deck = formatDeck(deckTitle)
      dispatch(
        addDeck({
          [deck.id]: deck
        })
      )
      saveDeck(deck)

      return deck.id
    },
    handleEditTitle: (deckTitle) => {
      dispatch(updateDeckTitle(deckId, deckTitle))
      saveDeckTitle(deckId, deckTitle)
    }
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
  textField: {
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

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditDeck)
)
