const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const contentInfo = document.querySelector(".content-poke");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <a href="./pokemon.html" class="toDetails">
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>
            
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        </li>
    </a>
        `;
}

function convertPokeDetailsToSection(pokemon) {
  return `
  <section class="content-section ${pokemon.type}">
      <div class="content-header">
        <div class="content-info">
          <h1 class="poke-name">${pokemon.name}</h1>
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>
        </div>
        <div>
          <span class="number">#${pokemon.number}</span>
        </div>
      </div>
      <img src="${pokemon.photo}"
        alt="${pokemon.name}">`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

  });
}
function loadPokemonDetails() {
  pokeApi.getPokemons().then((pokemons = []) => {
    const newSection = pokemons.map(convertPokeDetailsToSection).join("");
    contentInfo.innerHTML += newSection;
    
    console.log(contentInfo);
  });
}

loadPokemonDetails()
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
