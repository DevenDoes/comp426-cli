/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Deven Jahnke
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;

    return `
        <div class="card is-4">
            <div class="card-header" style="background-color: ${hero.backgroundColor}">
                <p class="card-header-title" style="color:${hero.color}">
                    ${hero.name}
                </p>
            </div>
            <div class="card-image">
                <figure class="image is-1by1">
                    <img src="${hero.img}" alt="Icon for ${hero.name}">
                </figure>
            </div>
            <div class="card-content">
                <h2 class="">
                    ${hero.subtitle}
                </h2>
                <p class="content">
                    ${hero.description}
                </p>
                <ul class="">
                    <li class="">
                        <span class="has-text-weight-bold">Official Identity: </span>
                        ${hero.first} ${hero.last}
                    </li>
                    <li class="">
                        <span class="has-text-weight-bold">First Seen: </span>
                        ${hero.firstSeen}
                    </li>
                </ul>
            </div>
            <div class="card-spacer"></div>
            <div class="card-footer">
                <button href="#" class="button card-footer-item">Edit</button>
            </div>
        </div>
    `;

};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `
        <div class="card is-4">
            <div class="card-header" style="background-color: ${hero.backgroundColor}">
                <p class="card-header-title" style="color:${hero.color}">
                    Edit Hero Form
                </p>
            </div>
            <div class="card-image">
                <figure class="image is-1by1">
                    <img src="${hero.img}" alt="Icon for ${hero.name}">
                </figure>
            </div>
            <div class="card-content">
                
                <form action="#">
                    <div class="field">
                        <label class="label">
                            Hero Name
                        </label>
                        <input type="text" class="input" value="${hero.name}">
                    </div>
                    <div class="field">
                        <label class="label">
                            First Name
                        </label>
                        <input type="text" class="input" value="${hero.first}">
                    </div>
                    <div class="field">
                        <label class="label">
                            Last Name
                        </label>
                        <input type="text" class="input" value="${hero.last}">
                    </div>
                    <div class="field">
                        <label class="label">
                            Subtitle
                        </label>
                        <input type="text" class="input" value="${hero.subtitle}">
                    </div>
                    <div class="field">
                        <label class="label">
                            Description
                        </label>
                        <div class="control">
                            <textarea cols="30" rows="10" class="textarea">${hero.description}</textarea>
                       </div>
                    </div>
                    <div class="field">
                        <label class="label">
                            First Seen
                        </label>
                        <input type="date" class="input" value="${hero.firstSeen.toISOString().split('T')[0]}">
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" class="button is-link">Save</button>
                        </div>
                        <div class="control">
                            <button class="button">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    let heroCards = [];

    // TODO: Generate the heroes using renderHeroCard()
    heroes.forEach((hero) => {
       heroCards.push(renderHeroCard(hero));
    });

    // TODO: Append the hero cards to the $root element
    heroCards.forEach((card) => {
        $root.append(document.createRange().createContextualFragment(card));
    })

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    let editCard = renderHeroEditForm(randomHero);
    $root.append(document.createRange().createContextualFragment(editCard));

    // TODO: Append the hero edit form to the $root element

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});






