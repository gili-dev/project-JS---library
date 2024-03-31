class Book{

    constructor(title, code, author, year, pages, selctedDate){
        this.title = title;
        this.code = code;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.selctedDate = selctedDate;
    }

    searchInBook(stringToSearch){
        return (this.title).includes(stringToSearch);
    }


}// end Book


class ReadBook extends Book{

    constructor(title, code, author, year, pages, selctedDate, imageSrc, description, level){
        super(title, code, author, year, pages, selctedDate);
        this.imageSrc = imageSrc;
        this.description = description;
        this.level = level;
    }

    searchInBook(stringToSearch){
        return super.searchInBook(stringToSearch) || (this.author).includes(stringToSearch) || (this.description).includes(stringToSearch);
    }


}// end ReadBook 


class User{

    constructor(name, password){
        this.name = name;
        this.password = password;
    }

    exist(name, password){
        if(name == this.name && password == this.password)
            return true;
        else
            return false;
    }


}// end User




