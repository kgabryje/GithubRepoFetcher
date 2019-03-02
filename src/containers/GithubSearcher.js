import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu';
import axios from '../axios-setup';

class GithubSearcher extends Component {
    state = {
        repositories: []
    };

    searchRepositories = (event) => {
        const userInput = event.target.value;
        axios.get(`search/repositories?q=${userInput}`)
            .then(response => {
                    this.setState({
                        ...this.state,
                        repositories: response.data.items
                    });
                }
            );
    };

    render() {
        return (
            <React.Fragment>
                <SearchMenu onInputRepoNameChange={this.searchRepositories}/>
                {this.state.repositories.map(repo => (
                    <div key={repo.id}>{repo.name}</div>
                ))}
            </React.Fragment>
        );
    }
}

export default GithubSearcher;