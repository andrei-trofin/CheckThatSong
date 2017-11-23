import {Linking} from 'react-native'

const defaultMail = 'andrei.trofin7@gmail.com'

export const sendMail = (songs) => {
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