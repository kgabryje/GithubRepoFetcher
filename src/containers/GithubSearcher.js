import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu/SearchMenu';
import axios from '../axios-setup';
import debounce from 'lodash.debounce'
import RepoList from "../components/Repos/RepoList";
import {CircularProgress} from "@material-ui/core";

class GithubSearcher extends Component {
    state = {
        userInput: '',
        repositories: [],
        nextPage: null,
        error: null,
        loading: false
    };

    userInputHandler = debounce(userInput => {
        this.setState({
            userInput: userInput
        });
        this.loadRepositories();
    }, 200);

    loadRepositories = async (isLoadNextPage = false) => {
        this.setState({loading: true});
        await (isLoadNextPage ? this.loadNextPage() : this.searchReposByQuery(this.state.userInput));
        this.setState({loading: false});
    };

    searchReposByQuery = async (queryString) => {
        const repoSearchUrl = `https://api.github.com/search/repositories?q=${queryString}`;
        const response = await axios.get(repoSearchUrl)
            .catch(error =>
                this.setState({
                    error: error,
                    nextPage: null
                })
            );

        const nextPageUrl = this.findNextPageUrl(response.headers.link);

        this.setState({
            error: null,
            repositories: response.data.items,
            nextPage: nextPageUrl
        });
    };

    loadNextPage = async () => {
        const response = await axios.get(this.state.nextPage)
            .catch(error =>
                this.setState({
                    error: error,
                    nextPage: null
                })
            );

        const nextPageUrl = this.findNextPageUrl(response.headers.link);

        this.setState(prevState => ({
            error: null,
            repositories: prevState.repositories.concat(response.data.items),
            nextPage: nextPageUrl
        }));
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
                {
                    this.state.error ? 'Something went wrong! :(' :
                        this.state.repositories.length === 0 ? 'Start typing to search for repos' :
                            <RepoList repositories={this.state.repositories}
                                      onRefreshClicked={() => this.loadRepositories(false)}/>
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