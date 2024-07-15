import React, {useEffect} from 'react'
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Test from './src/screens/test/Test';
import HomeScreen from './src/screens/test/Home/HomeScreen';
import SavingsScreen from './src/screens/test/Savings/SavingsScreen';
import LoanScreen from './src/screens/test/Loan/LoanScreen';
import SplashScreen from  "react-native-splash-screen";
import SignIn from './src/screens/main/login/SignIn';
import Signup from './src/screens/auth/Signup';
import { Profile } from './src/screens/profile/Profile';
import Reservations from './src/screens/reservation/Reservations';
import { Reservation } from './src/screens/reservation/Reservation';
import Login from './src/screens/auth/Login';
import { Home } from './src/screens/home/Home';
import ReservationMain from './src/screens/reservation/ReservationMain';
import { Navigation } from './src/screens/navigation/Navigation';

const Stack = createNativeStackNavigator();

const App = () => {
    const Tab = createBottomTabNavigator();

    useEffect(() => {
      setTimeout(() => SplashScreen.hide(), 2000)
    }, [])
  
    return(
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
              {/*<Stack.Screen name="signin" component={SignIn} />*/}
              <Stack.Screen name="navigation" component={Navigation} />
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="reservations" component={ReservationMain} />
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="profile" component={Profile} />
              <Stack.Screen name="reservation" component={Reservation} />
          </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;