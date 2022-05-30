let myLibrary=[]; // Starting book collection

const addBookBtn=document.querySelector('.addBook');
const closeOverlayBtn=document.querySelector('.close-button');
const popUp=document.querySelector('.popup');
const overlay=document.querySelector('.overlay');
const AddBookButton=document.querySelector('.add-book-button');

function Book(title,author,pages,status){ // Book constructor
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=status;
}
Book.prototype.statusRead=function(){ // My pathetic atempt of incorporating prototypes(don't think it was needed here).
    this.status=true;
    return this.status;
}
Book.prototype.statusNotRead=function(){
    this.status=false;
    return this.status;
}


function addBooks(){ // Main function that gets called whenever AddBookButton inside the popup gets pressed
    const title=document.querySelector('.title').value;
    const author=document.querySelector('.author').value;
    const pages=document.querySelector('.pages').value;
    const status=document.querySelector('.status').checked;
    const aBook = new Book(title,author,pages,status);
    myLibrary.push(aBook); // Pushing in the new book into the array.


    const p1=document.createElement('p');
    const p2=document.createElement('p');
    const p3=document.createElement('p');
    const label=document.createElement('label');
    const checkbox=document.createElement('input');
    const deleteBook=document.createElement('button');
    deleteBook.type='button';
    checkbox.type='checkbox'; // Setting up the tags for the new books place in the DOM

    const div=document.createElement('div'); // The div that holds all of the books elements
    checkbox.classList.add('readOrNot');
    label.innerText='Is the book read?';

    if(status==true)checkbox.checked=true; // Check if when creating the book in the popup, the user has set the status of the book(checked-read,unchecked-not read) to checked(if he has, set the status of the checkbox in the main window to checked)

    for(let i=0;i<myLibrary.length;i++){ // Whenever new book is added, go through all of the books/
        if(!document.contains(document.querySelector(`.book`+i))){ // /and check if the current book(book + the index, that was added below) already exists. If not, continue with the code

            div.classList.add('book'+i); // add a class to easier get the index of books(would be better done with data- attribute. Will do that from the next project)
            div.classList.add('book'); // Add a 'book' class for styling purposes.

        p1.innerText=myLibrary[i].title;
        p2.innerText=myLibrary[i].author;
        p3.innerText=myLibrary[i].pages;

        
        div.append(p1,p2,p3,label,checkbox,deleteBook); // Append all of the tags of the book to the main div.
        document.querySelector('.book-library-position').appendChild(div); // Append the div to the book library window.
        break;
    }
    }
        deleteBook.addEventListener('click',function(){ // Function, that deletes the book.
            myLibrary.splice(this.parentNode.className.slice(4,5),1); // Deletes the book from myLibrary array
            const a=(this.parentNode.className.slice(0,4))+(parseInt((this.parentNode.className.slice(4,5)))+1); // Gets the class(book+index) of the current DOM element before it gets deleted, adds 1 to the index on the class.
            console.log(a);
            const aa=this.parentNode.className.slice(0,5); // gets the DOM element of current class.
            this.parentNode.remove(); // Deletes the book from book library window/DOM
            if(a.slice(4,5)<myLibrary.length){
            document.querySelector(`.${a}`).classList.replace(a,aa);} // Replaces the DOM elements, that took over the deleted element, class(lowers the index number in the class by 1, so it is equal to the index in the array)

            console.log(myLibrary);
        });

        checkbox.addEventListener('click',function(){
            if(checkbox.checked==true){
                myLibrary[this.parentNode.className.slice(4,5)].statusRead(); // If the status checkbox gets checked/unchecked, update the books status in myLibrary array

            }else{
                myLibrary[this.parentNode.className.slice(4,5)].statusNotRead(); // If the status checkbox gets checked/unchecked, update the books status in myLibrary array
            };
        })

}







addBookBtn.addEventListener('click', function(){
    popUp.classList.add('active');
    overlay.classList.add('active');
});
closeOverlayBtn.addEventListener('click',function(){
    popUp.classList.remove('active');
    overlay.classList.remove('active');
});

AddBookButton.addEventListener('click',addBooks);
