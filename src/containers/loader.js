import React from 'react';
import loader from '../images/loader.gif';
import './container.css';

const Loader = () => {
    return (
        <div id="page_loader">
            <img alt="loader" src={loader}></img>
        </div>
    );
}

export default Loader;