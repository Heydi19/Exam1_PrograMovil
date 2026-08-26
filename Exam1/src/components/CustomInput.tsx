import React, { useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";

type CustomInputProps = {
    placeholder : string;
    value : string;
    onChangeText : (texto: string) => void;
    type? : "default" | "password" | "email" | "number"

}

export default function CustomInput ({
    placeholder,
    value,
    onChangeText,
    type = "default"

}: CustomInputProps){
    const [isSecureText, setIsSecureText] = useState (type === "password");

    const isPasswordField = type === "password";

    const iconName: (typeof MaterialIcons)["name"] | undefined =
        type === "password" ? "lock" :
        type === "email" ? "alternate-email" : undefined
    
    const KeyboardType : KeyboardTypeOptions =
    type === "email" ?
    "email-address" 
    : type === "number" ?
    "number-pad"
    : "default";

    const getError = () => {
        if (type === "email" && value.length > 0 && !value.includes ("@")){
            return "Correo invalido";
        }if(type === "password" && value.length > 0 && value.length < 4){
            return "La contraseña es debil";
        }
        return null;
    };
    const error = getError();
    
    return (
        <View style = {styles.wrapper}>
            <View style = {[styles.inputContainer, error && styles.inputError]}>
                <MaterialIcons name = {iconName as any} size = {22} />
                <TextInput
                    style = {styles.input}
                    onChangeText = {onChangeText}
                    value = {value}
                    placeholder = {placeholder}
                    keyboardType = {KeyboardType}
                    secureTextEntry = {isSecureText} 
                    />
                    {isPasswordField && <TouchableOpacity
                        onPress={()=>{
                            setIsSecureText(!isSecureText);
                            }}>
                            ,<Ionicons name = "eye" size = {22} />
                            </TouchableOpacity>
                    }
                    
                    </View>
                    {error && <Text style = {styles.errorText} > {error} </Text>}
                    </View>
    );

}

const styles = StyleSheet.create ({
    wrapper : {marginBottom: 10},
    inputContainer : {
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 9,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },

    input : {width:"70%"},
    inputError: {borderColor: 'red', borderWidth: 1.5},
    errorText: {color: 'red', fontSize: 12, marginTop: 4, marginLeft: 5
},});
