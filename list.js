import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useTrackedState} from './store';

function List({users}) {
  const state = useTrackedState();

  useEffect(() => {
    (async () => {
      console.log('STATE', await state);
    })();
  });
  // console.log(users);
  return (
    <View>
      <Text>Listagem</Text>
      {/* {users && users.map(user => <Text key={user.email}>{user.email}</Text>)} */}
    </View>
  );
}

export default React.memo(List);
