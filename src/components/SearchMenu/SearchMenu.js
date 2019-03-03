import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Input, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const SearchMenu = props => {
    return (
        <form>
            <FormControl>
                <Input placeholder='Repo name...' onChange={props.onInputChange}/>
            </FormControl>
            <FormControl>
                <Select value={props.selectInitialValue} onChange={props.onSelectChange}>
                    <MenuItem value={'score'}>Best match</MenuItem>
                    <MenuItem value={'stars'}>Stargazers</MenuItem>
                    <MenuItem value={'forks'}>Forks</MenuItem>
                    <MenuItem value={'updated'}>Recently updated</MenuItem>
                </Select>
            </FormControl>
        </form>
    );
};

SearchMenu.propTypes = {
    onInputChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    selectInitialValue: PropTypes.string
};

export default SearchMenu;