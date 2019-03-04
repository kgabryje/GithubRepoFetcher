import React from 'react';
import PropTypes from 'prop-types';
import classes from './RepoDetails.module.css';
import {Chip, Icon, Tooltip, Typography} from '@material-ui/core';
import ForkIcon from './ForkIcon';
import SvgIcon from '@material-ui/core/SvgIcon';

const RepoDetails = props => (
    <div className={classes.RepoDetails}>
        {props.repository.description}

        <div className={classes.AdditionalInfo}>
            <Tooltip title='Watchers'>
                <Chip icon={<Icon>remove_red_eye</Icon>} label={props.repository.watchers_count}/>
            </Tooltip>

            <Tooltip title='Forks'>
                <Chip icon={<SvgIcon><ForkIcon/></SvgIcon>} label={props.repository.forks_count}/>
            </Tooltip>
        </div>
    </div>
);

RepoDetails.propTypes = {
    repository: PropTypes.object
};

export default RepoDetails;
