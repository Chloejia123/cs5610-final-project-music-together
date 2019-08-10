import React from 'react';
import { addFavoriteArtist, findUserWhoLikedArtist } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 
class SearchDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fans: []
        }
    }

    likeArtist = (id, name, addFavoriteArtist) => {
        let snippet = {}
        snippet['id'] = this.props.auth.user._id
        snippet['artist'] = name
        addFavoriteArtist(snippet, id)
    }

    findLikedUsers = (findUsers, id) => {
        findUsers(id)
        this.setState({
            fans: this.props.auth.result
        })
    }

    renderLikedUsers = (result) => 
    {
        result.map(
        user => <Link 
                    to={`/profile/${user._id}`} 
                    key={user._id}>
                    {user.name}
                </Link>)
    }


    render() {

        const { external_urls, followers, genres, href, id, images, name, popularity, type, uri } = this.props.location.details

        const { addFavoriteArtist, findUserWhoLikedArtist } = this.props
        const { result } = this.props.auth        

        return (
            <div>
                {name}
                <br />
                <button 
                    className="btn btn-primary"
                    onClick={() => this.likeArtist(id, name, addFavoriteArtist)}>Like</button>
                <button 
                    className="btn btn-primary"
                    onClick={() => this.findLikedUsers(findUserWhoLikedArtist, id)}>Show Fans</button>
                <br />
                {result.map(
                    user => <Link to={`/profile/${user.user._id}`} 
                                key={user._id}>{user.user.name}</Link> 
                     )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addFavoriteArtist, findUserWhoLikedArtist })(SearchDetail)