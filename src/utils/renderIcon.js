import { MaterialCommunityIcons } from "@expo/vector-icons";
import { food, meal, transport } from "../data";

export const renderEmissionIcon = (category, subCategory) => {
  switch (category) {
    case "Transportation":
      const transportIcon = transport.find((item) => item.text === subCategory);
      console.log("heh", transportIcon.icon);
      return transportIcon ? transportIcon.icon : null;
    case "Food":
      const foodIcon = food.find((item) => item.text === subCategory);
      console.log("ff", foodIcon.icon);
      return foodIcon ? foodIcon.icon : null;
    case "Meal":
      const mealIcon = meal.find((item) => item.text === subCategory);
      console.log("mm", mealIcon.icon);
      return mealIcon ? mealIcon.icon : null;
    case "Electricity":
      return (
        <MaterialCommunityIcons name="power-plug" size={24} color="black" />
      );
    default:
      return null;
  }
};
