import {AsyncStorage} from 'react-native'
import {EDIT_SONG, ADD_SONG, DELETE_SONG} from "../actions/types";

const initialState = {
    users: [
        {
            id: 1,
            username: 'a@a.com',
            password: 'aaaaa'
        },
    ],
    songs: [
        {
            id: 1,
            artist: 'Kurt Cobain',
            title: 'Where did you sleep last night?',
            album: 'Tracks',
            year: '1985',
            genre: 'Alternative-Rock',
            lyrics: 'Tell me where did you sleep last night'
        },
        {
            id: 2,
            artist: 'Keo',
            title: 'Drum spre Hyo',
            album: 'Tarana',
            year: '2007',
            genre: 'Rap',
            lyrics: 'Adu-ma iar plutind'
        },
        {
            id: 3,
            artist: 'Metallica',
            title: 'The day that never comes',
            album: 'BestAlbumEver',
            year: '1972',
            genre: 'Rock',
            lyrics: 'The sunshine\'s coming through'
        },
        {
            id: 4,
            artist: 'Fuego',
            title: 'Focul inimii',
            album: 'Din suflet',
            year: '2000',
            genre: 'Muzica de calitate',
            lyrics: 'Cu fuiorul trec amorul'
        },
    ],
}


async function getSongsFromUser(user) {
    let songsFromUserString = await AsyncStorage.getItem(user)
    console.log("RESULTS FROM REDUCER GET", songsFromUserString)
    try {
        let songsFromUser = JSON.parse(songsFromUserString)
        if (songsFromUser === null) {
            songsFromUser = []
        }
        return songsFromUser
    } catch (error) {
        console.log("ERROR", error)
    }
}

function songs(state = [], action) {
    console.log("SONGS: ", state);
    switch(action.type) {
        case EDIT_SONG:
            return updateSongs(state, action);
            break;
        case ADD_SONG:
            return addSongs(state, action);
            break
        case DELETE_SONG:
            return deleteSongs(state, action);
            break
        default:
            return state;
    }
}

function users(state = [], action) {
    console.log("USERS: ", state)
    switch(action.type) {
        default:
            return state
    }
}

function updateSongs(state = [], action) {
    return state.map((song) => {
        if (song.id == action.id) {
            return Object.assign({}, song, {
                artist: action.artist,
                title: action.title,
                album: action.album,
                year: action.year,
                genre: action.genre,
                lyrics: action.lyrics
            });
        }
        return song;
    });
}

async function addSongs(state = [], action) {
    let newSong = {
        id: action.id,
        artist: action.artist,
        title: action.title,
        album: action.album,
        year: action.year,
        genre: action.genre,
        lyrics: action.lyrics
    }
    let suongs = []
    await getSongsFromUser("a@a.com").then((result) => {
        suongs = result
    })
    console.log("SONGLIST in ADD", suongs)
    console.log("New song to be added", newSong)
    // console.log("STATE", state)
    //console.log("NEW SONGS", [...state.songs, newSong])
    return {
        songs: [...suongs, newSong]
    }
}

function deleteSongs(state = [], action) {
    return
        state.filter( (item) => item.id !== action.id)

}


export const reducer = (state = initialState, action ) => {
    console.log("Reducer")
    return {
        users: users(state.users, action),
        songs: songs(state.songs, action)
    }
}