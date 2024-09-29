import java.util.*

fun main() {
    val abc = ABC("abc1",1000)
    abc.yy = 9000
    println(abc.xx)
}


class ABC(x:String,y:Int){
    lateinit var z:String
    var xx:String= x
        get() {
            return "GET Call ${field.uppercase(Locale.getDefault())}"
        }
    var yy:Int =y
        set(value) {
            if (value>1000){
                println("Value can't be more than 1000")
            }else{
                field=value
            }
        }


}