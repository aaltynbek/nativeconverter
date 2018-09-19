import React from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons'

export default class OctalDecimal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            decimalNumber: 0,
            octalNumber: "",
            decimalOctal: true,
            number: 0,
            result: false,
        }
    }

    /* Converting Decimal to Octal */

    decimalToOctal(decimalNumber) {
        let octalNumber = "";

        while(decimalNumber > 0) {
            octalNumber = (decimalNumber % 8) + octalNumber;
            decimalNumber = Math.floor(decimalNumber / 8);
        }
        this.setState({
            octalNumber: octalNumber,
            result: true
        });
        return octalNumber;
    }

    /* Converting Octal to Decimal */

    octalToDecimal(octalNumber) {
        let decimalNumber = 0;
        let power = octalNumber.length - 1;

        for (let i = 0; i < octalNumber.length; i++) {
            decimalNumber += parseInt(octalNumber[i]) * Math.pow(8, power - i);
        }
        this.setState({
            decimalNumber: decimalNumber,
            result: true
        });
        return decimalNumber;
    }

    /* Saving number to the state */

    handleInputChange = (text) => {
        if (/^\d+$/.test(text)) {
            this.setState({
                number: text,
                result: false
            });
        }
    };

    /* Converter reversing */

    changeDimension(){
        this.setState({
            decimalOctal: !this.state.decimalOctal,
            decimalNumber: 0,
            octalNumber: "",
            result: false
        })
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>this.changeDimension()}>
                    <Icon name="swap" size={50} />
                </TouchableOpacity>
                {this.state.decimalOctal?
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Decimal Number:</Text>
                    :
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Octal Number:</Text>
                }
                {this.state.decimalOctal?
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Decimal number'}
                        keyboardType='numeric'
                        onChangeText={this.handleInputChange}
                        //onSubmitEditing={()=>alert(this.state.number)}
                        //value={this.state.text}
                    />
                    :
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Octal number'}
                        keyboardType='numeric'
                        onChangeText={this.handleInputChange}
                        //onSubmitEditing={()=>alert(this.state.number)}
                        //value={this.state.text}
                    />
                }
                <TouchableOpacity style={styles.button}
                                  onPress={()=>{
                                      if(this.state.decimalOctal) {
                                          this.decimalToOctal(this.state.number)
                                      }
                                      else {
                                          this.octalToDecimal(this.state.number)
                                      }
                                  }}
                >
                    <Text style={styles.buttonText}>Convert</Text>
                </TouchableOpacity>
                {
                    this.state.result?
                        <Text style={{fontSize:17,}}>Decimal: {this.state.decimalOctal?this.state.number+" "
                            : this.state.decimalNumber+" "}
                            Octal: {this.state.decimalOctal?this.state.octalNumber:this.state.number} </Text>
                        :
                        <Text> </Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputText: {
        borderColor: "grey",
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 14,
        padding: 8,
        color:'#000',
        width:300,
        marginTop: 10,
        height: 45
    },
    button: {
        alignSelf: 'center',
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
});