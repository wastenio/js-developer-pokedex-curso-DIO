const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  console.log(pokemon);
  return `
        <div id="${
          pokemon.number
        }-card" class="card-pokemon" onclick="toggleDetails('${
    pokemon.number
  }')">
            <li class="pokemon ${pokemon.type}">

                <div id="${pokemon.number}-infor">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </div>

                <div class="stats hidden"  id="${pokemon.number}-stats" >
                    <div class="stat">
                        <span class="stat-label">HP:</span>
                        <span class="progress-bar" style="width: ${
                          pokemon.stats[0].base_stat
                        }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[0].base_stat
  }%</span> </span>
                        <div data-ls-module="progressBar" role="progressbar" aria-valuenow="80" class="ls-animated"></div>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Attack:</span>
                        
                        <span class="progress-bar" style="width: ${
                          pokemon.stats[1].base_stat
                        }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[1].base_stat
  }%</span> </span>

                    </div>
                    <div class="stat">
                        <span class="stat-label">Defense:</span>
                                                <span class="progress-bar" style="width: ${
                                                  pokemon.stats[2].base_stat
                                                }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[2].base_stat
  }%</span> </span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Sp-Atk:</span>
                                                <span class="progress-bar" style="width: ${
                                                  pokemon.stats[3].base_stat
                                                }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[3].base_stat
  }%</span> </span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Sp-Def:</span>
                                                <span class="progress-bar" style="width: ${
                                                  pokemon.stats[4].base_stat
                                                }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[4].base_stat
  }%</span> </span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Speed:</span>
                                                <span class="progress-bar" style="width: ${
                                                  pokemon.stats[5].base_stat
                                                }%;background-color: red;" > <span class="stat-value">${
    pokemon.stats[5].base_stat
  }%</span> </span>
                    </div>
                </div>
            </li>
        </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

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

function toggleDetails(id) {
  const inforDiv = document.getElementById(`${id}-infor`);
  const statsDiv = document.getElementById(`${id}-stats`);

  inforDiv.classList.toggle("hidden");
  statsDiv.classList.toggle("hidden");
}
