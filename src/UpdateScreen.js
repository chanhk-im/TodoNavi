import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

export default class UpdateScreen extends Component {
    state = {
        id: "",
        newTitle: "",
        newAuthor: "",
        newPost: ""
    };

    componentDidMount() {
        let data = this.props.navigation.getParam("data", null);
        this.setState({
            id: data.id,
            newTitle: data.title,
            newAuthor: data.author,
            newPost: data.post,
        });
    }

    render() {
        let editData = this.props.navigation.getParam("editData", null);

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.titleBox}
                        value={this.state.newTitle}
                        placeholder="title"
                        autoCorrect={false}
                        onChangeText={title => this.setState({ newTitle: title })}
                    />
                    <TextInput
                        style={styles.authorBox}
                        value={this.state.newAuthor}
                        placeholder="author"
                        autoCorrect={false}
                        onChangeText={author => this.setState({ newAuthor: author })}
                    />
                </View>
                <View style={styles.body}>
                    <View style={styles.postBox}>
                        <TextInput
                            value={this.state.newPost}
                            placeholder="post"
                            autoCorrect={false}
                            multiline={true}
                            onChangeText={post => this.setState({ newPost: post })}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.completeButton}
                            onPress={() => {
                                const newData = {
                                    id: this.state.id,
                                    title: this.state.newTitle,
                                    author: this.state.newAuthor,
                                    post: this.state.newPost
                                };

                                editData(newData);
                                this.props.navigation.navigate("Home");
                            }}
                        >
                            <Text>Complete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttons: {
        height: 60,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    titleBox: {
        height: 50,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        marginHorizontal: 5
    },
    authorBox: {
        height: 50,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        marginHorizontal: 5
    },
    postBox: {
        flex: 1,
        width: 380,
        borderWidth: 0.5
    },
    completeButton: {
        height: 40,
        width: 100,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5
    },
    cancelButton: {
        height: 40,
        width: 80,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5
    }
});