import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                        <Route exact path='/search/details/:id' component={SearchDetail} />
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Route exact path='/profile/:userId' component={ProfileOther} />
                        <Route exact path='/profiles' component={ProfileAll} />
                        <PrivateRoute exact path='/posts' component={Posts}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
    );
};

export default App;
