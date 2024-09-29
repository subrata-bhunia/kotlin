package com.example.myprojectkotlin

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.myprojectkotlin.api.NetworkResponse
import com.example.myprojectkotlin.api.WeatherModel

@Composable
fun WeatherPage(viewModel: WeatherViewModel) {
    var city by remember {
        mutableStateOf("")
    }
    val weatherResult = viewModel.weatherData.observeAsState()

    val keyboardController = LocalSoftwareKeyboardController.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            OutlinedTextField(
                modifier = Modifier.weight(1f),
                value = city,
                onValueChange =
                {
                city = it
                },
               label = {
                   Text(text = "Search for any location")
               })
            IconButton(onClick = {
                viewModel.getData(city)
                keyboardController?.hide()
            }) {
                Icon(imageVector = Icons.Default.Search, contentDescription ="Search Icon" )
            }
        }
        when(val res = weatherResult.value){
            is NetworkResponse.Error -> {
                Text(text = res.message)
            }
            NetworkResponse.Loading -> {
                CircularProgressIndicator()
            }
            is NetworkResponse.Success -> {
               WeatherDetails(data = res.data)
            }
            null -> {

            }
        }
    }
}

@Composable
fun WeatherDetails(data:WeatherModel) {
    Column(modifier = Modifier
        .fillMaxWidth()
        .padding(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.Start, verticalAlignment = Alignment.Bottom) {
            Icon(imageVector = Icons.Default.LocationOn, contentDescription = "loc", modifier = Modifier.size(40.dp))
            Text(text = data.location.name, fontSize = 30.sp)
            Text(text = "(${data.location.country})", fontSize = 20.sp, color = Color.Gray)
        }
        Spacer(modifier = Modifier.height(20.dp))
        Text(text = "${data.current.temp_c}°C", fontSize = 56.sp, fontStyle = FontStyle.Normal, fontWeight = FontWeight(600) )
        Text(text = "Feel Like (${data.current.feelslike_c}°C)",fontSize = 16.sp, fontStyle = FontStyle.Italic, fontWeight = FontWeight(100), textAlign = TextAlign.Center, color = Color.DarkGray)
        AsyncImage(model = "https:${data.current.condition.icon}".replace("64x64","128x128"), contentDescription = "" , modifier = Modifier.size(160.dp))
        Text(text = data.current.condition.text, fontSize = 20.sp, textAlign = TextAlign.Center, color = Color.DarkGray)
        Spacer(modifier = Modifier.height(20.dp))
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.fillMaxWidth()) {
                Row (modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround){
                    WeatherKeyValue(key = "Humidity", value = data.current.humidity)
                    WeatherKeyValue(key = "Wind Speed", value = data.current.wind_kph+" km/h")
                }
                Row (modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround){
                    WeatherKeyValue(key = "UV", value = data.current.uv)
                    WeatherKeyValue(key = "Participation", value = data.current.precip_mm+" mm")
                }
                Row (modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround){
                    WeatherKeyValue(key = "Date", value = data.location.localtime.split(" ")[0])
                    WeatherKeyValue(key = "Time", value = data.location.localtime.split(" ")[1])
                }
            }

        }
    }

}

@Composable
fun WeatherKeyValue(key:String,value: String) {
    Column (modifier = Modifier.padding(16.dp), horizontalAlignment = Alignment.CenterHorizontally){
        Text(text = value, fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Text(text = key, fontWeight = FontWeight.SemiBold, color = Color.Gray)
    }
}