import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import SubmitBtn from './SubmitBtn'
import { lightPrimary, accent } from '../utils/colors'
import Cards from './Cards'
import { deleteCard } from '../actions'
import { deleteCardFromDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  toQuiz = () => {
    const { deck } = this.props

    this.props.navigation.navigate('Quiz', {
      deckId: deck.title
    })
  }

  toAddCard = () => {
    const { deck } = this.props

    this.props.navigation.navigate('AddCard', {
      deckId: deck.title
    })
  }

  onCardDelete = (cardId) => {
    const { handleDeleteCard } = this.props
    handleDeleteCard(cardId)
  }

  render = () => {
    const { deck } = this.props
    const hasCards = deck.questions.length > 0

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.deckContainer}>
            <Deck
              title={deck.title}
              count={deck.questions.length}
              type={'card'}
            />
          </View>
          {hasCards && (
            <View style={{ marginTop: 20 }}>
              <SubmitBtn
                onPress={this.toQuiz}
                btnText={'Start Quiz'}
                color={accent}
                align={'centered'}
              />
            </View>
          )}
          {!hasCards && (
            <View style={{ marginTop: 20 }}>
              <SubmitBtn
                onPress={this.toAddCard}
                btnText={'Add Card'}
                align={'centered'}
              />
            </View>
          )}
        </View>
        {hasCards && (
          <Cards
            questions={deck.questions}
            onAddCard={this.toAddCard}
            onDeleteCard={this.onCardDelete}
          />
        )}
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

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    handleDeleteCard: (cardId) => {
      dispatch(deleteCard(deckId, cardId))
      deleteCardFromDeck(deckId, cardId)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)
