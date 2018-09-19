import React from "react";
import { Platform, Image} from "react-native";
import {
    createBottomTabNavigator
} from "react-navigation";
import FontAwesome,{Icons}  from "react-native-fontawesome";

import Binary from "./BinaryDecimal";
import Octal from "./OctalDecimal";
import Sixteen from "./SixteenDecimal";


const tabBarOptions = Platform.OS === 'ios' ?
    {
        // iOS tabBarOptions
        showLabel: true
    } : {
        // Android tabBarOptions
        showIcon: true,
        showLabel: true,
        style: {
            backgroundColor: '#F8F8F8',
        },

        labelStyle: {
            fontSize: 10,
            width: '100%',
            marginTop: 0
        },
        activeTintColor: '#008fed',
        inactiveTintColor: 'gray',
        upperCaseLabel: false
    };


export const Converter = createBottomTabNavigator(
    {
        Binary: {
            screen: Binary,
            navigationOptions:({ navigation }) =>( {
                tabBarLabel: "Binary",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./images/binary.png')}
                        style={{ resizeMode: 'contain',tintColor: tintColor, width: 26, height: 26, }}
                    />
                ),
            })
        },

        Octal: {
            screen: Octal,
            navigationOptions: {
                tabBarLabel: "Octal",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./images/octal.png')}
                        style={{ resizeMode: 'contain',tintColor: tintColor, width: 26, height: 26, }}
                    />
                ),
            }
        },
        Sixteen: {
            screen: Sixteen,
            navigationOptions:( {
                drawerLabel: "Hexa",
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./images/sixteen.png')}
                        style={{resizeMode: 'contain',tintColor: tintColor, width: 26, height: 26,}}
                    />
                ),
            })
        },


    },

    {
        tabBarPosition: 'bottom',
        tabBarOptions: tabBarOptions,

    }
);
