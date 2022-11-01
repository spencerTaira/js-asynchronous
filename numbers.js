"use strict";

const BASE_URL = 'http://numbersapi.com';
const $RESULTS = $("#fav-num-facts"); // make it lowercase constant

/**
 * Controller:
 * On submit, calls getNumsFacts (axios request functions) and populates dom
 * with populateResults function.
 * Input: evt - event object
 * Output: undefined
 */
async function getNumTrivia(evt) {

  evt.preventDefault();

  const favNums = $('#fav-num').val();

  const fact1 = getNumsFacts(favNums); // These are promises end with 'P'
  const fact3 = getNumsFacts(favNums);
  const fact2 = getNumsFacts(favNums);
  const fact4 = getNumsFacts(favNums);

  const results = await Promise.allSettled([fact1, fact2, fact3, fact4]);
  populateResults(results);
}

/**
 * Accepts an array containing objects with number facts.
 * Clears old results and populates dom with facts
 */
function populateResults(numFacts) {
  $RESULTS.empty();
  for (const numFact of numFacts) {
    debugger;
    if (numFact.value["text"] !== undefined) {
      $RESULTS.append( //Can refactor html element build to a separate function
        `
        <p>${numFact.value["text"]}</p>
        `
      );
    } else {
      for (let key in numFact.value) {
        $RESULTS.append(
          `
          <p>${numFact.value[key]}</p>
          `
        );
      }
    }
  }
}

/**
 * Accepts one or more numbers in string form ('1,2,3,4,5'),
 * returns an object containing the number(s) as keys and their
 * corresponding facts
 */
async function getNumsFacts(favNums) {
  const response = await axios.get(
    BASE_URL + `/${favNums}/trivia?json`
  );

  return response.data;
}

$('#fav-num-form').on('submit', getNumTrivia);