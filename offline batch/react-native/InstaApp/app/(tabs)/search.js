import React from 'react'
import { View,Text } from 'react-native'
import { useAuth } from '../../state-management/AuthContext'
export default function Search() {
  const {user} = useAuth();
  return (
    <View>
        <Text>{user.email}</Text>
    </View>
  )
}
