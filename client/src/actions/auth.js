import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    VIEW_OTHERS,
    UPDATE_USER,
    UPDATE_PROFILE,
    VIEW_MY_PROFILE,
    FIND_USERS_ARTISTS,
    FIND_ALL_PROFILES,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// This action load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
           });

    } catch (err) {
        dispatch({
         type: AUTH_ERROR
        });
    }
};


// This action loads user profile
export const loadUserProfile = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }


    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: VIEW_MY_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const loadOtherUser = (userId, isAuthenticated = false) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: VIEW_OTHERS,
            payload: res.data,
            isAuthenticated: isAuthenticated,
        })

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const loadAllUserProfiles = (isAuthenticated = false) => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: FIND_ALL_PROFILES,
            payload: res.data,
            isAuthenticated: isAuthenticated,
        })

    } catch(err) {
        console.log(err)
    }
}

export const findUserWhoLikedArtist = (artistId) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/artist/${artistId}`)
        console.log(res)
        
        dispatch({
            type: FIND_USERS_ARTISTS,
            payload: res.data
        })


    } catch(err) {
        console.log(err)
    }
}

export const addFavoriteArtist = (content, id) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);
    // const artistId = content.artistId;
    console.log(body)
    // console.log(artistId)

    try {
        const res = await axios.post(`/api/profile/artist/${id}`, body, config);
        // console.log(res)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert('Please register or log in to like this artist', 'danger'))
    }
}

// This action register User
export const register = ({ name, email, password, roleType }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, roleType });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
         type: REGISTER_FAIL
        });
    }
};

export const updateUser = (content) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);
    const id = content.id;


    try {

        const res = await axios.post(`/api/users/${id}`, body, config);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        

    } catch (err) {
        console.log(err)
    }

}

// This action updates user profile
export const updateProfile = (content) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);
    try {

        const res = await axios.post('/api/profile', body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        

    } catch (err) {
        console.log(err)
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response && err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
         type: LOGIN_FAIL
        });
    }
};

//Log out
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}