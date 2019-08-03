import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login, loadUser } from '../../actions/auth';

const Login = ({login, isAuthenticated, user}) => {
    const [formData, setFormData] = useState({
         email: '',
         password: ''
     });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect us to profile if login
    if(isAuthenticated) {
        if (user) { // if don't specify, will run into user undefined error on profile page
        // problem: after login, page don't refresh
            return <Redirect to='/profile'/>
        }
    }

    return (
        <form className={'container'}>
            <Fragment>
                <h1 className='large text-primary'>Sign In</h1>
                <p className='lead text-primary'>
                    <i className='fas fa-user' /> Sign Into Your Account
                </p>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Login' />
                </form>
                <p className='my-1'>
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </Fragment>
        </form>

    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);