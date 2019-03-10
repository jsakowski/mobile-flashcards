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
import { white, lightGrey, grey } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: ''
  }

  onChange = (value) => {
    this.setState({
      title: value
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
    this.titleInput.blur()

    setTimeout(() => {
      this.titleInput.focus()
    }, 100)
  }

  submit = () => {
    const { title } = this.state

    this.setState({
      title: ''
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

  render = () => {
    const { title } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ScrollView>
          <Text style={styles.titleText}>
            What is the title on your new deck?
          </Text>
          <View style={styles.deckContainer}>
            <View style={styles.deckTitleContainer}>
              <TextInput
                style={styles.textField}
                placeholder={'Deck Title'}
                onChangeText={(value) => this.onChange(value)}
                value={title}
                autoFocus={true}
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
  textField: {
    backgroundColor: white,
    borderBottomColor: grey,
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
    backgroundColor: lightGrey,
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
