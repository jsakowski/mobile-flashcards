import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { darkGrey } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Deck from './Deck'
import { receiveDecks } from '../actions'

class Decks extends Component {
  state = {
    decks: [],
    ready: false
  }
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((items) => dispatch(receiveDecks(items)))
      .then(() => this.setState({ ready: true }))
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DeckDetail', {
            deckId: item.title
          })
        }
      >
        <Deck title={item.title} count={item.questions.length} />
      </TouchableOpacity>
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
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckIcon: {
    color: darkGrey
  }
})

export default connect(mapStateToProps)(Decks)
