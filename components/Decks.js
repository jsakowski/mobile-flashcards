import React, { Component } from 'react'
import { View, Text, FlatList, Keyboard, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import { getDecks, deleteDeck } from '../utils/api'
import { lightPrimary, darkPrimary } from '../utils/colors'
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

    dispatch(removeDeck(item.id))
    deleteDeck(item.id)
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((items) => {
        return dispatch(receiveDecks(items))
      })
      .then(() => {
        this.setState({ ready: true })
      })

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      Keyboard.dismiss()
    })
  }

  toDeckDetail = (deck) => {
    const { navigation } = this.props
    navigation.navigate('DeckDetail', {
      deckId: deck.id,
      title: deck.title
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
          <DeckItem deck={item} onPressItem={this.toDeckDetail} />
        </Swipeout>
        <Divider />
      </View>
    )
  }

  noDecks = () => {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons
          name={'cards-playing-outline'}
          size={100}
          style={styles.deckIcon}
        />
        <Text style={styles.title}>Please create your first deck</Text>
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (!ready) return <AppLoading />

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => {
            return item.id
          }}
          ListEmptyComponent={this.noDecks}
          contentContainerStyle={{ flexGrow: 1 }}
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
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckIcon: {
    color: darkPrimary
  },
  deckContainer: {
    backgroundColor: lightPrimary
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginRight: 40
  },
  title: {
    fontSize: 20
  }
})

export default connect(mapStateToProps)(Decks)
