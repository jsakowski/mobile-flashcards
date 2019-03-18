import React, { Component } from 'react'
import {
  View,
  Platform,
  TouchableOpacity,
  Alert,
  StyleSheet
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
import DeckTitle from './DeckTitle'
import { deleteCard, removeDeck } from '../actions'
import { deleteCardFromDeck, deleteDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: title,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={navigation.getParam('editDeck')}>
            <FontAwesome name={'edit'} size={25} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.getParam('deleteDeck')}>
            <FontAwesome name={'trash-o'} size={25} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  componentDidMount() {
    const { navigation } = this.props

    navigation.setParams({
      deleteDeck: this.onDeckDelete,
      editDeck: this.onEditDeck
    })
  }

  onEditDeck = () => {
    const { deck } = this.props

    this.props.navigation.navigate('EditDeck', {
      deckId: deck.id
    })
  }

  onDeckDelete = () => {
    const { handleDeleteDeck } = this.props

    handleDeleteDeck()
  }

  toQuiz = () => {
    const { deck } = this.props

    this.props.navigation.navigate('Quiz', {
      deckId: deck.id
    })
  }

  toAddCard = () => {
    const { deck } = this.props

    this.props.navigation.navigate('AddCard', {
      deckId: deck.id
    })
  }

  onCardDelete = (cardId) => {
    const { handleDeleteCard } = this.props
    handleDeleteCard(cardId)
  }

  onEditCard = (card) => {
    const { deck } = this.props

    this.props.navigation.navigate('AddCard', {
      deckId: deck.id,
      card: card
    })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined
  }

  render = () => {
    const { deck } = this.props

    const hasCards = deck.questions.length > 0

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <DeckTitle
            title={deck.title}
            cardCount={deck.questions.length}
            numberOfLines={2}
            display={'detail'}
          />

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
      Alert.alert(
        '',
        'Are you sure you want to delete?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(removeDeck(deckId))
              deleteDeck(deckId)
              navigation.navigate('Home')
            }
          }
        ],
        { cancelable: false }
      )
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
  itemContainer: {
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
  },
  actionIcon: {
    color: textLight,
    paddingRight: 8
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail)
