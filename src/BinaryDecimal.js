import React from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity, ScrollView } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconEn from 'react-native-vector-icons/Entypo';

export default class BinaryDecimal extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            decimalNumber: 0,
            binaryNumber: "",
            decimalBinary: true,
            number: 0,
            result: false,
            firstNumber:"",
            secondNumber:"",
            status:"",
            value:"",
            operation: false,
        }
    }

    /* Converting Decimal to Binary */

    decimalToBinary(decimalNumber) {
        let binaryNumber = "";

        while(decimalNumber > 0) {
            binaryNumber = (decimalNumber % 2) + binaryNumber;
            decimalNumber = Math.floor(decimalNumber / 2);
        }
        this.setState({
            binaryNumber: binaryNumber,
            result: true
        });
        return binaryNumber;
    }

    /* Converting Binary to Decimal */

    binaryToDecimal(binaryNumber) {
        let decimalNumber = 0;
        let power = binaryNumber.length - 1;

        for (let i = 0; i < binaryNumber.length; i++) {
            decimalNumber += parseInt(binaryNumber[i]) * Math.pow(2, power - i);
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
            decimalBinary: !this.state.decimalBinary,
            decimalNumber: 0,
            binaryNumber: "",
            result: false
        })
    }

    /* Binary + Binary */

    addBinary(a, b) {
        let i = a.length - 1;
        let j = b.length - 1;
        let carry = 0;
        let result = "";
        while(i >= 0 || j >= 0) {
            let m = i < 0 ? 0 : a[i] | 0;
            let n = j < 0 ? 0 : b[j] | 0;
            carry += m + n;
            result = carry % 2 + result;
            carry = carry / 2 | 0;
            i--;
            j--;
        }
        if(carry !== 0) {
            result = carry + result;
        }
        this.setState({
            value: result,
            operation:true
        });
        return result;
    };

    /* Binary - Binary */

    minusBinary(a, b) {
        let dec;
        dec = this.binaryToDecimal(a)-this.binaryToDecimal(b);
        this.setState({
            value: this.decimalToBinary(dec),
            operation:true
        });
    };
    multBinary(a, b) {
        let dec;
        dec = this.binaryToDecimal(a)*this.binaryToDecimal(b);
        this.setState({
            value: this.decimalToBinary(dec),
            operation:true
        });
    };
    divBinary(a, b) {
        let dec;
        dec = this.binaryToDecimal(a)/this.binaryToDecimal(b);
        this.setState({
            value: this.decimalToBinary(dec),
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
        this.addBinary(this.state.firstNumber, this.state.secondNumber);
    }
    _minusPressed(){
        this.minusBinary(this.state.firstNumber, this.state.secondNumber);
    }
    _dividePressed(){
        this.divBinary(this.state.firstNumber, this.state.secondNumber);
    }
    _multiPressed(){
        this.multBinary(this.state.firstNumber, this.state.secondNumber);
    }

    _calculatePressed(){
        switch (this.state.status) {
            case 'A':
                this.addBinary(this.state.firstNumber, this.state.number);
                break;
            case 'B':
                this.minusBinary(this.state.firstNumber, this.state.number);
                break;
            case 'C':
                this.divBinary(this.state.firstNumber, this.state.number);
                break;
            case 'D':
                this.multBinary(this.state.firstNumber, this.state.number);
                break;
        }
    }
    render() {
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <IconEn.Button name="swap" size={50} backgroundColor="transparent" color="gray"
                                   onPress={()=>this.changeDimension()}/>

                {this.state.decimalBinary?
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Decimal Number:</Text>
                    :
                    <Text style={{fontSize: 13,color:'#000'}}>Enter Binary Number:</Text>
                }
                {this.state.decimalBinary?
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
                placeholder={'Binary number'}
                keyboardType='numeric'
                onChangeText={this.handleInputChange}
                //onSubmitEditing={()=>alert(this.state.number)}
                //value={this.state.text}
            />
                }
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                     if(this.state.decimalBinary){this.decimalToBinary(this.state.number)}
                else {this.binaryToDecimal(this.state.number)}
                }}
                >
                    <Text style={styles.buttonText}>Convert</Text>
                </TouchableOpacity>
                {
                    this.state.result?
                        <Text style={{fontSize:20,}}>Decimal: {this.state.decimalBinary?this.state.number+" ":this.state.decimalNumber+" "}
                         Binary: {this.state.decimalBinary?this.state.binaryNumber:this.state.number} </Text>
                        :
                        <Text style={{fontSize:20,}}>Result</Text>
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