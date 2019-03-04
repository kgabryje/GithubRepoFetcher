import React from 'react';
import PropTypes from 'prop-types';
import classes from './RepoDetails.module.css';
import {Chip, Icon, Tooltip} from "@material-ui/core";

const RepoDetails = props => (
    <div className={classes.RepoDetails}>
        {props.repository.description}
        <Tooltip title='Watchers'>
            <Chip icon={<Icon>remove_red_eye</Icon>} label={props.repository.watchers_count}/>
        </Tooltip>

    </div>
);

RepoDetails.propTypes = {
    repository: PropTypes.object
};

export default RepoDetails;
