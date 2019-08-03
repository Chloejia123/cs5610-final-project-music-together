import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, loadUserProfile } from '../../actions/auth';

class Profile2 extends React.Component {
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

    renderBasic = ({name, email, password}) => 
        <div>
            Profile
            <div>
                Name
                <br />
                {name}
                <input />
            </div>
            <div>
                Email
                <br />
                {email}
                <input />
            </div>
            <div>
                Password
                <br />
                {password}
                <input />
            </div>
            {/* <div>{user._id}</div> */}
        </div>
    
    

    renderMusic = ({favouriteartists, favouritesongs}) => 
        <div>
            Music Profile
            <div>
                Favorite Artists
                <br />
                {favouriteartists}
            </div>
            <div>
                Favorite Songs
                <br />
                {favouritesongs}
            </div>
        </div>
    

    renderSocial = ({bio, followers, location, social}) => 
        <div>
            Social Profile
            <div>
                Bio
                <br />
                {bio}
            </div>
            <div>
                Followers
                <br />
                {followers.map(follower => console.log(follower))}
            </div>
            <div>
                Location
                <br />
                {location}
            </div>
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
     2 social - not an array, how to display
     3 how to show other users (use isAuthenticated to screen)
     4 the weird user not loading immediately after login thing; have to do check here as well?
     5 related, whether to keep the Profile2, or can directly pass
     */
    renderProfile = (user) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user);
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
                {this.renderProfile(user)}
            </div>
        )
    }


}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser, loadUserProfile })(Profile2);
// export default Profile2;