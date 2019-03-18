export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const UPDATE_DECK_TITLE = 'UPDATE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function removeDeck(id) {
  return {
    type: DELETE_DECK,
    id
  }
}

export function updateDeckTitle(deckId, title) {
  return {
    type: UPDATE_DECK_TITLE,
    deckId,
    title
  }
}

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}

export function deleteCard(deckId, cardId) {
  return {
    type: DELETE_CARD,
    deckId,
    cardId
  }
}

export function updateCard(deckId, card) {
  return {
    type: UPDATE_CARD,
    deckId,
    card
  }
}
