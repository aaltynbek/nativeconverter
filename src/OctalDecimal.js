import React from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity, ScrollView} from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconEn from 'react-native-vector-icons/Entypo';

export default class OctalDecimal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            decimalNumber: 0,
            octalNumber: "",
            decimalOctal: true,
            number: 0,
            result: false,
            firstNumber:"",
            secondNumber:"",
            status:"",
            value:'',
            operation: false,
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

    addOctal(a, b) {
        let dec;
        dec = this.octalToDecimal(a)+this.octalToDecimal(b);
        this.setState({
            value: this.decimalToOctal(dec),
            operation:true
        });
    };

    minusOctal(a, b) {
        let dec;
        dec = this.octalToDecimal(a)-this.octalToDecimal(b);
        this.setState({
            value: this.decimalToOctal(dec),
            operation:true
        });
    };
    multOctal(a, b) {
        let dec;
        dec = this.octalToDecimal(a)*this.octalToDecimal(b);
        this.setState({
            value: this.decimalToOctal(dec),
            operation:true
        });
    };
    divOctal(a, b) {
        let dec;
        dec = this.octalToDecimal(a)/this.octalToDecimal(b);
        this.setState({
            value: this.decimalToOctal(dec),
            operation:true
        });
    };

    handleInputChangeFirst = (text) => {
        if (/^\d+$/.test(text)) {
            this.setState({
                firstNumber: text,
                result: false
            });
        }
    };
    handleInputChangeSecond = (text) => {
        if (/^\d+$/.test(text)) {
            this.setState({
                secondNumber: text,
                result: false
            });
        }
    };
    _plusPressed(){
        this.addOctal(this.state.firstNumber, this.state.secondNumber);
    }
    _minusPressed(){
        this.minusOctal(this.state.firstNumber, this.state.secondNumber);
    }
    _dividePressed(){
        this.divOctal(this.state.firstNumber, this.state.secondNumber);
    }
    _multiPressed(){
        this.multOctal(this.state.firstNumber, this.state.secondNumber);
    }

    _calculatePressed(){
        switch (this.state.status) {
            case 'A':
                this.addOctal(this.state.firstNumber, this.state.number);
                break;
            case 'B':
                this.minusOctal(this.state.firstNumber, this.state.number);
                break;
            case 'C':
                this.divOctal(this.state.firstNumber, this.state.number);
                break;
            case 'D':
                this.multOctal(this.state.firstNumber, this.state.number);
                break;
        }
    }


    render() {
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <IconEn.Button name="swap" size={50} backgroundColor="transparent" color="gray"
                               onPress={()=>this.changeDimension()}/>

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
                        <Text style={{fontSize:20,}}> Result</Text>
                }
                <View style={{flexDirection: "row",borderTopWidth: 1, borderTopColor:"#000",
                    width:"100%",justifyContent: "center"}}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'First number'}
                        keyboardType='numeric'
                        onChangeText={this.handleInputChangeFirst}
                    />

                </View>
                <View style={{flexDirection: "row", width:"100%",justifyContent: "center"}}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Second number'}
                        keyboardType='numeric'
                        onChangeText={this.handleInputChangeSecond}
                    />
                </View>

                <View style={{flexDirection: "row", width:"100%",justifyContent: "center"}}>
                    <IconFA.Button name="plus" size={40} backgroundColor="transparent" color="gray"
                                   onPress={()=>this._plusPressed()}/>
                    <IconFA.Button name="minus" size={40} backgroundColor="transparent" color="gray"
                                   onPress={()=>this._minusPressed()}/>
                    <IconFA.Button name="divide" size={40} backgroundColor="transparent" color="gray"
                                   onPress={()=>this._dividePressed()}/>
                    <IconFA.Button name="star-of-life" size={40} backgroundColor="transparent" color="gray"
                                   onPress={()=>this._multiPressed()}/>
                    <IconFA.Button name="equals" size={40} backgroundColor="transparent" color="gray"
                                   onPress={()=>this._calculatePressed()}/>
                </View>
                {this.state.operation?
                    <Text style={{fontSize:20,}}>Result: {this.state.value}</Text>
                    :
                    <Text style={{fontSize:20,}}> Result</Text>
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