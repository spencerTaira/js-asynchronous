"use strict";

const BASE_URL = 'http://numbersapi.com';

async function getFourFacts(evt) {

  evt.preventDefault();

  const favNum = $('#fav-num').val();
  const numFacts = await getFavNum(favNum);
  console.log(numFacts);
}

/**
 * Makes axios post request to numbersapi with favNum and returns a
 * promise of an object containing a number fact
 * Input: favNum - String
 * Output: promise - promise (object containing num fact)
 */
async function getFavNum(favNum) {
  const response = await axios.get(
    BASE_URL + `/${favNum}/trivia?json`
  )

  return response;
}

$('#fav-num-form').on('submit', getFourFacts);