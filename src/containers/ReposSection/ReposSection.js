import React, {Component} from 'react';
import * as actions from '../../store/actions/repoList';
import {connect} from 'react-redux';
import RepoList from '../../components/Repos/RepoList';
import classes from './ReposSection.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

class ReposSection extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.userInput.length > 0 &&
            (this.props.userInput !== nextProps.userInput || this.props.sortBy !== nextProps.sortBy)) {
            this.props.searchByQuery(`${nextProps.userInput} sort:${nextProps.sortBy}`)
        }
    }

    refreshRepoHandler = repositoryToRefresh => {
        this.props.refreshRepo(this.props.repositories, repositoryToRefresh);
    };

    render() {
        const reposSectionBody = (
            <div>
                <RepoList repositories={this.props.repositories}
                          refreshClicked={this.refreshRepoHandler}
                          refreshingReposIds={this.props.refreshingRepositoriesIds}/>
            </div>
        );

        return (
            <div className={classes.ReposSection}>
                {
                    this.props.userInput.length === 0 ? 'Start typing to search for repos' :
                        this.props.error ? 'Something went wrong! :(' :
                            this.props.repositories.length === 0 && !this.props.loading ? 'No repositories found' :
                                this.props.loading ? (<CircularProgress size={50} className={classes.Progress}/>) :
                                    reposSectionBody
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repoList.repositories,
    error: state.repoList.error,
    loading: state.repoList.loading,
    refreshingRepositoriesIds: state.repoList.reloadingReposIds,

    userInput: state.search.userInput,
    sortBy: state.search.sortBy
});

const mapDispatchToProps = dispatch => ({
    searchByQuery: queryString => dispatch(actions.loadPage(queryString)),
    refreshRepo: (repositories, repoFullName) => dispatch(actions.refreshRepo(repositories, repoFullName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposSection);