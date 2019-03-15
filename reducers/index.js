import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_CARD,
  DELETE_CARD,
  UPDATE_CARD
} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK:
      return {
        ...Object.keys(state)
          .filter((key) => key !== action.id)
          .reduce((result, current) => {
            result[current] = state[current]
            return result
          }, {})
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat(action.card)
        }
      }
    case DELETE_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.filter(
            (item) => item.id !== action.cardId
          )
        }
      }
    case UPDATE_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.map((item) => {
            if (item.id !== action.card.id) {
              return item
            }

            return {
              ...item,
              ...action.card
            }
          })
        }
      }
    default:
      return state
  }
}

export default decks
