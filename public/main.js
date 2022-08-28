document.querySelector('button').addEventListener('click', getBook)
const add = document.querySelector('#updateButton')

function getBook(){
    let title = document.querySelector('input').value

    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.items)
            document.querySelector('h2').innerText = data.items[0].volumeInfo.title
            document.querySelector('img').src = data.items[0].volumeInfo.imageLinks.thumbnail
            document.querySelector('h4').innerText = data.items[0].volumeInfo.authors
            document.querySelector('h3').innerText = data.items[0].volumeInfo.description
            
    
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    
}

add.addEventListener('click', _ => {
    fetch('/booklist', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.querySelector('h2').innerText,
            author: document.querySelector('h4').innerText,
            thumbnail: document.querySelector('img').src,
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})