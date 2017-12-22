import {EDIT_SONG, DELETE_SONG, ADD_SONG} from "./types"

export function editSong(song) {
    console.log("ACTION TYPE:", EDIT_SONG)
    return {
        type: EDIT_SONG,
        id: song.id,
        artist: song.artist,
        title: song.title,
        album: song.album,
        year: song.year,
        genre: song.genre,
        lyrics: song.lyrics
    }
}

export function deleteSong(song) {
    console.log("ACTION TYPE:", DELETE_SONG)
    return {
        type: DELETE_SONG,
        id: song.id,
        artist: song.artist,
        title: song.title,
        album: song.album,
        year: song.year,
        genre: song.genre,
        lyrics: song.lyrics
    }
}

export function addSong(song) {
    console.log("ACTION TYPE:", ADD_SONG)
    return {
        type: ADD_SONG,
        id: song.id,
        artist: song.artist,
        title: song.title,
        album: song.album,
        year: song.year,
        genre: song.genre,
        lyrics: song.lyrics
    }
}