import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { List, Text } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
// https://icons.expo.fyi/
const Home = () => {
  const [isAdmin, setIsAdmin] = React.useState('');
  const user = auth.currentUser;
  const userId = user.uid;

  const handleUserType = async () => {
    const q = query(collection(db, 'users'), where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setIsAdmin(doc.data().isAdmin);
    });
  };
  React.useEffect(() => {
    handleUserType();
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center underline uppercase text-gray-600 text-3xl">
        Actions
      </Text>
      <ScrollView>
        {isAdmin ? (
          <>
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomerList')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <FontAwesome5 name="user-cog" size={30} color="gray" />
                <Text className="text-xl">Customers</Text>
              </TouchableOpacity>
            </View>

            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('UserList')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <FontAwesome5 name="user-cog" size={30} color="gray" />
                <Text className="text-xl">Users</Text>
              </TouchableOpacity>
            </View>
            {/* <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateCustomerList')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <FontAwesome5 name="user-edit" size={30} color="gray" />
                <Text className="text-xl">Update Customer</Text>
              </TouchableOpacity>
            </View> */}
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('AddCustomer')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <AntDesign name="adduser" size={30} color="gray" />
                <Text className="text-xl">Add Customer</Text>
              </TouchableOpacity>
            </View>

            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('MyNotes')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <FontAwesome5 name="pen" size={30} color="gray" />
                <Text className="text-xl">Notes</Text>
              </TouchableOpacity>
            </View>

            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('AddUser')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <AntDesign name="adduser" size={30} color="gray" />
                <Text className="text-xl">Add User</Text>
              </TouchableOpacity>
            </View>
            {/* <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('DeleteCustomer')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <AntDesign name="deleteuser" size={30} color="gray" />
                <Text className="text-xl">Delete Customer</Text>
              </TouchableOpacity>
            </View> */}
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('Tickets')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <Entypo name="ticket" size={30} color="gray" />
                <Text className="text-xl">Tickets</Text>
              </TouchableOpacity>
            </View>
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('OpenTicket')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <Entypo name="ticket" size={30} color="gray" />
                <Text className="text-xl">Create Ticket</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('UserTickets')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <Entypo name="ticket" size={30} color="gray" />
                <Text className="text-xl">Tickets</Text>
              </TouchableOpacity>
            </View>
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('OpenTicket')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <Entypo name="ticket" size={30} color="gray" />
                <Text className="text-xl">Create Ticket</Text>
              </TouchableOpacity>
            </View>
            <View className="w-100">
              <TouchableOpacity
                onPress={() => navigation.navigate('MyNotes')}
                className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
              >
                <FontAwesome5 name="pen" size={30} color="gray" />
                <Text className="text-xl">Notes</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View className="w-100">
          <TouchableOpacity
            onPress={() => {
              signOut(auth)
                .then(() => {
                  navigation.navigate('Login');
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            className="flex flex-row items-center border-b border-gray-200 space-x-2 py-4 px-2"
          >
            <MaterialCommunityIcons name="logout" size={30} color="gray" />
            <Text className="text-xl">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
