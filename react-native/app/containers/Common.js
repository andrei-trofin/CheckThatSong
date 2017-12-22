import {Linking, AsyncStorage} from 'react-native'

const defaultMail = 'andrei.trofin7@gmail.com'

async function getCache() {
    try {
        console.log("Sending a mail, aren;t we\n")
        const value = await AsyncStorage.getItem("BA");
        console.log("Ceva doar")
        //console.log("VAlue: " + value)
    } catch (error) {

    }
}

export const  sendMail = (songs) => {

    getCache().then(() => {
        console.log("GET CAHCE FINISHED")
    })

    let url = "mailto:"
    url += defaultMail
    url += '?subject='
    url += 'Favorite Songs'
    url += '&body='
    let songsBody = ''
    for (let i = 0; i < songs.length; i++) {
        songsBody = 'Title: ' + songs[i].title + '\n' + 'Artist: ' + songs[i].artist + '\n\n'
        url += songsBody
    }
    console.log("URL: ",url)
    Linking.openURL(url)
}