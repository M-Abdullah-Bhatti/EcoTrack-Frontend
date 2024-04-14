import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/Auth/LoginScreen";
import SignUp from "../screen/Auth/SignupScreen";
import ForgotPasswordScreen from "../screen/Auth/ForgotPasswordScreen";
import VerificationCode from "../screen/Auth/VerificationCodeScreen";
import NewPasswordScreen from "../screen/Auth/NewPasswordScreen";

// Auth stack:
const AuthStack = createNativeStackNavigator();

export function AuthStacks() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}
