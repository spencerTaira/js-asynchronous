"use strict";

const BASE_URL = 'http://numbersapi.com';
const $RESULTS = $("#fav-num-facts");

async function getFourFacts(evt) {

  evt.preventDefault();

  const favNums = $('#fav-num').val();
  const numFacts = await getNumsFacts(favNums);
  //console.log(numFacts);
  populateResults(numFacts);
}

/**
 * Accepts an object containing number facts.
 * Clears old results and populates dom with facts
 */
function populateResults(numFacts) {
  $RESULTS.empty();
  if (numFacts["text"] !== undefined) {
    $RESULTS.append(
      `
      <p>${numFacts["text"]}</p>
      `
    )
  } else {


    for (let key in numFacts) {
      $RESULTS.append(
        `
        <p>${numFacts[key]}</p>
        `
      )
    }
  }

}


/**
 * Accepts one or more numbers in string form,
 * returns an object containing the number(s) as keys and their
 * corresponding facts
 */
async function getNumsFacts(favNums) {
  const response = await axios.get(
    BASE_URL + `/${favNums}/trivia?json`
  )

  return response.data;
}

$('#fav-num-form').on('submit', getFourFacts);