import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Card.module.css';
export default function Card({ id, name, image, diets }) {
    return (
        <div className={style.inicio}>
            <div className={style.card}>
                <NavLink to={`/detail/${id}`}>
                    <div>
                        <img
                            src={image ? image : ('../../image/fondolanding.jpg')}
                            alt="img not found"
                            width={'250px'}
                            height={'250px'}
                            className={style.image}
                        />
                        <p className={style.letra}>{name}</p>
                    </div>
                
                    <div>
                    {diets?.map((e, k) => {
                        return (
                            <div key={k}>
                                <p className={style.dietas}>{e.name}</p>
                            </div>
                        );
                    })}
                    </div>
                </NavLink>
            </div>
        </div>
    );
}
