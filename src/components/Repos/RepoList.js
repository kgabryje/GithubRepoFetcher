import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";
import classes from './RepoList.module.scss';
import Icon from "@material-ui/core/Icon";

const RepoList = props => (
    <React.Fragment>
        {props.repositories.map(repo => (
            <RepoItem key={repo.id}
                      repository={repo}>
                {repo.full_name}
            </RepoItem>
        ))}
        <Icon fontSize={'large'} className={classes.prev}>
            arrow_back_ios
        </Icon>
        <Icon fontSize={'large'} className={classes.next}>
            arrow_forward_ios
        </Icon>
    </React.Fragment>
);

RepoList.propTypes = {
    repositories: PropTypes.array
};

export default RepoList;