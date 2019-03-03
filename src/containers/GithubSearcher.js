import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu/SearchMenu';
import axios from '../axios-setup';
import debounce from 'lodash.debounce';
import uniqBy from 'lodash.uniqby';
import RepoList from "../components/Repos/RepoList";
import {Button, CircularProgress} from "@material-ui/core";

const baseUrl = 'https://api.github.com';

class GithubSearcher extends Component {
    state = {
        userInput: '',
        repositories: [],
        nextPage: null,
        error: null,
        loading: false
    };

    userInputHandler = debounce(userInput => {
        this.setState(
            {userInput: userInput},
            () => this.state.userInput.length > 0 && this.loadRepositories()
        );
    }, 200);

    loadRepositories = async (isLoadNextPage = false) => {
        this.setState({loading: true});
        const response = await (isLoadNextPage ? this.loadNextPage() : this.searchReposByQuery(this.state.userInput))
            .catch(error => this.setState({
                nextPage: null,
                error: error,
                loading: false
            }));
        this.setState({
            repositories: response.repositories,
            nextPage: response.nextPage,
            error: null,
            loading: false
        });
    };

    searchReposByQuery = async (queryString) => {
        const repoSearchUrl = `${baseUrl}/search/repositories?q=${queryString}`;
        const response = await axios.get(repoSearchUrl);
        return {
            repositories: response.data.items,
            nextPage: response.headers.link ? this.findNextPageUrl(response.headers.link) : null
        };
    };

    loadNextPage = async () => {
        const response = await axios.get(this.state.nextPage);
        const repositoriesList = this.state.repositories.concat(response.data.items);
        return {
            repositories: uniqBy(repositoriesList, 'id'),
            nextPage: this.findNextPageUrl(response.headers.link)
        };
    };

    findNextPageUrl = (linkHeader) =>
        linkHeader.split(', ')
            .find(link => link.split('; rel=')[1] === "\"next\"")
            .split(';')[0]
            .slice(1, -1);


    render() {
        return (
            <React.Fragment>
                <SearchMenu onInputRepoNameChange={event => this.userInputHandler(event.target.value)}/>
                <Button variant="contained" color="primary" onClick={() => this.loadRepositories(false)}>
                    Refresh
                </Button>
                {
                    this.state.error ? 'Something went wrong! :(' :
                        this.state.repositories.length === 0 && !this.state.loading ? 'Start typing to search for repos' :
                            <RepoList repositories={this.state.repositories}/>
                }
                {
                    this.state.loading ? <CircularProgress/> :
                        (this.state.nextPage &&
                            <div onClick={() => this.loadRepositories(true)}>Load more</div>)
                }

            </React.Fragment>
        );
    }
}

export default GithubSearcher;