import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, loadUserProfile } from '../../actions/auth';

const ProfileMusic = ({loadUserProfile}) => {
    loadUserProfile();
    return (
        <div>blah</div>
    )
}