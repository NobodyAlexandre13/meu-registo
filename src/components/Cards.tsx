import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as clipboard from "expo-clipboard";

import themes from "../global/themes";

type Props = {
   date: { 
    id: string;
    nome: string;
    dado: string;
    data: string;
   },
   onPress: (id: string) => void
}
export function Cards( {date, onPress} : Props ) {

    async function  copy() {
        await clipboard.setStringAsync(date.dado);
    }

    return(
        <TouchableOpacity onPress={() => onPress(date.id)}>
            <View style={cards.areaCards} >
                <View>
                    <Text style={cards.dataTime} >{date.nome}</Text>
                    <Text 
                        style={[cards.dateCards, { maxWidth: 200 }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{date.dado}</Text>
                </View>
                <View style={cards.center}>
                    <TouchableOpacity onPress={copy}>
                        <MaterialIcons name="content-copy" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={cards.dataTime} >{date.data}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const cards = StyleSheet.create({
    areaCards: {
        width: '100%',
        backgroundColor: themes.colors.shape,
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 28,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tituloCards: {
        fontFamily: themes.fonts.regular,
        color: themes.colors.text,
        fontSize: 10,
        textTransform: 'uppercase'
    },
    dateCards: {
        fontFamily: themes.fonts.medium,
        color: themes.colors.title,
        fontSize: 18,
    },
    dataTime: {
        fontSize: 10,
        color: themes.colors.text,
        fontFamily: themes.fonts.regular
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})