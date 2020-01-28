// [Import modules]
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { ip, port } from "./Secret";

import WriteScreen from "./src/WriteScreen";
import PostCard from "./src/PostCard";
import NoticeBoardScreen from "./src/NoticeBoardScreen";
import UpdateScreen from "./src/UpdateScreen";

class HomeScreen extends Component {
    // [Initiation]
    state = {
        post: [],
        isLoaded: false
    };

    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.editData = this.editData.bind(this);
        this.loadDataFromDB = this.loadDataFromDB.bind(this);
    }

    // [Load Data from DB]
    async loadDataFromDB() {
        this.setState({
            isLoaded: false
        });

        await fetch(`http://${ip}:${port}/api/posts`)
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    post: resJson
                });
            });

        this.setState({
            isLoaded: true
        });
    }

    componentDidMount() {
        this.loadDataFromDB();
    }

    // [Add a Data]
    addData(data) {
        if (data.title && data.author && data.post) {
            fetch(`http://${ip}:${port}/api/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: data.title,
                    author: data.author,
                    post: data.post,
                    published_date: Date.now()
                })
            }).then(() => this.loadDataFromDB());
        }
    }

    // [Remove a Data]
    removeData(id) {
        fetch(`http://${ip}:${port}/api/posts/${id}`, {
            method: "DELETE"
        });

        this.loadDataFromDB();
    }

    // [Update a Data]
    editData(data) {
        fetch(`http://${ip}:${port}/api/posts/${data._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: data.title,
                author: data.author,
                post: data.post,
                published_date: data.published_date
            })
        }).then(() => this.loadDataFromDB());
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <View style={styles.loading}>
                    <Text>Loading...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Write", { addData: this.addData })}
                            style={styles.button}
                        >
                            <Text>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.loadDataFromDB()} style={styles.button}>
                            <Text>Reload</Text>
                        </TouchableOpacity>
                    </View>
                    <PostCard
                        post={this.state.post}
                        navigation={this.props.navigation}
                        removeData={this.removeData}
                        editData={this.editData}
                    />
                </View>
            );
        }
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Write: WriteScreen,
        NoticeBoard: NoticeBoardScreen,
        Update: UpdateScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center"
    },
    loading: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: 40,
        width: 100,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    }
});
