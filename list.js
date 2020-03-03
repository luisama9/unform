import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function List({getStorage}) {
  const [users, setUsers] = useState(getStorage || []);

  useEffect(() => {
    (async () => {
      // const storage = await AsyncStorage.getItem('users');
      // users && setUsers(JSON.parse(storage));
      console.log(getStorage);
    })();

    console.log('LIST', users);
  }, [getStorage, users]);

  return (
    <View>
      <Text>Listagem</Text>
      {users && users.map(user => <Text key={user.email}>{user.email}</Text>)}
    </View>
  );
}
