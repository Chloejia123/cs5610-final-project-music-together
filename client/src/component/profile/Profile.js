import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';
import { loadUser, loadUserProfile, updateUser, updateProfile, loadOtherUser } from '../../actions/auth';
import ProfileField from './ProfileField';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const userId = paths[2]
        this.state = {
            show: 'basic',
            userId: userId,
        }
    }

    componentDidMount() {
        const { userId } = this.state;
        const { isAuthenticated } = this.props.auth; 
        if (userId !== undefined) {
            this.props.loadOtherUser(userId, isAuthenticated);
        }
    }

    updateShow = (section, getUserInfo) => {
        const { userId } = this.state;
        const { isAuthenticated } = this.props.auth; 

        userId === undefined ? getUserInfo() : getUserInfo(userId, isAuthenticated);
        
        this.setState({
            show: section
        })
    }

    renderBasic = ({name, email, _id}, isAuthenticated, updateUser) => 
        <div>
            <h1 className="large text-primary">Profile</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} 
                updateFunc={updateUser} isAuthenticated={isAuthenticated}/>
            <ProfileField _id={_id} field='Email' currentValue={email} 
                updateFunc={updateUser} isAuthenticated={isAuthenticated}/>
        </div>

    renderOtherBasic = ({name, _id}, isAuthenticated, updateUser) => 
        <div>
            <h1 className="large text-primary">Profile</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} 
                updateFunc={updateUser} isAuthenticated={isAuthenticated}/>
        </div>
    
    // 5d2dabd1cb4fd1e003b47b9a --> david's id
    

    renderMusic = ({favouriteartists, favouritesongs, _id }, isAuthenticated, updateProfile) => 
        <div>
            <h2 className="large text-primary">Music Profile</h2>
            <ProfileField _id={_id} field='Favorite Artists' 
                currentValue={favouriteartists} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated}/>
            <ProfileField _id={_id} field='Favorite Songs' currentValue={favouritesongs} 
                updateFunc={updateProfile} isAuthenticated={isAuthenticated}/>
        </div>
    

    renderSocial = ({bio, followers, location, social, _id}, isAuthenticated, updateProfile) => 
        <div>
            <h3 className="large text-primary">Social Profile</h3>
            <ProfileField _id={_id} field='Bio' currentValue={bio} 
                updateFunc={updateProfile} isAuthenticated={isAuthenticated} />
            <ProfileField _id={_id} field='Location' currentValue={location} 
                updateFunc={updateProfile} isAuthenticated={isAuthenticated} />
            {/* <div>
                Social Links
                <br />
                {social.map(platform => console.log(platform))}
            </div> */}
        </div>
    /*
     to do 
     2 social & followers - not an array, how to display
     3 log out -- needs to actually log out and re-route
     6 combine Profile2 and ProfileOther? --> cannot test the redirect, in theory should not refresh whole page when redirected
        (use isAuthenticated to check for edit mode or not?? but then there's also the loadUser vs loadUserProfile differences)

     */
    renderProfile = (user, profile, isAuthenticated, updateUser, updateProfile) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.state.userId === undefined ? 
                    this.renderBasic(user, isAuthenticated, updateUser) :
                    this.renderOtherBasic(profile.user, isAuthenticated, updateProfile);
            case 'music': 
                return this.renderMusic(profile, isAuthenticated, updateProfile);
            case 'social':
                return this.renderSocial(profile, isAuthenticated, updateProfile);
        }
    }

    redirect = () => <Redirect to='/profile/5d2dabd1cb4fd1e003b47b9a' />
    
    render() {
        const { loadUser, loadUserProfile, updateUser, updateProfile, loadOtherUser } = this.props;
        const { isAuthenticated, user, loading, profile } = this.props.auth;

        const loadUserFunc = this.state.userId === undefined ? loadUser : loadOtherUser;
        const loadUserProfileFunc = this.state.userId === undefined ? loadUserProfile : loadOtherUser;
        return (

            <div>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('basic', loadUserFunc)}>Basic</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('music', loadUserProfileFunc)}>Music</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('social', loadUserProfileFunc)}>Social</button>
                {this.renderProfile(user, profile, isAuthenticated, updateUser, updateProfile)}
                <button onClick={() => this.redirect()}>check out others</button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, 
                        { loadUser, loadUserProfile, updateUser, updateProfile, loadOtherUser })
                (Profile);