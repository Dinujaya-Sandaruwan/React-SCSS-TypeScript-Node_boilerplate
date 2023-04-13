import reactImg from '../assets/react.png';
import scssImg from '../assets/scss.png';
import typeScriptImg from '../assets/typeScript.png';
import node from '../assets/node.png';

function Preview() {
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
                <p>
                    The React Starter Template is a comprehensive toolkit for
                    web development, featuring React, TypeScript, Node, and
                    SCSS. It includes built-in VS Code snippets for fast and
                    efficient coding, along with pre-written SCSS style
                    boilerplate that can be customized to create unique user
                    interfaces. Whether you're a seasoned developer or a
                    beginner, this template boosts productivity and creativity,
                    making React development a breeze. Say goodbye to setup
                    hassles and hello to accelerated development with the React
                    Starter Template.
                </p>

                <h6>Created By Dinujaya Sandaruwan</h6>
            </div>
        </div>
    );
}

export default Preview;
