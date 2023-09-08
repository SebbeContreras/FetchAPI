let characterArray = [];
const charaImg = [
    "./img/Luke-rotjpromo.webp",
    "./img/c3po.jpeg",
    "./img/R2d2.webp",
    "./img/DarthVader.jpg",
    "./img/Leia.webp",
    "./img/Owen.webp",
    "./img/Beru.webp",
    "./img/R5d4.webp",
    "./img/Biggs.webp",
    "./img/ObiWanHS-SWE.webp"];
    let counter = 0;
    
    const main = document.querySelector("main")
    const content = document.createElement("content")
    const selectOne = document.getElementById("char1");
    const selectTwo = document.getElementById("char2");
    const button = document.getElementById("button");
    
    async function getCharacter() {
        const res = await fetch("https://swapi.dev/api/people/");
        const data = await res.json();
        
        characterArray = data.results
        printUsers(characterArray);
        console.log(characterArray)
    }
    getCharacter();
    
    function printUsers(arr) {
        arr.forEach(i => {
            const opt = document.createElement("option");
            opt.setAttribute("data-index", counter);
            opt.setAttribute("value", i.name);
            opt.setAttribute("class", "opt");
            
            const optis = document.createElement("option");
            optis.setAttribute("data-index", counter);
            optis.setAttribute("value", i.name);
            optis.setAttribute("class", "optis");
            
            opt.innerText = i.name;
            optis.innerText = i.name;
            
            selectTwo.append(opt);
            selectOne.append(optis);
            counter++;
        });
    }
    
    class Character {
        constructor(name,gender,height,mass,hairColor,skinColor,eyeColor,movies,homeworld,pictureUrl) {
            this.name = name;
            this.gender = gender;
            this.height = height;
            this.mass = mass;
            this.hairColor = hairColor;
            this.skinColor = skinColor;
            this.eyeColor = eyeColor;
            this.movies = movies;
            this.homeworld = this.showPlanets(homeworld);
            this.pictureUrl = pictureUrl;
        } async firstApperance() {
            let characterInfo = [];
            for (const url of this.movies) {
                const res = await fetch(url);
                const data = await res.json();
                
                characterInfo.push(data)
            }
            Array.from(characterInfo)
            this.movies = characterInfo
           console.log(this.movies)
            return "appeared first in " + characterInfo[0].release_date;
            } 
        commonFilms(data) {
            
        } async showPlanets(url) {
            let res = await fetch(url);
            let data = await res.json();
            
            return this.planet_name = data.name
        } showVehicle() {
            
            
        }
    }
function showCharacters() {
    
    const selectOneArray = Array.from(selectOne)
    const selected = selectOne.value;
    const foundOne = selectOneArray.find(e => e.value === selected)
    let characterOne = new Character(
        characterArray[foundOne.dataset.index].name,
        characterArray[foundOne.dataset.index].gender,
        characterArray[foundOne.dataset.index].height,
        characterArray[foundOne.dataset.index].mass,
        characterArray[foundOne.dataset.index].hair_color,
        characterArray[foundOne.dataset.index].skin_color,
        characterArray[foundOne.dataset.index].eye_color,
        characterArray[foundOne.dataset.index].films,
        characterArray[foundOne.dataset.index].homeworld,
        charaImg[foundOne.dataset.index]);
        
        const selectTwoArray = Array.from(selectTwo)
        const selectedTwo = selectTwo.value;
        const foundTwo = selectTwoArray.find(e => e.value === selectedTwo)
        let characterTwo = new Character(
            characterArray[foundTwo.dataset.index].name,
            characterArray[foundTwo.dataset.index].gender,
            characterArray[foundTwo.dataset.index].height,
            characterArray[foundTwo.dataset.index].mass,
            characterArray[foundTwo.dataset.index].hair_color,
            characterArray[foundTwo.dataset.index].skin_color,
            characterArray[foundTwo.dataset.index].eye_color,
            characterArray[foundTwo.dataset.index].films,
            characterArray[foundTwo.dataset.index].homeworld,
            charaImg[foundTwo.dataset.index]);
            
            
            
            content.innerHTML = `
            <section id="left">
            <div class="title">
            <h2>${characterOne.name}</h2>
            </div>
            <img src="${characterOne.pictureUrl}" class="img">
            </section>
            <section id="middle">
            <div>
            <input type="button" value="Compare" id="compare">
            </div>
            <div class="info hide">
            <div class="row">
            <p>${characterOne.gender}</p><p class="p_middle">Gender</p><p>${characterTwo.gender}</p>
            </div>
            <div class="row">
            <p>${characterOne.height}cm</p><p class="p_middle">Height</p><p>${characterTwo.height}cm</p>
            </div>
            <div class="row">
            <p>${characterOne.mass}kg</p><p class="p_middle">Weight</p><p>${characterTwo.mass}kg</p>
            </div>
            <div class="row">
            <p>${characterOne.eyeColor}</p><p class="p_middle">Eye color</p><p>${characterTwo.eyeColor}</p>
            </div>
            <div class="row">
            <p>${characterOne.hairColor}</p><p class="p_middle">Hair color</p><p>${characterTwo.hairColor}</p>
            </div>
            <div class="row">
            <p>${characterOne.skinColor}</p><p class="p_middle">Skin color</p><p>${characterTwo.skinColor}</p>
            </div>
            <div class="row">
            <p>${characterOne.movies.length}</p><p class="p_middle">Appearances</p><p>${characterTwo.movies.length}</p>
            </div>
            </div>
            </section>
            <section id="right">
            <div class="title">
            <h2>${characterTwo.name}</h2>
            </div>
            <img src="${charaImg[foundTwo.dataset.index]}" class="img">
            </section>
            `
            main.append(content);
            checkValues();
            characterTwo.firstApperance();
            characterOne.firstApperance();
            
            const info = document.querySelector(".info");
            const compare = document.querySelector("#compare");

            compare.addEventListener("click", () => {
                info.classList.remove("hide");
            })
            function checkValues() {
                console.log(characterOne.planet_name);
                console.log(characterTwo.homeworld);

                if (characterOne.gender === characterTwo.gender) {
                    const p = document.querySelector(".row");
                    p.style.color = "gold";
                }
                
                if (Number(characterOne.height) < Number(characterTwo.height)) {
                    const w1 = document.querySelector(".row:nth-of-type(2) p:nth-of-type(3)");
                    const l1 = document.querySelector(".row:nth-of-type(2) p:nth-of-type(1)");
                    w1.classList.add("winner")
                    l1.classList.add("loser")
                } else if (Number(characterOne.height) > Number(characterTwo.height)) {
                    const w1 = document.querySelector(".row:nth-of-type(2) p:nth-of-type(1)");
                    const l1 = document.querySelector(".row:nth-of-type(2) p:nth-of-type(3)");
                    l1.classList.add("loser")
                    w1.classList.add("winner")
                } else {
                    const p = document.querySelector(".row:nth-of-type(2)");
                    p.style.color = "gold";
                }

                if (Number(characterOne.mass) > Number(characterTwo.mass)) {
                    const w2 = document.querySelector(".row:nth-of-type(3) p:nth-of-type(1)");
                    const l2 = document.querySelector(".row:nth-of-type(3) p:nth-of-type(3)");
                    w2.classList.add("winner")
                    l2.classList.add("loser")
                } else if (Number(characterOne.mass) < Number(characterTwo.mass)) {
                    const w2 = document.querySelector(".row:nth-of-type(3) p:nth-of-type(3)");
                    w2.classList.add("winner")
                    const l2 = document.querySelector(".row:nth-of-type(3) p:nth-of-type(1)");
                    l2.classList.add("loser")
                } else {
                    const p = document.querySelector(".row:nth-of-type(3)");
                    p.style.color = "gold";
                }
                
                if (characterOne.eyeColor === characterTwo.eyeColor) {
                    const p = document.querySelector(".row:nth-of-type(4)");
                p.style.color = "gold";
                }
                if (characterOne.hairColor === characterTwo.hairColor) {
                    const p = document.querySelector(".row:nth-of-type(5)");
                p.style.color = "gold";
                }
                if (characterOne.skinColor === characterTwo.skinColor) {
                    const p = document.querySelector(".row:nth-of-type(6)");
                p.style.color = "gold";
                }

                if (Number(characterOne.movies) < Number(characterTwo.movies)) {
                    const w = document.querySelector(".row:nth-of-type(7) p:nth-of-type(3)");
                    const l = document.querySelector(".row:nth-of-type(7) p:nth-of-type(1)");
                    w.classList.add("winner")
                    l.classList.add("loser")
                } else if (Number(characterOne.movies) > Number(characterTwo.movies)) {
                    const w = document.querySelector(".row:nth-of-type(7) p:nth-of-type(1)");
                    const l = document.querySelector(".row:nth-of-type(7) p:nth-of-type(3)");
                    w.classList.add("winner")
                    l.classList.add("loser")
                } else {
                    const p = document.querySelector(".row:nth-of-type(7)");
                    p.style.color = "gold";
                }
                
            }
}
button.addEventListener("click", showCharacters);