package com.example.myprojectkotlin

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.lifecycle.ViewModelProvider
import com.example.myprojectkotlin.ui.theme.MyProjectKotlinTheme

class MainActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val weatherViewModel = ViewModelProvider(this)[WeatherViewModel::class.java]
//        enableEdgeToEdge()
        setContent {
            MyProjectKotlinTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) {
                    WeatherPage(weatherViewModel)
                }
            }
        }
    }
}
