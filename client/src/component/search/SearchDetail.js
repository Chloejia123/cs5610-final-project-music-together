import React from 'react';
import { addFavoriteArtist, findUserWhoLikedArtist } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 
// can probably change to stateless component
class SearchDetail extends React.Component {
    constructor(props) {
        super(props)

        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const artistName = paths[3]
        // get the info of artist directly from name?
        this.state = {
            details: {},
            artistName: artistName,
        }
    }

    componentDidMount = () => {
        fetch(`http://localhost:5000/api/search/artists/${this.state.artistName}`)
            .then(response => response.json())
            .then(result => this.triggerResult(result))

    }

    triggerResult = (result) => {
        console.log(result)
        this.setState({
            details: result.artists.items[0]
        })
    }

    likeArtist = (id, name, addFavoriteArtist) => {
        let snippet = {}
        snippet['id'] = this.props.auth.user._id
        snippet['artist'] = name
        addFavoriteArtist(snippet, id)
    }

    findLikedUsers = (findUsers, id) => {
        findUsers(id)
    }


    render() {

        const { external_urls, followers, genres, href, id, images, name, popularity, type, uri } = this.state.details
        const { addFavoriteArtist, findUserWhoLikedArtist } = this.props
        const { result } = this.props.auth 
        // console.log(result)       

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