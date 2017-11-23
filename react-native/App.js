

import {Scene, Router, Stack} from "react-native-router-flux";
import React, {Component} from 'react';
import Login from "./app/containers/Login";
import AdminSongsView from "./app/containers/AdminSongsView";
import EditSongItem from "./app/containers/EditSongItem";
import {store as appStore} from "./app/store"
import {Provider} from "react-redux";

export default class App extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene key="login" component={Login} title={"Login"} initial/>
                        <Scene key="adminView" component={AdminSongsView}/>
                        <Scene key="songDetails" component={EditSongItem}/>
                    </Scene>
                </Router>
            </Provider>
        )}
}