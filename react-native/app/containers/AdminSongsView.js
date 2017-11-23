import React, { Component } from 'react';
import connect from "react-redux/src/connect/connect";
import {TouchableHighlight, View, FlatList, Text, Button} from "react-native";
import {Actions} from "react-native-router-flux";
import {sendMail} from "./Common";


class AdminSongsView extends Component {
    constructor(props) {
        super(props)
    }

    keyExtractor = (item, index) => item.id;

    onSelectedItem = (item) => {
        console.log(item)
        Actions.songDetails({song: item});
    }

    showSongItem = ({item}) => {
        console.log("Item to show:", item);
        return (
            <TouchableHighlight style={{marginBottom: 5}} onPress = {() => {this.onSelectedItem(item)}}>
                <Text>Id: {item.id}| Lyrics: {item.lyrics.substr(0, 100)}</Text>
            </TouchableHighlight>
        )
    }

    render() {
        //console.log("Props", this.props)
        return(
            <View>
                <Text style={{fontSize: 14}}>Songs</Text>
                <View style={{margin:10}}/>
                <FlatList
                    data={this.props.songs}
                    keyExtractor = {this.keyExtractor}
                    renderItem = {this.showSongItem}
                />
                <View>
                <Button
                    title={'Send mail'}
                    onPress={() => sendMail(this.props.songs)}
                />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("Map state");
    return {
        songs: state.songs
    }
}

export default connect(
    mapStateToProps,
    {}
)(AdminSongsView);