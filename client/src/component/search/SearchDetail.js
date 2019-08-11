import React, { Fragment } from 'react';
import { addFavoriteArtist, findUserWhoLikedArtist } from '../../actions/auth';
import { findTopOneArtist, findTopSong } from '../../actions/search'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 
// can probably change to stateless component
class SearchDetail extends React.Component {
    constructor(props) {
        super(props)

        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const searchTerm = paths[3]
        const artistName = paths[4]
        this.state = {
            artistName: artistName,
            searchTerm: searchTerm === 'songs' ? 'results' : searchTerm,
        }
    }

    componentDidMount = () => {

        this.state.searchTerm === 'artists' ? 
            this.props.findTopOneArtist(this.state.artistName) :
            this.props.findTopSong(this.state.artistName);
    }

    componentDidUpdate = (prevProps) => {

        if (prevProps.location.key !== this.props.location.key) {

            const pathname = window.location.pathname
            const paths = pathname.split('/')
            const searchTerm = paths[3]
            const artistName = paths[4]
            searchTerm === 'artists' ? 
                this.props.findTopOneArtist(artistName) :
                this.props.findTopSong(artistName)
        }
    }

    likeArtist = (id, name, addFavoriteArtist, updateLikedUsers) => {
        let snippet = {}
        snippet['id'] = this.props.auth.user._id
        snippet['artist'] = name
        addFavoriteArtist(snippet, id)
        updateLikedUsers(id)
    }

    findLikedUsers = (findUsers, id) => {
        findUsers(id)
    }

    renderImage = (images) => {
        if (images && images.length > 0) {
            return <img className="artistImage round-edge" src={images[0].url} />
        }   
    }

    render() {

        const { artists, external_urls, followers, genres, id, images, name, popularity } = this.props.search.details
        const { addFavoriteArtist, findUserWhoLikedArtist } = this.props
        const { result } = this.props.auth 
   

        return (
            <div>
                {this.renderImage(images)}
                <h2 className="primary">{name}</h2>
                {
                    artists && artists.map(artist => 
                        <button className="btn btn-light round-edge m"><Link to={`/search/details/artists/${artist.name}`}>{artist.name}</Link></button>)
                }
                <br />
                <h5 className="subtitle">Popularity: {popularity}</h5>
                {genres && genres.map(genre => <button className="btn btn-light round-edge"> {genre} </button>)}
                <br />
                <a href={external_urls && external_urls.spotify} target='_'>Check on Spotify</a>
                <br />

                <button 
                    className="btn btn-primary round-edge"
                    onClick={() => this.likeArtist(id, name, addFavoriteArtist, findUserWhoLikedArtist)}>Like</button>
                <button 
                    className="btn btn-primary round-edge"
                    onClick={() => this.findLikedUsers(findUserWhoLikedArtist, id)}>Show Fans</button>
                <br />
                {result.map(
                    user => 
                        <Fragment>
                            <Link to={`/profile/${user.user._id}`} 
                                    key={user._id}>{user.user.name}
                                </Link> 
                            <br />
                        </Fragment>
                            
                     )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    search: state.search,
})

export default connect(mapStateToProps, 
    { addFavoriteArtist, findUserWhoLikedArtist, findTopOneArtist, findTopSong })(SearchDetail)