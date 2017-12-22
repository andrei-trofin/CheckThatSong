import React, { Component } from 'react';
import {Text, View, TextInput, Button, AsyncStorage, Alert, TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import {editSong, deleteSong} from "../actions/index";
import DateTimePicker from 'react-native-modal-datetime-picker'
import {connect} from 'react-redux'

let yearsList = []

class EditSongItem extends Component {

    constructor(props){
        super(props)
        //console.log(this.props.song)
        this.state = {
            id: this.props.song.id,
            artist: this.props.song.artist,
            title: this.props.song.title,
            album: this.props.song.album,
            year: this.props.song.year,
            genre: this.props.song.genre,
            lyrics: this.props.song.lyrics,
            isDatePickerVisible: false,
        }
        console.log("IS PICKER HERE", this.state.isDatePickerVisible)
    }

    showPicker = () => {
        this.setState({
            isDatePickerVisible: true
        })
    }

    handleDate = (date) => {
        let yearS = date.getFullYear()
        yearS = yearS.toString()
        this.setState({year: yearS})
    }

    hidePicker = () => {
        this.setState({
            isDatePickerVisible: false
        })
    }

    _updateSong() {
        this.props.updateSong(this.state)
        this.updateSong().then(() => {
            Actions.pop();
            Actions.refresh({addedAt: Date.now()});
        })
    }

    _deleteSong() {
        //this.props.deleteSong(this.state)
        this.deleteSong().then(() => {
            Actions.pop();
            Actions.refresh({addedAt: Date.now()});
        })

    }

    async updateSong() {
        let song = JSON.parse(JSON.stringify(this.state))

        let songs = await AsyncStorage.getItem(this.props.user)
        console.log("SONGS GET FROM UPDATE", songs)
        songs = JSON.parse(songs)

        if (songs === null || songs === undefined) {
            songs = []
        }

        let index = songs.findIndex((t) => {
            return t.id === song.id
        })
        console.log("INDEX FOUND", index)

        if (index !== -1) {
            songs[index] = song
            console.log("New songs:", songs)
            await AsyncStorage.setItem(this.props.user, JSON.stringify(songs))
        } else {
            Alert.alert("Unable to find song to update")
        }
    }

    async deleteSong() {
        let song = JSON.parse(JSON.stringify(this.state))

        let songs = await AsyncStorage.getItem(this.props.user)
        songs = JSON.parse(songs)

        if (songs === null || songs === undefined) {
            songs = []
        }

        let index = songs.findIndex((t) => {
            return t.id === song.id
        })
        console.log("INDEX FOUND", index)

        if (index !== -1) {

            console.log("Song to delete:", song)
            songs.splice(index, 1)
            console.log("NEW SONGLIST", songs)
            await AsyncStorage.setItem(this.props.user, JSON.stringify(songs))
            console.log("Do we get here")
        } else {
            Alert.alert("Unable to find song to update")
        }
    }


    render() {
        //console.log("Entered render")
        return(

            <View>
                <View>
                    <Text>Id:</Text>
                    <TextInput
                        placeholder={'Id'}
                        value={this.state.id.toString()}
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
                <TouchableOpacity
                    onPress={() => {
                        console.log("FOCUUUS")
                        this.showPicker()
                    }}>
                <View>

                        <Text>Year:</Text>
                        <TextInput
                             editable = {false}
                             placeholder={'Year'}
                             value={this.state.year}
                        />
                </View>
                </TouchableOpacity>
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
                <View>
                    <Button
                            title={'Delete'}
                            onPress = {() => this._deleteSong()}
                    />
                    <View style = {{height: 10}}/>
                    <Button 
                        title={'Save'}
                        onPress = {() => this._updateSong()}
                    />
                </View>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDate}
                    onCancel={this.hidePicker}
                    mode={"date"}
                />
        </View>

        )
    }
}

const mapDispatchSongToProps = (dispatch) => {
    return {
        updateSong: (item) => {
            dispatch(editSong(item))
        },
        deleteSong: (item) => {
            dispatch(deleteSong(item))
        }
    }
}

export default connect(
    () => {return{}},
    mapDispatchSongToProps
)(EditSongItem)