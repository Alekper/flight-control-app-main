import { View, StyleSheet, Text, Image, Pressable } from "react-native"
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default function FlightCard(props) {
    return (
      <Pressable>
        <View style={styles.card}>
            <View>
                {/* <Text style={styles.updateInfo}>&#128337; {props.flightData[props.flightNum.index].updated}</Text> */}
                <Text style={styles.updateInfo}>&#128337; Updated 1 hour 1 minute ago</Text>
            </View>
            <View style={styles.flightInfo}>
                <Image source={{ uri: `http://sofi03.azal.az:8083/files/${props.flightData[props.flightNum.index].origin.trim()}.png` }} style={styles.cityImage} />
                <View style={styles.generalInfo}>
                    <View style={styles.cityName}>
                        <Text style={styles.airport}>{props.flightData[props.flightNum.index].origin.trim()}</Text>
                        <Text style={styles.planeIcon}>&#9992;</Text>
                        <Text style={styles.airport}>{props.flightData[props.flightNum.index].destination.trim()}</Text>
                    </View>
                    <View style={styles.flightDetails}>
                        <View style={styles.depDetails}>
                            <View>
                                <Text style={styles.terminal}>Terminal</Text>
                                {/* <Text style={styles.terminalInfo}>{props.flightData[props.flightNum.index].depTerminal}</Text> */}
                                <Text style={styles.terminalInfo}>-</Text>
                            </View>
                            <View>
                                <Text style={styles.gate}>Gate</Text>
                                {/* <Text style={styles.gateInfo}>{props.flightData[props.flightNum.index].depGate}</Text> */}
                                <Text style={styles.gateInfo}>-</Text>
                            </View>
                        </View>
                        <View style={styles.arrDetails}>
                            <View>
                                <Text style={styles.terminal}>Terminal</Text>
                                {/* <Text style={styles.terminalInfo}>{props.flightData[props.flightNum.index].depTerminal}</Text> */}
                                <Text style={styles.terminalInfo}>-</Text>
                            </View>
                            <View>
                                <Text style={styles.gate}>Gate</Text>
                                {/* <Text style={styles.gateInfo}>{props.flightData[props.flightNum.index].depGate}</Text> */}
                                <Text style={styles.gateInfo}>-</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Image source={{ uri: `http://sofi03.azal.az:8083/files/${props.flightData[props.flightNum.index].destination.trim()}.png` }} style={styles.cityImage} />

            </View>
            <Text style={styles.flightNumber}>J2 {props.flightData[props.flightNum.index].flightNumber}</Text>
        </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 30,



    },
    updateInfo: {
        textAlign: "right",
        marginBottom: 10,
        color: '#585a5c',
        paddingRight: 10
    },
    cityImage:
    {
        width: 150,
        height: 150,
    },
    flightInfo: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    cityName: {
        flexDirection: 'row',
        // alignSelf: "center",
        justifyContent: 'space-between'
    },
    flightDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        // borderWidth: 1,
        marginTop: 30


    },
    generalInfo: {
        width: '45%',
        justifyContent: "space-around",

    },
    depDetails: {
        flexDirection: "row",
        width: '40%',
        justifyContent: 'space-between',


    },
    arrDetails: {
        flexDirection: "row",
        width: '40%',
        justifyContent: 'space-between',

    },
    airport: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#020d1f'
    },
    planeIcon: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#020d1f',

    },
    gate: {
        color: '#020d1f',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'



    },
    terminal: {
        color: '#020d1f',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    gateInfo: {
        color: '#020d1f',
        fontSize: 14,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5



    },
    terminalInfo: {
        color: '#020d1f',
        fontSize: 14,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5

    },
    flightNumber:{
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#020d1f',

    }
})