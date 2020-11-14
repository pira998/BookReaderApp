import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {BookDetail} from './screens'
import Tabs from './navigation/tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    border:'transparent'
  }
}

const Stack = createStackNavigator()
const App = () => {
  return(
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen name="Home" component={Tabs}></Stack.Screen>
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }}></Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
  )

   
}
export default App