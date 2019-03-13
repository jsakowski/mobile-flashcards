import React from 'react'
import { View } from 'react-native'
import { divider } from '../utils/colors'

export default function Divider() {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: divider
      }}
    />
  )
}
