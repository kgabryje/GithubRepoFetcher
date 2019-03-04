import React, {Component} from 'react';
import {FormControl, Input, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import * as searchActions from "../../store/actions/searchMenu";
import * as repoActions from "../../store/actions/repoList";
import {connect} from "react-redux";
import debounce from "lodash.debounce";
import classes from './SearchMenu.module.scss';
import classNames from 'classnames';
import Icon from "@material-ui/core/Icon";

class SearchMenu extends Component {
    userInputHandler = debounce(userInput => {
        this.props.onInputChange(userInput);
    }, 200);

    hasPrevPage = () => this.props.page > 1;

    hasNextPage = () => !!this.props.nextPage;

    prevPageHandler = () => {
        const query = `${this.props.userInput} sort:${this.props.sortBy}`;
        this.props.loadPage(query, this.props.page - 1);
    };

    nextPageHandler = () => {
        const query = `${this.props.userInput} sort:${this.props.sortBy}`;
        this.props.loadPage(query, this.props.page + 1);
    };

    render() {
        const prevButtonClasses = classNames(
            classes.PrevArrow,
            {
                [classes.Disabled]: !this.hasPrevPage()
            }
        );
        const nextButtonClasses = classNames(
            classes.NextArrow,
            {
                [classes.Disabled]: !this.hasNextPage()
            }
        );
        return (
            <div className={classes.searchMenu}>
                <div onClick={this.prevPageHandler}
                     className={prevButtonClasses}>
                    <Icon style={{paddingLeft: 8, paddingTop: 1}} fontSize={'large'}>
                        arrow_back_ios
                    </Icon>
                </div>
                <form>
                    <FormControl>
                        <Input style={{width: '300px'}}
                               placeholder='Repo name...'
                               onChange={event => this.userInputHandler(event.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <Select value={this.props.selectValue}
                                onChange={event => this.props.onSelectChange(event.target.value)}>
                            <MenuItem value={'score'}>Best match</MenuItem>
                            <MenuItem value={'stars'}>Stargazers</MenuItem>
                            <MenuItem value={'forks'}>Forks</MenuItem>
                            <MenuItem value={'updated'}>Recently updated</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                <div onClick={this.nextPageHandler}
                     className={nextButtonClasses}>
                    <Icon style={{paddingLeft: 2, paddingTop: 1}} fontSize={'large'}>
                        arrow_forward_ios
                    </Icon>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    selectValue: state.search.sortBy,
    userInput: state.search.userInput,

    page: state.repoList.page,
    nextPage: state.repoList.nextPage,
});

const mapDispatchToProps = dispatch => ({
    onInputChange: userInput => dispatch(searchActions.setUserInput(userInput)),
    onSelectChange: sortBy => dispatch(searchActions.setSortBy(sortBy)),
    loadPage: (queryString, pageNumber) => dispatch(repoActions.loadPage(queryString, pageNumber)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu);