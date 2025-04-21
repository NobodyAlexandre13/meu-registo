import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet, Text, FlatList, Modal, Alert } from "react-native";

import { database } from './src/firebaseConfig';
import { DataSnapshot, onValue, ref } from "firebase/database";

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
import { Form } from './src/components/Form';
import { Details } from './src/components/Details';

type Registro = {
  id: string;
  nome: string;
  dado: string;
  data: string;
};

export default function App() {
  const [ visible, setVisible ] = useState(false);
  const [ visibleOne, setVisibleOne ] = useState(false);
  const [carregamento, setCarregamento] = useState<Registro[]>([])
  const [id, setId] = useState("");
  

  const [loadedFonts] = useFonts({
    NationalPark_400Regular,
    NationalPark_500Medium,
    NationalPark_700Bold
  })

  function openModalDelUp(id: string){
    setVisibleOne(true);
    setId(id);
  }

  useEffect(()=>{
    const buscaRef = ref(database, 'apontamento/meu-registro');

    const unsubscribe = onValue( buscaRef, (snapshot) => {
      const data = snapshot.val();
      const id = Object.keys(data);
      const lista = Object.entries(data).map(([id, item]: [string, any]) => ({
        id,
        nome: item.nome,
        dado: item.dado,
        data: item.data,
      }));
      setCarregamento(lista);
    })

    return () => unsubscribe();
  }, [])
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
            onPress={() => setVisible(true)}
            color={themes.colors.shape}
            size={26}
            opacity={0.6}
          />
        </View>
      </View>
      <View style={styles.areaCard}>
        <FlatList
          data={carregamento}
          renderItem={({item}) => <Cards onPress={() => openModalDelUp(item.id)} date={ item }/>}
          ListEmptyComponent={
            <Text style={{ fontSize: 16, color: themes.colors.text, textAlign: 'center' }}>
                Nenhum cadastro feito ainda.
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={visible}
      >
        <View style={styles.areaModal}>
          <Form onPress={() => setVisible(false)} />
        </View>
      </Modal>

      <Modal
        transparent
        animationType="slide"
        visible={visibleOne}
      >
        <View style={styles.areaModal}>
          <Details 
              onPress={() => setVisibleOne(false)}
              idMembers={id}
          />
        </View>
      </Modal>
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
  },
  areaModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end'
  }
});