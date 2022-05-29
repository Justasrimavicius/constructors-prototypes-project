let myLibrary=[];

const addBookBtn=document.querySelector('.addBook');
const closeOverlayBtn=document.querySelector('.close-button');
const popUp=document.querySelector('.popup');
const overlay=document.querySelector('.overlay');

const AddBookButton=document.querySelector('.add-book-button');

function Book(title,author,pages,status){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=status;
}
Book.prototype.statusRead=function(){
    this.status=true;
    return this.status;
}
Book.prototype.statusNotRead=function(){
    this.status=false;
    return this.status;
}


function addBooks(){
    const title=document.querySelector('.title').value;
    const author=document.querySelector('.author').value;
    const pages=document.querySelector('.pages').value;
    const status=document.querySelector('.status').checked;
    const aBook = new Book(title,author,pages,status);
    myLibrary.push(aBook);


    const p1=document.createElement('p');
    const p2=document.createElement('p');
    const p3=document.createElement('p');
    const label=document.createElement('label');
    const checkbox=document.createElement('input');
    const deleteBook=document.createElement('button');
    deleteBook.type='button';
    checkbox.type='checkbox';

    const div=document.createElement('div');
    checkbox.classList.add('readOrNot');
    label.innerText='Is the book read?';

    if(status==true)checkbox.checked=true;

    myLibrary.forEach((element,index)=>{
        if(!document.contains(document.querySelector(`.book`+index))){

            div.classList.add('book'+index);
            div.classList.add('book');

        p1.innerText=element.title;
        p2.innerText=element.author;
        p3.innerText=element.pages;

        
        div.append(p1,p2,p3,label,checkbox,deleteBook);
        document.querySelector('.book-library-position').appendChild(div);
        }
    });
        deleteBook.addEventListener('click',function(){
            myLibrary.splice(this.parentNode.className.slice(4,5),1);
            this.parentNode.remove();
            console.log(myLibrary);
        });

        checkbox.addEventListener('click',function(){
            if(checkbox.checked==true){
                myLibrary[this.parentNode.className.slice(4,5)].statusRead();

            }else{
                myLibrary[this.parentNode.className.slice(4,5)].statusNotRead();
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