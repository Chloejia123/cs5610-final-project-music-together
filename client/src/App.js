import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/layout/NavBar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import Alert from './component/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

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
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={Login}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
    );
};

export default App;
