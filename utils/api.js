import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    return JSON.parse(results)
  })
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    if (results === null) return null

    const decs = JSON.parse(results)
    return decs[id]
  })
}

export function saveDeck(deck) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [deck.id]: deck
    })
  )
}

export function deleteDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const decks = JSON.parse(results)
    decks[key] = undefined
    delete decks[key]
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function addCardToDeck(deckId, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)

      let deck = decks[deckId]
      deck.questions.push(card)
      return deck
    })
    .then((deck) => {
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [deckId]: deck })
      )
    })
}

export function deleteCardFromDeck(deckId, cardId) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)

      let deck = decks[deckId]
      deck.questions = deck.questions.filter((item) => item.id !== cardId)
      return deck
    })
    .then((deck) => {
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [deckId]: deck })
      )
    })
}

export function editCard(deckId, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)

      let deck = decks[deckId]
      deck.questions = deck.questions.map((item) => {
        if (item.id !== card.id) return item

        return {
          ...card
        }
      })
      return deck
    })
    .then((deck) => {
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [deckId]: deck })
      )
    })
}

export function formatDeck(title) {
  return {
    id: generateUID(),
    title: title,
    questions: []
  }
}

export function formatCard(question, answer) {
  return {
    id: generateUID(),
    answer: answer,
    question: question
  }
}

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}
