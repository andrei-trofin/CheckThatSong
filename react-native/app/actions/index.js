import {EDIT_SONG} from "./types"

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