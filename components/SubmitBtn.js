import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { darkGrey, white } from '../utils/colors'

function SubmitBtn({
  onPress,
  btnText,
  color = darkGrey,
  align = Platform.OS === 'ios' ? 'centered' : 'rightAlined'
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
        getStyle(align),
        { backgroundColor: color }
      ]}
    >
      <Text style={styles.submitBtnText}>
        {Platform.OS === 'ios' ? btnText : btnText.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}
const getStyle = (name) => {
  return styles[name]
}
const styles = StyleSheet.create({
  centered: {
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  iosSubmitBtn: {
    borderRadius: 7
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  },
  rightAlined: {
    paddingRight: 30,
    paddingLeft: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  AndroidSubmitBtn: {
    borderRadius: 2
  }
})

export default SubmitBtn
