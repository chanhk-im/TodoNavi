import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import WriteScreen from "./src/WriteScreen";
import PostCard from "./src/PostCard";
import NoticeBoardScreen from "./src/NoticeBoardScreen";
import UpdateScreen from "./src/UpdateScreen";

class HomeScreen extends Component {
    state = {
        post: []
    };

    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.editData = this.editData.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("Posts").then(data => {
            const post = JSON.parse(data || '[]');
            this.setState({ post });
        })
    }

    addData(data) {
        this.setState(prevState => {
            const post = [
                data,
                ...prevState.post
            ]
            AsyncStorage.setItem("Posts", JSON.stringify(post));
            return ({ post })
        });

    }

    removeData(id) {
        let post = this.state.post;
        const index = post.findIndex(e => e.id === id);

        post.splice(index, 1);

        this.setState({
            post: post
        })
        AsyncStorage.setItem("Posts", JSON.stringify(post));
    }

    editData(data) {
        let post = this.state.post;
        const index = post.findIndex(e => e.id === data.id);

        this.state.post[index] = data;

        this.setState({
            post: post
        })
        AsyncStorage.setItem("Posts", JSON.stringify(post));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Write", { addData: this.addData })}
                        style={styles.button}
                    >
                        <Text>Create</Text>
                    </TouchableOpacity>
                    
                </View>
                    <PostCard post={this.state.post} navigation={this.props.navigation} removeData={this.removeData} editData={this.editData}/>
            </View>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Write: WriteScreen,
        NoticeBoard: NoticeBoardScreen,
        Update: UpdateScreen,
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
    button: {
        height: 40,
        width: 100,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
});
