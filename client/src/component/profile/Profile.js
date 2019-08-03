import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadUser, loadUserProfile } from '../../actions/auth';
import Profile2 from './Profile2';

const Profile = ({auth : { isAuthenticated, user, loading }}) => {
    console.log(user);
    // doing loadUser here doesn't solve user undefined / null problem    
    const profile = (
        <div>
            Profile
            <div>
                Name
                <br />
                {user.name}
                <input />
            </div>
            <div>
                Email
                <br />
                {user.email}
                <input />
            </div>
            <div>
                Password
                <input />
            </div>
            <div>{user._id}</div>
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

// export default connect(mapStateToProps)(Profile);
// this is the 'container' so to speak, create another profile component and wrap it with this one
// this component takes care of mapStateToProps
// or at the very least maintain its own state -- which section we're in

export default connect(mapStateToProps, { loadUser, loadUserProfile })(Profile2);