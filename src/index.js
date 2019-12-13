window.addEventListener('load', function () {
  
this.document.addEventListener  
  
  let parentNode = document.getElementById('toy-collection')
  
  function fetchToys () {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      
      data.forEach(function (toy) {
        
        let childNode = document.createElement('div')
        childNode.class = "card"
        childNode.id = toy.id
        childNode.dataset.likes = toy.likes
        childNode.innerHTML = `
        <h2> Name: ${toy.name}</h2>
        <img src = ${toy.image} class="toy-avatar">
        <p> Likes: ${toy.likes}</p>
        <button class="like-btn">Like <3</button>
        `
        
        parentNode.appendChild(childNode)
      })
    })
  }
  
  fetchToys()

  //make button add anew toy to db via push request
  // fire up fetchToys to make it appear again

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  
  // YOUR CODE HERE

  addBtn.addEventListener('click', function () {
  // hide & seek with the form
  addToy = !addToy

  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    function createToy() {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json", Accept: "application/json"
        },
        
        body:JSON.stringify(
        {
          "name": `${e.target[0].value}`,
          "image": `${e.target[1].value}`,
          "likes": 0
        })
      })
      console.log ("create success")
    }

    toyForm.addEventListener('submit', function (e){
      e.preventDefault()
      console.log(e.target[0].value)
      console.log(e.target[1].value)

      createToy()
      fetchToys()

    })

    } else {
    toyForm.style.display = 'none'
    }
  })
  
  
  // make like button increase #likes
  // add event function to like button to fire patch request and refresh (if not auto)
  
  currLikes = parentNode.getElementsByClassName('like-btn')
  
  
  function addLikeToy(e) {
    let likeCounter = parseInt(e.target.parentNode.dataset.likes)
    let newLike =  e.target.parentNode.dataset.likes = likeCounter +1
    
    let id = e.target.parentNode.id
    
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      
      body: JSON.stringify(
        {
          "likes": newLike
        }
        )
        
      })
      .then(resp => resp.json())
      .then(data => {
        let likeTag = e.target.parentNode.getElementsByTagName('p')[0]
        likeTag.innerText = `Likes: ${newLike}`
      })

  }
  
  parentNode.addEventListener("click", function (e) {
    
    if (e.target.className === 'like-btn') {
      addLikeToy(e)
    }
})
  



 // write code above here to stay within event listener "wait for html to load"

})


// OR HERE!
