import { StatusBar } from 'expo-status-bar'
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import RelaodIcon from './components/RelaodIcon'
import WeatherDetails from './components/WeatherDetails'
import { colors } from './utils/index'
import {WEATHER_API_KEY, BASE_WEATHER_URL} from 'react-native-dotenv'

const { PRIMARY_COLOR, } = colors


export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()


      const {latitude,longitude} = location.coords

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <RelaodIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    )
  } else if(errorMessage) {
    return (
      <View style={styles.container}>
        <RelaodIcon load={load}/>
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
