import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterByDiet,orderName,getDiets,FilterScore } from '../../redux/action';
import Search from '../Search/Search';
import style from './Filters.module.css';
export default function Filters({ setCurrentPage, setOrder }) {
    const dispatch = useDispatch();
    const diet = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

   

    function handleAZ(e) {
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleScore(e) {
        e.preventDefault();
        dispatch(FilterScore(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleTypeDiet(e) {
        e.preventDefault();
        dispatch(FilterByDiet(e.target.value));
        setCurrentPage(1);
    }
    return (
        <div className={style.flexi}>
            <div className={style.buscar}>
                <Search />
            </div>
            <div>
                <label className={style.tipo}>Type of Diet</label>
                <select
                    onChange={(e) => handleTypeDiet(e)}
                    className={style.input}
                >
                    <option value="all">ALL</option>
                    {diet && diet.map((e, k) => {
                        return (
                            <option key={k} value={e.name}>
                                {e.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className={style.tipo}>Order</label>
                <select onChange={(e) => handleAZ(e)}>
                    <option value="all">ALL</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>
            <div>
                <label className={style.tipo}>Health Score</label>
                <select onChange={(e) => handleScore(e)}>
                    <option value="all">ALL</option>
                    <option value="max">Máx</option>
                    <option value="min">Min</option>
                </select>
            </div>
        </div>
    );
}
