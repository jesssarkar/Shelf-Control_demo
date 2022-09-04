document.querySelector('button').addEventListener('click', getBook)
const add = document.querySelector('.updateButton')
const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBook)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})



const addBook =  _ => {

    fetch('/booklist', {
        
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.querySelector('h3').innerText,
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
}

function getBook(){
    let title = document.querySelector('input').value

    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
        .then(res => res.json())
        .then(data => {
           // console.log(data.items)
            for(i=0; i<data.items.length; i++){
                console.log(data.items[i].volumeInfo.title)
                
                const newElement = document.createElement('li')
                newElement.className = "bookResult"
                document.querySelector(".bookUl").appendChild(newElement)

                const newElementTitle = document.createElement('h3')
                newElementTitle.innerText = data.items[i].volumeInfo.title
                document.querySelector(".bookResult").appendChild(newElementTitle)

                const newElementAuthor = document.createElement('h4')
                newElementAuthor.innerText = data.items[i].volumeInfo.authors
                document.querySelector(".bookResult").appendChild(newElementAuthor)

                const newElementThumbnail = document.createElement('img')
                newElementThumbnail.src = data.items[i].volumeInfo.imageLinks.thumbnail
                document.querySelector(".bookResult").appendChild(newElementThumbnail)

                const button = document.createElement('button')
                document.querySelector(".bookResult").appendChild(button)
                button.addEventListener('click', addBook)

                
            // document.querySelector('h2').innerText = data.items[0].volumeInfo.title
            /* document.querySelector('img').src = data.items[0].volumeInfo.imageLinks.thumbnail
            document.querySelector('h4').innerText = data.items[0].volumeInfo.authors
            document.querySelector('h3').innerText = data.items[0].volumeInfo.description */
        }
            
    
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    
}

async function deleteBook(){
    const bName = this.parentNode.childNodes[1].innerText
    const bAuthor = this.parentNode.childNodes[3].innerText

    console.log(bName)
    console.log(bAuthor)
    try{
        const response = await fetch('deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': bName,
              'author': bAuthor
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const bName = this.parentNode.childNodes[1].innerText
    const bAuthor = this.parentNode.childNodes[3].innerText
     const tLikes = Number(this.parentNode.childNodes[7].innerText)
    
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': bName,
                'author': bAuthor,
                'likes': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

