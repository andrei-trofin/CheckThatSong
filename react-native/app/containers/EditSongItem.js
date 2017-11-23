import React, { Component } from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {editSong} from "../actions/index";
import {connect} from 'react-redux'

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
            lyrics: this.props.song.lyrics
        }
    }

    _updateSong() {
        this.props.updateSong(this.state)
    }


    render() {
        console.log("Entered render")
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
                <View>
                    <Button
                        title={'Save'}
                        onPress = {() => this._updateSong()}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchSongToProps = (dispatch) => {
    return {
        updateSong: (item) => {
            dispatch(editSong(item))
        }
    }
}

export default connect(
    () => {return{}},
    mapDispatchSongToProps
)(EditSongItem)