import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu';
import axios from '../axios-setup';
import debounce from 'lodash.debounce'
import RepoList from "../components/Repos/RepoList";

class GithubSearcher extends Component {
    state = {
        userInput: '',
        repositories: [],
        error: null
    };

    userInputHandler = debounce(userInput => {
        this.setState({
            userInput: userInput
        });
        this.searchRepositories();
    });

    searchRepositories = () => this.state.userInput.length > 0 &&
        axios.get(`search/repositories?q=${this.state.userInput}`)
            .then(response =>
                this.setState({
                    repositories: response.data.items
                })
            )
            .catch(error => {
                console.log(error);
                this.setState({error: error});
            });

    render() {
        return (
            <React.Fragment>
                <SearchMenu onInputRepoNameChange={event => this.userInputHandler(event.target.value)}/>
                {
                    this.state.error ? 'Something went wrong! :(' :
                        this.state.repositories.length === 0 ? 'Start typing to search for repos' :
                            <RepoList repositories={this.state.repositories}
                                      onRefreshClicked={this.searchRepositories}/>
                }
            </React.Fragment>
        );
    }
}

export default GithubSearcher;