const axios = require("axios");
const { Rabbit } = require("crypto-js");
const api_domain = "https://api.spoonacular.com/recipes/complexSearch";
const querystring = require('querystring');
const recipes_utils = require("./recipes_utils");



/**
 * check if query params exists (cuisine / diet / intolerances) and add them to search_params
 */
async function extractQueryParams(query, search_params) {
    //const {searchQuery, num} = req.params; ->
    // searchQuery = req.params[0] = req.params.searchQuery
    // req.query = all the query parameters that after the '?' 
    //check if query params exists (cuisine / diet / intolerances) and add them to search_params
    if (Object.keys(query) !== 0) {
        Object.assign(search_params, query);
    }
    return search_params;
}

async function getSearchResult(search_params) {
    const response = await axios.get(`${api_domain}`, {
        params: search_params
    });
    return response;
}

async function searchForRecipes(user_id, search_params) {
    let search_pool = await getSearchResult(search_params);
    let recipesArr = search_pool.data.results;
    return recipes_utils.extarctRecipesPreviewDetails(user_id, recipesArr);
}

exports.extractQueryParams = extractQueryParams;
exports.searchForRecipes = searchForRecipes;
exports.getSearchResult = getSearchResult;




