import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableHighlight
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
          onDeleteCard(item.question)
        }
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor={'red'}>
        <TouchableHighlight
          underlayColor={lightPrimary}
          onPress={() => this.props.onEditCard(item)}
        >
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: textLight
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: textSecondary,
                paddingTop: 10,

                paddingBottom: 10
              }}
            >
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
      <View
        style={{
          flex: 1,
          backgroundColor: textLight,
          marginTop: 20
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: darkPrimary,
            padding: 12,
            justifyContent: 'flex-end'
          }}
        >
          <TouchableOpacity onPress={onAddCard}>
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                style={{ marginRight: 5 }}
                size={20}
                color={textLight}
              />
              <Text
                style={{
                  color: textLight,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Add Card
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={questions}
          renderItem={this.renderQuestion}
          keyExtractor={(item) => {
            return item.question
          }}
        />
      </View>
    )
  }
}

export default Cards
