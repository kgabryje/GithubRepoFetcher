import React, {Component} from 'react';
import * as actions from "../../store/actions/repoList";
import {connect} from "react-redux";
import RepoList from "../../components/Repos/RepoList";
import classes from './ReposSection.module.scss';
import Icon from "@material-ui/core/Icon";

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
                            (
                                <div>
                                    <div>
                                        <RepoList repositories={this.props.repositories}/>
                                    </div>
                                    <div className={classes.prev}>
                                        <Icon fontSize={'large'}>
                                            arrow_back_ios
                                        </Icon>
                                    </div>
                                    <div className={classes.next}>
                                        <Icon fontSize={'large'}>
                                            arrow_forward_ios
                                        </Icon>
                                    </div>
                                </div>
                            )
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