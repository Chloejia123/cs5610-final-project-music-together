import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Profile = ({auth : { isAuthenticated, user, loading }}) => {
    // doing loadUser here doesn't solve user undefined / null problem    
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
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Profile);