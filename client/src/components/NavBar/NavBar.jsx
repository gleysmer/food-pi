import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
export default function NavBar() {
    return (
        <header>
            <nav className={style.nav}>
                <div>
                    <Link to={'/'}>
                        <button className={style.btnB}>
                            Back
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to={'/create'}>
                        <button className={style.btnC}>
                            Create recipe
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
