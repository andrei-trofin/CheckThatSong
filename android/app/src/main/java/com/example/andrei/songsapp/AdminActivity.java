package com.example.andrei.songsapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class AdminActivity extends AppCompatActivity {

    public static List<Song> songs;
    public static ArrayAdapter<Song> adapter;
    private String mail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);

        mail = getIntent().getStringExtra("mail");

        songs = new ArrayList<>();
        songs.add(new Song("Imagine Dragons", "Thunder",
                "I was lightning, before the thunder"));
        songs.add(new Song("Gorillaz", "Clint Eastwood",
                "Finally someone let me out of my cage"));
        songs.add(new Song("The Animals", "House of the rising sun",
                "There is a house in New Orleans"));
        songs.add(new Song("Temper Trap", "Sweet Disposition",
                "Won;t stop to surrender"));

        ListView songListView = (ListView) findViewById(R.id.adminSongList);
        adapter =
                new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, songs);
        songListView.setAdapter(adapter);
        songListView.setOnItemClickListener(viewSongDetails);

    }

    private AdapterView.OnItemClickListener viewSongDetails = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Log.d("we got here!", "I was cliiiicked");
            Song song = songs.get(position);
            Intent intent = new Intent(AdminActivity.this, SongDetailsActivity.class);
            intent.putExtra("position", position);
            intent.putExtra("artist", song.getArtist());
            intent.putExtra("title", song.getTitle());
            intent.putExtra("year", song.getYear());
            intent.putExtra("genre", song.getGenre());
            intent.putExtra("album", song.getAlbum());
            intent.putExtra("lyrics", song.getLyrics());

            startActivityForResult(intent, 100);
        }


    };

    public void sendMail(View view) {
        String body = "";
        for (Song s: songs) {
            body += s.toString() + "\n";
        }
        String title = "Here are some cool songs";
        String[] emails = {mail};

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_EMAIL, emails);
        intent.putExtra(Intent.EXTRA_SUBJECT, title);
        intent.putExtra(Intent.EXTRA_TEXT, body);
        intent.setType("message/rfc822");

        startActivity(intent);
    }
}
