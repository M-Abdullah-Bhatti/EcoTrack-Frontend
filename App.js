import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import UseAuthExample from "./src/screen/Auth/AfterGoogle";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const [fontsLoaded] = useFonts({
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    Shopia: require("./assets/fonts/Shopia.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    console.log("Fonts Loading...");
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      console.log("Fonts Loaded");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
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
      </PersistGate>
    </Provider>
  );
}

// const styles = StyleSheet.create({});

export default App;
