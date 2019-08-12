import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './component/layout/NavBar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Search from './component/search/Search';
import SearchDetail from './component/search/SearchDetail';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import Alert from './component/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Profile from './component/profile/Profile';
import ProfileOther from './component/profile/ProfileOther';
import ProfileAll from './component/profile/ProfileAll';
import Posts from './component/posts/posts'
import PrivateRoute from './component/rounting/PrivateRoute'
import Posts from './component/posts/posts'
import Post from './component/post/Post'
import PrivateRoute from './component/rounting/PrivateRoute'


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
    <Provider store={store}>
        <Router>
            <Fragment>
                <NavBar/>
                <Route exact path='/' component={Landing}/>
                <section className='container'>
                    <Alert/>
                    <Switch>
                        <Route exact path='/search' component={Search} />
                        <Route exact path='/search/details/artists/:id' component={SearchDetail} />
                        <Route exact path='/search/details/songs/:id' component={SearchDetail} />
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/profile' 
                            render={(props) => store.getState().auth.isAuthenticated
                                        ? <Profile />
                                        : <Redirect to='/login' />} />
                        <Route exact path='/profile/:userId' component={ProfileOther} />
                        <Route exact path='/profiles' component={ProfileAll} />
                        <PrivateRoute exact path='/posts' component={Posts}/>
                        <PrivateRoute exact path='/posts/:id' component={Post}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
    );
};

export default App;
