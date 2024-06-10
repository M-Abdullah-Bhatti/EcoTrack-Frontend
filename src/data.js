import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

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

export const content = [
  {
    content:
      "https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee",
    type: "image",
    finish: 0,
  },
  {
    content:
      "https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/puppy.jpg?alt=media&token=1f649d14-eb1d-43bc-9c81-62c199c3b4ea",
    type: "image",
    finish: 0,
  },
  {
    content:
      "https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee",
    type: "image",
    finish: 0,
  },
  {
    content:
      "https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/puppy.jpg?alt=media&token=1f649d14-eb1d-43bc-9c81-62c199c3b4ea",
    type: "image",
    finish: 0,
  },
  {
    content:
      "https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee",
    type: "image",
    finish: 0,
  },
];

export const allEmissionItems = [
  {
    image: "",
    text: "Train",
    vehicle_type: "Train-Local",
    icon: <Ionicons name="train" size={24} color="black" />,
  },
  {
    image: "",
    text: "Car",
    vehicle_type: "Car-Size-Medium",
    icon: <Ionicons name="ios-car-sharp" size={24} color="black" />,
  },
  {
    image: "",
    text: "Bus",
    vehicle_type: "Bus-LocalAverage",
    icon: <Ionicons name="ios-bus-sharp" size={24} color="black" />,
  },
  {
    image: "",
    text: "Plane",
    vehicle_type: "train",
    icon: <Entypo name="aircraft-take-off" size={24} color="black" />,
  },
  {
    image: "",
    text: "Boat",
    vehicle_type: "train",
    icon: <Fontisto name="sait-boat" size={24} color="black" />,
  },
  {
    image: "",
    text: "MotorBike",
    vehicle_type: "Motorbike-Size-Medium",
    icon: <FontAwesome5 name="motorcycle" size={24} color="black" />,
  },
  {
    text: "Red Meat",
    label: "beefBeefHerd",
    icon: <MaterialCommunityIcons name="food-turkey" size={24} color="black" />,
  },
  {
    text: "Black Meat",
    label: "poultryMeat",
    icon: <MaterialIcons name="set-meal" size={24} color="black" />,
  },
  {
    text: "Fish",
    label: "fishFarmed",
    icon: <FontAwesome5 name="fish" size={24} color="black" />,
  },
  {
    text: "Lamb",
    label: "lambAndMutton",
    icon: <MaterialIcons name="goat" size={24} color="black" />,
  },
  {
    text: "Soy Milk",
    label: "soymilk",
    icon: <FontAwesome5 name="glass-whiskey" size={24} color="black" />,
  },
  {
    text: "Tofu",
    label: "tofu",
    icon: <FontAwesome5 name="cheese" size={24} color="black" />,
  },
  {
    text: "Coffee",
    label: "coffee",
    icon: <Fontisto name="coffeescript" size={24} color="black" />,
  },
  {
    text: "Dark Chocolate",
    label: "darkChocolate",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="black" />,
  },
  {
    text: "Wheat",
    label: "wheat",
    icon: <MaterialCommunityIcons name="grain" size={24} color="black" />,
  },
  {
    text: "Maize",
    label: "maize",
    icon: <MaterialCommunityIcons name="corn" size={24} color="black" />,
  },
  {
    text: "Barley",
    label: "barley",
    icon: <MaterialCommunityIcons name="barley" size={24} color="black" />,
  },
  {
    text: "Oatmeal",
    label: "oatmeal",
    icon: (
      <MaterialCommunityIcons name="food-variant" size={24} color="black" />
    ),
  },
  {
    text: "Rice",
    label: "rice",
    icon: <MaterialCommunityIcons name="rice" size={24} color="black" />,
  },
  {
    text: "Potatoes",
    label: "potatoes",
    icon: (
      <MaterialCommunityIcons name="french-fries" size={24} color="black" />
    ),
  },
  {
    text: "Cane Sugar",
    label: "caneSugar",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="black" />,
  },
  {
    text: "Beet Sugar",
    label: "beetSugar",
    icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="black" />,
  },
  {
    text: "Other Pulses",
    label: "otherPulses",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="black" />,
  },
  {
    text: "Peas",
    label: "peas",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="black" />,
  },
  {
    text: "Nuts",
    label: "nuts",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="black" />,
  },
  {
    text: "Groundnuts",
    label: "groundnuts",
    icon: <MaterialCommunityIcons name="peanut" size={24} color="black" />,
  },
  {
    text: "Soybean Oil",
    label: "soybeanOil",
    icon: <MaterialCommunityIcons name="soy-sauce" size={24} color="black" />,
  },
  {
    text: "Palm Oil",
    label: "palmOil",
    icon: <MaterialCommunityIcons name="palm-tree" size={24} color="black" />,
  },
  {
    text: "Sunflower Oil",
    label: "sunflowerOil",
    icon: <FontAwesome5 name="oil-can" size={24} color="black" />,
  },
  {
    text: "Rapeseed Oil",
    label: "rapeseedOil",
    icon: <FontAwesome5 name="oil-can" size={24} color="black" />,
  },
  {
    text: "Olive Oil",
    label: "oliveOil",
    icon: (
      <MaterialCommunityIcons
        name="fruit-grapes-outline"
        size={24}
        color="black"
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
    icon: <MaterialCommunityIcons name="carrot" size={24} color="black" />,
  },
  {
    text: "Other Vegetables",
    label: "otherVegetables",
    icon: (
      <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />
    ),
  },
  {
    text: "Citrus Fruit",
    label: "citrusFruit",
    icon: (
      <MaterialCommunityIcons name="fruit-citrus" size={24} color="black" />
    ),
  },
  {
    text: "Bananas",
    label: "bananas",
    icon: (
      <MaterialCommunityIcons name="fruit-citrus-off" size={24} color="black" />
    ),
  },
  {
    text: "Apples",
    label: "apples",
    icon: (
      <MaterialCommunityIcons
        name="food-apple-outline"
        size={24}
        color="black"
      />
    ),
  },
  {
    text: "Berries and Grapes",
    label: "berriesAndGrapes",
    icon: (
      <MaterialCommunityIcons name="fruit-grapes" size={24} color="black" />
    ),
  },
  {
    text: "Other Fruit",
    label: "otherFruit",
    icon: (
      <MaterialCommunityIcons name="fruit-watermelon" size={24} color="black" />
    ),
  },
  {
    text: "Milk",
    label: "milk",
    icon: <Entypo name="box" size={24} color="black" />,
  },
  {
    text: "Cheese",
    label: "cheese",
    icon: <MaterialCommunityIcons name="cheese" size={24} color="black" />,
  },
  {
    text: "Eggs",
    label: "eggs",
    icon: <MaterialCommunityIcons name="egg" size={24} color="black" />,
  },
  {
    text: "Shrimps (Farmed)",
    label: "shrimpsFarmed",
    icon: <FontAwesome5 name="fish" size={24} color="black" />,
  },
];

export const redemptionProducts = [
  {
    id: 1,
    name: "Reusable Bamboo Utensil Set",
    description:
      "A set of reusable utensils made from sustainable bamboo, including a fork, knife, spoon, and carrying case.",
    points: 51, // Points required for redemption
    imageUrl:
      "https://www.bambooswitch.com/cdn/shop/products/6pc-bamboo-kitchen-utensil-holder-set-249467.jpg?v=1688603513",
    category: "Product",
    stock: "In stock",
    quantity: 38,
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag",
    description:
      "A durable tote bag made from organic cotton, perfect for shopping or carrying essentials.",
    points: 350,
    imageUrl:
      "https://www.oneworld-zerowaste.com/cdn/shop/products/IMG_4830.jpg?v=1544563046",
    category: "Product",
    stock: "Out of stock",
    quantity: 30,
  },
  {
    id: 3,
    name: "Discount Voucher - Eco-Friendly Clothing Store",
    description:
      "Receive a 20% discount voucher for your next purchase at an eco-friendly clothing store.",
    points: 200,
    category: "Voucher",
    stock: "In stock",
    quantity: 13,
    imageUrl:
      "https://www.printlab.my/uploads/6/7/2/0/6720900/gift-voucher-discount-voucher-2-01_orig.jpg",
  },
  {
    id: 4,
    quantity: 50,
    name: "Digital E-Book - Sustainable Living Guide",
    description:
      "Download a comprehensive guide to sustainable living, packed with tips and advice for reducing your environmental footprint.",
    points: 30,
    category: "Download",
    stock: "Out of stock",
    imageUrl:
      "https://i0.wp.com/blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEga_xC0wojUoZfoWA4PNWidJhxm0Eh6MyYZRoqor0oe0vuUjOms3aKDGOhh1SEVrQ4oH7j2mMAuDeyVrn56ngRwLk7bqhawQkY_MTexw6IabhN5ZjvdiZSZ_P9PxbFC5I4qHl0hnCphBKRf-NDiNjqwcSpaDi0rl2kjlAHjVAFDDrA069XwKslXOZIEX-0/s3000/pexels-perfecto-capucine-1329571.jpg?ssl=1",
  },
  {
    id: 5,
    quantity: 83,
    name: "Donation to Reforestation Project",
    description:
      "Support a reforestation project by redeeming points to plant trees and restore ecosystems.",
    points: 16,
    category: "Cause",
    stock: "In stock",
    imageUrl:
      "https://images.mid-day.com/images/images/2022/jul/TreePlantation_d.jpg",
  },
];

export const rewardData = [
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "January",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
  {
    month: "February",
    winnings: [
      {
        rewardType: "Comment",
        winningPrice: 8.1,
      },
      {
        rewardType: "Like",
        winningPrice: 10,
      },
      {
        rewardType: "Comment",
        winningPrice: 1,
      },
    ],
  },
];


// Act Data
export const actData =
  [
    {
      "category": "Food",
      "content": [
        {
          "tip": "Choose Local and Seasonal Produce",
          "description": "Eating local and seasonal fruits and vegetables reduces the need for transportation and storage, which cuts down on carbon emissions. In Pakistan, this means enjoying mangoes in the summer and citrus fruits in the winter. By choosing local produce, you not only support local farmers but also get fresher and more nutritious food. Seasonal produce is typically cheaper and more abundant, which makes it a cost-effective and environmentally friendly choice.\n\nMoreover, the transportation of food over long distances involves significant fuel consumption and carbon emissions. When you buy locally, you help reduce the overall demand for long-haul transportation, thereby cutting down on greenhouse gases. Additionally, local farmers often use traditional farming methods that are less reliant on chemical fertilizers and pesticides, further reducing environmental impact."
        },
        {
          "tip": "Reduce Food Waste",
          "description": "Plan your meals, store food properly, and use leftovers creatively. In Pakistan, you can compost kitchen waste or donate excess food to local charities to minimize waste. Food waste contributes significantly to carbon emissions when it decomposes in landfills, releasing methane, a potent greenhouse gas. By planning your meals and buying only what you need, you can prevent food from going to waste and save money in the process.\n\nProper food storage can extend the life of your groceries and reduce waste. For example, storing fruits and vegetables in the refrigerator or a cool, dark place can keep them fresh longer. Using leftovers creatively, such as turning yesterday's dinner into today's lunch, also helps minimize waste. Additionally, composting organic waste at home can turn food scraps into valuable fertilizer for your garden, enriching the soil and reducing the need for chemical fertilizers."
        },
        {
          "tip": "Opt for Organic",
          "description": "Organic farming practices often use fewer pesticides and fertilizers. In Pakistan, supporting organic farms helps reduce environmental impact and promotes healthier food options. Organic farming relies on natural processes and sustainable practices that enhance soil fertility and biodiversity. By avoiding synthetic chemicals, organic farms reduce pollution and the risk of contaminating water sources.\n\nIn Pakistan, the organic farming sector is growing, with more farmers adopting these practices. Supporting organic products not only encourages more farmers to go organic but also provides you with healthier food options free from harmful chemicals. Organic farming also promotes animal welfare and encourages the use of renewable resources, contributing to a more sustainable agricultural system."
        },
        {
          "tip": "Eat Less Meat",
          "description": "Meat production is a major contributor to greenhouse gas emissions. Incorporating more plant-based meals, such as lentil (daal) dishes and vegetable curries, can make a significant impact. Livestock farming requires large amounts of water, feed, and land, and produces significant methane emissions. By reducing meat consumption, you can help decrease the demand for these resources and lower your carbon footprint.\n\nIn Pakistan, traditional vegetarian dishes are delicious and nutritious. Lentil curries, chickpea stews, and a variety of vegetable dishes are staples in Pakistani cuisine that offer plenty of protein and nutrients without the environmental impact of meat. Even reducing meat intake by a few days a week can make a difference, contributing to better health and a more sustainable lifestyle."
        },
        {
          "tip": "Support Sustainable Brands",
          "description": "Purchase products from brands that prioritize sustainability. In Pakistan, look for local brands that focus on eco-friendly practices and fair trade. Supporting these brands helps promote ethical business practices and encourages more companies to adopt sustainable methods. Sustainable brands often use environmentally friendly materials, reduce waste, and ensure fair labor practices, contributing to a more equitable and green economy.\n\nBy choosing products from sustainable brands, you can reduce your environmental impact and support businesses that are making a positive difference. Look for certifications and labels that indicate a brand's commitment to sustainability, such as fair trade, organic, or eco-friendly. In Pakistan, several local businesses are leading the way in sustainability, offering everything from organic food products to eco-friendly clothing and household items."
        }
      ]
    },
    {
      "category": "Transportation",
      "content": [
        {
          "tip": "Use Public Transportation",
          "description": "Buses, trains, and rickshaws are more energy-efficient than individual cars. Utilizing public transport options like the Lahore Metrobus or Karachi's Green Line can significantly lower your emissions. Public transportation systems are designed to carry many passengers at once, which means fewer vehicles on the road and lower per-capita emissions.\n\nIn Pakistan, the public transportation network is expanding, making it easier for people to commute efficiently and sustainably. Using public transport also reduces traffic congestion and the associated pollution. Additionally, public transportation is often more affordable than owning and maintaining a personal vehicle, providing both economic and environmental benefits."
        },
        {
          "tip": "Carpool",
          "description": "Share rides with friends or colleagues to reduce the number of vehicles on the road. In Pakistan, carpooling apps and services are becoming more popular and can help decrease overall emissions. Carpooling not only saves fuel but also reduces wear and tear on your vehicle and can make commuting more enjoyable by sharing the journey with others.\n\nOrganizing carpools within your community or workplace can be an effective way to reduce the number of cars on the road. It also provides an opportunity to connect with others and foster a sense of community. Additionally, by splitting the cost of fuel and tolls, carpooling can save money for all participants while contributing to a cleaner environment."
        },
        {
          "tip": "Bike or Walk",
          "description": "For short distances, consider biking or walking instead of driving. Cities like Islamabad have dedicated bike lanes and pedestrian pathways that encourage these eco-friendly modes of transport. Biking and walking not only reduce carbon emissions but also promote physical health and well-being.\n\nIncorporating biking and walking into your daily routine can help reduce reliance on motor vehicles and lower transportation costs. Many Pakistani cities are developing better infrastructure to support cyclists and pedestrians, making it safer and more convenient to choose these modes of transport. Additionally, biking and walking can help reduce traffic congestion and improve air quality in urban areas."
        },
        {
          "tip": "Drive Efficiently",
          "description": "Maintain your vehicle, drive at steady speeds, and avoid idling to improve fuel efficiency. Regular maintenance checks can also help reduce emissions and save fuel costs. Ensuring your vehicle is in good condition, such as keeping tires properly inflated and performing regular oil changes, can enhance fuel efficiency and prolong the life of your car.\n\nIn Pakistan, driving efficiently can make a significant difference in fuel consumption and emissions. Avoiding aggressive driving behaviors like rapid acceleration and hard braking can improve fuel efficiency. Additionally, reducing the use of air conditioning and turning off the engine when idling for extended periods can further reduce fuel use and emissions. Efficient driving habits contribute to a smoother, safer driving experience and a cleaner environment."
        },
        {
          "tip": "Switch to Electric Vehicles",
          "description": "Electric cars have lower emissions compared to traditional vehicles. In Pakistan, the government is promoting the use of electric vehicles through various incentives and infrastructure developments. Electric vehicles (EVs) produce zero tailpipe emissions and are more energy-efficient than gasoline-powered cars.\n\nThe adoption of EVs in Pakistan is growing, with more models becoming available and charging infrastructure expanding. Government policies, such as tax incentives and subsidies, are encouraging the shift towards electric mobility. By choosing an electric vehicle, you can significantly reduce your carbon footprint and contribute to a cleaner, more sustainable transportation system."
        }
      ]
    },
    {
      "category": "Electricity",
      "content": [
        {
          "tip": "Switch to LED Bulbs",
          "description": "LED bulbs use less energy and last longer than traditional bulbs. In Pakistan, switching to LEDs can reduce electricity bills and the country's overall energy consumption. LEDs are more efficient, converting more energy into light rather than heat, and have a longer lifespan, reducing the frequency of replacements.\n\nBy replacing incandescent or CFL bulbs with LEDs, households and businesses can achieve significant energy savings. LED bulbs are available in various sizes and colors, making them suitable for different lighting needs. Moreover, reduced energy consumption from lighting can lower the demand on the national grid, contributing to energy stability and reducing the need for fossil fuel-based power generation."
        },
        {
          "tip": "Unplug Devices",
          "description": "Many devices consume power even when turned off. Unplug chargers, appliances, and electronics when not in use to save energy and reduce electricity bills. This phenomenon, known as 'phantom load' or 'vampire power,' can add up over time, increasing both energy consumption and costs.\n\nIn Pakistan, where electricity costs can be high, unplugging devices when not in use can lead to noticeable savings. Simple actions, such as unplugging phone chargers, kitchen appliances, and entertainment systems, can collectively make a significant impact. Using power strips to easily disconnect multiple devices at once is another effective strategy to eliminate phantom loads."
        },
        {
          "tip": "Use Energy-Efficient Appliances",
          "description": "Look for appliances with the Energy Star label. In Pakistan, energy-efficient appliances are available in major markets and can significantly lower household energy consumption. Energy Star-rated appliances use advanced technologies to operate more efficiently, consuming less electricity while providing the same level of performance.\n\nUpgrading to energy-efficient refrigerators, air conditioners, washing machines, and other household appliances can reduce electricity use and lower utility bills. Although these appliances may have a higher upfront cost, the long-term savings on energy bills can offset the initial investment. Additionally, using energy-efficient appliances helps reduce the overall demand for electricity, contributing to a more sustainable energy system."
        },
        {
          "tip": "Install a Programmable Thermostat",
          "description": "Automatically adjust your heating and cooling to save energy. In Pakistan, programmable thermostats can help manage air conditioning usage during hot summers and reduce energy bills. These devices allow you to set schedules for your HVAC system, ensuring it runs only when needed and at optimal temperatures.\n\nUsing a programmable thermostat can lead to significant energy savings by preventing unnecessary heating or cooling. For example, you can set the thermostat to raise the temperature when you're away from home and lower it just before you return. This ensures comfort while minimizing energy consumption. Smart thermostats with remote access features can provide even greater control and convenience."
        },
        {
          "tip": "Use Solar Energy",
          "description": "Solar panels can provide a renewable source of energy. In Pakistan, many households and businesses are adopting solar energy solutions to reduce dependency on the national grid and lower carbon emissions. Solar power harnesses the abundant sunlight available in Pakistan, offering a clean and sustainable energy source.\n\nInstalling solar panels can significantly reduce electricity bills and provide energy independence. Government incentives and subsidies for solar installations make it an attractive option for many. Solar energy systems can be used for a variety of applications, from powering homes and businesses to providing hot water and lighting. By investing in solar energy, you contribute to a greener future and help combat climate change."
        }
      ]
    },
    {
      "category": "Meal",
      "content": [
        {
          "tip": "Incorporate More Vegetables",
          "description": "Vegetables have a lower carbon footprint than meat. In Pakistan, traditional dishes like mixed vegetable curry (sabzi) and spinach with potatoes (aaloo palak) are delicious and eco-friendly. By increasing the proportion of vegetables in your diet, you can reduce your environmental impact while enjoying a variety of nutritious and flavorful meals.\n\nVegetables require less land, water, and energy to produce compared to livestock. Incorporating more plant-based meals into your diet can also have health benefits, such as reducing the risk of chronic diseases. Pakistani cuisine offers a rich array of vegetable dishes that can be easily prepared and enjoyed by the whole family, making it simple to adopt a more sustainable eating habit."
        },
        {
          "tip": "Choose Sustainable Meat Options",
          "description": "If you consume meat, opt for sustainably raised options. In Pakistan, local farms that follow ethical and sustainable practices are becoming more accessible. Sustainable meat production focuses on animal welfare, environmental stewardship, and responsible resource use, which helps reduce the overall carbon footprint of meat consumption.\n\nLook for meat products from sources that prioritize pasture-raised, grass-fed, or organic practices. These methods typically result in lower greenhouse gas emissions and better-quality meat. Supporting local farmers who employ sustainable practices not only reduces environmental impact but also ensures that you are consuming healthier and ethically produced meat."
        },
        {
          "tip": "Practice Meatless Days",
          "description": "Dedicate one or more days a week to meatless meals. Pakistani cuisine offers a variety of vegetarian options such as lentils (daal), chickpeas (chana), and vegetable biryani. Meatless days can help reduce your carbon footprint and encourage you to explore new and delicious plant-based recipes.\n\nIncorporating meatless meals into your routine can also provide nutritional benefits, as plant-based diets are often rich in vitamins, minerals, and fiber. Experimenting with vegetarian dishes can introduce you to a diverse range of flavors and textures, making your meals more interesting and balanced. By reducing meat consumption, you contribute to a more sustainable food system and promote better health."
        },
        {
          "tip": "Support Local Farmers",
          "description": "Buying from local farmers reduces transportation emissions and supports the local economy. Many cities in Pakistan have farmer's markets where you can purchase fresh, locally grown produce. By supporting local agriculture, you help reduce the carbon footprint associated with food transportation and storage.\n\nLocal produce is often fresher and more nutritious than imported alternatives. It also encourages sustainable farming practices and helps preserve local food varieties. By choosing to buy from local farmers, you contribute to the resilience of your community's food system and foster a closer connection to the food you eat."
        },
        {
          "tip": "Grow Your Own Food",
          "description": "Start a small kitchen garden to grow herbs, vegetables, and fruits. In Pakistan, rooftop and backyard gardening is gaining popularity and can provide fresh produce with minimal carbon footprint. Growing your own food ensures that you have access to fresh and organic produce year-round.\n\nGardening can be a rewarding and educational experience, teaching you about sustainable food production and the importance of biodiversity. It also allows you to control the growing conditions, ensuring that no harmful chemicals are used. Additionally, home gardening can reduce the need for packaging and transportation, further lowering your environmental impact. Whether you have a large backyard or a small balcony, there are many ways to start growing your own food and contribute to a greener lifestyle."
        }
      ]
    }
];