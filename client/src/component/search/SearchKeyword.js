import React from 'react'

export default class SearchKeyword extends React.Component {
    constructor(props) {
        super(props)
        console.log('props')
        console.log(props)
        console.log('props')
        this.state = {
            songs: [],
            total: 0,
            
        }
    }

    renderSongs = (response) => 
        this.setState({
            songs: response.tracks.items,
            total: response.tracks.total,
    })

    render() {
        return (
            <div>
                Found {this.state.total} results, display top {this.state.total === 0 ? 0 : this.state.songs.length}
                <ul className="list-group">
                {
                    this.state.songs.map(
                        (song, index) => <li key={index} className="list-group-item">
                            {song.name}
                        </li>
                    )
                }
                </ul>
            </div>
        )
    }
}