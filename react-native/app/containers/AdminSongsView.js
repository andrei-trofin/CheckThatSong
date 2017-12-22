import React, { Component } from 'react';
import connect from "react-redux/src/connect/connect";
import {TouchableHighlight, View, FlatList, Text, Button, AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";
import {sendMail} from "./Common";


class AdminSongsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songs : []
        }
        //console.log("ADMINVIEWww PROPS", props)


    }

    onEnter(maybeProps) {
        this.refreshData()
    }

    componentDidMount() {
        //this.easySet()
        console.log("DID MOUNT");
        //this.registerSongsToUser(this.props.user)
        this.refreshData()
    }

    componentWillReceiveProps() {
        console.log("WILL RECEIVE PROPS");
        this.refreshData()
    }

    refreshData() {
        this.getSongsFromUser(this.props.user)
    }


    keyExtractor = (item, index) => item.id;

    onSelectedItem = (item) => {
        //console.log(item)
        Actions.songDetails({song: item, user: this.props.user});
    }

    showSongItem = ({item}) => {
        //console.log("Item to show:", item);
        return (
            <TouchableHighlight style={{marginBottom: 5}} onPress = {() => {this.onSelectedItem(item)}}>
                <Text>Id: {item.id}| Lyrics: {item.lyrics.substr(0, 100)}</Text>
            </TouchableHighlight>
        )
    }

    async registerSongsToUser(user) {
        console.log("TRY TO REGISTER", user)
        console.log("SONGS", this.props.songs)

        try {
            await AsyncStorage.setItem(user, JSON.stringify(this.props.songs))
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    async getSongsFromUser(user) {
        console.log("TRY THE GET NOW")
        let songsFromUserString = await AsyncStorage.getItem(user)
        console.log("RESULTS", songsFromUserString)
        try {
            let songsFromUser = JSON.parse(songsFromUserString)
            if (songsFromUser === null) {
                songsFromUser = []
            }
            this.setState({
                songs: songsFromUser
            })

            // let keys = await AsyncStorage.getAllKeys()
            // console.log("ALL KEYS", keys)
            // keys.forEach(async function (key) {
            //     let item = await AsyncStorage.getItem(key)
            //     console.log(key, item)
            // })
            // console.log("ALL KEYS END")
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    render() {
        //console.log("Props", this.props)
        return(
            <View>
                <Text style={{fontSize: 14}}>Songs</Text>
                <View style={{margin:10}}/>
                <FlatList
                    data={this.state.songs}
                    keyExtractor = {this.keyExtractor}
                    renderItem = {this.showSongItem}
                />
                <View>
                    <Button
                        title={'Add new song'}
                        onPress={() => Actions.addSong({user: this.props.user})}
                    />
                </View>
                <View style={{height: 50}}/>
                <View>
                    <Button
                        title={'See pie chart'}
                        onPress={() => {
                            console.log("SONGS TO PIE",this.state.songs)
                            Actions.pieChart({songs: this.state.songs})
                        }}
                    />
                </View>
                <View style={{height: 50}}/>
                <View>
                    <Button
                        title={'Send mail'}
                        onPress={() => sendMail(this.state.songs)}
                    />
                </View>
                <View style={{height: 50}}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("Map state");
    return {
        songs: state.songs,
        users: state.users
    }
}

export default connect(
    mapStateToProps,
    {}
)(AdminSongsView);