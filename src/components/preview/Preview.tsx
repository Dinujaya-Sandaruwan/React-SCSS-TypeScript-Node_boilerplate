import reactImg from '../../assets/react.png';
import scssImg from '../../assets/scss.png';
import typeScriptImg from '../../assets/typeScript.png';
import node from '../../assets/node.png';
import { useState } from 'react';
import useCounterStore from './store';

function Preview() {
    const {counter, increment, decrement} = useCounterStore()

    return (
        <div className="preview">
            <div className="preview__images">
                <img src={reactImg} className="--react-img" alt="" />
                <div>
                    <img src={node} className="" alt="" />
                    <img src={scssImg} className="" alt="" />
                    <img src={typeScriptImg} className="--type-image" alt="" />
                </div>
            </div>
            <div className="preview__text">
                <h1>React + SCSS + TypeScript + NodeJS</h1>
                <h5>BOILERPLATE</h5>
                
                <div className="--counter">
                    <button onClick={() => counter && decrement()}>-</button>
                                       
                    <span>{counter}</span>
                    <button onClick={() => increment()}>+</button>
                </div>

                <h6>Created By Dinujaya Sandaruwan</h6>
            </div>
        </div>
    );
}

export default Preview;
