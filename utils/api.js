import React from 'react'
import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciFitness:notifications'

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
    return results === null
      ? formatDeckResults(setDummyData())
      : formatDeckResults(JSON.parse(results))
  })
}

export function getDeck(id) {}

export function saveDeckTitle(title) {}

export function addCardToDeck(title, card) {}

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
