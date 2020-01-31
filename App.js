// [Import modules]
import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/HomeScreen";
import WriteScreen from "./src/WriteScreen";
import NoticeBoardScreen from "./src/NoticeBoardScreen";
import UpdateScreen from "./src/UpdateScreen";
import SignInScreen from "./src/auth/SignInScreen";
import SignUpScreen from "./src/auth/SignUpScreen";
import AuthLoadingScreen from "./src/auth/AuthLoadingScreen";

const SigninNavigator = createStackNavigator(
    {
        SignIn: {
            screen: SignInScreen,
            navigationOptions: {
                title: "Sign In",
                header: () => { false }
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                title: "Sign Up",
                header: () => { false }
            }
        },
    }
)

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Home',
                headerLeft: () => { null }
            }
        },
        Write: WriteScreen,
        NoticeBoard: NoticeBoardScreen,
        Update: UpdateScreen
    }
)

const AuthLoadingNavigator = createStackNavigator(
    {
        Loading: {
            screen: AuthLoadingScreen,
            navigationOptions: {
                title: "Loading",
                header: () => { false }
            }
        }
    }
)

const AppNavigator = createSwitchNavigator(
    {
        Auth: {
            screen: SigninNavigator,
            navigationOptions: {
                title: "Sign In",
                header: () => { false }
            }
        },
        Main: {
            screen: MainNavigator,
            navigationOptions: {
                title: "Main",
                header: () => { false }
            }
        },
        AuthLoading: {
            screen: AuthLoadingNavigator,
            navigationOptions: {
                title: "Auth Loading",
                header: () => { false }
            }
        }
    },
    {
        initialRouteName: "AuthLoading"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}


