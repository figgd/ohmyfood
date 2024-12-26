
const imagesContainer = document.querySelector('.gallery')

function createWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.setAttribute('data-id', work.id);
  figure.setAttribute('category-id', work.categoryId)
  
  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)    

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createWorkFigure(work);
      imagesContainer.appendChild(figure);
    });
  });
    
//FILTERS//

        
function filtreObjet(){

    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
      const categoryId = element.getAttribute('category-id');
      if (categoryId === '1') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
              
       
//Filtre Hotel & restaurants//
        
function filtreHotelsRestaurants(){

    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
      const categoryId = element.getAttribute('category-id');
      if (categoryId === '3') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
}

var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);

        
//Filtre Appartement//

function filtreAppartements(){
            
    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        const categoryId = element.getAttribute('category-id');
        if (categoryId === '2') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);

//Filtre toutes catégories//

function filtreTous(){

    const elements = document.querySelectorAll('div.gallery figure');
    elements.forEach((element) => {
        element.style.display = 'block';
    });   
}

var bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);


//Bouton séléctionné//

const boutons = document.querySelectorAll('.bouton-css');

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() {
      boutons.forEach((bouton) => {
        bouton.classList.remove('selected');
      });
      this.classList.add('selected');
      sessionStorage.setItem('boutonSelectionne', this.id);
    });
  });

window.onbeforeunload = function(){
sessionStorage.removeItem('boutonSelectionne');
}


//Login Admin//

const loginStatus = document.getElementById("login")
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const figureModify = document.getElementById("figure-modify")
const description = document.getElementById("figure-modify-a")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')



if (JSON.parse(sessionStorage.getItem("isConnected"))) {
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    figureModify.style.display = 'flex'
    portfolioModify.style.display = 'flex'
    filtreModify.style.display = 'none'
    description.style.display = 'flex'
      
} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    figureModify.style.display = 'none'
    portfolioModify.style.display = 'none'
    filtreModify.style.display = 'flex'
    description.style.display = 'none'
}

//Connexion Status//
logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");
});


//Categories//

const selectCategory = document.getElementById('modal-photo-category');

const reponseCategory = fetch('http://localhost:5678/api/categories')
.then((response) => response.json())
.then((data) => {
  data.forEach((category) => {
    const categoryOption = document.createElement('option')
    const categoryLabel = document.createElement('label')

    categoryOption.setAttribute('value', category.id)
    categoryLabel.innerHTML = category.name

    selectCategory.appendChild(categoryOption)
    categoryOption.appendChild(categoryLabel)
  });
});

