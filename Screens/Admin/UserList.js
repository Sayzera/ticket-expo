import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Back from '../../components/Back';
import Header from '../../components/Header';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserList = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState(null);
  /**
   * Kullanıcıyı getir yetkilerine bakmak için
   */
  const getUser = async () => {
    const userId = auth.currentUser.uid;

    const userRef = collection(db, 'users');
    const q = query(userRef, where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCurrentUser(doc.data());
    });
  };

  const delteCustomerWithId = async (itemId, isActive) => {
    const docRef = doc(db, 'users', itemId);

    try {
      await updateDoc(docRef, {
        isActive: !isActive,
      });
      getCustomerList();
      console.log('Document successfully updated!');
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomerList = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    setCustomers([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      if (doc.data().userType && doc.data().userType === 'user') {
        setCustomers((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      }
    });
  };

  React.useEffect(() => {
    getUser();
    navigation.addListener('focus', () => {
      console.log('work');
      getCustomerList();
    });
    let mounted = true;

    if (mounted) {
      getCustomerList();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView>
      <Back />
      <Header title={'UserList List' + ' (' + customers.length + ')'}>
        <View>
          <View>
            <FlatList
              data={customers}
              renderItem={({ item }) => (
                <View className="flex flex-row justify-between items-center mb-4 border-b pb-2 border-gray-300">
                  <View className="flex flex-row items-center space-x-2">
                    <Feather name="user" size={30} color="black" />
                    <Text className="text-lg">{item.full_name}</Text>
                  </View>
                  <View className="flex flex-row space-x-4 items-center">
                    {currentUser && currentUser.delete && (
                      <TouchableOpacity
                        onPress={() =>
                          delteCustomerWithId(item.id, item.isActive)
                        }
                      >
                        {item.isActive ? (
                          <AntDesign name="delete" size={24} color="red" />
                        ) : (
                          <Entypo name="block" size={24} color="red" />
                        )}
                      </TouchableOpacity>
                    )}

                    {currentUser && currentUser.write && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('UpdateUser', { item })
                        }
                      >
                        <FontAwesome name="pencil" size={30} color="primary" />
                      </TouchableOpacity>
                    )}

                    {currentUser && currentUser.read && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('CustomerDetail', { item })
                        }
                      >
                        <FontAwesome
                          name="long-arrow-right"
                          size={30}
                          color="black"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Header>
    </SafeAreaView>
  );
};

export default UserList;
