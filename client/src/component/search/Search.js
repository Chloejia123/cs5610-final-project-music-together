import React from 'react'
import SearchItem from './SearchItem'
import SearchKeyword from './SearchKeyword'
import SearchArtist from './SearchArtist'
import SearchPlaylist from './SearchPlaylist'

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchBy: 'all',
            displayResults: false,
            keyword: '',
            result: {
                items: [],
            },
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm
        }) 
    }

    searchSongs = () => {
        this.setState({
            displayResults: true,
        })
        const category = this.state.searchBy === 'all' ? 'results' : this.state.searchBy
        fetch(`http://localhost:5000/api/search/${category}/${this.state.keyword}`)
            .then(response => response.json())
            .then(this.triggerResults)
    }

    extractResult = (result) => {
        switch(this.state.searchBy) {
            case 'all': 
                return result.tracks
            case 'artists': 
                return result.artists
            case 'playlists':
                return result.playlists
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
        // alert('do search')
        this.setState({
            displayResults: true,
        })
    }
 
    clearSearch = () => {
        // alert('clear search')
        this.setState({
            displayResults: false,
        })
    }
    keywordChanged = (keyword) =>
        this.setState({
            keyword: keyword
        })

    renderResults = (result) => {
        console.log('triggered')
        // alert(result)
        console.log(this.state.searchBy)
        // this.setState({
        //     result: result
        // })
        if (this.state.displayResults) {
            switch(this.state.searchBy) {
                case 'all':
                    console.log('result')
                    console.log(result.tracks)
                    console.log(this.state.result)
                    console.log('result')
                    // return <SearchKeyword result={this.state.result}/>
                    return <div>{result.tracks.total}</div>
                        // blah
                        // {result.tracks}
                        {/* Found {result.tracks.total} results, display top {result.tracks.total === 0 ? 0 : this.state.result.tracks.items.ength}
                        <ul className="list-group">
                        {
                            result.tracks.items.map(
                                (song, index) => <li key={index} className="list-group-item">
                                    {song.name}
                                </li>
                            )
                        }
                        </ul> */}
                    // </div>
                case 'artists': 
                    return <SearchArtist result={this.state.result}/>
                case 'playlists':
                    return <SearchPlaylist result={this.state.result}/>
                default:
                    return <div>Please select a category to search by.</div>
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Search by {this.state.searchBy}</h1>
                <button                     
                    onClick={() => this.switchSearchCategory('all')}
                    className="btn btn-dark">
                    All
                </button>
                <button 
                    onClick={() => this.switchSearchCategory('artists')}
                    className="btn btn-dark">
                    Artists
                </button>
                <button                     
                    onClick={() => this.switchSearchCategory('playlists')}
                    className="btn btn-dark">
                    Playlists
                </button>
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
                    {/* <span
                        onClick={() => this.clearSearch}
                        className="btn btn-primary">
                        Clear
                    </span> */}
                </div>
                <ul className="list-group">
                {
                    this.state.result.items.map(
                        (song, index) => <SearchItem song={song} key={index} />
                        )
                }
                </ul>
            </div>
        )
    }
}