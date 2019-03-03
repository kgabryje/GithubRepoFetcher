import React from 'react';
import PropTypes from 'prop-types';
import {Input} from "@material-ui/core";

const SearchMenu = props => {
    return (
        <Input placeholder='Repo name...' onChange={props.onInputRepoNameChange}/>
    );
};

SearchMenu.propTypes = {
    onInputRepoNameChange: PropTypes.func
};

export default SearchMenu;