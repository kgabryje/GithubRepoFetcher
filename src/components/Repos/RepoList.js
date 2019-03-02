import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";
import {Button} from "@material-ui/core";

const RepoList = props => (
    <React.Fragment>
        <Button variant="contained" color="primary" onClick={props.onRefreshClicked}>
            Refresh
        </Button>
        {props.repositories.map(repo => (
            <RepoItem key={repo.id}
                      name={repo.name}
                      owner={repo.owner}
                      starsNumber={repo.stargazers_count}
                      primaryLanguage={repo.language}>
                {repo.full_name}
            </RepoItem>
        ))}
    </React.Fragment>
);

RepoList.propTypes = {
    repositories: PropTypes.array,
    onRefreshClicked: PropTypes.func
};

export default RepoList;