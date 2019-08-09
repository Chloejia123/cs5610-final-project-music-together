import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, loadUserProfile, updateUser, updateProfile } from '../../actions/auth';
import ProfileField from './ProfileField';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: 'basic',
        }
    }

    updateShow = (section, getUserInfo) => {
        getUserInfo();
        this.setState({
            show: section
        })
    }

    renderBasic = ({name, email, password, _id}, isAthenticated, updateUser) => 
        <div>
            <h1 className="large text-primary">Profile</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} updateFunc={updateUser} />
            <ProfileField _id={_id} field='Email' currentValue={email} updateFunc={updateUser} />
            <ProfileField _id={_id} field='Password' currentValue={password} updateFunc={updateUser} />

        </div>

    
    // 5d2dabd1cb4fd1e003b47b9a --> david's id
    

    renderMusic = ({favouriteartists, favouritesongs, _id }, updateProfile) => 
        <div>
            <h2 className="large text-primary">Music Profile</h2>
            <ProfileField _id={_id} field='Favorite Artists' currentValue={favouriteartists} updateFunc={updateProfile} />
            <ProfileField _id={_id} field='Favorite Songs' currentValue={favouritesongs} updateFunc={updateProfile} />
        </div>
    

    renderSocial = ({bio, followers, location, social, _id}, updateProfile) => 
        <div>
            <h3 className="large text-primary">Social Profile</h3>
            <ProfileField _id={_id} field='Bio' currentValue={bio} updateFunc={updateProfile} />
            <ProfileField _id={_id} field='Location' currentValue={location} updateFunc={updateProfile} />
            {/* <div>
                Social Links
                <br />
                {social.map(platform => console.log(platform))}
            </div> */}
        </div>
    /*
     to do 
     1 allow changes to profile, send it back to server - auto refresh not triggered after update
     2 social & followers - not an array, how to display
     3 log out -- needs to actually log out and re-route
     6 combine Profile2 and ProfileOther? 
        (use isAuthenticated to check for edit mode or not?? but then there's also the loadUser vs loadUserProfile differences)
     7 make things prettier
     8 password, show, update?
     */
    renderProfile = (user, profile, isAuthenticated, updateUser, updateProfile) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user, isAuthenticated, updateUser);
            case 'music': 
                return this.renderMusic(profile, updateProfile);
            case 'social':
                return this.renderSocial(profile, updateProfile);
        }
    }

    render() {
        const { loadUser, loadUserProfile, updateUser, updateProfile } = this.props;
        const { isAuthenticated, user, loading, profile } = this.props.auth;


        return (

            <div className="profile">
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('basic', loadUser)}>Basic</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('music', loadUserProfile)}>Music</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('social', loadUserProfile)}>Social</button>
                {this.renderProfile(user, profile, isAuthenticated, updateUser, updateProfile)}

            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, 
                        { loadUser, loadUserProfile, updateUser, updateProfile })
                (Profile);