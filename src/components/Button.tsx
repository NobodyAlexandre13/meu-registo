import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import themes from "../global/themes";

type Props = {
    title: string;
    onPress: () => void;
    color: string;
    size: number;
    opacity: number
}

export function Button({ 
    title, 
    onPress, 
    color, 
    size, 
    opacity 
}: Props){
    return(
        <View style={btnStyle.areaBtn}>
            <TouchableOpacity activeOpacity={opacity} onPress={onPress} style={btnStyle.btnBody} >
                <MaterialIcons name="add" size={size} color={color} />
                <Text style={btnStyle.textBtn} >{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const btnStyle = StyleSheet.create({
    areaBtn: {
        marginBottom: 10
    },
    btnBody: {
        width: '100%',
        padding: 10,
        backgroundColor: themes.colors.button,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    textBtn: {
        fontFamily: themes.fonts.medium,
        color: themes.colors.shape,
        fontSize: 16
    }
})