fun main() {

    val mi = MI()
    mi.display()
    val mobile =Mobile()
    mobile.display()
    println(mi.toString())
}

open class Mobile(){
    open val name:String=""
    open val size:Int=5
    open fun display()= println("Parent Mobile Call")
}
class MI():Mobile(){
    override val name: String
        get() = "Mi"
    override val size: Int
        get() = 6

    override fun display() {
        println("This Mi, Child Class")
    }

    override fun toString(): String {
        return "MI($name,$size)"
    }

}