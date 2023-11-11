import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation";

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
