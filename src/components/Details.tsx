import { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import { database } from "../firebaseConfig";
import { set, ref, remove, onValue, update } from "firebase/database";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import NetInfo from '@react-native-community/netinfo';

import { Button } from "./Button";
import themes from "../global/themes";
import { ButtonCloser } from "./ButtonCloser";

type BtnProps = {
    idMembers: string,
    onPress: () => void,
}

export function Details ( { idMembers, onPress } : BtnProps ){
    const [ titulo, setTitulo ] = useState("");
    const [ dado, setDado ] = useState("");
    const [ alert, setAlert ] = useState("");

    const data = new Date();
    const id = uuidv4();

    useEffect(() => {
        const buscaRef = ref(database, `apontamento/meu-registro/${idMembers}`);
        
            const unsubscribe = onValue( buscaRef, (snapshot) => {
              const data = snapshot.val();

              setTitulo(data.nome);
              setDado(data.dado);
            })
        
            return () => unsubscribe();
    }, [])

    const handleDelete = (id: string) => {
        const registroRef = ref(database, `apontamento/meu-registro/${id}`);
        try{
            remove(registroRef);
            Alert.alert('Registro eliminado!');
            onPress();

        }catch (error) {
            console.error('Erro ao eliminar:', error);
        }
    };

    async function updateNow(){
        if (titulo === "" || dado === "") {
            setAlert("Preencha os campos todos");
            return;
        }
        const net = await NetInfo.fetch();

        if (!net.isConnected) {
            Alert.alert("Sem conexão", "Verifica tua internet e tenta novamente.");
            return;
        }
        try {
            await update(ref(database, `apontamento/meu-registro/${idMembers}`), {
              nome: titulo,
              dado: dado
            });
        
            onPress();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            Alert.alert("Erro", "Não foi possível salvar os dados. Tenta novamente mais tarde.");
        }
    }

    return(
        <View style={formStyle.form}>
            <View style={formStyle.areaText}>
                <View>
                    <Text style={formStyle.title}>Adicionar novo</Text>
                    <Text style={formStyle.subTitle}>Aponta sem papel e sem lapiseira</Text>
                </View>
                <View style={formStyle.out}>
                    <ButtonCloser 
                        title=''
                        onPress={onPress}
                        color={themes.colors.shape}
                        size={26}
                        opacity={0.6}
                    />
                </View>
            </View>
            <Text style={formStyle.alert}>{alert}</Text>
            <TextInput
                style={formStyle.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o titulo" 
            />
            <TextInput
                style={formStyle.input}
                value={dado}
                onChangeText={setDado} 
                placeholder="Digite o dado" 
            />
            <View style={formStyle.flex}>
                <View style={formStyle.add}>
                    <Button
                        title='Atualizar' 
                        onPress={updateNow}
                        color={themes.colors.shape}
                        size={26}
                        opacity={0.6}
                    />
                </View>
                <View style={formStyle.closer}>
                    <ButtonCloser 
                        title='Eliminar'
                        onPress={() => handleDelete(idMembers)}
                        color={themes.colors.shape}
                        size={26}
                        opacity={0.6}
                    />
                </View>
            </View>
        </View>
    )
}

const formStyle = StyleSheet.create({
    form: {
        backgroundColor: themes.colors.fundo,
        paddingVertical: 18,
        paddingHorizontal: 24,
        height: '100%'
    },
    alert: {
        color: themes.colors.alert,
        fontFamily: themes.fonts.bold,
        marginBottom: 14,
        fontSize: 14
    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontFamily: themes.fonts.bold,
        color: themes.colors.title,
    },
    subTitle: {
        fontSize: 14,
        color: themes.colors.text,
        fontFamily: themes.fonts.medium
    },
    areaText: {
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        backgroundColor: themes.colors.shape,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        borderRadius: 5
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    add: {
        width: '55%'
    },
    closer: {
        width: '40%'
    },
    out: {
        width: 40
    }
})