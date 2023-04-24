import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByName, getDiets } from '../../redux/action';
import style from './Search.module.css';


export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name === ' ' ) {
            alert('ingrese el nombre');
        }
       
        dispatch(getRecipeByName(name));
        dispatch(getDiets());
        setName('');
    }

    return (
        <div className={style.search}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Search..."
                    value={name}
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit" className={style.btn}>
                    Search
                </button>
            </form>
        </div>
    );
}
