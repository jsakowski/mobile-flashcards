import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import { getDecks, deleteDeck } from '../utils/api'
import { darkGrey, white, lightPrimary, darkPrimary } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { receiveDecks, removeDeck } from '../actions'
import Divider from './Divider'
import DeckItem from './DeckItem'

class Decks extends Component {
  state = {
    ready: false
  }

  handleDeleteDeck = (item) => {
    const { dispatch } = this.props

    dispatch(removeDeck(item.title))
    deleteDeck(item.title)
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((items) => dispatch(receiveDecks(items)))
      .then(() => this.setState({ ready: true }))
  }

  toDeckDetail = (deckTitle) => {
    const { navigation } = this.props
    navigation.navigate('DeckDetail', {
      deckId: deckTitle
    })
  }

  renderItem = ({ item }) => {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#FF0000',
        onPress: () => {
          this.handleDeleteDeck(item)
        }
      }
    ]

    return (
      <View>
        <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'red'}>
          <DeckItem
            deckTitle={item.title}
            cardCount={item.questions.length}
            onPressItem={this.toDeckDetail}
          />
        </Swipeout>
        <Divider />
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (!ready) return <AppLoading />

    if (decks.length === 0)
      return (
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name={'cards-playing-outline'}
            size={100}
            style={styles.deckIcon}
          />
          <Text style={styles.titleText}>Please create your first deck</Text>
        </View>
      )

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => {
            return item.title
          }}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: Object.values(state)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckIcon: {
    color: darkGrey
  },
  deckContainer: {
    backgroundColor: lightPrimary
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginRight: 40
  }
})

export default connect(mapStateToProps)(Decks)
