import React, { Component } from 'react';
import {Text, View, TextInput, Button, AsyncStorage, Alert, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {Actions} from "react-native-router-flux";
import {addSong} from "../actions/index";
import {connect} from 'react-redux'
import {Pie} from 'react-native-pathjs-charts'
import PieChart from 'react-native-pie-chart';


class PieChartView extends Component {

    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            songs: this.props.songs,
            filteredSongs: [
                {
                    "name": "Known",
                    "count": 0
                },
                {
                    "name": "Unknown",
                    "count": 10
                }
            ]
        }
    }

    componentDidMount() {
        this.filterSongsByTitle()
    }

    filterSongsByTitle() {
        let dict = {};
        let result = [];
        let category = ""
        console.log("CURRENT CHART STATE", this.state)
        for (let i = 0; i < this.state.songs.length; i++) {
            console.log("TITLE", this.state.songs[i].title)
            if (this.state.songs[i].title === "") {
                console.log("CURRENT SONG", this.state.songs[i])
                category = "Unknown"
            } else {
                category = "Known"
            }
            if (dict[category] === undefined) {
                dict[category] = 1;
            } else {
                dict[category]++;
            }
        }

        dict = Object.keys(dict).map((key, index) => {
            result.push({
                "name": key,
                "count": dict[key]
            })
        });

        this.setState({filteredSongs: result})
    }

    render() {
        let data = this.state.filteredSongs;
        let series = []
        if (this.state.songs === []) {
            series = [0, 10]
        } else {
            series = [data[0].count, data[1].count]
        }
        const chart_wh = 250
        const sliceColor = ['#F44336','#2196F3']

        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={true}
                    />
                    <Text style={styles.title}>Known vs Unknown songs</Text>
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        margin: 10
    }
});

export default connect(
    () => {return{}},
    {}
)(PieChartView)