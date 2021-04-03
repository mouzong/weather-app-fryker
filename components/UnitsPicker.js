import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function  ({unitsSystem, setUnitsSystem}) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={unitsSystem} onValueChange={(item)=>setUnitsSystem(item)} mode="dropdown">
                <Picker.Item label="°C" value="metric"/>
                <Picker.Item label="°F" value="imperial"/>
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -20,
            },
            android: {
                top: 60,
            },
        }),
        width: 80,
        height: 50,
        left: 20,
    }
})
