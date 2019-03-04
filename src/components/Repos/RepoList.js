import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";
import {CircularProgress} from "@material-ui/core";
import RepoDetails from "./RepoDetails/RepoDetails";
import classes from './RepoList.module.scss'
import Button from "@material-ui/core/Button";

const RepoList = props => (
    <React.Fragment>
        {props.repositories.map(repo => (
            <RepoItem key={repo.id}
                      repository={repo}>
                <div className={classes.DetailsContainer}>
                    <RepoDetails repository={repo}/>
                    <div className={classes.RefreshButton}>
                        <Button color="secondary" onClick={() => props.refreshClicked(repo)}>
                            Refresh
                        </Button>
                    </div>
                    {props.refreshingReposIds.includes(repo.id) && <CircularProgress className={classes.Progress}/>}
                </div>
            </RepoItem>
        ))}
    </React.Fragment>
);

RepoList.propTypes = {
    repositories: PropTypes.array,
    refreshClicked: PropTypes.func,
    refreshingReposIds: PropTypes.array
};

export default RepoList;