package com.example.andrei.songsapp.DAO;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import com.example.andrei.songsapp.Entities.SongsDB;
import com.example.andrei.songsapp.Entities.User;

import java.util.List;

@Dao
public interface SongDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public long insertSong(SongsDB song);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertSongs(List<SongsDB> songs);

    @Update
    public void updateSong(SongsDB song);

    @Delete
    public void deleteSong(SongsDB song);

    @Query("SELECT * FROM songs " +
            "INNER JOIN users ON songs.userId = users.username " +
            "WHERE users.username = :username"
    )
    public List<SongsDB> getCurrentSongs(String username);

    @Query("SELECT * FROM songs")
    public List<SongsDB> getAllSongs();

    @Query("SELECT * FROM songs " +
            "INNER JOIN users ON songs.userId = users.username " +
            "WHERE users.username = :username AND songs.lyrics = :lyrics " +
            "AND songs.artist = :artist AND songs.title = :title"
    )
    public List<SongsDB> getUserSongByLyrics(String username, String artist,
                                             String title, String lyrics);
}
