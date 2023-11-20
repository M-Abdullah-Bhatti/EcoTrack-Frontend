import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import GuideItem from '../components/GuideItem';

const meatHabits = [
    {
        title: "Reduce meat consumption",
        content: {}
    },
    {
        title: 'Eat lean meat',
        content: {}
    },
    {
        title: 'Purchase meat from local producers',
        content: {}
    }
];

const vegetableHabits = [
    {
        title: "Make a compost box",
        content: {}
    },
    {
        title: 'Eat seasonal vegetables',
        content: {}
    },
    {
        title: 'Grow vegetables at home',
        content: {}
    },
];

const FoodGuide = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', paddingVertical: 10, fontSize: 24, fontWeight: 'bold'}}>Meat</Text>
      {
        meatHabits.map((data)=> (
            <GuideItem data={data} />
        ))
      }
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#46A667', width: 175, alignItems: 'center', paddingVertical: 10, borderRadius: 100, marginTop: 12}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#46A667'}}>See all</Text>
      </TouchableOpacity>

      <View style={{width: '100%', alignItems: 'center', marginTop: 12}}>
        <Text style={{textAlign: 'center', paddingVertical: 10, fontSize: 24, fontWeight: 'bold'}}>Vegetables</Text>
        {
            vegetableHabits.map((data)=> (
                <GuideItem data={data} />
            ))
        }
        <TouchableOpacity style={{borderWidth: 1, borderColor: '#46A667', width: 175, alignItems: 'center', paddingVertical: 10, borderRadius: 100, marginTop: 12}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#46A667'}}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FoodGuide