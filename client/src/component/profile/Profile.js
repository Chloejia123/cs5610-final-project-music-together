import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, loadUserProfile } from '../../actions/auth';
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

    renderBasic = ({name, email, password, _id}, isAuthenticated) => 
        <div>
            Profile
            <ProfileField field='Name' currentValue={name} />
            <ProfileField field='Email' currentValue={email} />
            <ProfileField field='Password' currentValue={password} />

        </div>

    
    // 5d2dabd1cb4fd1e003b47b9a --> david's id
    

    renderMusic = ({favouriteartists, favouritesongs}) => 
        <div>
            Music Profile
            <ProfileField field='Favorite Artists' currentValue={favouriteartists} />
            <ProfileField field='Favorite Songs' currentValue={favouritesongs} />
        </div>
    

    renderSocial = ({bio, followers, location, social}) => 
        <div>
            Social Profile
            <ProfileField field='Bio' currentValue={bio} />
            <ProfileField field='Location' currentValue={location} />
            {/* <div>
                Social Links
                <br />
                {social.map(platform => console.log(platform))}
            </div> */}
        </div>
    /*
    bio: "Random bio..."
date: "2019-07-17T03:35:17.283Z"
favouriteartists: ["Muse"]
favouritesongs: (2) ["Supermassive Blackhole", "Time is running out"]
followers: []
location: "San Jose"
social: {facebook: "https://www.facebook.com/"}
    */

    /*
     to do 
     1 allow changes to profile, send it back to server
     2 social & followers - not an array, how to display
     3 log out -- needs to actually log out and re-route
     6 combine Profile2 and ProfileOther? 
        (use isAuthenticated to check for edit mode or not?? but then there's also the loadUser vs loadUserProfile differences)
     7 make things prettier
     */
    renderProfile = (user, isAuthenticated) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user, isAuthenticated);
            case 'music': 
                return this.renderMusic(user);
            case 'social':
                return this.renderSocial(user);
        }
    }

    render() {
        const { loadUser, loadUserProfile } = this.props;
        const { isAuthenticated, user, loading } = this.props.auth;

        return (
            
            <div>
                <button onClick={() => this.updateShow('basic', loadUser)}>Basic</button>
                <button onClick={() => this.updateShow('music', loadUserProfile)}>Music</button>
                <button onClick={() => this.updateShow('social', loadUserProfile)}>Social</button>
                {this.renderProfile(user, isAuthenticated)}
            </div>
        )
    }


}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser, loadUserProfile })(Profile);
// export default Profile2;