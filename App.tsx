import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet, Text, FlatList } from "react-native";


import { database } from './src/firebaseConfig';
import { set, ref } from "firebase/database";
import { 
  useFonts,
  NationalPark_400Regular,
  NationalPark_500Medium,
  NationalPark_700Bold 
} from '@expo-google-fonts/national-park';

import { Loading } from './src/components/Loading';
import themes from './src/global/themes';
import { Button } from './src/components/Button';
import { Cards } from './src/components/Cards';


export default function App() {
  const [dado, setDado] = useState("");
  const [carregamento, setCarregamento] = useState(["1","2","3","4","5","6","7","8","9"])
  const [loadedFonts] = useFonts({
    NationalPark_400Regular,
    NationalPark_500Medium,
    NationalPark_700Bold
  })

  const data = new Date();

  async function registerNow(){
      await set(ref(database, `apontamento/${data.toLocaleDateString("pt-BR")}`), {
          rhumm: dado,
      })
  }
  if(!loadedFonts){
    return(
      <View style={styles.container}>
        <Loading />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.flex}>
          <AntDesign name="codepen" size={48} color={themes.colors.shape} />
          <View>
            <Text style={styles.titleHeader}>Meu Registro</Text>
            <Text style={styles.textHeader}>Evita papel e lapiseira</Text>
          </View>
        </View>
        <View style={styles.areaBtn}>
          <Button 
            title='Adicionar novo' 
            onPress={()=> {}}
            color={themes.colors.shape}
            size={26}
            opacity={0.6}
          />
        </View>
      </View>
      <View style={styles.areaCard}>
        <FlatList
          data={carregamento}
          renderItem={({item}) => <Cards nome='Número de telefone' dado='926224888'/>}
          ListEmptyComponent={
            <Text style={{ fontSize: 16, color: themes.colors.text, textAlign: 'center' }}>
                Nenhum carregamento feito ainda.
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.fundo,
  },
  header: {
    backgroundColor: themes.colors.header,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: '14%'
  },
  flex: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10
  },
  titleHeader: {
    fontSize: 18,
    fontFamily: themes.fonts.bold,
    color: themes.colors.shape
  },
  textHeader: {
    fontSize: 12,
    fontFamily: themes.fonts.regular,
    color: themes.colors.slogan
  },
  areaBtn: {
    paddingVertical: 14
  },
  areaCard: {
    paddingHorizontal: 24,
    paddingVertical: 18
  }
});