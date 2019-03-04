import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    Tooltip
} from '@material-ui/core';
import classes from './RepoItem.module.css';
import Chip from '@material-ui/core/Chip';

const RepoItem = props => (
    <ExpansionPanel>
        <ExpansionPanelSummary classes={{content: classes.Summary}}>

            <div className={classes.TextField}>
                {props.repository.name}
            </div>

            <div className={classes.TextField} style={{display: 'flex', marginRight: 'auto'}}>
                <Avatar src={props.repository.owner.avatar_url}/>
                <span style={{paddingLeft: '10px'}}>{props.repository.owner.login}</span>
            </div>

            <div style={{marginLeft: 'auto'}} className={classes.Chip}>
                <Tooltip title='Stargazers'>
                    <Chip icon={<Icon>star</Icon>}
                          label={props.repository.stargazers_count}/>
                </Tooltip>
            </div>

            <div className={classes.Chip}>
                {props.repository.language &&
                <Tooltip title='Primary language'>
                    <Chip label={props.repository.language}/>
                </Tooltip>}
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {props.children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

RepoItem.propTypes = {
    repository: PropTypes.object
};

export default RepoItem;