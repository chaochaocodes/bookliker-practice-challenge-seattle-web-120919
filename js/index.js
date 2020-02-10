document.addEventListener("DOMContentLoaded", function() {
    getBooks();
});

const pouros = {"id":1, "username":"pouros"}
// Get a list of books & render them http://localhost:3000/books
//new
function getBooks() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => showBooks(books))
    .catch(err => console.log(err))
}
//index 
function showBooks(books) {
    books.forEach(book => {
        showBook(book)
    })
}
//show
function showBook(book) {
    const ul = document.getElementById("list")
    const li = document.createElement("li")
    li.innerText = book.title
    li.addEventListener("click", () => bookCard(book));
    
    ul.appendChild(li);
}

//create "POST"
//see the book's thumbnail, description, list of users who have liked the book.
function bookCard(book){
    const showPanel = document.getElementById("show-panel")
    showPanel.textContent = " "

    const thumbnail = document.createElement("img")
    thumbnail.src = book.img_url

    const description = document.createElement("p")
    description.innerText = book.description

    const button = document.createElement("button")
    button.textContent = "Like"
    button.addEventListener("click", () => likePatch(book))

    const userList = document.createElement("ul")
    book.users.forEach(user => {
        const likes = document.createElement("li")
        likes.textContent = user.username;
        userList.appendChild(likes);
    });

    showPanel.appendChild(thumbnail)
    showPanel.appendChild(description)
    showPanel.appendChild(button)
    showPanel.appendChild(userList)
} 

function likePatch(book) {
    book.users.push(pouros);
    console.log(book.users);
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify({users: book.users})
    })
    .then(res => res.json())
    .then(likedBook => bookCard(likedBook))
    .catch(err => console.log(err))
}