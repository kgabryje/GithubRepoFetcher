import React, {Component} from 'react';
import SearchMenu from '../components/SearchMenu/SearchMenu';
import debounce from 'lodash.debounce';
import RepoList from "../components/Repos/RepoList";
import {CircularProgress} from "@material-ui/core";
import {connect} from "react-redux";
import * as actions from '../store/actions/repoList';


class GithubSearcher extends Component {
    state = {
        userInput: '',
        sortBy: 'score'
    };

    userInputHandler = debounce(userInput => {
        this.props.onSearchByQuery(`${userInput} sort:${this.state.sortBy}`)
    }, 200);

    sortByHandler = sortBy =>
        this.setState({sortBy: sortBy},
            () => {
                if (this.state.userInput.length > 0) {
                    this.props.onSearchByQuery(`${this.state.userInput} sort:${this.state.sortBy}`)
                }
            });

    render() {
        return (
            <React.Fragment>
                <SearchMenu onInputChange={event => this.userInputHandler(event.target.value)}
                            selectInitialValue={this.state.sortBy}
                            onSelectChange={event => this.sortByHandler(event.target.value)}/>
                {/*<Button style={{display: 'block'}}*/}
                {/*variant="contained"*/}
                {/*color="primary"*/}
                {/*onClick={() => this.loadRepositories(false)}>*/}
                {/*Refresh*/}
                {/*</Button>*/}
                <div>
                    {
                        this.props.error ? 'Something went wrong! :(' :
                            this.props.repositories.length === 0 && !this.props.loading ? 'Start typing to search for repos' :
                                <RepoList repositories={this.props.repositories}/>
                    }
                </div>
                <div>
                    {
                        this.props.loading ? <CircularProgress/> :
                            (this.props.nextPage &&
                                <div onClick={() => this.props.onLoadPage(this.props.nextPage)}>Load more</div>)
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repoList.repositories,
    nextPage: state.repoList.nextPage,
    error: state.repoList.error,
    loading: state.repoList.loading
});

const mapDispatchToProps = dispatch => ({
    onSearchByQuery: queryString => dispatch(actions.loadPage(queryString)),
    onLoadPage: (queryString, pageNumber) => dispatch(actions.loadPage(queryString, pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(GithubSearcher);