import React from 'react';
import SearchMenu from '../containers/SearchMenu/SearchMenu';
import ReposSection from '../containers/ReposSection/ReposSection';
import classes from './GithubSearcher.module.css';

const githubSearcher = () => (
    <div className={classes.content}>
        <SearchMenu/>
        <ReposSection/>
    </div>
);

export default githubSearcher;