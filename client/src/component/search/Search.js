import React from 'react'
import { Link } from 'react-router-dom';
import { findSongs, findArtists } from '../../actions/search';
import { connect } from 'react-redux';


class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchBy: 'songs',
            keyword: '',
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm,
            keyword: '',
        }) 
    }

    searchSongs = () => {
        this.state.searchBy === 'songs' ? 
            this.props.findSongs(this.state.keyword) : 
            this.props.findArtists(this.state.keyword);
    }

    extractResult = (result) => {
        switch(this.state.searchBy) {
            case 'songs': 
                return result.tracks
            case 'artists': 
                return result.artists
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
 
    // clearSearch = () => {
    //     this.setState({
    //         result: {
    //             items: [],
    //         },
    //     })
    // }

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
                    {/* <button 
                        onClick={() => this.clearSearch()}
                        className="btn btn-danger">
                        Clear results
                    </button> */}
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