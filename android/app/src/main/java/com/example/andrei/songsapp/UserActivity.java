package com.example.andrei.songsapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.andrei.songsapp.Entities.Song;

import java.util.ArrayList;
import java.util.List;

public class UserActivity extends AppCompatActivity {
    public final static String EXTRA_MESSAGE = "com.example.andrei.songsapp.message";
    public static List<Song> songs;
    public static ArrayAdapter<Song> adapter;
    private String mail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

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

        ListView songListView = (ListView) findViewById(R.id.userSongList);
        adapter =
                new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, songs);
        songListView.setAdapter(adapter);
    }

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
