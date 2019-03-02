import React from 'react';
import PropTypes from 'prop-types';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from "@material-ui/core";

const RepoItem = props => (
    <ExpansionPanel>
        <ExpansionPanelSummary>
            <span>{props.name}</span>
            <span>{props.owner.login}</span>
            <span>{props.starsNumber}</span>
            <span>{props.primaryLanguage}</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {props.children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

RepoItem.propTypes = {
    name: PropTypes.string,
    owner: PropTypes.object,
    starsNumber: PropTypes.number,
    primaryLanguage: PropTypes.string
};

export default RepoItem;