import React, { Component } from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";

export default class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userData = await AsyncStorage.getItem("userData");

        this.props.navigation.navigate(userData ? "Main" : "Auth");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
    },
});