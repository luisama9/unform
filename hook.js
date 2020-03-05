import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useAsyncStorage = (key, defaultValue) => {
  const [storageValue, updateStorageValue] = useState(defaultValue);

  useEffect(() => {

    updateStorageValue(JSON.parse(await AsyncStorage.getItem(key)))
  }, [])
  const getStorageValue = useCallback(async () => {
    try {
      updateStorageValue(
        JSON.parse(await AsyncStorage.getItem(key)) || defaultValue,
      );
    } catch (e) {}
    // finally {
    //   updateStorageValue(value);
    // }
  }, [defaultValue, key]);

  async function updateStorage(newValue) {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
        getStorageValue();
      }
    } catch (e) {}
  }

  // useEffect(() => {
  //   getStorageValue();
  // }, []);

  return [storageValue, updateStorage];
};
