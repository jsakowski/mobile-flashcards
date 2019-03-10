import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { lightGrey, darkGrey } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

class Decks extends Component {
  state = {
    decks: [],
    ready: false
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      getDecks().then((items) =>
        this.setState(() => ({ ready: true, decks: items }))
      )
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  renderItem = ({ item }) => {
    const cardText = item.cardCount === 1 ? 'card' : 'cards'
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.subTitle}>
          {item.cardCount} {cardText}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks, ready } = this.state

    if (!ready) return <AppLoading />

    if (decks.length === 0)
      return (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name={'cards-playing-outline'}
            size={100}
            style={styles.deckIcon}
          />
          <Text style={styles.titleText}>Please create your first deck</Text>
        </View>
      )

    return (
      <View style={{ justifyContent: 'center' }}>
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: lightGrey,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  titleText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: darkGrey
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckIcon: {
    color: darkGrey
  }
})

export default connect()(Decks)
