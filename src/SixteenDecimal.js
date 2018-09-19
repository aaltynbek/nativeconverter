import React from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity, ScrollView} from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconEn from 'react-native-vector-icons/Entypo';

export default class SixteenDecimal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            decimalNumber: 0,
            hexNumber: "",
            decimalHex: true,
            number: 0,
            result: false,
            firstNumber:"",
            secondNumber:"",
            status:"",
            value:''
        }
    }

    /* Converting Decimal to Hex */

    decimalToHex(decimalNumber) {
        let hexNumber = "";
        let remainder = "";
        while(decimalNumber > 0) {
            remainder = decimalNumber % 16;
            if(remainder==10){
                remainder="A" ;
            }
            if(remainder==11){
                remainder="B";
            }
            if(remainder==12){
                remainder="C";
            }
            if(remainder==13){
                remainder="D";
            }
            if(remainder==14){
                remainder="E";
            }
            if(remainder==15){
                remainder="F";
            }
            hexNumber = remainder + hexNumber;
            decimalNumber = Math.floor(decimalNumber / 16);
        }
        this.setState({
            hexNumber: hexNumber,
            result: true
        });
        return hexNumber;
    }

    /* Converting Hex to Decimal */

    hexToDecimal(hexNumber) {
        let decimalNumber = 0;
        let power = hexNumber.length - 1;
        for (let i = 0; i < hexNumber.length; i++) {
            if(hexNumber[i]=="A"){
                hexNumber[i]=10 ;
            }
            if(hexNumber[i]=="B"){
                hexNumber[i]=11;
            }
            if(hexNumber[i]=="C"){
                hexNumber[i]=12;
            }
            if(hexNumber[i]=="D"){
                hexNumber[i]=13;
            }
            if(hexNumber[i]=="E"){
                hexNumber[i]=14;
            }
            if(hexNumber[i]=="F"){
                hexNumber[i]=15;
            }
            decimalNumber += parseInt(hexNumber[i]) * Math.pow(16, power - i);
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
    handleInputChangeHex = (text) => {
            this.setState({
                number: text,
                result: false
            });
    };
    /* Converter reversing */

    changeDimension(){
        this.setState({
            decimalHex: !this.state.decimalHex,
            decimalNumber: 0,
            hexNumber: "",
            result: false
        })
    }

    _plusPressed(){
        this.setState({
            status:"A",
            firstNumber: this.state.number,
            value: this.state.number+" + "
        });
    }
    _minusPressed(){
        this.setState({
            status:"B",
            firstNumber: this.state.number
        });
    }
    _dividePressed(){
        this.setState({
            status:"C",
            firstNumber: this.state.number
        });
    }
    _multiPressed(){
        this.setState({
            status:"D",
            firstNumber: this.state.number
        });
    }
    _calculatePressed(){
        switch (this.state.status) {
            case 'A':
                this.addBinary(this.state.firstNumber, this.state.number);
                break;
            case 'B':
                alert("minus operation");
                break;
            case 'C':
                alert("divide operation");
                break;
            case 'D':
                alert("last operation");
                break;
        }
        this.setState({
            value:''
        })
    }

    render() {
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <IconEn.Button name="swap" size={50} backgroundColor="transparent" color="gray"
                               onPress={()=>this.changeDimension()}/>

                {this.state.decimalHex?
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Decimal Number:</Text>
                    :
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Hexadecimal Number:</Text>
                }
                {this.state.decimalHex?
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
                        placeholder={'Hex number'}
                        onChangeText={this.handleInputChangeHex}
                        //onSubmitEditing={()=>alert(this.state.number)}
                        //value={this.state.text}
                    />
                }
                <TouchableOpacity style={styles.button}
                                  onPress={()=>{
                                      if(this.state.decimalHex) {
                                          this.decimalToHex(this.state.number)
                                      }
                                      else {
                                          this.hexToDecimal(this.state.number)
                                      }
                                  }}
                >
                    <Text style={styles.buttonText}>Convert</Text>
                </TouchableOpacity>
                {
                    this.state.result?
                        <Text style={{fontSize:17,}}>Decimal: {this.state.decimalHex?this.state.number+" "
                            : this.state.decimalNumber+" "}
                            Hex: {this.state.decimalHex?this.state.hexNumber:this.state.number} </Text>
                        :
                        <Text> </Text>
                }
                <View style={{flexDirection: "row",borderTopWidth: 1, borderTopColor:"#000",
                    width:"100%",justifyContent: "center"}}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Input number'}
                        keyboardType='numeric'
                        onChangeText={this.handleInputChange}
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