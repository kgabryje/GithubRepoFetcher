import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
} from "@material-ui/core";
import classes from './RepoItem.module.css';
import Chip from "@material-ui/core/Chip";

const RepoItem = props => (
    <ExpansionPanel>
        <ExpansionPanelSummary classes={{content: classes.Summary}}>

            <div className={classes.textField}>{props.repository.name}</div>

            <div  className={classes.textField} style={{display: 'flex', marginRight: 'auto'}}>
                <Avatar src={props.repository.owner.avatar_url}/>
                <span style={{paddingLeft: '10px'}}>{props.repository.owner.login}</span>
            </div>

            <div style={{marginLeft: 'auto'}} className={classes.chip}>
                <Chip icon={<Icon>star</Icon>}
                      label={props.repository.stargazers_count}/>
            </div>

            <div className={classes.chip}>
                {props.repository.language &&
                <Chip label={props.repository.language}/>}
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