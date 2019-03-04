import * as actionTypes from '../actions/actionTypes';

const initialState = {
    repositories: [],
    page: 1,
    nextPage: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_REPOS: return {...state, repositories: action.payload};
        case actionTypes.LOADING: return {...state, loading: action.payload};
        case actionTypes.SET_PAGE: return {...state, page: action.payload};
        case actionTypes.SET_NEXT_PAGE: return {...state, nextPage: action.payload};
        case actionTypes.LOAD_REPOS_FAILED: return {...state, error: action.payload};
        case actionTypes.LOAD_REPOS_SUCCESS: return {...state, error: null};
        default: return state;
    }
};

export default reducer;