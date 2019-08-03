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

    renderBasic = () => {
        console.log('render basic');
        console.log(this.props.auth.user);
    }
    

    renderMusic = ({favouriteartists, favouritesongs}) => {
        console.log('render music');
        // console.log(this.props.auth.user);
        console.log(favouriteartists);
        console.log(favouritesongs);
    }

    renderActivity = () => {
        console.log('render activity');
        console.log(this.props.auth.user);
    }    

    renderProfile = (user) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user);
            case 'music': 
                return this.renderMusic(user);
            case 'activity':
                return this.renderActivity(user);
        }
    }

    render() {
        const { loadUser, loadUserProfile } = this.props;
        const { isAuthenticated, user, loading } = this.props.auth;
        // console.log('111');
        // console.log(this.props.auth);
        // console.log('222');
        // console.log(this.props);
        return (
            
            <div>
                <button onClick={() => this.updateShow('basic', loadUser)}>Basic</button>
                <button onClick={() => this.updateShow('music', loadUserProfile)}>Music</button>
                <button onClick={() => this.updateShow('activity', loadUserProfile)}>Activity</button>
                {this.renderProfile(user)}
            </div>
        )
    }


}

// const mapStateToProps = state => ({
//     auth: state.auth
// })

// export default connect(mapStateToProps, { loadUser, loadUserProfile })(Profile2);
export default Profile2;