import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";
import Icon from "@material-ui/core/Icon";
import {CircularProgress} from "@material-ui/core";

const RepoList = props => (
    <React.Fragment>
        {props.repositories.map(repo => (
            <RepoItem key={repo.id}
                      repository={repo}>
                {repo.full_name}
                <Icon onClick={() => props.refreshClicked(repo)}>refresh</Icon>
                {props.refreshingReposIds.includes(repo.id) && <CircularProgress/>}
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