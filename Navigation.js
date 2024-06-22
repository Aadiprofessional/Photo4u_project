import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPassword';
import SignupScreen from './screens/Signup';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import SplashScreen from './components/SplashScreen';
import LeftNavBar from './components/LeftNavBar';
import Header from './components/Header';
import SearchResultsScreen from './screens/SearchResultsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <LeftNavBar {...props} />}>
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          header: () => <Header />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
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
            <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
