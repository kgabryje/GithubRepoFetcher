import * as actionTypes from '../actions/actionTypes';

const initialState = {
    repositories: [],
    nextPage: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_REPOS: return {...state, repositories: action.payload};
        case actionTypes.LOADING: return {...state, loading: action.payload};
        case actionTypes.SET_NEXT_PAGE: return {...state, nextPage: action.payload};
        case actionTypes.LOAD_REPOS_FAILED: return {...state, error: action.payload};
        default: return state;
    }
};

export default reducer;