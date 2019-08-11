import React from 'react'
import SearchItem from './SearchItem'
import SearchKeyword from './SearchKeyword'
import SearchArtist from './SearchArtist'
import SearchPlaylist from './SearchPlaylist'
import { Link } from 'react-router-dom';
import { findSongs, findArtists } from '../../actions/search';
import { connect } from 'react-redux';


class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchBy: 'songs',
            displayResults: false,
            keyword: '',
            result: {
                items: [],
            },
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm,
            result: {
                items: []
            },
            keyword: '',
        }) 
    }

    searchSongs = () => {
        this.setState({
            displayResults: true,
        })
        this.state.searchBy === 'songs' ? 
            this.props.findSongs(this.state.keyword) : 
            this.props.findArtists(this.state.keyword);
    }

    extractResult = (result) => {
        switch(this.state.searchBy) {
            case 'songs': 
                console.log('songs')
                console.log(result)
                return result.tracks
            case 'artists': 
                console.log(result)
                return result.artists
            // case 'playlists':
            //     return result.playlists
            default:
                return {
                    item: [],
                    total: 0,
                }
        }
    }

    triggerResults = (result) => {
        this.setState({
            result: this.extractResult(result) 
        })
    }

    doSearch = () => {
        this.setState({
            displayResults: true,
        })
    }
 
    clearSearch = () => {
        this.setState({
            displayResults: false,
        })
    }
    keywordChanged = (keyword) =>
        this.setState({
            keyword: keyword
        })


    render() {
        const { result } = this.props.search

        return (
            <div>
                <button                     
                    onClick={() => this.switchSearchCategory('songs')}
                    className="btn btn-dark">
                    Songs
                </button>
                <button 
                    onClick={() => this.switchSearchCategory('artists')}
                    className="btn btn-dark">
                    Artists
                </button>
                {/* <button                     
                    onClick={() => this.switchSearchCategory('playlists')}
                    className="btn btn-dark">
                    Playlists
                </button> */}
                <h1 className="large text-primary">Search by {this.state.searchBy}</h1>
                <form className='form'>
                    <div className="form-group">
                        <input 
                            type='search'
                            value={this.state.keyword}
                            onChange={(event) => this.keywordChanged(event.target.value)}
                            placeholder="keyword"/>
                    </div>
                </form>
                <div className="form-group-append">
                    <button
                        onClick={() => this.searchSongs()}
                        className="btn btn-primary">
                        Search
                    </button>

                </div>
                <ul className="list-group">
                {
                    result.map(
                        (song, index) => 
                            <li className="m list-group-item" key={index}>
                                <button className="btn btn-light" key={index}>
                                    {song.name}
                                    <br />
                                    <Link to={`search/details/${this.state.searchBy}/${song.name}`}>
                                        Click to see details
                                    </Link>
                                </button>
                            </li>
                    )
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search
})

export default connect(mapStateToProps, { findSongs, findArtists })(Search);