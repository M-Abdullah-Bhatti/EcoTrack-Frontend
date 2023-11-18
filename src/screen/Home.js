import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import {
  ProgressChart
} from "react-native-chart-kit";

const {width} = Dimensions.get('screen');

const Home = () => {
  const data = {
    labels: ["Energy", "Transport", "Food"],
    data: [0.6, 0.5, 0.4],
    colors: ['rgba(70, 166, 103, 1)', 'rgba(242, 166, 73, 1)', '#F2937E']
  };

  return (
    <View style={{marginTop: 50}}>
      <View style={{width: '100%', alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Monthly Emissions</Text>
        {/* <PieChart
          data={data}
          width={width}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          center={[1, 5]}
          absolute
        /> */}
        <ProgressChart
          data={data}
          width={width}
          height={170}
          strokeWidth={7}
          hasLegend={true}
          withCustomBarColorFromData={true}
          radius={35}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            decimalPlaces: 2,
            useShadowColorFromDataset: false
          }}
          style={{ marginVertical: 8, borderRadius: 10 }}
        />
      </View>
      <View style={{ backgroundColor: 'white', height: '100%', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 12 }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 12}}>November 2023</Text>
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>Purchase</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>215 kg / yr</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>Petrol</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>280 kg / yr</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>Electricity</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>527 kg / yr</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 16}}>Food</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>453 kg / yr</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 36
  },
  option: {},
  emission: {}
})

export default Home