import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GuideItem from '../components/GuideItem';

const houseHabits = [
    {
        title: "Don't throw away peels",
        content: {}
    },
    {
        title: 'Make a compost box',
        content: {}
    },
    {
        title: 'Make your own soap',
        content: {}
    }
];

const technologyHabits = [
    {
        title: "Install an ad blocker",
        content: {}
    },
    {
        title: 'Clean your mailbox',
        content: {}
    },
];

const HabitsGuide = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', paddingVertical: 10, fontSize: 24, fontFamily: 'PoppinsSemiBold'}}>House</Text>
      {
        houseHabits.map((data)=> (
            <GuideItem data={data} />
        ))
      }
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#46A667', width: 150, alignItems: 'center', paddingVertical: 6, borderRadius: 100, marginTop: 12}}>
        <Text style={{fontSize: 18, color: '#46A667', fontFamily: 'PoppinsSemiBold'}}>See all</Text>
      </TouchableOpacity>

      <View style={{width: '100%', alignItems: 'center', marginTop: 12}}>
        <Text style={{textAlign: 'center', paddingVertical: 10, fontSize: 24, fontFamily: 'PoppinsSemiBold'}}>Technology</Text>
        {
            technologyHabits.map((data)=> (
                <GuideItem data={data} />
            ))
        }
        <TouchableOpacity style={{borderWidth: 1, borderColor: '#46A667', width: 150, alignItems: 'center', paddingVertical: 6, borderRadius: 100, marginTop: 12}}>
            <Text style={{fontSize: 18, color: '#46A667', fontFamily: 'PoppinsSemiBold'}}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HabitsGuide