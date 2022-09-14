import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import AddCustomer from '../Screens/Admin/AddCustomer';
import CustomerList from '../Screens/Admin/CustomerList';
import CustomerDetail from '../Screens/Admin/CustomerDetail';
import UpdateCustomerList from '../Screens/Admin/UpdateCustomerList';
import UpdateCustomer from '../Screens/Admin/CustomerUpdate';
import DeleteCustomer from '../Screens/Admin/DeleteCustomer';
import OpenTicket from '../Screens/Users/OpenTicket';
import Tickets from '../Screens/Admin/Tickets';
import TicketDetail from '../Screens/TicketDetail';
import UserTickets from '../Screens/Users/Tickets';

const index = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="CustomerList" component={CustomerList} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen
          name="UpdateCustomerList"
          component={UpdateCustomerList}
        />
        <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
        <Stack.Screen name="DeleteCustomer" component={DeleteCustomer} />
        <Stack.Screen name="OpenTicket" component={OpenTicket} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="UserTickets" component={UserTickets} />

        <Stack.Screen
          name="TicketDetail"
          component={TicketDetail}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
