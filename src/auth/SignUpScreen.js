import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import { ip, port } from "../../Secret";

export default class SignUpScreen extends Component {
    state = {
        newId: "",
        newPassword: "",
        newEmail: "",
        newName: "",
    }

    _onPressButton() {
        fetch(`http://${ip}:${port}/api/users/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.newId,
                password: this.state.newPassword,
                email: this.state.newEmail,
                name: this.state.newName
            })
        }).then(res => res.json())
            .then(resJson => {
                if (resJson.result === "id is exist") {
                    console.log("id is exist");
                    return;
                }

                console.log("success");
                this.props.navigation.navigate("SignIn");
            })
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
                    secureTextEntry= {true}
                    onChangeText={t => this.setState({ newPassword: t })}
                />
                <TextInput
                    style={styles.textBox}
                    value={this.state.newEmail}
                    placeholder="email"
                    autoCorrect={false}
                    onChangeText={t => this.setState({ newEmail: t })}
                />
                <TextInput
                    style={styles.textBox}
                    value={this.state.newName}
                    placeholder="name"
                    autoCorrect={false}
                    onChangeText={t => this.setState({ newName: t })}
                />
                <TouchableOpacity onPress={() => this._onPressButton()} style={styles.button}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
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
