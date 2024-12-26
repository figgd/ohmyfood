//MODAL//

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

modalContent.addEventListener('click', function(e) {
  e.stopPropagation();
});
modalPhoto.addEventListener('click', function(e) {
  e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);


modal.addEventListener('click', hideModal);


//Bouton Photo//

const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector("#modal-photo-close");


newPhotoBtn.addEventListener('click', function() {
  modalContent.style.display = 'none';
  modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function(){
  modalContent.style.display = 'flex';
  modalPhoto.style.display = 'none';
})

modalPhotoClose.addEventListener('click', hideModal);


//Ajouter au modal//

const imagesModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')
  const deleteIcon = document.createElement('i') 
        
  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figure.setAttribute('data-id', work.id); 
  deleteIcon.className = "fa-regular fa-trash-can" 

  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)
  figure.appendChild(deleteIcon)


  deleteIcon.addEventListener('click', (event) => {
    event.preventDefault();
    deleteWorkById(work.id);
  });

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createModalWorkFigure(work);
      imagesModalContainer.appendChild(figure);
    });
  });

const titleInput = document.getElementById('modal-photo-title');
const categorySelect = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('modal-valider');

function checkForm() {
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);

//Ajouter l'image//

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("Token");

  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("image").files[0];


  if(!title || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }

  //Check si la taille est correcte//
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => response.json()) 
  .then(work => {

    const figure = createWorkFigure(work);
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(figure);
  

    const figureModal = createModalWorkFigure(work);
    const galleryModal = document.querySelector('.gallery-modal');
    galleryModal.appendChild(figureModal);
  
    alert('Le nouvel travail a été ajouté avec succès.');
  })
  .catch(error => console.error(error));
}
//Supprimer//

function deleteWorkById(workId) {
  const token = sessionStorage.getItem("Token");
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok){
      throw new error ('La supression du travai à echoué.');
    }
    const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (modalWorkToRemove) {
      modalWorkToRemove.remove();
      
    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (galleryWorkToRemove) {
        galleryWorkToRemove.remove();
    } else {
        console.error('Élément à supprimer non trouvé dans la galerie principale');
      }
    } else {
        console.error('Élément à supprimer non trouvé dans la modale');
    }
  })
  .catch(error => console.error(error));
  }    
}  
 //PREVIEW IMG//
 const inputImage = document.getElementById("image");
 const labelImage = document.getElementById("label-image");
 const pImage = document.querySelector("#form-photo-div > p");
 const iconeImage = document.querySelector("#iModalImage");
 
 inputImage.addEventListener("change", function () {
   const selectedImage = inputImage.files[0];
 
   const imgPreview = document.createElement("img");
   imgPreview.src = URL.createObjectURL(selectedImage);
   imgPreview.style.maxHeight = "100%";
   imgPreview.style.width = "auto";
 
   labelImage.style.display = "none";
   pImage.style.display = "none";
   inputImage.style.display = "none";
   iModalImage.style.display = "none";
   document.getElementById("form-photo-div").appendChild(imgPreview);
 });