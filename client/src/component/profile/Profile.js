import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/auth';

const Profile = ({auth}) => {
    // console.log(auth);
    const { isAuthenticated, user, loading } = auth;
    // loadUser();
    console.log('users')
    console.log(loading)
    console.log(isAuthenticated)
    console.log(user)
    console.log('done')
    const profile = (
        <div>
            Profile
            <div>
                Name
                {user.name}
                <input />
            </div>
            <div>
                Email
                {user.email}
                <input />
            </div>
            <div>
                Password
                <input />
            </div>
        </div>
    );

    const loggedOut = (
        <Redirect to='/'/>
    );

    return (
        <form className={'container'}>
            {
                !loading && 
                (<Fragment>
                    {(isAuthenticated && user) ? profile : loggedOut}
                </Fragment>)
            }

        </form>
    )
}

Profile.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Profile);