document.addEventListener('DOMContentLoaded', function() {
    // Category Fetcher..
    fetchAndDisplayCategoryOnselect();

});

function fetchAndDisplayCategoryOnselect(){
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategoryonSelect(categorys))
        .catch(error => console.error("Error :",error));
}

function displayCategoryonSelect(categorys){
    const selects = document.getElementById("category");
    categorys.forEach(individuals => {
        individuals.name.toString().split(',').forEach( category => {
            const option = document.createElement('option');
            option.setAttribute('value', category.toLowerCase());
            option.textContent = category;
            selects.appendChild(option);
        })
      
    });
}

const create=document.getElementById('productForm');

create.addEventListener('submit',(event)=>{
      event.preventDefault();
      
      const user_login = new URLSearchParams(new FormData(create));
     console.log(user_login);
      const url = 'http://localhost:8080/addprods' ;
      fetch(url,{
         method : 'POST', 
         body : user_login 
      }).then(res => res.json())
      .then (data => {
         if (data.status){
            alert("Ok");
          }else{
             alert("NO");
             }
      });
     });