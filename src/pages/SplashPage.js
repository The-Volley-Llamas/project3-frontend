import React from 'react'
import { Link } from 'react-router-dom'

export default function SplashPage() {
    return (
        <div>
            <h1>Hello</h1>
            <Link to="/home">Home</Link>
        </div>
    )
}
