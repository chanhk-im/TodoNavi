import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class NoticeBoardScreen extends Component {
    render() {
        const { navigation } = this.props;
        const data = navigation.getParam("data", null);
        const removeData = navigation.getParam("removeData", null)
        const editData = navigation.getParam("editData", null);
        const user = navigation.getParam("user", null);

        const id = data._id;
        const title = data.title;
        const author = data.author;
        const post = data.post;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.post}>{post}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    removeData(id);
                    navigation.goBack();
                }}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (user.id === data.author) {
                        navigation.navigate("Update", { editData: editData, data: data });
                    }
                }}>
                    <Text>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 25,
    },
    author: {
        fontSize: 12,
    },
    post: {
        fontSize: 14
    },
    button: {
        height: 40,
        width: 100,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
})