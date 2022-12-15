var el;
// Await for doc to get ready
document.addEventListener('DOMContentLoaded', function() {
    // Listen for form change
    document.querySelector('input').addEventListener('change', async function(e) {
        e.preventDefault();
        setCard(e.target.value.toLowerCase());
    })
});

// Get pokemon data
function setCard(name) {
    if (document.getElementById('error').style.display == 'block') document.getElementById('error').style.display = 'none';
    const base = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(base).then((res) => res.json()).then((data) => {
        let info = { name: name.charAt(0).toUpperCase() + name.slice(1), image: data["sprites"]["front_default"], health: data["stats"][0]["base_stat"], xp: data["base_experience"], ability: data["abilities"][1]["ability"]["name"].charAt(0).toUpperCase() + data["abilities"][1]["ability"]["name"].slice(1), hidden_ability: data["abilities"][0]["ability"]["name"].charAt(0).toUpperCase() + data["abilities"][0]["ability"]["name"].slice(1)};
        document.getElementById('pokeinput').style.display = 'none';
        document.getElementById('pokecard').style.display = 'block';
        document.getElementById('poke-image').src = info["image"];
        document.getElementById('poke-stats').innerText = `Name: ${info["name"]}\nExperience: ${info["xp"]}\nHealth: ${info["health"]}\nAbility: ${info["ability"].replace("-", " ")}\nHidden Ability: ${info['hidden_ability']}`
    }).catch((e) => {
        return flashError(`The pokemon provided was not found.`);
    });
}


// Flash a error
function flashError(error) {
    let box = document.getElementById('error');
    box.innerText = error;
    box.style.display = 'block';
    setTimeout(() => {
        box.style.display = 'none';
    }, 5000)
}
