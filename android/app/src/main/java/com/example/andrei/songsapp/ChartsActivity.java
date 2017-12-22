package com.example.andrei.songsapp;

import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.example.andrei.songsapp.Entities.SongsDB;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ChartsActivity extends AppCompatActivity {
    private String username;
    private List<SongsDB> songs;
    private List<PieEntry> yEntries;
    private List<String> xEntries;
    private PieDataSet dataSet;
    PieChart pieChart;
    private static String TAG = "PIECHART";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charts);

        Intent intent = getIntent();
        username = intent.getStringExtra("username");

        populateSongs();

        pieChart = (PieChart) findViewById(R.id.idPieChart);
        pieChart.setRotationEnabled(true);

        addDataSet();

    }

    private void addDataSet() {
        Log.d(TAG, "Starting add data set");
        int known = 0;
        int unknown = 0;
        for (SongsDB song: songs) {
            if (song.getArtist() != null && !song.getArtist().equals("")) {
                known += 1;
            } else {
                unknown += 1;
            }
        }

        yEntries = new ArrayList<>();
        yEntries.add(new PieEntry(known, 0));
        yEntries.add(new PieEntry(unknown, 1));

        xEntries = new ArrayList<>();
        xEntries.add("Known songs");
        xEntries.add("Unknown songs");

        //create data set
        dataSet = new PieDataSet(yEntries, "# of songs");
        dataSet.setSliceSpace(2);
        dataSet.setValueTextSize(14);

        ArrayList<Integer> colors = new ArrayList<>();
        colors.add(Color.BLUE);
        colors.add(Color.RED);

        dataSet.setColors(colors);

        // Add legend to chart
        Legend legend = pieChart.getLegend();
        legend.setForm(Legend.LegendForm.CIRCLE);
        legend.setPosition(Legend.LegendPosition.LEFT_OF_CHART);

        PieData pieData = new PieData(dataSet);
        pieChart.setData(pieData);
        pieChart.invalidate();

    }

    private void populateSongs() {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                songs = AdminActivity.db.songDao().getCurrentSongs(username);
            }
        });
        executor.shutdown();
        try {
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
