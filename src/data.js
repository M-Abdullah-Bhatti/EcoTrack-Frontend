import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export const countries = [
  "Australia",
  "Bangladesh",
  "Belgium",
  "Bhutan",
  "Canada",
  "China",
  "Germany",
  "India",
  "Nepal",
  "Pakistan",
  "Sri Lanka",
  "Taiwan",
  "Thailand",
  "Turkey",
  "UK",
  "USA",
];

export const transport = [
  {
    image: "",
    text: "Train",
    vehicle_type: "Train-Local",
    icon: <Ionicons name="train" size={24} color="white" />,
  },
  {
    image: "",
    text: "Car",
    vehicle_type: "Car-Size-Medium",
    icon: <Ionicons name="ios-car-sharp" size={24} color="white" />,
  },
  {
    image: "",
    text: "Bus",
    vehicle_type: "Bus-LocalAverage",
    icon: <Ionicons name="ios-bus-sharp" size={24} color="white" />,
  },
  {
    image: "",
    text: "Plane",
    vehicle_type: "train",
    icon: <Entypo name="aircraft-take-off" size={24} color="white" />,
  },
  {
    image: "",
    text: "Boat",
    vehicle_type: "train",
    icon: <Fontisto name="sait-boat" size={24} color="white" />,
  },
  {
    image: "",
    text: "MotorBike",
    vehicle_type: "Motorbike-Size-Medium",
    icon: <FontAwesome5 name="motorcycle" size={24} color="white" />,
  },
];

export const meal = [
  {
    text: "Red Meat",
    label: "beefBeefHerd",
    icon: <MaterialCommunityIcons name="food-turkey" size={24} color="white" />,
  },
  {
    text: "White Meat",
    label: "poultryMeat",
    icon: <MaterialIcons name="set-meal" size={24} color="white" />,
  },
  {
    text: "Fish",
    label: "fishFarmed",
    icon: <FontAwesome5 name="fish" size={24} color="white" />,
  },
  {
    text: "Lamb",
    label: "lambAndMutton",
    icon: <MaterialIcons name="goat" size={24} color="white" />,
  },
  {
    text: "Soy Milk",
    label: "soymilk",
    icon: <FontAwesome5 name="glass-whiskey" size={24} color="white" />,
  },
  {
    text: "Tofu",
    label: "tofu",
    icon: <FontAwesome5 name="cheese" size={24} color="white" />,
  },
];

export const food = [
  {
    text: "Coffee",
    label: "coffee",
    icon: <Fontisto name="coffeescript" size={24} color="white" />,
  },
  {
    text: "Dark Chocolate",
    label: "darkChocolate",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="white" />,
  },
  {
    text: "Wheat",
    label: "wheat",
    icon: <MaterialCommunityIcons name="grain" size={24} color="white" />,
  },
  {
    text: "Maize",
    label: "maize",
    icon: <MaterialCommunityIcons name="corn" size={24} color="white" />,
  },
  {
    text: "Barley",
    label: "barley",
    icon: <MaterialCommunityIcons name="barley" size={24} color="white" />,
  },
  {
    text: "Oatmeal",
    label: "oatmeal",
    icon: (
      <MaterialCommunityIcons name="food-variant" size={24} color="white" />
    ),
  },
  {
    text: "Rice",
    label: "rice",
    icon: <MaterialCommunityIcons name="rice" size={24} color="white" />,
  },
  {
    text: "Potatoes",
    label: "potatoes",
    icon: (
      <MaterialCommunityIcons name="french-fries" size={24} color="white" />
    ),
  },
  {
    text: "Cane Sugar",
    label: "caneSugar",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="white" />,
  },
  {
    text: "Beet Sugar",
    label: "beetSugar",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="white" />,
  },
  {
    text: "Other Pulses",
    label: "otherPulses",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="white" />,
  },
  {
    text: "Peas",
    label: "peas",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="white" />,
  },
  {
    text: "Nuts",
    label: "nuts",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="white" />,
  },
  {
    text: "Groundnuts",
    label: "groundnuts",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="white" />,
  },
  {
    text: "Soybean Oil",
    label: "soybeanOil",
    icon: <MaterialCommunityIcons name="soy-sauce" size={24} color="white" />,
  },
  {
    text: "Palm Oil",
    label: "palmOil",
    icon: <MaterialCommunityIcons name="palm-tree" size={24} color="white" />,
  },
  {
    text: "Sunflower Oil",
    label: "sunflowerOil",
    icon: <FontAwesome5 name="oil-can" size={24} color="white" />,
  },
  {
    text: "Rapeseed Oil",
    label: "rapeseedOil",
    icon: <FontAwesome5 name="oil-can" size={24} color="white" />,
  },
  {
    text: "Olive Oil",
    label: "oliveOil",
    icon: (
      <MaterialCommunityIcons
        name="fruit-grapes-outline"
        size={24}
        color="white"
      />
    ),
  },
  {
    text: "Tomatoes",
    label: "tomatoes",
    icon: <MaterialIcons name="food-bank" size={24} color="black" />,
  },
  {
    text: "Onions and Leeks",
    label: "onionsAndLeeks",
    icon: <MaterialIcons name="food-bank" size={24} color="black" />,
  },
  {
    text: "Root Vegetables",
    label: "rootVegetables",
    icon: <MaterialCommunityIcons name="carrot" size={24} color="white" />,
  },
  {
    text: "Other Vegetables",
    label: "otherVegetables",
    icon: (
      <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" />
    ),
  },
  {
    text: "Citrus Fruit",
    label: "citrusFruit",
    icon: (
      <MaterialCommunityIcons name="fruit-citrus" size={24} color="white" />
    ),
  },
  {
    text: "Bananas",
    label: "bananas",
    icon: (
      <MaterialCommunityIcons name="fruit-citrus-off" size={24} color="white" />
    ),
  },
  {
    text: "Apples",
    label: "apples",
    icon: (
      <MaterialCommunityIcons
        name="food-apple-outline"
        size={24}
        color="white"
      />
    ),
  },
  {
    text: "Berries and Grapes",
    label: "berriesAndGrapes",
    icon: (
      <MaterialCommunityIcons name="fruit-grapes" size={24} color="white" />
    ),
  },
  {
    text: "Other Fruit",
    label: "otherFruit",
    icon: (
      <MaterialCommunityIcons name="fruit-watermelon" size={24} color="white" />
    ),
  },
  {
    text: "Milk",
    label: "milk",
    icon: <Entypo name="box" size={24} color="white" />,
  },
  {
    text: "Cheese",
    label: "cheese",
    icon: <MaterialCommunityIcons name="cheese" size={24} color="white" />,
  },
  {
    text: "Eggs",
    label: "eggs",
    icon: <MaterialCommunityIcons name="egg" size={24} color="white" />,
  },
  {
    text: "Shrimps (Farmed)",
    label: "shrimpsFarmed",
    icon: <FontAwesome5 name="fish" size={24} color="white" />,
  },
];

export const Users = [
  {
    id: 0,
    username: "rizwanahmed",
    password: "",
    imgUrl:
      "https://deadline.com/wp-content/uploads/2023/03/GettyImages-1240422158.jpg?w=681&h=383&crop=1",
    followers: [1, 2, 3, 4],
    following: [],
  },
  {
    id: 1,
    username: "elonmusk",
    password: "",
    imgUrl:
      "https://deadline.com/wp-content/uploads/2023/03/GettyImages-1240422158.jpg?w=681&h=383&crop=1",
    followers: [0, 2, 3, 4],
    following: [0, 4],
  },
  {
    id: 2,
    username: "bezos_jeff",
    password: "",
    imgUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20150224165308-jeff-bezos-amazon.jpeg",
    followers: [],
    following: [],
  },
  {
    id: 3,
    username: "sarah_khan",
    password: "",
    imgUrl:
      "https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg",
    followers: [],
    following: [],
  },
  {
    id: 4,
    username: "gatesbill65",
    password: "",
    imgUrl:
      "https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg",
    followers: [],
    following: [],
  },
  {
    id: 5,
    username: "rizwanahmed",
    password: "",
    imgUrl:
      "https://deadline.com/wp-content/uploads/2023/03/GettyImages-1240422158.jpg?w=681&h=383&crop=1",
    followers: [1, 2, 3, 4],
    following: [],
  },
  {
    id: 6,
    username: "elonmusk",
    password: "",
    imgUrl:
      "https://deadline.com/wp-content/uploads/2023/03/GettyImages-1240422158.jpg?w=681&h=383&crop=1",
    followers: [0, 2, 3, 4],
    following: [0, 4],
  },
  {
    id: 7,
    username: "bezos_jeff",
    password: "",
    imgUrl:
      "https://assets.entrepreneur.com/content/3x2/2000/20150224165308-jeff-bezos-amazon.jpeg",
    followers: [],
    following: [],
  },
  {
    id: 8,
    username: "sarah_khan",
    password: "",
    imgUrl:
      "https://imgv3.fotor.com/images/slider-image/A-blurry-image-of-a-woman-wearing-red.jpg",
    followers: [],
    following: [],
  },
  {
    id: 9,
    username: "gatesbill65",
    password: "",
    imgUrl:
      "https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg",
    followers: [],
    following: [],
  },
];
