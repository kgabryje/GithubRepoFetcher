import axios from '../../axios-setup';
import * as actionTypes from './actionTypes';
import { findNextPageUrl } from '../utility';

const baseUrl = 'https://api.github.com';

export const setRepos = repositories => ({
    type: actionTypes.SET_REPOS,
    payload: repositories
});

export const setNextPage = nextPageUrl => ({
    type: actionTypes.SET_NEXT_PAGE,
    payload: nextPageUrl
});

export const loadReposFailed = error => ({
    type: actionTypes.LOAD_REPOS_FAILED,
    payload: error
});

export const loading = isLoading => ({
    type: actionTypes.LOADING,
    payload: isLoading
});

export const loadPage = (query, pageNumber = 1) => dispatch => {
    const repoSearchUrl = `${baseUrl}/search/repositories?q=${query}&page=${pageNumber}`;

    dispatch(loading(true));
    axios.get(repoSearchUrl)
        .then(response => {
            dispatch(setRepos(response.data.items));
            dispatch(setNextPage(findNextPageUrl(response.headers.link)));
            dispatch(loading(false));
        })
        .catch(error => {
            dispatch(loadReposFailed(error));
            dispatch(loading(false))
        });
};