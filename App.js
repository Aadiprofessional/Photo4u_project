import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPassword';
import SignupScreen from './screens/Signup';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import SplashScreen from './components/SplashScreen';
import LeftNavBar from './components/LeftNavBar';
import Header from './components/Header';
import { colors } from './styles/colors';
import SearchResultsScreen from './screens/SearchResultsScreen';
import CustomSnackbar from './components/CustomSnackbar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer({ simulateNetworkError }) {
  return (
    <Drawer.Navigator drawerContent={props => <LeftNavBar {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          header: () => <Header />,
        }}
      >
        {props => <HomeScreen {...props} simulateNetworkError={simulateNetworkError} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // State to control loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to control login status
  const [snackbarVisible, setSnackbarVisible] = useState(false); // State to control Snackbar visibility
  const [networkError, setNetworkError] = useState(false); // State to control network error

  useEffect(() => {
    // Simulate any initialization or data loading logic
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated loading time (2 seconds)
  }, []);

  const handleRetry = () => {
    // Logic to retry the failed network request
    // For example, you might want to re-fetch data here
    console.log('Retry button pressed');
    setSnackbarVisible(false);
    setNetworkError(false);
  };

  const simulateNetworkError = () => {
    setNetworkError(true);
    setSnackbarVisible(true);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoading ? 'Splash' : (isLoggedIn ? 'HomeDrawer' : 'Login')} screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <>
              <Stack.Screen name="Login">
                {props => <LoginScreen {...props} handleLogin={() => setIsLoggedIn(true)} />}
              </Stack.Screen>
              <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
              <Stack.Screen name="HomeDrawer">
                {props => <HomeDrawer {...props} simulateNetworkError={simulateNetworkError} />}
              </Stack.Screen>
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {networkError && (
        <CustomSnackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          onRetry={handleRetry}
        />
      )}
    </SafeAreaProvider>
  );
}
