import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Music Together</h1>
                    <p className='lead'>
                        Create your favorite singer lists
                        <br/>
                        & Share with others
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-signup'>
                            Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Landing;