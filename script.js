// ===== Feedback form validation (frontend demo only) =====
const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("formSuccess");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  if (form.checkValidity()) {
    // All fields are valid: show confirmation and clear the form
    successMessage.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  } else {
    // Show Bootstrap's red error messages
    successMessage.classList.add("d-none");
    form.classList.add("was-validated");
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// Add a subtle ripple trail as the mouse moves across the page.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let lastRippleX = null;
let lastRippleY = null;
let activeRipples = 0;

function addCursorRipple(x, y) {
  if (reduceMotion.matches || activeRipples >= 5) return;

  const ripple = document.createElement("span");
  ripple.className = "cursor-ripple";
  ripple.setAttribute("aria-hidden", "true");
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  document.body.appendChild(ripple);
  activeRipples += 1;

  ripple.addEventListener("animationend", function () {
    ripple.remove();
    activeRipples -= 1;
  }, { once: true });
}

document.addEventListener("pointermove", function (event) {
  if (!event.isPrimary || (event.pointerType !== "mouse" && event.pointerType !== "pen") || reduceMotion.matches) return;

  const distance = lastRippleX === null
    ? Infinity
    : Math.hypot(event.clientX - lastRippleX, event.clientY - lastRippleY);
  if (distance < 70) return;

  lastRippleX = event.clientX;
  lastRippleY = event.clientY;
  addCursorRipple(lastRippleX, lastRippleY);
});

// ===== Mini Pokedex =====
// Each Pokemon is one object in this list. To add one, copy a line and edit it.
const pokemonList = [
  { id: 252, name: "Treecko",   slug: "treecko",   types: ["Grass"],           where: "Given by Professor Birch on Route 101.", info: "A calm gecko that is quick on its feet. Good against Water and Rock Pokémon.", evolutionChains: [[{ name: "Treecko", slug: "treecko" }, { name: "Grovyle", slug: "grovyle", evolvesAt: "Lv. 16" }, { name: "Sceptile", slug: "sceptile", evolvesAt: "Lv. 36" }]] },
  { id: 255, name: "Torchic",   slug: "torchic",   types: ["Fire"],            where: "Given by Professor Birch on Route 101.", info: "A small chick with a flame inside its body; quick and persistent in battle.", evolutionChains: [[{ name: "Torchic", slug: "torchic" }, { name: "Combusken", slug: "combusken", evolvesAt: "Lv. 16" }, { name: "Blaziken", slug: "blaziken", evolvesAt: "Lv. 36" }]] },
  { id: 258, name: "Mudkip",    slug: "mudkip",    types: ["Water"],           where: "Given by Professor Birch on Route 101.", info: "A sturdy mud fish. It is a great choice for the Rustboro Gym.", evolutionChains: [[{ name: "Mudkip", slug: "mudkip" }, { name: "Marshtomp", slug: "marshtomp", evolvesAt: "Lv. 16" }, { name: "Swampert", slug: "swampert", evolvesAt: "Lv. 36" }]] },
  { id: 263, name: "Zigzagoon", slug: "zigzagoon", types: ["Normal"],          where: "Routes 101, 102, and 103.",              info: "A raccoon-like Pokémon that walks in a zigzag. Very common early on.", evolutionChains: [[{ name: "Zigzagoon", slug: "zigzagoon" }, { name: "Linoone", slug: "linoone", evolvesAt: "Lv. 20" }]] },
  { id: 261, name: "Poochyena", slug: "poochyena", types: ["Dark"],            where: "Routes 101 and 102 (check your version).", info: "A small hyena Pokémon that bites at anything it sees.", evolutionChains: [[{ name: "Poochyena", slug: "poochyena" }, { name: "Mightyena", slug: "mightyena", evolvesAt: "Lv. 18" }]] },
  { id: 265, name: "Wurmple",   slug: "wurmple",   types: ["Bug"],             where: "Routes 101 and 102.",                    info: "A worm Pokémon with two possible evolution paths.", evolutionChains: [[{ name: "Wurmple", slug: "wurmple" }, { name: "Silcoon", slug: "silcoon", evolvesAt: "Lv. 7" }, { name: "Beautifly", slug: "beautifly", evolvesAt: "Lv. 10" }], [{ name: "Wurmple", slug: "wurmple" }, { name: "Cascoon", slug: "cascoon", evolvesAt: "Lv. 7" }, { name: "Dustox", slug: "dustox", evolvesAt: "Lv. 10" }]] },
  { id: 270, name: "Lotad",     slug: "lotad",     types: ["Water", "Grass"],  where: "Route 102 (check your version).",        info: "A water lily Pokémon that floats on ponds.", evolutionChains: [[{ name: "Lotad", slug: "lotad" }, { name: "Lombre", slug: "lombre", evolvesAt: "Lv. 14" }, { name: "Ludicolo", slug: "ludicolo", evolvesAt: "Water Stone" }]] },
  { id: 273, name: "Seedot",    slug: "seedot",    types: ["Grass"],           where: "Route 102 (check your version).",        info: "An acorn Pokémon that hangs from trees until it is hungry.", evolutionChains: [[{ name: "Seedot", slug: "seedot" }, { name: "Nuzleaf", slug: "nuzleaf", evolvesAt: "Lv. 14" }, { name: "Shiftry", slug: "shiftry", evolvesAt: "Leaf Stone" }]] },
  { id: 280, name: "Ralts",     slug: "ralts",     types: ["Psychic"],         where: "Route 102.",                             info: "A small Pokémon that senses the feelings of people and Pokémon.", evolutionChains: [[{ name: "Ralts", slug: "ralts" }, { name: "Kirlia", slug: "kirlia", evolvesAt: "Lv. 20" }, { name: "Gardevoir", slug: "gardevoir", evolvesAt: "Lv. 30" }]] },
  { id: 276, name: "Taillow",   slug: "taillow",   types: ["Normal", "Flying"],where: "Route 104.",                             info: "A brave swallow Pokémon that fights bigger Pokémon.", evolutionChains: [[{ name: "Taillow", slug: "taillow" }, { name: "Swellow", slug: "swellow", evolvesAt: "Lv. 22" }]] },
  { id: 278, name: "Wingull",   slug: "wingull",   types: ["Water", "Flying"], where: "Route 104 and water routes.",            info: "A seagull Pokémon that glides over the ocean.", evolutionChains: [[{ name: "Wingull", slug: "wingull" }, { name: "Pelipper", slug: "pelipper", evolvesAt: "Lv. 25" }]] }
];

const dexList = document.getElementById("dexList");
const dexSearch = document.getElementById("dexSearch");
const dexType = document.getElementById("dexType");
const dexCount = document.getElementById("dexCount");
const dexVisibleCount = document.getElementById("dexVisibleCount");
const dexTotalCount = document.getElementById("dexTotalCount");
const dexEmpty = document.getElementById("dexEmpty");

// Make small colored badges for types
function typeBadges(types) {
  return types.map(function (t) {
    return '<span class="badge type-badge type-' + t.toLowerCase() + '">' + t + '</span>';
  }).join("");
}

// Pokemondb image address from the Pokemon's slug
function imageUrl(slug) {
  return "https://img.pokemondb.net/artwork/large/" + slug + ".jpg";
}

function renderEvolutionChain(chain) {
  return '<div class="evolution-chain">' + chain.map(function (stage, index) {
    const pokemon = '<span class="evolution-stage">' +
      '<img src="' + imageUrl(stage.slug) + '" alt="" loading="lazy">' +
      '<span>' + stage.name + '</span>' +
    '</span>';
    if (index === 0) return pokemon;

    return '<span class="evolution-step"><span aria-hidden="true">→</span><small>' +
      (stage.evolvesAt || "") + '</small></span>' + pokemon;
  }).join("") + '</div>';
}

function evolutionChainText(chain) {
  return chain.map(function (stage, index) {
    return (index === 0 ? "" : " → ") + stage.name +
      (stage.evolvesAt ? " (" + stage.evolvesAt + ")" : "");
  }).join("");
}

// Fill the type dropdown from the list (no repeated types)
function fillTypeOptions() {
  const allTypes = [];
  pokemonList.forEach(function (p) {
    p.types.forEach(function (t) {
      if (!allTypes.includes(t)) allTypes.push(t);
    });
  });
  allTypes.sort().forEach(function (t) {
    dexType.innerHTML += '<option value="' + t + '">' + t + '</option>';
  });
}

// Show the cards that match the search text and chosen type
function showPokedex() {
  const text = dexSearch.value.trim().toLowerCase();
  const type = dexType.value;

  const matches = pokemonList.filter(function (p) {
    const nameMatch = p.name.toLowerCase().includes(text);
    const typeMatch = (type === "all") || p.types.includes(type);
    return nameMatch && typeMatch;
  });

  dexList.innerHTML = "";
  matches.forEach(function (p) {
    dexList.innerHTML +=
      '<div class="col-6 col-md-4 col-lg-3">' +
        '<div class="card h-100 guide-card service-effect text-center">' +
          '<img src="' + imageUrl(p.slug) + '" class="card-img-top dex-img" alt="' + p.name + ' artwork">' +
          '<div class="card-body d-flex flex-column">' +
            '<span class="dex-number">#' + String(p.id).padStart(3, "0") + '</span>' +
            '<h3 class="h6 card-title">' + p.name + '</h3>' +
            '<p class="mb-2">' + typeBadges(p.types) + '</p>' +
            '<div class="evolution-preview"><strong>Evolution</strong>' +
              p.evolutionChains.map(renderEvolutionChain).join("") +
            '</div>' +
            '<button type="button" class="btn btn-sm btn-primary mt-auto" data-bs-toggle="modal" ' +
              'data-bs-target="#pokemonModal" data-slug="' + p.slug + '">Details</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  dexVisibleCount.textContent = matches.length;
  dexTotalCount.textContent = pokemonList.length + " Pokémon in this Mini Pokédex";
  dexCount.setAttribute("aria-label", "Showing " + matches.length + " of " + pokemonList.length + " Pokémon in this Mini Pokédex");
  dexEmpty.classList.toggle("d-none", matches.length > 0);
}

// When the popup opens, fill it with the Pokemon that was clicked
document.getElementById("pokemonModal").addEventListener("show.bs.modal", function (event) {
  const slug = event.relatedTarget.getAttribute("data-slug");
  const p = pokemonList.find(function (item) { return item.slug === slug; });

  document.getElementById("modalTitle").textContent = p.name + " (#" + String(p.id).padStart(3, "0") + ")";
  document.getElementById("modalImage").src = imageUrl(p.slug);
  document.getElementById("modalImage").alt = p.name + " artwork";
  document.getElementById("modalTypes").innerHTML = typeBadges(p.types);
  document.getElementById("modalInfo").textContent = p.info;
  const modalEvolutions = document.getElementById("modalEvolutions");
  modalEvolutions.replaceChildren();
  p.evolutionChains.forEach(function (chain) {
    const item = document.createElement("li");
    item.textContent = evolutionChainText(chain);
    modalEvolutions.appendChild(item);
  });
  document.getElementById("modalWhere").textContent = p.where;
  document.getElementById("modalLink").href = "https://pokemondb.net/pokedex/" + p.slug;
});

// Update the list when the user types or changes the type
dexSearch.addEventListener("input", showPokedex);
dexType.addEventListener("change", showPokedex);

fillTypeOptions();
showPokedex();

// Note: the slider, hamburger menu, and FAQ accordion are handled by
// Bootstrap's JavaScript bundle, so they need no extra code here.
