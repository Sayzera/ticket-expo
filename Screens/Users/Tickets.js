import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Back from '../../components/Back';
import Header from '../../components/Header';
import { auth, db } from '../../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserTickets = () => {
  const navigation = useNavigation();
  const [ticketList, setTicketList] = React.useState([]);

  const user = auth.currentUser;
  const userId = user.uid;

  const getTickets = async () => {
    const ticketRef = collection(db, 'tickets');
    const q = query(ticketRef, where('user_id', '==', userId));

    const querySnapshot = await getDocs(q);
    setTicketList([]);
    querySnapshot.forEach(async (ticketDoc) => {
      const userRef = collection(db, 'users');
      const q = query(
        userRef,
        where('user_id', '==', ticketDoc.data().user_id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setTicketList((prev) => [
          ...prev,
          {
            ...ticketDoc.data(),
            name: doc.data().full_name,
            phone: doc.data().phone,
            device: doc.data().device_brand,
            id: ticketDoc.id,
          },
        ]);
      });
    });
  };

  React.useEffect(() => {
    getTickets();
  }, []);

  return (
    <SafeAreaView>
      <Back />
      <Header title={'Tickets'}>
        <FlatList
          data={ticketList}
          renderItem={({ item }) => {
            let sec = item.ticket_date.seconds;
            let date = new Date(sec * 1000);
            let normalDate = date.toLocaleString('tr-TR', {
              timeZone: 'UTC',
            });

            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('TicketDetail', item)}
              >
                <View className="flex flex-row justify-between items-center border-b border-gray-400 pb-1 mb-3">
                  <View>
                    <Text>Name: {item.name}</Text>
                    <Text>Title: {item.title}</Text>
                    <Text>Phone: {item.phone}</Text>
                    <Text>Device: {item.device}</Text>
                    <Text>Ticket Case: {item.ticket_case ? 'Ok' : 'No'}</Text>
                    <Text>Date: {normalDate}</Text>
                  </View>
                  <View>
                    <FontAwesome5 name="glasses" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Header>
    </SafeAreaView>
  );
};

export default UserTickets;
