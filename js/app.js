// ----- section for getting search result and show user all the data of his intarest ------

// ---------- input area ---------------
const inputField= document.getElementById('input-area');
// -------------- book container --------------
const bookContainer = document.getElementById('book-container');
// ----------- spinner ------------
const totalResultContainer= document.getElementById('total-result-container')
const toggleLoader = (displaySituation,isAdd)=>{
  if(isAdd === false){
    document.getElementById('loading-animation').classList.remove(displaySituation)
  }
  else if(isAdd === true){
    document.getElementById('loading-animation').classList.add(displaySituation)


  }
}
// -------- targetting the button for firing event  -----------
document.getElementById('search-button').addEventListener('click',()=>{
  // clearing total totalResultContainer
  totalResultContainer.innerHTML='';
  const inputText= inputField.value;
    bookContainer.innerHTML='';
    // ----spinner----
    toggleLoader('d-none',false)
    // ---- api ------
     const url= ` https://openlibrary.org/search.json?q=${inputText}`
    fetch(url)
    .then(res => res.json())
    .then(data => bookdata(data))
    .finally(()=>{
    toggleLoader('d-none',true)
})

  inputField.value='';

    
})
// calling the function 

const bookdata= alldata =>{
  const totalShowdiv= document.createElement('div')
  totalShowdiv.classList.add('totalResult')

  // clearing the totalResultContainer
  totalResultContainer.innerHTML='';
  totalShowdiv.innerHTML=`<p class="text-center"> Total Result Found: ${alldata.numFound}</p>`;
  totalResultContainer.appendChild(totalShowdiv)

  // checking for the null value from api
  if(alldata.numFound === 0){
    const bookContainer = document.getElementById('book-container');

    // clearing the bookContainer
    bookContainer.innerHTML='';
    bookContainer.innerHTML=`<p class='text-center error'> No Result Found </p>`;
}
// checking for the element 
if(alldata.docs.lenght !== -1){
    alldata.docs.forEach(book => {
      // catching those books whos dont have cover Image
      const coverImage= `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      const showCoverImage = ()=>{
        let coverimage= '';
        if(book.cover_i === undefined){
           coverimage = 'images/noimage-found.png'
        }
        else{
          coverimage = coverImage;
        }
        return coverimage

      }
      // creating div for each book
      const div = document.createElement('div');
        div.classList.add("col");

        const bookName = book.title !== undefined? book.title: "Result not found";
        const authorName= book.author_name !==undefined?book.author_name:"Result not found";
        const publishar= book.publisher !== undefined? book.publisher:"Result not found";
        const firstPulished= book.first_publish_year !== undefined? book.first_publish_year: "Result not found";

        div.innerHTML=`
                  <div class="card h-100 book-card align-items-center ">
                  <img src="${showCoverImage()}" class="card-img-top w-50" alt="...">

                    <div class="card-body">
                      <h5 class="card-title"> <span class="book-info"> Name: </span> ${bookName}</h5>
                      <p class="card-text"> <span class="book-info"> Author Name: </span> ${authorName}</p>
                      <p class="card-text"> <span class="book-info"> publishar: </span>  ${publishar}</p>
                      <p class="card-text"> <span class="book-info"> First Published: </span>  ${firstPulished}</p>
                    </div>
                  </div>`;

        bookContainer.appendChild(div);
    });

    }
}

        

