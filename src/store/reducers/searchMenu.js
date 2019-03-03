import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userInput: '',
    sortBy: 'score'
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER_INPUT: return {...state, userInput: action.payload};
        case actionTypes.SET_SORT_BY: return {...state, sortBy: action.payload};
        default: return state;
    }
};

export default reducer;