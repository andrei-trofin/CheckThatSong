package com.example.andrei.songsapp;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Resources;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.andrei.songsapp.Entities.SongsDB;

import java.lang.reflect.Field;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class AddSongActivity extends AppCompatActivity {
    private String mail;
    private SongsDB songToAdd;
    private AlertDialog yearPickerDialog;

    private DatePickerDialog.OnDateSetListener yearListener =
            new DatePickerDialog.OnDateSetListener(){
                @Override
                public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                    ((EditText) findViewById(R.id.inputYear)).setText(Integer.toString(year));
                }
            };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_song);

        Intent intent = getIntent();
        mail = intent.getStringExtra("username");

        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);

        yearPickerDialog = createNumberPickerDialog(year);

        ((EditText) findViewById(R.id.inputYear)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                yearPickerDialog.show();
            }
        });

    }

    public void addSong(View view) {
        String inputArtist = ((EditText) findViewById(R.id.inputArtist)).getText().toString();
        String inputTitle = ((EditText) findViewById(R.id.inputTitle)).getText().toString();
        String inputAlbum = ((EditText) findViewById(R.id.inputAlbum)).getText().toString();
        String inputYear = ((EditText) findViewById(R.id.inputYear)).getText().toString();
        String inputGenre = ((EditText) findViewById(R.id.inputGenre)).getText().toString();
        String inputLyrics = ((EditText) findViewById(R.id.inputLyrics)).getText().toString();

        if (inputArtist.equals("(Unknown)")) {
            inputArtist = "";
        }
        if (inputTitle.equals("(Unknown)")) {
           inputTitle = "";
        }
        if (inputAlbum.equals("(Unknown)")) {
           inputAlbum = "";
        }
        if (inputYear.equals("(Unknown)")) {
           inputYear = "0";
        }
        if (inputGenre.equals("(Unknown)")) {
           inputGenre = "";
        }
        if (inputLyrics.equals("(Unknown)")) {
            inputLyrics = "";
        }

        final SongsDB song = new SongsDB(inputArtist, inputTitle, inputAlbum,
                Integer.parseInt(inputYear), inputGenre, inputLyrics, mail);


        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                int id = (int) AdminActivity.db.songDao().insertSong(song);

                giveIdToSong(id, song);
            }
        });
        executor.shutdown();
        try {
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        AdminActivity.songsDB.add(songToAdd);
        AdminActivity.adapter.notifyDataSetChanged();
        finish();
    }

    public void giveIdToSong(final int id, final SongsDB song) {
        SongsDB newSong = new SongsDB(id, song.getArtist(), song.getTitle(), song.getAlbum(),
                song.getYear(), song.getGenre(), song.getLyrics(), song.userId);

        songToAdd = newSong;
    }

    public void showYearPicker() {
        yearPickerDialog.show();
    }

    public AlertDialog createNumberPickerDialog(int currentYear) {
        final AlertDialog.Builder d = new AlertDialog.Builder(this);
        LayoutInflater inflater = this.getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.number_picker_dialog, null);
        d.setTitle("Year picker");
        d.setMessage("Pick song year");
        d.setView(dialogView);
        final NumberPicker numberPicker = (NumberPicker) dialogView.findViewById(R.id.dialog_number_picker);
        numberPicker.setMaxValue(currentYear);
        numberPicker.setMinValue(1200);
        numberPicker.setValue(currentYear);
        numberPicker.setWrapSelectorWheel(false);
        numberPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker numberPicker, int i, int i1) {
            }
        });
        d.setPositiveButton("Done", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                ((EditText) findViewById(R.id.inputYear))
                        .setText(Integer.toString(numberPicker.getValue()));
            }
        });
        d.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
            }
        });
        AlertDialog alertDialog = d.create();

        return alertDialog;
    }
}
