const OMDB_API = 'https://www.omdbapi.com/?';
const API_KEY = 'a62f4958';

async function getFilmByTitle(title) {
  let checkedTitle = title.replace(/\s/g, '+');
  return (await fetch(`${OMDB_API}apikey=${API_KEY}&t=${checkedTitle}`)).json();
}
function getYearByTitle(title) {
  try {
    return getFilmByTitle(title);
  } catch (e) {
    console.error(e);
  }
}
getYearByTitle('one punch man').then(data =>
  console.log(`Film "${data['Title']}" was released on ${data['Year']} year!`)
);

function getActorsByTitle(title) {
  return getFilmByTitle(title).then(film => {
    const actorsArr = film['Actors'].split(' ');
    let actorsNames = [];

    for (let i = 0; i < actorsArr.length; i++) {
      if (i % 2 === 0) {
        actorsNames.push(actorsArr[i]);
      }
    }

    return actorsNames;
  });
}
getActorsByTitle('interstellar').then(actors => console.log(actors));

async function getFilmsDuration(...movies) {
  let moviesArr = [];

  movies.map(movie => {
    try {
      let foundData = getFilmByTitle(movie);
      moviesArr.push(foundData);
    } catch (e) {
      console.error(e);
    }
  });

  return Promise.all(moviesArr).then(values => {
    return values.reduce(
      (sumTime, film) => sumTime + parseInt(film['Runtime'].split(' ')[0]),
      0
    );
  });
}

getFilmsDuration('Interstellar', 'One Punch Man', '3:10 to Yuma').then(
  sumTime => {
    console.log(`Sum: ${sumTime}`);
  }
);
