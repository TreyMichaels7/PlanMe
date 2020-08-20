'use strict';

const info = {
    "groups": [
        {
            "front": {
                "title": "Basketball Group",
                "image": {
                    "src": "img/Basketball.jpg",
                    "alt": "A basketball"
                },
                "text": "This group plays basketball at the IMA",
            },
            "back": {
                "title": "Members",
                "members": [
                    "Jordan",
                    "Joe",
                    "Bob"
                ]
            }
        },

        {
            "front": {
                "title": "Concert Group",
                "image": {
                    "src": "img/concert.jpg",
                    "alt": "People at a concert"
                },
                "text": "This group goes to concerts",
            },
            "back": {
                "title": "Members",
                "members": [
                    "Josh",
                    "George",
                    "Jill"
                ]
            }
        },

        {
            "front": {
                "title": "BBQ Group",
                "image": {
                    "src": "img/bbq.jpg",
                    "alt": "Ribs on a grill"
                },
                "text": "This group meets weekly to have bbqs"
            },
            "back": {
                "title": "Members",
                "members": [
                    "Lilly",
                    "Matt",
                    "Bryan",
                    "Roger"
                ]
            }
        },

        {
            "front": {
                "title": "Super Bowl Group",
                "image": {
                    "src": "img/superbowl.jpeg",
                    "alt": "The Vince Lombardi trophy"
                },
                "text": "This group will party together for the Super Bowl"
            },
            "back": {
                "title": "Members",
                "members": [
                    "Jimmy",
                    "Daniel",
                    "Kevin",
                    "Antonio"
                ]
            }
        },

        {
            "front": {
                "title": "Soccer Group",
                "image": {
                    "src": "img/soccer.jpg",
                    "alt": "A soccer ball at the back of the goal's net"
                },
                "text": "This group plays soccer at the IMA fields"
            },
            "back": {
                "title": "Members",
                "members": [
                    "Areeb",
                    "Katie",
                    "Jen",
                    "Jack"
                ]
            }
        }
    ]
}

document.querySelector("body").onload = function() {
    let groupLayout = document.querySelector(".group-layout");
    for (let i = 0; i < info.groups.length; i++) {
        let card = createCard(info.groups[i]);
        groupLayout.appendChild(card);
    }

    let cardButtons = $('.btn-warning');

    cardButtons.click(function(){
        let backs = $(".card-back");
        let fronts = $(".card-front");
        let cardFront = $(this).parent();
        let cardBack = $(this).parent().siblings();

        if (this.innerText == "More Info") {
            fronts.removeClass('hidden');
            backs.addClass('hidden');

            cardFront.addClass('hidden');
            cardBack.removeClass('hidden');
        }
        else {
            cardFront.addClass('hidden');
            cardBack.removeClass('hidden');
        }
    });
}


function createCard(data) {
    let card = document.createElement("div");
    card.classList.add("card");
    
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    let image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = data.front.image.src;
    image.alt = data.front.image.alt;

    let fTitle = document.createElement("h2");
    fTitle.classList.add("card-title");
    fTitle.innerText = data.front.title;

    let descr = document.createElement("p");
    descr.classList.add("card-text");
    descr.innerText = data.front.text;

    let fBut = document.createElement("button");
    fBut.classList.add("btn", "btn-warning");
    fBut.textContent = "More Info";

    let cardBack = document.createElement("div");
    cardBack.classList.add("card-back", "hidden");

    let bTitle = document.createElement("h2");
    bTitle.classList.add("card-title");
    bTitle.innerText = data.back.title;

    let bBut = document.createElement("button");
    bBut.classList.add("btn", "btn-warning");
    bBut.textContent = "Back";

    let memList = document.createElement("ul");

    for (let i = 0; i < data.back.members.length; i++) {
        let mem = document.createElement("li");
        mem.textContent = data.back.members[i];
        memList.appendChild(mem);
    }

    cardFront.appendChild(image);
    cardFront.appendChild(fTitle);
    cardFront.appendChild(descr);
    cardFront.appendChild(fBut);

    cardBack.appendChild(bTitle);
    cardBack.appendChild(memList);
    cardBack.appendChild(bBut);

    cardBody.appendChild(cardFront);
    cardBody.appendChild(cardBack);

    card.appendChild(cardBody);

    return card;
}

