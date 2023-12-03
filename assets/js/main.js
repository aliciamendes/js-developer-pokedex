const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const contentInfo = document.querySelector(".content-poke");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <button onclick="modalShow('${escapeHTML(
    JSON.stringify(pokemon)
  )}')" class="toDetails">
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
    </button>
    `;
}

function escapeHTML(str) {
  return str.replace(/"/g, "&quot;");
}

function modalShow(pokemon) {
  const pokemonJson = JSON.parse(pokemon);

  contentInfo.style.visibility = "visible";

  contentInfo.innerHTML = `
  <div class="content-poke-visible ${pokemonJson.type}">
      <button onclick="hiddenModal()" class="arrow-back">
        <img src="assets/images/arrow-left.png" alt="Voltar" />
      </button>
      <section class="content-details">
        <div class="content-header">
        <h1 class="poke-name">${pokemonJson.name}</h1>
        <span class="number">#${pokemonJson.number}</span>
        </div>
        <img src="${pokemonJson.photo}" alt="${pokemonJson.name}" />

        <aside class="about-pokemonJson">
          <div class="description-about">
            <div class="abouts">
              <span>Tipos:</span>
              <ol class="about-ol">
                ${pokemonJson.types
                  .map((type) => `<li class="about-li">${type}</li>`)
                  .join("")}
              </ol>
            </div>
            <div class="abouts">
              <span>Altura:</span>
              <ol class="about-ol">
                <li class="about-li">${pokemonJson.height} cm</li>
              </ol>
            </div>
            <div class="abouts">
              <span>Peso:</span>
              <ol class="about-ol">
                <li class="about-li">${pokemonJson.weight} kg</li>
              </ol>
            </div>
            <div class="abouts">
              <span>Habilidades:</span>
              <ol class="about-ol">
                ${pokemonJson.abilities
                  .map((ability) => `<li class="about-li"> ${ability } </li>`)
                  .join("")}
              </ol>
            </div>
          </div>
        </aside>
        </section>
      </div>
  `;
}

function hiddenModal() {
  contentInfo.style.visibility = "hidden";
}

// puxar da api
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

// carregar mais
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
