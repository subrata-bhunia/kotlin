package com.example.myprojectkotlin.api

sealed class NetworkResponse<out T> {
    data class Success<out T>(val data:T):NetworkResponse<@UnsafeVariance T>()
    data class Error(val message:String):NetworkResponse<Nothing>()
    object Loading: NetworkResponse<Nothing>()
}