import React from 'react'
import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    return results === null ? setDummyData() : JSON.parse(results)
  })
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    if (results === null) return null

    const decs = JSON.parse(results)
    return decs[id]
  })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
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
      deck.questions = deck.questions.filter((item) => item.question !== cardId)
      return deck
    })
    .then((deck) => {
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [deckId]: deck })
      )
    })
}

export function editCard(deckId, index, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)

      let deck = decks[deckId]
      deck.questions[index] = card
      return deck
    })
    .then((deck) => {
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [deckId]: deck })
      )
    })
}

function setDummyData() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

function formatDeckResults(data) {
  return Object.values(data).map((item) => {
    return {
      title: item.title,
      cardCount: item.questions === null ? 0 : item.questions.length
    }
  })
}
