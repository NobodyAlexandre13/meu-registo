import React from "react";
import { View, ActivityIndicator } from "react-native";
import themes from "../global/themes";

export function Loading(){
    return(
        <View >
            <ActivityIndicator size="large" color={themes.colors.button} />
        </View>
    )
}