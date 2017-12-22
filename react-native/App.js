

import {Scene, Router, Stack} from "react-native-router-flux";
import React, {Component} from 'react';
import Login from "./app/containers/Login";
import AdminSongsView from "./app/containers/AdminSongsView";
import EditSongItem from "./app/containers/EditSongItem";
import PieChartView from "./app/containers/PieChartView"
import {store as appStore} from "./app/store"
import {Provider} from "react-redux";
import AddSongItem from "./app/containers/AddSongItem";

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene key="login" component={Login} title={"Login"} initial/>
                        <Scene key="adminView" component={AdminSongsView}/>
                        <Scene key="songDetails" component={EditSongItem}/>
                        <Scene key="addSong" component={AddSongItem}/>
                        <Scene key="pieChart" component={PieChartView}/>
                    </Scene>
                </Router>
            </Provider>
        )}
}