import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

import { ip, port } from "../../Secret";


export default class SignInScreen extends Component {
    state = {
        newId: "",
        newPassword: "",
    }

    _signinAsync = async (data) => {
        const saveData = JSON.stringify(data);
        await AsyncStorage.setItem("userData", saveData);
        this.props.navigation.navigate("Main");
    }

    _onPressButton() {
        fetch(`http://${ip}:${port}/api/users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.newId,
                password: this.state.newPassword,
            })
        }).then(res => res.json())
            .then(resJson => {
                if (resJson.error) {
                    console.log(resJson.error);
                } else {
                    console.log("success");
                    this._signinAsync(resJson);
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textBox}
                    value={this.state.newId}
                    placeholder="id"
                    autoCorrect={false}
                    onChangeText={t => this.setState({ newId: t })}
                />
                <TextInput
                    style={styles.textBox}
                    value={this.state.newPassword}
                    placeholder="password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={t => this.setState({ newPassword: t })}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")} style={styles.button}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._onPressButton()} style={styles.button}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textBox: {
        height: 50,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        margin: 3
    },
    button: {
        height: 40,
        width: 60,
        margin: 5,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
    }
});
