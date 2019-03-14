import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import SubmitBtn from './SubmitBtn'
import {
  lightPrimary,
  accent,
  textLight,
  textPrimary,
  textSecondary
} from '../utils/colors'
import Cards from './Cards'
import { deleteCard, removeDeck } from '../actions'
import { deleteCardFromDeck, deleteDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId,
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('deleteDeck')}>
          <FontAwesome
            name={'trash-o'}
            size={25}
            style={{ color: textLight, paddingRight: 8 }}
          />
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    navigation.setParams({ deleteDeck: this.onDeckDelete })
  }

  onDeckDelete = () => {
    const { handleDeleteDeck, navigation } = this.props

    handleDeleteDeck()

    navigation.navigate('Home')
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

  onEditCard = (card) => {
    const { deck } = this.props

    this.props.navigation.navigate('AddCard', {
      deckId: deck.title,
      card: card
    })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined
  }

  render = () => {
    const { deck } = this.props
    const hasCards = deck.questions.length > 0
    const countText = deck.questions.length === 1 ? 'card' : 'cards'

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.deckContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {deck.title}
            </Text>
            <Text style={styles.subTitle}>
              {deck.questions.length} {countText}
            </Text>
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
            onEditCard={this.onEditCard}
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
    },
    handleDeleteDeck: () => {
      dispatch(removeDeck(deckId))
      deleteDeck(deckId)
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
  },
  title: {
    color: textPrimary,
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 5
  },
  subTitle: {
    color: textSecondary,
    fontSize: 16,
    textAlign: 'center'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)
