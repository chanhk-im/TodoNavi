import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class NoticeBoardScreen extends Component {
    render() {
        const { navigation } = this.props;
        const abc = navigation.getParam("data", null);
        const removeData = navigation.getParam("removeData", null)
        const editData = navigation.getParam("editData", null);

        const id = abc._id;
        const title = abc.title;
        const author = abc.author;
        const post = abc.post;

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
                    navigation.navigate("Update", {editData: editData, data: abc});
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