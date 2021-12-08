import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="create-submit-button">
            <div className="create-wrapper">
                <Link to="/create-project">
                    <button className="btn backProjectButton">Create Project</button>
                </Link>
                <Link to="/back-project">
                    <button className="btn backProjectButton">Back Project</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
