import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import SubmitBtn from './SubmitBtn'
import { orange } from '../utils/colors'

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
        <Deck title={deck.title} count={deck.questions.length} />
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
            color={orange}
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
  }
})

export default connect(mapStateToProps)(DeckDetail)
