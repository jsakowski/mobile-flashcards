import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions'

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
    default:
      return state
  }
}

export default decks
