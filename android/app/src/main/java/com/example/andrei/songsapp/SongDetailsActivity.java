package com.example.andrei.songsapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

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

        AdminActivity.songs.get(position).setArtist(artist);
        AdminActivity.songs.get(position).setTitle(title);
        AdminActivity.songs.get(position).setAlbum(album);
        AdminActivity.songs.get(position).setYear(Integer.parseInt(year));
        AdminActivity.songs.get(position).setGenre(genre);
        AdminActivity.songs.get(position).setLyrics(lyrics);

        AdminActivity.adapter.notifyDataSetChanged();
        finish();
    }
}
