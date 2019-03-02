import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem/RepoItem";

const RepoList = props => props.repositories.map(repo => (
    <RepoItem key={repo.id}
              name={repo.name}
              owner={repo.owner}
              starsNumber={repo.stargazers_count}
              primaryLanguage={repo.language}>
        {repo.full_name}
    </RepoItem>
    )

);

RepoList.propTypes = {
    repositories: PropTypes.array
};

export default RepoList;