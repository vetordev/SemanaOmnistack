import React , { useState, useEffect }from 'react';
import socketio from 'socket.io-client';
import { Alert, View, AsyncStorage, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List( { navigation } ) {
  
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.42.102:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    });
  }, []);

  const handleLogOut = () => {
    navigation.navigate('Login');
    AsyncStorage.clear('user');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}/>
      <TouchableOpacity style={styles.logout} onPress={handleLogOut}>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll}>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    
  },
  scroll:{
    marginVertical: 10 
  },
  logout: {
    alignSelf: "flex-end",
    marginHorizontal: 17,
    marginTop: 7, 
  },
  logoutText: {
    color: '#FF1F1F',
    fontSize: 15,
    
  }

});