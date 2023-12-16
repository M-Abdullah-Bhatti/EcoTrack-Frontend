import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import UseAuthExample from "./src/screen/Auth/AfterGoogle";
import Signup from "./src/screen/Auth/Signup";

function App() {
  return (
    <NavigationContainer>
      <ClerkProvider publishableKey="pk_test_Y2hvaWNlLXF1YWdnYS00OC5jbGVyay5hY2NvdW50cy5kZXYk">
        <SignedOut>
          <Routes />

          {/* <Signup /> */}
        </SignedOut>
        <SignedIn>
          <UseAuthExample />
        </SignedIn>
      </ClerkProvider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
