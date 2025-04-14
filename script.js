const filmList = document.getElementById('film-list');
const topFilmsContainer = document.getElementById('top-films');
const searchInput = document.getElementById('search-input');
const sortAscBtn = document.getElementById('sort-asc');
const sortDescBtn = document.getElementById('sort-desc');
let allFilms = [];


fetch('https://ghibliapi.vercel.app/films')
    .then(res => res.json())
    .then(films => {
        allFilms = films;
        displayFilms(allFilms);
        displayTopFilms(allFilms);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des films :', error);
        filmList.innerHTML = '<p class="text-red-400">Erreur de chargement des films </p>';
        topFilmsContainer.innerHTML = '<p class="text-red-400">Impossible de charger les Top Films </p>';
    });


function createFilmCard(film) {
    const card = document.createElement('div');
    card.className = 'flip-card relative h-[600px]';
    card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-front bg-white bg-opacity-10 p-4 shadow-lg">
        <img src="${film.image}" class="w-full h-[400px] object-cover object-top overflow-hidden rounded-lg" />
        <h3 class="mt-4 text-2xl font-semibold">${film.title}</h3>
        <h4 class="mt-1 text-lg text-white italic">${film.original_title_romanised}</h4>
        <p class="mt-2 text-sm text-blue-300">${film.director}</p>
        <p class="text-sm text-orange-300">${film.locations || 'Lieu inconnu'}</p>
      </div>
      <div class="flip-back bg-indigo-900 bg-opacity-90 p-6">
        <h3 class="text-2xl font-bold mb-2">Résumé</h3>
        <p class="text-sm">${film.description.substring(0, 200)}...</p>
        <p class="mt-4 text-xl text-yellow-300">Score : ${(film.rt_score / 10).toFixed(1)} ⭐</p>
      </div>
    </div>
  `;
    return card;
}

function displayFilms(films) {
    filmList.innerHTML = '';

    if (films.length === 0) {
        filmList.innerHTML = `<p class="text-yellow-400 col-span-3">Aucun film trouvé </p>`;
        return;
    }

    films.forEach(film => {
        const card = createFilmCard(film);
        filmList.appendChild(card);
    });
}


function displayTopFilms(films) {
    topFilmsContainer.innerHTML = '';
    const topFilms = [...films].sort(() => 0.5 - Math.random()).slice(0, 3);
    topFilms.forEach(film => {
        const card = createFilmCard(film);
        topFilmsContainer.appendChild(card);
    });
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = allFilms.filter(film =>
        film.title.toLowerCase().includes(query)
    );

    displayFilms(filtered);
});




sortAscBtn.addEventListener('click', () => {
    const sorted = [...allFilms].sort((a, b) => parseInt(a.rt_score) - parseInt(b.rt_score));
    displayFilms(sorted);
});


sortDescBtn.addEventListener('click', () => {
    const sorted = [...allFilms].sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
    displayFilms(sorted);
});


const toggleButton = document.getElementById('toggle-top-films');
const topFilmsSection = document.getElementById('top-films');

let isVisible = false;

toggleButton.addEventListener('click', () => {
    isVisible = !isVisible;

    if (isVisible) {
        topFilmsSection.classList.remove('hidden');
        toggleButton.textContent = '🎬 Masquer les Top Films';
    } else {
        topFilmsSection.classList.add('hidden');
        toggleButton.textContent = '🎬 Afficher les Top Films';
    }
});
