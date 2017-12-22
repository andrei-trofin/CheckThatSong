import React, { Component } from 'react';
import {Text, View, TextInput, Button, AsyncStorage, Alert} from 'react-native';
import {Actions} from "react-native-router-flux";
import {addSong} from "../actions/index";
import {connect} from 'react-redux'

class AddSongItem extends Component {

    constructor(props){
        super(props)
        //console.log(this.props.song)
        this.state = {
            id: "-1",
            artist: "",
            title: "",
            album: "",
            year: "",
            genre: "",
            lyrics: ""
        }
    }

    _addSong() {
        // this.props.addSong(this.state)
        this.saveSong().then(() => {
            // console.log("WILL IT POP")
            // console.log("WILL IT JUMP TO ADMIN")
            Actions.pop();
            Actions.refresh({addedAt: Date.now()});
        })

    }

    onBackPress() {
        console.log("BACK BUTTON PRESSED")
    }

    async saveSong() {
        let song = JSON.parse(JSON.stringify(this.state))

        let songs = await AsyncStorage.getItem(this.props.user)
        songs = JSON.parse(songs)
        let newIndex = await AsyncStorage.getItem("indexGenerator")
        newIndex = parseInt(newIndex) + 1
        console.log("Generated index is: ", newIndex)

        if (songs === null || songs === undefined) {
            songs = []
        }

        let index = songs.findIndex((t) => {
            return t.id === song.id
        })

        if (index === -1) {
            let newSong = {
                id: newIndex,
                artist: this.state.artist,
                title: this.state.title,
                album: this.state.album,
                year: this.state.year,
                genre: this.state.genre,
                lyrics: this.state.lyrics
            }
            console.log("New song to add:", newSong)
            songs.push(newSong)
            console.log("NEW SONG ARRAY", songs)
            await AsyncStorage.setItem(this.props.user, JSON.stringify(songs))
            await AsyncStorage.setItem("indexGenerator", newIndex.toString())
        } else {
            Alert.alert("Song with same id already existing")
        }
    }

    render() {
        return(
            <View>
                <View>
                    <Text>Id:</Text>
                    <TextInput
                        placeholder={'Id'}
                        value={(-1).toString()}
                        editable={false}
                    />
                </View>
                <View>
                    <Text>Artist:</Text>
                    <TextInput
                        placeholder={'Artist'}
                        value={this.state.artist}
                        onChangeText = {(text) => {
                            this.setState({artist: text})
                        }}
                    />
                </View>
                <View>
                    <Text>Title:</Text>
                    <TextInput
                        placeholder={'Title'}
                        value={this.state.title}
                        onChangeText = {(text) => {
                            this.setState({title: text})
                        }}
                    />
                </View>
                <View>
                    <Text>Album:</Text>
                    <TextInput
                        placeholder={'Album'}
                        value={this.state.album}
                        onChangeText = {(text) => {
                            this.setState({album: text})
                        }}
                    />
                </View>
                <View>
                    <Text>Year:</Text>
                    <TextInput
                        placeholder={'Year'}
                        value={this.state.year}
                        onChangeText = {(text) => {
                            this.setState({year: text})
                        }}
                    />
                </View>
                <View>
                    <Text>Genre:</Text>
                    <TextInput
                        placeholder={'Genre'}
                        value={this.state.genre}
                        onChangeText = {(text) => {
                            this.setState({genre: text})
                        }}
                    />
                </View>
                <View>
                    <Text>Lyrics:</Text>
                    <TextInput
                        placeholder={'Lyrics'}
                        value={this.state.lyrics}
                        onChangeText = {(text) => {
                            this.setState({lyrics: text})
                        }}
                    />
                </View>
                <View >
                    <Button
                            title={'Save'}
                            onPress = {() => this._addSong()}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchSongToProps = (dispatch) => {
    return {
        addSong: (item) => {
            dispatch(addSong(item))
        }
    }
}

export default connect(
    () => {return{}},
    mapDispatchSongToProps
)(AddSongItem)