import React, {Component} from 'react';
import * as actions from "../../store/actions/repoList";
import {connect} from "react-redux";
import RepoList from "../../components/Repos/RepoList";
import classes from './ReposSection.module.scss';
import Icon from "@material-ui/core/Icon";
import classNames from 'classnames';
import CircularProgress from "@material-ui/core/CircularProgress";

class ReposSection extends Component {

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.userInput.length > 0 &&
            (this.props.userInput !== nextProps.userInput || this.props.sortBy !== nextProps.sortBy)) {
            this.props.searchByQuery(`${nextProps.userInput} sort:${nextProps.sortBy}`)
        }
    }

    hasPrevPage = () => this.props.page > 1;

    hasNextPage = () => !!this.props.nextPage;

    prevPageHandler = () => {
        const query = `${this.props.userInput} sort:${this.props.sortBy}`;
        this.props.loadPage(query, this.props.page - 1);
    };

    nextPageHandler = () => {
        const query = `${this.props.userInput} sort:${this.props.sortBy}`;
        this.props.loadPage(query, this.props.page + 1);
    };

    refreshRepoHandler = repositoryToRefresh => {
        this.props.refreshRepo(this.props.repositories, repositoryToRefresh);
    };

    render() {
        const prevButtonClasses = classNames(
            classes.prev,
            {
                [classes.disabled]: !this.hasPrevPage()
            }
        );
        const nextButtonClasses = classNames(
            classes.next,
            {
                [classes.disabled]: !this.hasNextPage()
            }
        );

        const reposSectionBody = (
            <div>
                <div>
                    <RepoList repositories={this.props.repositories}
                              refreshClicked={this.refreshRepoHandler}
                              refreshingReposIds={this.props.refreshingRepositoriesIds}/>
                </div>
                <div onClick={this.prevPageHandler}
                     className={prevButtonClasses}>
                    <Icon style={{paddingLeft: 8, paddingTop: 1}} fontSize={'large'}>
                        arrow_back_ios
                    </Icon>
                </div>
                <div onClick={this.nextPageHandler}
                     className={nextButtonClasses}>
                    <Icon style={{paddingLeft: 3, paddingTop: 1}} fontSize={'large'}>
                        arrow_forward_ios
                    </Icon>
                </div>
            </div>
        );

        return (
            <div className={classes.ReposSection}>
                {
                    this.props.userInput.length === 0 ? 'Start typing to search for repos' :
                        this.props.error ? 'Something went wrong! :(' :
                            this.props.repositories.length === 0 && !this.props.loading ? 'No repositories found' :
                                this.props.loading ? (<CircularProgress size={50} className={classes.progress}/>) :
                                    reposSectionBody
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repoList.repositories,
    page: state.repoList.page,
    nextPage: state.repoList.nextPage,
    error: state.repoList.error,
    loading: state.repoList.loading,
    refreshingRepositoriesIds: state.repoList.reloadingReposIds,

    userInput: state.search.userInput,
    sortBy: state.search.sortBy
});

const mapDispatchToProps = dispatch => ({
    searchByQuery: queryString => dispatch(actions.loadPage(queryString)),
    loadPage: (queryString, pageNumber) => dispatch(actions.loadPage(queryString, pageNumber)),
    refreshRepo: (repositories, repoFullName) => dispatch(actions.refreshRepo(repositories, repoFullName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposSection);