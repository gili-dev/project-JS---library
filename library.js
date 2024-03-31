let selectedBooks = [];
let booksLibrary = [];

loadBooks();

setTimeout(() => {
    createBooks(booksLibrary);
    }, 2000);


function loadBooks() {
    
    let firstPromise = fetch("books.json")
        .then(result => { return result.json() })
        .then(literalObj => literalObj.map(e => new Book(e.title, e.code, e.author, e.year, e.pages, null)))

    let secondPromise = fetch("readBooks.json")
        .then(result => result.json())
        .then(literalObj => literalObj.map(e => new ReadBook(e.title, e.code, e.author, e.year, e.pages,null ,e.image, e.description, e.level)))

    Promise.all([secondPromise, firstPromise])
        .then(arr => {
            booksLibrary = arr[0].concat(arr[1])
        return booksLibrary;

        });
}


function closure(){

    maxBooks=0;

    return function (){
        maxBooks = selectedBooks.length;
        return maxBooks < 5;
    }
}



let CanGetBooks = closure();

function addToSelectedBooks(event) {

    if(CanGetBooks() == false){
        alert("יש אצלך 5 ספרים! עליך להחזיר ספר כדי לקחת אחר")
    }
    else{
        let currentName = event.target.parentElement.children[1].innerHTML;
        booksLibrary.forEach(b => {
            if(b.title === currentName)
            {
                b.selctedDate = new Date();
                selectedBooks.push(b);
                event.target.innerHTML = "החזרה";
                event.target.style.backgroundColor = "rgb(255, 204, 153)";
                event.target.removeEventListener("click", addToSelectedBooks);
                event.target.addEventListener("click", removeFromSelectedBooks);
                updateTitle("b");
                return;
            }
        });
    }
}


function removeFromSelectedBooks(event){
    let currentName = event.target.parentElement.children[1].innerHTML;
    selectedBooks.forEach((b,i) => {
        if(b.title == currentName)
        {
            b.selctedDate = null;
            selectedBooks.splice(i,1);
            event.target.innerHTML = "השאלה";
            event.target.style.backgroundColor = "rgb(229, 80, 27)";
            event.target.removeEventListener("click", removeFromSelectedBooks);
            event.target.addEventListener("click", addToSelectedBooks);
            updateTitle("b");
            return;
        }
    });
}



function createBookView(book) {
    //מסגרת
    let d = document.createElement("div");
    d.setAttribute("class", "card");
    //תמונה
    let image = document.createElement("img");
    if (book instanceof (ReadBook)) {
        image.setAttribute("src", String(book.imageSrc))
    }
    else {
        image.setAttribute("src", ".\\pictures\\bookImg.jpg");
    }
    image.setAttribute("width", "40%");
    image.setAttribute("height", "60%");
    d.appendChild(image);
    //פרטי ספר
    let name = document.createElement("div");
    name.innerHTML = book.title;
    name.style.fontSize = "22px";
    d.appendChild(name);
    let authorName = document.createElement("div");
    authorName.innerHTML = book.author;
    authorName.style.fontSize = "18px";
    d.appendChild(authorName);
    //כפתור השאלה
    let b = document.createElement("button");
    b.innerHTML = "השאלה";
    b.setAttribute("class", "button");
    b.addEventListener("click", addToSelectedBooks)
    selectedBooks.forEach(e => {if(e.title == book.title)changeView(b)});
    d.appendChild(b);

    //הצמדה לתצוגה
    document.getElementById("gridcontainer").appendChild(d);

}


function createBooks(bookList) {
    updateTitle("a");
    let container = document.createElement("div");
    container.setAttribute("id", "gridcontainer");
    document.getElementsByTagName("body")[0].appendChild(container);
    bookList.forEach(book => {
        createBookView(book);
    });
}


function updateTitle(status){
    let bookObj = [];
    if(status == "b"){
        let booksString= JSON.stringify(selectedBooks);
        localStorage.setItem("selectedBooks",booksString)
        let booksStr = localStorage.getItem("selectedBooks");
        bookObj = JSON.parse(booksStr);
    }
    else {//בפתיחת האתר
        let booksStr = localStorage.getItem("selectedBooks");
        if(booksStr != null && booksStr != ""){
            bookObj = JSON.parse(booksStr);
            selectedBooks = bookObj;
        }
        else{//בפתיחה הראשונה של האתר מהמחשב הנוכחי
            localStorage.setItem("selectedBooks",[]);
        }
    }
    let userName = localStorage.getItem("userData");
    let userObj = JSON.parse(userName);
    let str = "";
    selectedBooks.forEach(b => {
        str = str + b.title + ", ";
    });
    str = str.substring(0,str.length-2);
    document.getElementById("start").innerHTML = ` שלום ${userObj.name}! ${bookObj.length} ספרים מושאלים אצלך`;
    document.getElementById("books").innerHTML = str;
}


function changeView(bn){
    if(bn.innerHTML=="השאלה")
    {
        bn.innerHTML="החזרה";
        bn.style.backgroundColor="rgb(255, 204, 153)";
        bn.removeEventListener("click", addToSelectedBooks);
        bn.addEventListener("click", removeFromSelectedBooks);
    }

}


function searchBooks(){
    let str = document.getElementsByClassName("myInput")[0].value;
    let findBooks = booksLibrary.filter(b => b.searchInBook(str));
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("gridcontainer"));
    createBooks(findBooks);
    setTimeout(() => {
        if(findBooks.length == 0){
            document.getElementById("message").innerHTML = "...אין פריטים התואמים לחיפוש";
        }
        else{
            document.getElementById("message").innerHTML = "";
        }
    }, 400);
    document.getElementsByTagName("header")[0].appendChild(message);
}