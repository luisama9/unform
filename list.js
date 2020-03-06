import React from 'react';
import {Text, View} from 'react-native';

export default function List({users}) {
  return (
    <View>
      <Text>Listagem</Text>
      {users && users.map(user => <Text key={user.email}>{user.email}</Text>)}
    </View>
  );
}
