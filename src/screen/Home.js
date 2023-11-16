import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import {
  PieChart,
} from "react-native-chart-kit";

const {width} = Dimensions.get('screen');

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

const data = [
  {
    name: "Purchase",
    population: 215,
    color: "#CE5A67",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Petrol",
    population: 280,
    color: "#FF8080",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Electricity",
    population: 527,
    color: "#0766AD",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Food",
    population: 453,
    color: "#748E63",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
];

const Home = () => {
  return (
    <View style={{marginTop: 50}}>
      <View style={{width: '100%', alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Monthly Emissions</Text>
        <PieChart
          data={data}
          width={width}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          center={[1, 5]}
          absolute
        />
      </View>
      <View style={{ backgroundColor: 'white', height: '100%', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 12 }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 12}}>November 2023</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 36}}>
          <Text style={{fontSize: 16}}>Purchase</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>215 kg / yr</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 36}}>
          <Text style={{fontSize: 16}}>Petrol</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>280 kg / yr</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 36}}>
          <Text style={{fontSize: 16}}>Electricity</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>527 kg / yr</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 36}}>
          <Text style={{fontSize: 16}}>Food</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>453 kg / yr</Text>
        </View>
      </View>
    </View>
  )
}

export default Home