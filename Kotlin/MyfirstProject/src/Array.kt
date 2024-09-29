fun main() {
    var arr = arrayOf<String>("Apple","Mango")
    // length
    println(arr.size)
    // get Value by index
    println(arr[0])
    println(arr.get(0))
    // set value to index
    println(arr.set(0,"Red"))
    println(arr.get(0))
    // get all value with index
    for (f in arr.withIndex()) {
        println("${f.index}->${f.value}")
    }
    // Array Exception

    try {
        println(arr[2])
    }catch (e:ArrayIndexOutOfBoundsException){
        println(e.message)
    }
}