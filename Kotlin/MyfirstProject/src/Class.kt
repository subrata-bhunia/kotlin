fun main() {
    val newBook = Book(
        name = "abc",
        author = "me",
        currentPage = 0,
        totalPage =10,
    )
//    newBook.checkCurrentPageNumber()
    newBook.startReading()
    newBook.checkCurrentPageNumber()
//    println( newBook.currentPage)
  val newBook2 =Book("maa")
    newBook2.startReading()

    // Default Constructor

}

class Book(val name:String,val author:String,var currentPage:Int,val totalPage:Int){
    init {
        println("$name($author) book in your table. Your page number is $currentPage .")
    }
    constructor(name: String):this(name,"me",0,10)
    fun startReading(){
        while(currentPage != totalPage){
            println("Reading --> $currentPage")
            currentPage++
        }
    }

    fun checkCurrentPageNumber(){
        if(currentPage != totalPage){
            println(currentPage)
        }else{
            println("Book is completed.😊")
        }
    }

}

//dc

class Math(){
    fun add(a:Int,b:Int):Int{
        return a+b
    }
    fun sub(a:Int,b:Int):Int{
        return a-b
    }
}