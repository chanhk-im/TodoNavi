import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

export default class PostCard extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.props.post.map(data => {
                        return (
                            <TouchableOpacity
                                key={data._id}
                                onPress={() => {
                                    this.props.navigation.navigate("NoticeBoard", {
                                        data: data,
                                        user: this.props.user,
                                        removeData: this.props.removeData,
                                        editData: this.props.editData
                                    })
                                }}
                            >
                                <View style={styles.postCard}>
                                    <View style={{ margin: 5 }}>
                                        <View style={styles.Titleitem}>
                                            <Text style={styles.title}> {data.title}</Text>
                                            <Text style={styles.author}>{data.author}</Text>
                                        </View>
                                        <Text style={styles.post}>{data.post}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    Titleitem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#407ddb",
        borderRadius: 5
    },
    postCard: {
        height: 200,
        borderWidth: 1,
        backgroundColor: "#fff",
        margin: 5
    },
    title: {
        fontSize: 25,
        color: "white",
        margin: 2
    },
    author: {
        fontSize: 12,
        width: 100,
        color: "white",
        margin: 2
    },
    post: {
        fontSize: 14
    }
});
