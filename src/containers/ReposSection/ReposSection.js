import React, {Component} from 'react';
import {CircularProgress} from "@material-ui/core";
import * as actions from "../../store/actions/repoList";
import {connect} from "react-redux";
import RepoList from "../../components/Repos/RepoList";
import classes from './ReposSection.module.css';

class ReposSection extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.userInput.length > 0 &&
            (this.props.userInput !== nextProps.userInput || this.props.sortBy !== nextProps.sortBy)) {
            this.props.onSearchByQuery(`${nextProps.userInput} sort:${nextProps.sortBy}`)
        }
    }

    render() {
        return (
            <div className={classes.ReposSection}>
                    {
                        this.props.error ? 'Something went wrong! :(' :
                            this.props.repositories.length === 0 && !this.props.loading ? 'Start typing to search for repos' :
                                <RepoList repositories={this.props.repositories}/>
                    }
                    {
                        this.props.loading ? <CircularProgress/> :
                            (this.props.nextPage &&
                                <div onClick={() => this.props.onLoadPage(this.props.nextPage)}>Load more</div>)
                    }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repoList.repositories,
    nextPage: state.repoList.nextPage,
    error: state.repoList.error,
    loading: state.repoList.loading,

    userInput: state.search.userInput,
    sortBy: state.search.sortBy
});

const mapDispatchToProps = dispatch => ({
    onSearchByQuery: queryString => dispatch(actions.loadPage(queryString)),
    onLoadPage: (queryString, pageNumber) => dispatch(actions.loadPage(queryString, pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposSection);