import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const GuideItem = ({data}) => {
  return (
    <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10}}>
      <Text style={{color: '#000', fontSize: 17, fontFamily: 'PoppinsSemiBold'}}>{data.title}</Text>
      <Entypo name="chevron-right" size={28} color="black" />
    </TouchableOpacity>
  )
}

export default GuideItem