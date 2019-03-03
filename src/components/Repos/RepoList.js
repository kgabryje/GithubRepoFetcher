import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";
import classes from './RepoList.module.css';

const RepoList = props => (
    <div className={classes.RepoList}>
        {props.repositories.map(repo => (
            <RepoItem key={repo.id}
                      repository={repo}>
                {repo.full_name}
            </RepoItem>
        ))}
    </div>
);

RepoList.propTypes = {
    repositories: PropTypes.array
};

export default RepoList;