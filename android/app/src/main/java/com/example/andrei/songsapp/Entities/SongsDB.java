package com.example.andrei.songsapp.Entities;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.ForeignKey;
import android.arch.persistence.room.PrimaryKey;

@Entity(tableName = "songs",
        foreignKeys = @ForeignKey(entity = User.class, parentColumns = "username",
                                  childColumns = "userId"))
public class SongsDB {

    @PrimaryKey(autoGenerate = true)
    public int id;


    private String artist;
    private String title;
    private String album;
    private int year;
    private String genre;
    private String lyrics;
    public String userId;

    public SongsDB() {

    }
    public SongsDB(final String lyrics) {
        this.lyrics = lyrics;
    }

    public SongsDB(final String artist, final String title, final String lyrics) {
        this(lyrics);
        this.artist = artist;
        this.title = title;
    }

    public SongsDB(final String artist, final String title, final String album,
                   final int year, final String genre, final String lyrics, final String userId) {
        this(artist, title, lyrics);
        this.year = year;
        this.album = album;
        this.genre = genre;
        this.userId = userId;
    }

    public SongsDB(final int id, final String artist, final String title, final String album,
                final int year, final String genre, final String lyrics, final String userId) {
        this(artist, title, lyrics);
        this.id = id;
        this.year = year;
        this.album = album;
        this.genre = genre;
        this.userId = userId;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    @Override
    public String toString() {
        if (this.artist != null && this.title != null) {
            return "Artist: " + this.artist + " |\tTitle: " + this.title;
        }
        else {
            return "Heard lyrics: " + this.lyrics.substring(0, 30) + "...";
        }
    }
}
