import React from 'react'

export default class SearchItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }

    switchState = () => {
        const { show } = this.state
        console.log(show)
        this.setState({
            show: !show
        })
    }

    renderImage = (song) => {
        if (song.images && song.images.length > 0) {
            return <img src={song.images[0].url} />
        }   
    }

    render() {
        const { song } = this.props

        return (
            <li className="m list-group-item">
                <button 
                    className="btn btn-light"
                    onClick={() => this.switchState()}>
                        {song.name}
                        <br/>
                        {this.state.show 
                            ? <div>
                                {this.renderImage(song)}
                                <a href={song.external_urls.spotify} target='_'>Check on Spotify</a>
                                <div>Type: {song.type}</div>
                                <div>Popularity: {song.popularity ? song.popularity : '-'}</div>
                            </div> 
                            : <div>Click for more detail</div>}
                </button>
            </li>
        )
    }
}