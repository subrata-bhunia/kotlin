package com.example.myprojectkotlin

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.myprojectkotlin.api.Constant
import com.example.myprojectkotlin.api.NetworkResponse
import com.example.myprojectkotlin.api.RetrofitInstance
import com.example.myprojectkotlin.api.WeatherModel
import kotlinx.coroutines.launch

class WeatherViewModel:ViewModel() {
    private val weatherApi = RetrofitInstance.weatherApi
    private val _weatherResult = MutableLiveData<NetworkResponse<WeatherModel>>()
    val weatherData:LiveData<NetworkResponse<WeatherModel>> = _weatherResult
    init {
        getData("Kolkata")
    }
    fun getData(city:String){
        _weatherResult.value = NetworkResponse.Loading
        viewModelScope.launch {
            try {
                val response = weatherApi.getWeather(Constant.apiKey,city)
                if(response.isSuccessful){
                    response.body()?.let {
                        _weatherResult.value = NetworkResponse.Success(it)
                    }
                }else{
                    _weatherResult.value = NetworkResponse.Error("Failed to load data")
                }
            }catch (e:Exception){
                _weatherResult.value = NetworkResponse.Error("Failed to load data")
            }
        }
    }
}