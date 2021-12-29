import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
    return (
        <div className="header">
            <Link to='/'>
                <h1 className='header-text'>/CoinCap</h1> 
            </Link>
        </div>
    )
}
