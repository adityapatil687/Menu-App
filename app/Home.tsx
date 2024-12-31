import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';


const Home = () => {
  const [text, setText] = React.useState('');
  return (
    <SafeAreaView className=''>
      <Text className=''>Aditya Patil</Text>
      <Text className=''>Manan Foods</Text>
    </SafeAreaView>
  )
}

export default Home