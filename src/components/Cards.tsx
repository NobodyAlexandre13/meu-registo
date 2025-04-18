import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import themes from "../global/themes";

type Props = {
    nome: string;
    dado: string;
}

export function Cards( {nome, dado} : Props ) {
    return(
        <View style={cards.areaCards} >
            <View>
                <Text style={cards.tituloCards} >{nome}</Text>
                <Text style={cards.dateCards} >{dado}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <MaterialIcons name="content-copy" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const cards = StyleSheet.create({
    areaCards: {
        width: '100%',
        backgroundColor: themes.colors.shape,
        elevation: 2,
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
        fontSize: 12,
        textTransform: 'uppercase'
    },
    dateCards: {
        fontFamily: themes.fonts.medium,
        color: themes.colors.title,
        fontSize: 18
    }
})