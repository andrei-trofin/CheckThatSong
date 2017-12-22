package com.example.andrei.songsapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.andrei.songsapp.Entities.SongsDB;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SongDetailsActivity extends AppCompatActivity {
    private EditText inputArtist;
    private EditText inputTitle;
    private EditText inputAlbum;
    private EditText inputYear;
    private EditText inputGenre;
    private EditText inputLyrics;
    int position;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_song_details);

        int year;
        String artist, title, album, genre, lyrics;

        Intent intent = getIntent();
        position = intent.getIntExtra("position",-1);
        year = intent.getIntExtra("year", 0);
        artist = intent.getStringExtra("artist");
        title = intent.getStringExtra("title");
        album = intent.getStringExtra("album");
        genre = intent.getStringExtra("genre");
        lyrics = intent.getStringExtra("lyrics");

        inputArtist = (EditText) findViewById(R.id.inputArtist);
        inputTitle = (EditText) findViewById(R.id.inputTitle);
        inputAlbum = (EditText) findViewById(R.id.inputAlbum);
        inputYear = (EditText) findViewById(R.id.inputYear);
        inputGenre = (EditText) findViewById(R.id.inputGenre);
        inputLyrics = (EditText) findViewById(R.id.inputLyrics);

        if (artist != null && artist != "") {
            inputArtist.setText(artist);
        }
        if (title != null && title != "") {
            inputTitle.setText(title);
        }
        if (album != null && album != "") {
            inputAlbum.setText(album);
        }
        if (year != 0) {
            inputYear.setText(String.valueOf(year));
        }
        if (genre != null && genre != "") {
            inputGenre.setText(genre);
        }
        if (lyrics != null && lyrics != "") {
            inputLyrics.setText(lyrics);
        }
    }

    public void saveSong(View view) {
        String artist = inputArtist.getText().toString();
        String title = inputTitle.getText().toString();
        String album = inputAlbum.getText().toString();
        String year = inputYear.getText().toString();
        String genre = inputGenre.getText().toString();
        String lyrics = inputLyrics.getText().toString();

        if (artist.equals("(Unknown)")) {
            artist = "";
        }
        if (title.equals("(Unknown)")) {
            title = "";
        }
        if (album.equals("(Unknown)")) {
            album = "";
        }
        if (year.equals("(Unknown)")) {
             year = "0";
        }
        if (genre.equals("(Unknown)")) {
            genre = "";
        }
        if (lyrics.equals("(Unknown)")) {
            lyrics = "";
        }

        SongsDB originalSong = AdminActivity.songsDB.get(position);
        final SongsDB song = new SongsDB(originalSong.id, artist, title, album,
                                    Integer.parseInt(year), genre, lyrics, originalSong.userId);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                AdminActivity.db.songDao().updateSong(song);
            }
        });


        ExecutorService executor2 = Executors.newSingleThreadExecutor();
        executor2.execute(new Runnable() {
            @Override
            public void run() {
                List<SongsDB> songsss = AdminActivity.db.songDao().getAllSongs();
                for (SongsDB song1: songsss) {
                    Log.d("SONG", song1.toString());
                }
            }
        });

        AdminActivity.songsDB.get(position).setArtist(artist);
        AdminActivity.songsDB.get(position).setTitle(title);
        AdminActivity.songsDB.get(position).setAlbum(album);
        AdminActivity.songsDB.get(position).setYear(Integer.parseInt(year));
        AdminActivity.songsDB.get(position).setGenre(genre);
        AdminActivity.songsDB.get(position).setLyrics(lyrics);

        AdminActivity.adapter.notifyDataSetChanged();
        finish();
    }

    public void deleteSong(View view) {
        final SongsDB song = AdminActivity.songsDB.get(position);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                AdminActivity.db.songDao().deleteSong(song);
            }
        });

        ExecutorService executor2 = Executors.newSingleThreadExecutor();
        executor2.execute(new Runnable() {
            @Override
            public void run() {
                List<SongsDB> songs = AdminActivity.db.songDao().getAllSongs();
                for (SongsDB songDB: songs) {
                    Log.d("SONG", songDB.toString());
                }
            }
        });


        AdminActivity.songsDB.remove(position);
        AdminActivity.adapter.notifyDataSetChanged();
        finish();
    }
}
