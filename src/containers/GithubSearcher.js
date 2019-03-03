import React from 'react';
import SearchMenu from './SearchMenu/SearchMenu';
import ReposSection from "./ReposSection/ReposSection";


const githubSearcher = () => (
    <React.Fragment>
        <SearchMenu/>
        <ReposSection/>
    </React.Fragment>
);

export default githubSearcher;