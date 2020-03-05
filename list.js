import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

export default function List({getStorage}) {
  const [users, setUsers] = useState(getStorage || []);
  console.log('USERS', users);
  useEffect(() => {
    (async () => {
      getStorage !== null && setUsers(await getStorage);
    })();
  }, [getStorage]);

  return (
    <View>
      <Text>Listagem</Text>
      {users && users.map(user => <Text key={user.email}>{user.email}</Text>)}
    </View>
  );
}
