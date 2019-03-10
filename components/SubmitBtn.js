import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { darkGrey, white } from '../utils/colors'

function SubmitBtn({ onPress, btnText }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>
        {Platform.OS === 'ios' ? btnText : btnText.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: darkGrey,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  },
  AndroidSubmitBtn: {
    backgroundColor: darkGrey,
    paddingRight: 30,
    paddingLeft: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SubmitBtn
