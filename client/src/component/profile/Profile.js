import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, loadUserProfile, updateProfile } from '../../actions/auth';
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

    renderBasic = ({name, email, password, _id}, updateProfile) => 
        <div>
            Profile
            <ProfileField _id={_id} field='Name' currentValue={name} updateFunc={updateProfile} />
            <ProfileField _id={_id} field='Email' currentValue={email} updateFunc={updateProfile} />
            <ProfileField _id={_id} field='Password' currentValue={password} updateFunc={updateProfile} />

        </div>

    
    // 5d2dabd1cb4fd1e003b47b9a --> david's id
    

    renderMusic = ({favouriteartists, favouritesongs, _id }, updateProfile) => 
        <div>
            Music Profile
            <ProfileField _id={_id} field='Favorite Artists' currentValue={favouriteartists} updateFunc={updateProfile} />
            <ProfileField _id={_id} field='Favorite Songs' currentValue={favouritesongs} updateFunc={updateProfile} />
        </div>
    

    renderSocial = ({bio, followers, location, social, _id}, updateProfile) => 
        <div>
            Social Profile
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
    renderProfile = (user, isAuthenticated, updateProfile) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user, isAuthenticated, updateProfile);
            case 'music': 
                return this.renderMusic(user, updateProfile);
            case 'social':
                return this.renderSocial(user, updateProfile);
        }
    }

    render() {
        const { loadUser, loadUserProfile, updateProfile } = this.props;
        const { isAuthenticated, user, loading } = this.props.auth;

        return (
            
            <div>
                <button onClick={() => this.updateShow('basic', loadUser)}>Basic</button>
                <button onClick={() => this.updateShow('music', loadUserProfile)}>Music</button>
                <button onClick={() => this.updateShow('social', loadUserProfile)}>Social</button>
                {this.renderProfile(user, isAuthenticated, updateProfile)}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser, loadUserProfile, updateProfile })(Profile);