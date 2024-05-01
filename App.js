import React, { useState } from 'react';
import { StatusBar, TextInput, StyleSheet, Text, View, TouchableOpacity, Image, Keyboard } from 'react-native';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY = 'd1be39bbb5ff41a5b8e183643240105';
  const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}&lang=pt`);
      setWeatherData(response.data);
      console.log("Dados meteorológicos:", response.data);
      Keyboard.dismiss();
      setCity('');
      setErrorMessage('');
    } catch (error) {
      console.error("Erro ao buscar dados meteorológicos:", error);
      setErrorMessage('Cidade não catalogada. Por favor, insira outra cidade.');
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `http:${iconCode}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>ClimaSmart</Text>
      <Text style={styles.headerText}>Informe o nome da cidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui..."
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.location.name}</Text>
          <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
          <Text style={styles.weatherInfo}>{weatherData.current.condition.text}</Text>
          <Text style={styles.weatherInfo}>Sensação térmica: {weatherData.current.feelslike_c}°C</Text>
          {weatherData.current.condition.icon && (
            <Image
              style={styles.weatherIcon}
              source={{ uri: getWeatherIcon(weatherData.current.condition.icon) }}
            />
          )}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 35,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#87CEEB',
    color: 'white',
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: 300,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  weatherIcon: {
    width: 85,
    height: 80,
    marginTop: 0,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  }
});
