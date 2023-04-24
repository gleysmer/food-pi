import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import {  getRecipe } from '../../redux/action';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';
import Loading from '../Loading/Loading';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';
import style from './Home.module.css';


export default function Home() {

    const dispatch = useDispatch();
    // const history= useHistory()
    const recipes = useSelector((state) => state.recipes);

    const [loading, setLoading] = useState(true);

    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePage ] = useState(9);
    const [order, setOrder] = useState('');

    const indexLast = currentPage * recipePage;
    const indexFirst = indexLast - recipePage;
    const allRecipes = recipes.slice(indexFirst, indexLast);
    //
    useEffect(() => {
        dispatch(getRecipe());
    }, [dispatch]);

    const handleBack=()=>{
    //    window.location.reload()
    // history.go(-1)
    dispatch(getRecipe())
    }

    if (allRecipes.length > 0 && loading) {
        setLoading(false);
    }

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={"style.fondo"}>
            {recipes.length > 0 && !loading ? (
                <div>
                    <NavBar />
                    <div>
                        <div className={style.filt}>
                            <Filters
                                setCurrentPage={setCurrentPage}
                                setOrder={setOrder}
                            />
                        </div>
                        <div ><button onClick={handleBack} className={style.btnh}>Home</button></div>
                        <div>
                            
                            <div className={"style.cards"}>
                                {allRecipes?.map((e) => {
                                    return (
                                        <div key={e.id}>
                                            <Card
                                                key={e.id}
                                                id={e.id}
                                                image={e.image}
                                                name={e.name}
                                                diets={e.diets}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                                <Pagination
                                    paginado={paginado}
                                    recipes={recipes.length}
                                    recipePage={recipePage}
                                />
                        </div>
                    </div>
                </div>
            ) : !recipes.length > 0 && loading ? (
                <div className={"style.cargar"}>
                 
                    <Loading />
                </div>
            ) : (
                <p>Error not found</p>
            )}
        </div>
    );
}
