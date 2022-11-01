"use strict";

//function to get the cards

//function to get the deck

//function to display the cards




let deckId = '';

/**
 * Function for handling button click 
 */
async function handleButtonClick(evt) {
    console.debug("handleButtonClick fired")
    evt.preventDefault();

    let cardInfo;

    if (deckId === '') {
        deckId = await getDeck();
    }

    cardInfo = await getCardInfo(deckId);
    
    //need to change for different draw count
    displayCardInDom(cardInfo.cards[0]); 
    
}

/**
 * Make an API request for a new deck and return the deck ID
 */
async function getDeck() {
    console.debug("getDeck");
    let response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
    return response.data.deck_id
}

/**
 * Make an API request for a new card based on the deck ID
 * 
 * Return the deck object 
 */
async function getCardInfo(deck_id) {
    console.debug("getCard");
    let response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    )
    return response.data;
}

/**
 * Take information about a single card and display in DOM
 */
function displayCardInDom(card) {
    console.log(card);
    $("#display-cards").append(
        `<img src=${card.image}>`
    )
}

$("#request-cards").on("click", handleButtonClick);