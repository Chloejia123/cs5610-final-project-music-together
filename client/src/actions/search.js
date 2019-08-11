import axios from 'axios';
import {
    ARTISTS, SONGS, TOP_ONE_ARTIST, TOP_ONE_SONG,
} from './types';

export const findArtists = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/search/artists/${keyword}`)
        console.log(res)

        dispatch({
            type: ARTISTS,
            payload: res.data.artists.items,
        })

    } catch(err) {  
        console.log(err)
    }
}

export const findSongs = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/search/results/${keyword}`)
        console.log(res)

        dispatch({
            type: SONGS,
            payload: res.data.tracks.items,
        })

    } catch(err) {  
        console.log(err)
    }
}

export const findTopOneArtist = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/search/artists/${keyword}`)
        console.log(res)

        dispatch({
            type: TOP_ONE_ARTIST,
            payload: res.data.artists.items[0],
        })
    } catch(err) {  
        console.log(err)
    }
} 

export const findTopSong = (keyword) => async dispatch => {
    try {
        const res = await axios.get(`/api/search/results/${keyword}`)
        console.log(res)

        dispatch({
            type: TOP_ONE_SONG,
            payload: res.data.tracks.items[0],
        })
    } catch(err) {  
        console.log(err)
    }
} 