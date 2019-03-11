import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import SubmitBtn from './SubmitBtn'
import { lightPrimary, accent } from '../utils/colors'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  submit = () => {}

  render = () => {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Deck
            title={deck.title}
            count={deck.questions.length}
            type={'card'}
          />
        </View>
        <View style={{ marginTop: 60 }}>
          <SubmitBtn
            onPress={this.submit}
            btnText={'Add Card'}
            align={'centered'}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <SubmitBtn
            onPress={this.submit}
            btnText={'Start Quiz'}
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
    deck: state[deckId]
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  deckContainer: {
    backgroundColor: lightPrimary,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginTop: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})

export default connect(mapStateToProps)(DeckDetail)
