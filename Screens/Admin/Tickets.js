import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Back from '../../components/Back';
import Header from '../../components/Header';
import { auth, db } from '../../utils/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tickets = () => {
  const navigation = useNavigation();
  const [ticketList, setTicketList] = React.useState([]);

  /**
   * ticketları listelemek için kullanılan fonksiyon
   */
  const getTickets = async () => {
    const ticketRef = collection(db, 'tickets');
    const q = query(ticketRef);

    const querySnapshot = await getDocs(q);
    // fazladan veri oluşmaması için arrayi sıfırlıyoruz
    setTicketList([]);
    querySnapshot.forEach(async (ticketDoc) => {
      // kullanıcıyı bulmak için kullanılan fonksiyon
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

  const ticketConfirmation = async (ticketId, active) => {
    const ticketRef = doc(db, 'tickets', ticketId);
    try {
      await updateDoc(ticketRef, {
        ticket_case: !active,
      });
      getTickets();
      console.log('Document successfully updated!');
    } catch (e) {}
  };

  React.useEffect(() => {
    /**
     * bu sayfa açıldığında ticketları listelemek için kullanılan fonksiyon
     */
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
                  <View className="flex flex-row items-center space-x-6">
                    <FontAwesome5 name="glasses" size={24} color="black" />
                    <TouchableOpacity
                      onPress={() =>
                        ticketConfirmation(item.id, item.ticket_case)
                      }
                    >
                      {item.ticket_case ? (
                        <AntDesign name="close" size={24} color="black" />
                      ) : (
                        <FontAwesome5 name="check" size={24} color="black" />
                      )}
                    </TouchableOpacity>
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

export default Tickets;
