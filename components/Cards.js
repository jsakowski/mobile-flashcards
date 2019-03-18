import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout'
import {
  darkPrimary,
  textLight,
  lightPrimary,
  textSecondary
} from '../utils/colors'
import Divider from './Divider'

class Cards extends Component {
  renderQuestion = ({ item }) => {
    const { onDeleteCard } = this.props

    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#FF0000',
        onPress: () => {
          onDeleteCard(item.id)
        }
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'red'}>
        <TouchableHighlight
          underlayColor={lightPrimary}
          onPress={() => this.props.onEditCard(item)}
        >
          <View style={styles.cardItem}>
            <Text numberOfLines={1} style={styles.cardItemText}>
              {item.question}
            </Text>
            <Divider />
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  render = () => {
    const { questions, onAddCard } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onAddCard}>
            <View style={styles.header}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                style={{ marginRight: 5 }}
                size={20}
                color={textLight}
              />
              <Text style={styles.action}>Add Card</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={questions}
          renderItem={this.renderQuestion}
          keyExtractor={(item) => {
            return item.id
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textLight,
    marginTop: 20,
    paddingBottom: 20
  },
  row: {
    flexDirection: 'row',
    backgroundColor: darkPrimary,
    padding: 12,
    justifyContent: 'flex-end'
  },

  header: {
    flexDirection: 'row'
  },
  action: {
    color: textLight,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardItem: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: textLight
  },
  cardItemText: {
    color: textSecondary,
    paddingTop: 10,

    paddingBottom: 10
  }
})

export default Cards
