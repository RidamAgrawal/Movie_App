import { API } from "./api.js";

export const movieCards = (element, start, filter) => {

    var URL = API.movies;

    URL += `?start=${start}`;

    if (JSON.stringify(filter) !== '{}') {

        for (let i in filter) {
            URL += '&';

            URL += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(filter[i]);
        }
    }

    fetch(URL)
        .then(resp => resp.json())
        .then(({ data }) => {
            data.forEach(itm => element.appendChild(createMovieCard(itm)));
        })
        .catch(err => console.error('There was an error:', err));
}

function createCardImage(itm) {
    const cardImg = document.createElement('div');
    cardImg.classList.add('cardImage');

    const img = document.createElement('img');
    img.classList.add('cardImg');
    img.src = itm.img_link;
    img.alt = itm.name;
    img.setAttribute('height', '100%');
    img.setAttribute('width', '100%');
    img.onerror = function () { this.onerror = null; this.src = './asset/posterNA.jpg'; };

    cardImg.appendChild(img);
    return cardImg;
}

function createCardDetails(itm) {
    const cardDetails = document.createElement('div');
    cardDetails.classList.add('cardDetails');

    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = itm.name;

    const genre = document.createElement('div');
    genre.classList.add('genre');
    genre.innerText = `Genre: ${itm.genre}`;

    cardDetails.appendChild(title);
    cardDetails.appendChild(genre);
    cardDetails.appendChild(createRatings(itm));
    return cardDetails;
}

function createRatings(itm) {
    const ratings = document.createElement('div');
    ratings.classList.add('ratings');

    const starRatings = document.createElement('div');
    starRatings.classList.add('starRatings');

    const star = document.createElement('span');
    star.classList.add('material-icons');
    star.innerText = 'star';

    const rating = document.createElement('span');
    rating.innerText = itm.imdb_rating;

    starRatings.append(star, rating);

    const duration = document.createElement('p');
    duration.innerText = `${itm.duration} mins`;

    ratings.append(starRatings, duration);
    return ratings;
}

function createShowMore(itm) {
    const showMore = document.createElement('div');
    showMore.classList.add('show');

    const sname = document.createElement('div');
    sname.innerText = itm.name;

    showMore.append(
        sname,
        createPeopleSection('Cast', itm.cast_name.split(',', 3), itm.name, true),
        createPeopleSection('Writer', itm.writer_name.split(',')),
        createDirectorSection(itm.director_name),
        createAboutSection(itm),
        createActionIcons(itm)
    );

    return showMore;
}

function createPeopleSection(label, names, movieName = '', showEllipsis = false) {
    const section = document.createElement('div');
    section.classList.add(label.toLowerCase());

    const heading = document.createElement('p');
    heading.innerText = label;
    section.appendChild(heading);

    const links = names
        .map(name => `<a href="https://www.google.com/search?q=${name.trim().split(' ').join('+')}">${name}</a>`)
        .join('');

    section.innerHTML += links;

    if (showEllipsis) {
        section.innerHTML += `<a href="https://www.google.com/search?q=cast+of+${movieName}"> ...</a>`;
    }

    return section;
}

function createDirectorSection(directorName) {
    const dir = document.createElement('div');
    dir.classList.add('director');

    const heading = document.createElement('p');
    heading.innerText = 'Director';
    dir.appendChild(heading);

    dir.innerHTML += directorName;
    return dir;
}

function createAboutSection(itm) {
    const about = document.createElement('div');

    const abt = document.createElement('p');
    abt.classList.add('about');
    abt.innerHTML = `<p>About</p>${itm.about}`;

    const year = document.createElement('p');
    year.classList.add('year');
    year.innerHTML = `<p>Year</p>${itm.year}`;

    about.append(abt, year);
    return about;
}

function createActionIcons(itm) {
    const icons = document.createElement('div');
    icons.classList.add('icons');

    const actions = [
        { action: 'wishlist', label: 'Add Wishlist', svgPath: 'M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z' },
        { action: 'watched', label: 'Add Watched', svgPath: 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z' },
        { action: 'favorites', label: 'Add Favorites', svgPath: 'm389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z' },
    ];

    actions.forEach(({ action, label, svgPath }) => {
        icons.appendChild(createActionButton(itm.movieHash, action, label, svgPath));
    });

    return icons;
}

function createActionButton(movieHash, action, label, svgPath) {
    const btn = document.createElement('button');
    btn.classList.add(action + '-btn');
    btn.dataset.mh = movieHash;
    btn.dataset.action = action;

    btn.innerHTML = `
    <svg data-mh="${movieHash}" data-action="${action}"
      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
      <path data-mh="${movieHash}" data-action="${action}" d="${svgPath}"/>
    </svg>`;

    const span = document.createElement('span');
    span.dataset.mh = movieHash;
    span.dataset.action = action;
    span.innerText = label;

    btn.appendChild(span);

    const rotatingLoader = document.createElement('div');
    rotatingLoader.classList.add('rotating-loader');
    rotatingLoader.classList.add(action + '-loader');

    btn.appendChild(rotatingLoader);
    return btn;
}

function createMovieCard(itm) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.append(
        createCardImage(itm),
        createCardDetails(itm),
        createShowMore(itm)
    );

    return card;
}