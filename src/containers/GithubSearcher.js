import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu';
import axios from '../axios-setup';
import debounce from 'lodash.debounce'
import RepoList from "../components/Repos/RepoList";

class GithubSearcher extends Component {
    state = {
        repositories: []
    };

    searchRepositories = debounce((userInput) => {
        axios.get(`search/repositories?q=${userInput}`)
            .then(response => {
                    this.setState({
                        ...this.state,
                        repositories: response.data.items
                    });
                }
            );
    }, 200);

    render() {
        return (
            <React.Fragment>
                <SearchMenu onInputRepoNameChange={event => this.searchRepositories(event.target.value)}/>
                <RepoList repositories={this.state.repositories}/>
            </React.Fragment>
        );
    }
}

export default GithubSearcher;