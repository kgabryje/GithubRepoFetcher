import React, {Component} from 'react';
import {FormControl, Input, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import * as actions from "../../store/actions/searchMenu";
import {connect} from "react-redux";
import debounce from "lodash.debounce";
import classes from './SearchMenu.module.css';

class SearchMenu extends Component {
    userInputHandler = debounce(userInput => {
        this.props.onInputChange(userInput);
    }, 200);

    render() {
        return (
            <form className={classes.searchMenu}>
                <FormControl>
                    <Input classes={{root: classes.formControl}} placeholder='Repo name...' onChange={event => this.userInputHandler(event.target.value)}/>
                </FormControl>
                <FormControl>
                    <Select classes={{root: classes.formControl}} value={this.props.selectValue} onChange={event => this.props.onSelectChange(event.target.value)}>
                        <MenuItem value={'score'}>Best match</MenuItem>
                        <MenuItem value={'stars'}>Stargazers</MenuItem>
                        <MenuItem value={'forks'}>Forks</MenuItem>
                        <MenuItem value={'updated'}>Recently updated</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
};



const mapStateToProps = state => ({
    selectValue: state.search.sortBy,
});

const mapDispatchToProps = dispatch => ({
    onInputChange: userInput => dispatch(actions.setUserInput(userInput)),
    onSelectChange: sortBy => dispatch(actions.setSortBy(sortBy))
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu);