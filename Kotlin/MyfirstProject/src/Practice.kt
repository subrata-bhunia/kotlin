fun main() {
//    var score : Int = 10
//    val _score : String = "11"
//    val _score1 : Float = 11.02F
//    val _score2 : Double = 9.09
//    val _score3 : Boolean = false
    // Print 100 to 0 using Loop
//    for (i in 100 downTo 0){
//        println(i)
//    }
//    while Loop
//    var i  = 100
//    while ( i>= 0){
//        println(i)
//        i--
//    }


    /*
    * TODO: Print 25 - 27 's table
    * w
    * */

//    for (i in 25..27){
//        println("---$i's Table ---")
//        printTable(i)
//
//    }

    // Function Overloading Same name Different Parameter
    sum(10,20)
    sum(11.22,22.22)
    // assign value by parameter name
    sum(a=100,b=-2000)

//    Function store in variables
    var printableFunction = :: printTable
    printableFunction(2)
}

fun printTable(number:Int){
    for (i in 1..10){
        // println(number.toString() + " x "+ i +" = "+ (number * i))
        println("$number x $i = ${number * i }")
    }
}
fun sum(a:Int,b:Int){
    println(a+b)
}
fun sum(a:Double,b:Double){
    println(a+b)
}