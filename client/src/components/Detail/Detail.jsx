import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetail, cleanDetail } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import style from './Detail.module.css';


export default function Detail() {


    const dispatch = useDispatch();
    const detail = useSelector((state) => state.details);
    const { id } = useParams();


    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    function back() {
        dispatch(cleanDetail(dispatch));
    }

    return (
        <div className={style.fondo}>
            {detail.length > 0 ? (
                <div className={style.div}>
                    <div>
                        <h2 className={style.sub}>
                            {detail[0].name.toUpperCase()}
                        </h2>
                        <img
                            className={style.img}
                            src={detail[0].image ? detail[0].image : ('../../image/filter1.jpg')}
                            alt="img not found"
                            width={'250px'}
                            height={'250px'}
                        />
                        <h3>Diets:</h3>
                        {detail[0].diets.length === 0 ? (
                            <p className={style.nopasos}>diets not found </p>
                        ) : (
                            <p className={style.nopasos}>
                                {detail[0].diets.map((e) => e.name + ',')}
                            </p>
                        )}
                    </div>
                    <div>
                        <h3>Health Score: {detail[0].healthScore}º</h3>
                        <h3>Type of dish:</h3>
                        <p className={style.nopasos}>
                            {detail[0].dishTypes}
                        </p>
                        <h4>Summary:</h4>
                        {detail[0].summary.length === 0 ? (
                            <p className={style.parrafo}>Summary not found</p>
                        ) : (
                            <p className={style.parrafo}>
                                {detail[0].summary.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </div>
                    <div className={style.step}>
                        <h4>Steps:</h4>
                        {!detail[0].steps ? (
                            <p className={style.nopasos}>
                                 step not found
                            </p>
                        ) : typeof detail[0].steps === 'object' &&
                          detail[0].steps.length > 0 ? (
                            detail[0].steps.map((e, k) => {
                                return (
                                    <p className={style.pasos} key={k}>
                                        Paso Nº{e.number}:{e.step}
                                        <br />
                                    </p>
                                );
                            })
                        ) : typeof detail[0].steps === 'object' &&
                          detail[0].steps.length === 0 ? (
                            <p className={style.nopasos}>
                                 step not found
                            </p>
                        ) : (
                            <p className={style.otro}>
                                {detail[0].steps}
                            </p>
                        )}

                       

                        {/* {detail[0].steps.length > 0 ? (
                            detail[0].steps.map((e, k) => {
                                return (
                                    <p className={style.pasos} key={k}>
                                        Paso Nº{e.number}:{e.step}
                                        <br />
                                    </p>
                                );})
                                ):(
                                    <p>Steps not found</p>
                                )} */}
                    </div>
                    <div>
                        <Link to={'/home'}>
                            <button
                                className={style.box}
                                onClick={() => back()}
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={style.cargando}>
                    <Loading />
                </div>
            )}
        </div>
    );
}
