package com.example.andrei.songsapp;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.andrei.songsapp.Database.AppDatabase;
import com.example.andrei.songsapp.Entities.Song;
import com.example.andrei.songsapp.Entities.SongsDB;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AdminActivity extends AppCompatActivity {

    public static List<Song> songs;
    public static List<SongsDB> songsDB;
    public static ArrayAdapter<SongsDB> adapter;
    private String mail;
    public static AppDatabase db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);

        mail = getIntent().getStringExtra("mail");
        db = AppDatabase.getAppDatabase(this);
        //PrePopulateListTask prepTask = new PrePopulateListTask();
        //prepTask.execute();
        PopulateListTask popTask = new PopulateListTask();
        popTask.execute();

//        songs = new ArrayList<>();
//        songs.add(new Song("Imagine Dragons", "Thunder",
//                "I was lightning, before the thunder"));
//        songs.add(new Song("Gorillaz", "Clint Eastwood",
//                "Finally someone let me out of my cage"));
//        songs.add(new Song("The Animals", "House of the rising sun",
//                "There is a house in New Orleans"));
//        songs.add(new Song("Temper Trap", "Sweet Disposition",
//                "Won;t stop to surrender"));

//        ListView songListView = (ListView) findViewById(R.id.adminSongList);
//        adapter =
//                new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, songsDB);
//        songListView.setAdapter(adapter);
//        songListView.setOnItemClickListener(viewSongDetails);

    }

    private AdapterView.OnItemClickListener viewSongDetails = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Log.d("we got here!", "I was cliiiicked on position: " + position);
            SongsDB song = songsDB.get(position);
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
        for (SongsDB s: songsDB) {
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

    public void addSongGo(View view) {
        Intent intent = new Intent(AdminActivity.this, AddSongActivity.class);
        intent.putExtra("username", mail);

        startActivityForResult(intent, 100);
    }

    public void setTheAdapter() {
        ListView songListView = (ListView) findViewById(R.id.adminSongList);
        adapter =
                new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, songsDB);
        songListView.setAdapter(adapter);
        songListView.setOnItemClickListener(viewSongDetails);
    }

    private void populateInitialDB(final String username) {
        final List<SongsDB> songs = new ArrayList<SongsDB>() {{
            add(new SongsDB("Imagine Dragons", "Thunder",
                    "I was lightning, before the thunder"));
            add(new SongsDB("Gorillaz", "Clint Eastwood",
                    "Finally someone let me out of my cage"));
            add(new SongsDB("The Animals", "House of the rising sun",
                    "There is a house in New Orleans"));
            add(new SongsDB("Temper Trap", "Sweet Disposition",
                    "Won;t stop to surrender"));
        }};

        for (SongsDB song: songs) {
            song.userId = username;
        }

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.songDao().insertSongs(songs);
            }
        });
        Log.d("DB", "Initial database populated");
    }

    public void fetchData() {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                songsDB = db.songDao().getCurrentSongs(mail);
                //songsDB = db.songDao().getAllSongs();
                Log.d("DB","Did I get anything?");
            }
        });
    }

    private class PrePopulateListTask extends AsyncTask<Void, Void, Boolean> {
        @Override
        protected void onPreExecute() {
            Log.d("ADMINView","Pre-Loading");
        }

        @Override
        protected Boolean doInBackground(Void... result) {
            populateInitialDB(mail);
            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            //do something
            Log.d("DB", "DB was populated");
        }
    }

    private class PopulateListTask extends AsyncTask<Void, Void, Boolean> {
        @Override
        protected void onPreExecute() {
            Log.d("ADMINView","Pre-Loading");
        }

        @Override
        protected Boolean doInBackground(Void... result) {
            fetchData();
            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            //do something
            setTheAdapter();
        }
    }

    public void goToChart(View view) {
        Intent intent = new Intent(AdminActivity.this, ChartsActivity.class);
        intent.putExtra("username", mail);

        startActivity(intent);
    }
}
