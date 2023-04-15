//Impostazioni base 

let container = document.getElementById("container");

let search = document.getElementById("search-container");

let button = document.getElementById("search-button");

let barra = document.getElementById("search-bar");


//Impostazione delle funzioni 

button.addEventListener('click',() => { 

    const city = barra.value.toLowerCase().replace(' ', '-');
    const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
    
    if (city === '') {
        barra.classList.add('error');
        barra.value = "Inserisci un valore!"
    }

    else{

        fetch(url)
        .then(response => response.json())
        .then(data => {

            const categories = data.categories;
            const categoryList = document.getElementById('category-list');

            categoryList.innerHTML = "";

            categories.forEach(category => {
                const score = Math.round(category.score_out_of_10);
                categoryList.innerHTML += `
                <li class="category-list-item">
                <span class="category-name">${category.name}</span>
                <span class="category-score">${score}/10</span>
                <div class="bar-container">
                <div class="bar" style="background-color:${category.color}; width:${score*10}%"></div>
                </div>
                </li>`;
            });
            
            const summary = data.summary
    
            // Creazione del titolo "Summary"

            const titleDiv = document.createElement("div");
            titleDiv.className = "sommario";
            titleDiv.textContent = "Summary";
            categoryList.appendChild(titleDiv);

            // Creazione del sommario della città

            const div = document.createElement('div');
            div.className = "resume";
            div.innerHTML = summary;
            categoryList.appendChild(div)
        })
        
        .catch(error => console.error(error));

    } 
});

//Funzione Search Bar

barra.addEventListener('focus', () => {
    barra.classList.remove('error');
    if (barra.value === 'Inserisci un valore!') {
      barra.value = '';
    }

  });
  