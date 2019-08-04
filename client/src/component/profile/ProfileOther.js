import React from 'react'
import { loadOtherUser } from '../../actions/auth';
import { connect } from 'react-redux';

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
        this.props.loadOtherUser(this.state.userId);
    }

    updateShow = (section) => {
        this.setState({
            show: section
        })
    }

    renderProfile = () => {
        const section = this.state.show;
        const { user } = this.props.auth;
        if (user) { // is this really necessary?
            switch(section) {
                case 'basic':
                    return this.renderBasic(user.user);
                case 'music': 
                    return this.renderMusic(user);
                case 'social':
                    return this.renderSocial(user);
            }
        }
    }

    renderBasic = ({name, _id}) => 
        <div>
            Profile
            <div>
                Name
                <br />
                {name}
                <input />
            </div>

            <div>{_id}</div>
        </div>
    
    // 5d2dabd1cb4fd1e003b47b9a --> david's id
    

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
                {/* {followers.map(follower => console.log(follower))} */}
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

    render() {

        return (
            <div>
                <button onClick={() => this.updateShow('basic')}>Basic</button>
                <button onClick={() => this.updateShow('music')}>Music</button>
                <button onClick={() => this.updateShow('social')}>Social</button>
                {this.renderProfile()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadOtherUser })(ProfileOther);