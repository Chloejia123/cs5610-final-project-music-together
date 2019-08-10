import React from 'react'
import { loadOtherUser } from '../../actions/auth';
import { connect } from 'react-redux';
import ProfileField from './ProfileField';

class ProfileOther extends React.Component {
    constructor(props) {
        super(props)

        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const userId = paths[2]
        this.state = {
            userId: userId,
            show: 'basic',
        }
    }

    componentDidMount() {
        this.props.loadOtherUser(this.state.userId, this.props.auth.isAuthenticated);
    }

    updateShow = (section) => {
        this.setState({
            show: section
        })
    }

    renderProfile = () => {
        const section = this.state.show;
        const { profile } = this.props.auth;
        if (profile && profile.user) { 
            switch(section) {
                case 'basic':
                    return this.renderBasic(profile.user);
                case 'music': 
                    return this.renderMusic(profile);
                case 'social':
                    return this.renderSocial(profile);
            }
        }
    }

    renderBasic = ({name, _id}) => 
        <div>
            <h1 className="large text-primary">Profile</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} 
                isAuthenticated={false}/>
        </div>
    

    renderMusic = ({favouriteartists, favouritesongs, _id}) => 
    <div>
        <h2 className="large text-primary">Music Profile</h2>
        {/* <ProfileField _id={_id} field='Favorite Artists' 
            currentValue={favouriteartists} 
            isAuthenticated={false}/>
        <ProfileField _id={_id} field='Favorite Songs' currentValue={favouritesongs} 
            isAuthenticated={false}/> */}
    </div>
    

    renderSocial = ({bio, followers, location, facebook, youtube, twitter, instagram, _id}) => 
        <div>
            <h3 className="large text-primary">Social Profile</h3>
            <ProfileField _id={_id} field='Bio' currentValue={bio} 
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Location' currentValue={location} 
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Facebook' currentValue={facebook} 
                isAuthenticated={false} />
            <ProfileField _id={_id} field='YouTube' currentValue={youtube}  
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Twitter' currentValue={twitter}  
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Instagram' currentValue={instagram} 
                isAuthenticated={false} /> 
        </div>

    render() {
        return (
            <div>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('basic')}>Basic</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('music')}>Music</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('social')}>Social</button>
                {this.renderProfile()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadOtherUser })(ProfileOther);