import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
const catInfoText = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');

errorText.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  // Ascultă evenimentul 'change' pentru a detecta când utilizatorul selectează o altă rasă de pisică
  breedSelect.addEventListener('change', () => {
    catInfoText.innerHTML = '';
    const selectedBreedId = breedSelect.value; // Obține valoarea (ID-ul) rasei de pisică selectate
    loader.style.fontWeight = 'bold';
    loader.style.display = 'block';
    // Folosește funcția fetchCatByBreed() pentru a obține informații despre pisica corespunzătoare rasei selectate
    setTimeout(() => {
      fetchCatByBreed(selectedBreedId)
        .then(catsInfo => {
          catsInfo.forEach(e => {
            catInfoText.innerHTML = '';
            const catInfo = e.breeds[0];
            const imgUrl = e.url;
            const imgWidth = 350;
            const imgHeight = 400;

            let html = `
          
              <img src ="${imgUrl}" width = ${imgWidth} height = ${imgHeight}>
              <div>
              <h2>${catInfo.name}</h2>
              <p>${catInfo.description}</p>
              <p><strong>Temperament</strong> ${catInfo.temperament}</p>
        </div>
              `;
            catInfoText.insertAdjacentHTML('beforeend', html);
            console.log(catInfo.temperament);
            console.log(e.breeds[0].name);
          });
        })
        .catch(error => {
          catInfoText.innerHTML = '';
          errorText.style.display = 'block';
          errorText.style.color = 'red';
          breedSelect.style.display = 'none';
        })
        .finally(() => {
          // Ascunde loader-ul când cererea se încheie (indiferent dacă este cu succes sau cu eroare)
          loader.style.display = 'none';
        });
    }, 1000);
  });
  breedSelect.style.display = 'none';
  loader.style.display = 'block';
  // La încărcarea paginii, se încarcă opțiunile pentru selecția raselor de pisici
  fetchBreeds()
    .then(data => {
      data.forEach(element => {
        const optionValue = element.id;
        const optionText = element.name;
        let html = `<option value="${optionValue}">${optionText}</option>`;
        breedSelect.insertAdjacentHTML('beforeend', html);
      });
    })
    .catch(error => {
      console.error(
        'A apărut o eroare la aducerea listei de rase de pisici:',
        error
      );
      // Aici puteți afișa un mesaj de eroare în interfața utilizatorului în cazul unei erori la încărcarea opțiunilor
    })
    .finally(() => {
      // Ascunde loader-ul când cererea se încheie (indiferent dacă este cu succes sau cu eroare)
      loader.style.display = 'none';
      // Afișează înapoi breedSelect după încheierea cererii
      breedSelect.style.display = 'block';
    });
});
