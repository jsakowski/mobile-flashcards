import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import { getDecks, deleteDeck } from '../utils/api'
import { darkGrey, white, divider, lightPrimary } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Deck from './Deck'
import { receiveDecks, removeDeck } from '../actions'

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
          <TouchableHighlight
            style={styles.deckContainer}
            onPress={() =>
              this.props.navigation.navigate('DeckDetail', {
                deckId: item.title
              })
            }
          >
            <View style={styles.row}>
              <MaterialCommunityIcons
                name={'cards-variant'}
                size={30}
                style={{ color: white, paddingLeft: 10 }}
              />
              <Deck title={item.title} count={item.questions.length} />
            </View>
          </TouchableHighlight>
        </Swipeout>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: divider
          }}
        />
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

function mapStateToProps(decks) {
  return {
    decks: Object.values(decks)
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
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(Decks)
