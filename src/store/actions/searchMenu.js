import * as actionTypes from './actionTypes';

export const setUserInput = userInput => ({
    type: actionTypes.SET_USER_INPUT,
    payload: userInput
});

export const setSortBy = sortBy => ({
    type: actionTypes.SET_SORT_BY,
    payload: sortBy
});
