import java.lang.Math
import kotlin.math.pow

fun main() {
    val circle:Shape= Circle(8.0)
    val square:Shape = Square(20.0)
    println(circle.area())
    println(square.area())
    val shapes = arrayOf(circle,square,Triangle(4.5,9.0))
    calculateArea(shapes)
}

fun calculateArea(shapes:Array<Shape>){
    for (shape in shapes){
        println(shape.area())
    }
}

open class Shape{
    open fun area():Double{
        return 0.0
    }
}

class Circle(private val radius:Double):Shape(){
    override fun area(): Double {
        return Math.PI*radius.pow(2)
    }
}

class Square(private val side:Double):Shape(){
    override fun area(): Double {
        return side.pow(2)
    }
}

class Triangle(private val base:Double, private val height:Double):Shape(){
    override fun area(): Double {
        return .5*base*height
    }
}