package com.example.andrei.songsapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class DisplayMessageActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_message);

        //Get intent
        Intent intent = getIntent();
        String message = intent.getStringExtra(UserActivity.EXTRA_MESSAGE);

        //Capture layout's textView and set the String accordingly
        TextView textView = findViewById(R.id.textView);
        textView.setText(message);
    }
}
