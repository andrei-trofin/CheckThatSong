
import {EDIT_SONG} from "../actions/types";

const initialState = {
    userName: '',
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

function songs(state = [], action) {
    console.log("SONGS: ", state);
    switch(action.type){
        case EDIT_SONG:
            return updateSongs(state, action);
            break;
        default:
            return state;
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

export const reducer = (state = initialState, action ) => {
    console.log("Reducer")
    return {
        userName: '',
        songs: songs(state.songs, action)
    }
}