import React from 'react'

export default class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchBy: 'all'
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm
        })
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
                            onChange={this.keywordChanged}
                            placeholder="keyword"/>
                    </div>
                    <div className="form-group-append">
                        <button
                            onClick={this.searchSongs}
                            className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}