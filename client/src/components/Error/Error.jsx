import React from 'react';
import error from '../../image/error.webp';
import style from './Error.module.css';

export default function Error() {
    function resert() {
        window.location.reload();
    }
    return (
        <div>
            <div className={style.error}>
                <img className={style.imagen} src={error} alt="img not found" />
                <button className={style.box} onClick={() => resert()}>
                    Back
                </button>
            </div>
        </div>
    );
}
