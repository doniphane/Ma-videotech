
const filmList = document.getElementById('film-list');

fetch('https://ghibliapi.vercel.app/films')
    .then(res => res.json())
    .then(data => {
        data.forEach(film => {
            const card = document.createElement('div');
            card.className = 'flip-card relative h-[600px]';
            card.innerHTML = `
          <div class="flip-inner">
            <div class="flip-front bg-white bg-opacity-10 p-4 shadow-lg">
              <img src="${film.image}" class="w-full h-[400px] object-cover object-top overflow-hidden rounded-lg" />
              <h3 class="mt-4 text-2xl font-semibold">${film.title}</h3>
              <h4 class="mt4 text-2xl font-semibold">${film.original_title_romanised}</h4>
              <br>
              <p class="text-sm text-blue-300">${film.director}</p>
              <br>
                <p class="text-sm text-orange-300">${film.locations}</p>
            </div>
            <div class="flip-back bg-indigo-900 bg-opacity-90 p-6">
              <h3 class="text-2xl font-bold mb-2">Résumé</h3>
              <p class="text-sm">${film.description.substring(0, 200)}...</p>
              <br>
              <p class="text-xl text-yellow-300"> Score : ${film.rt_score} ⭐</p>
            </div>
          </div>
        `;
            filmList.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des films :', error);
        filmList.innerHTML = '<p class="text-red-400">Impossible de charger les films sur api</p>';
    });

