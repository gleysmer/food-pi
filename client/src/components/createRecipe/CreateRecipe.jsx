import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from '../../redux/action';
import style from './CreateRecipe.module.css';

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const diet = useSelector((state) => state.diets);
    const [errors, setError] = useState({});
    const [input, setInput] = useState({
        name: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: '',
        diets: [],
    });
    const history = useHistory();
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function validate() {
        let errors = {};
        if (!input.name || input.name.length < 3) {
            errors.name = 'Name Required';
        }
        else if( (/^[A-Z]+$/i.test(input.name))){
            errors.name= 'name not number'
        }
        if (input.summary.length < 10) {
            errors.summary = 'Summary min. 10 characters';
        }
        if (input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = 'Máx is 100';
        }
        if (!input.image) {
            errors.image = 'Please insert an image';
         }
        if (input.steps.length < 20) {
            errors.steps = 'Step min. 20 characters';
        }
        return errors;
    }

    function handleChange(e) {
        
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value],
        });
    }

    function handleDelet(e) {
        setInput({
            ...input,
            diets: input.diets.filter((diet) => diet !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !input.name ||
            !input.image ||
            !input.summary ||
            !input.healthScore ||
            !input.steps ||
            !input.diets
        ) {
            alert('the fields are required');
        } else {
            dispatch(createRecipe(input));
            setInput({
                name: '',
                image: '',
                summary: '',
                healthScore: '',
                steps: '',
                diets: [],
            });
            alert('Recipe created successfully')
            history.push('/home');
           
        }
    }
    return (
        <div className={style.fondo}>
            <div>
                <Link to={'/home'}>
                    <button className={style.caja}>Back to Home</button>
                </Link>
            </div>
            <h2 className={style.h2}>Create recipe</h2>
            <form onSubmit={(e) => handleSubmit(e)} className={style.fondoform}>
               
                <div>
                    <div className={style.primero}>
                        <label className={style.definicion}>NAME:</label>
                        <input
                            className={style.input}
                            type="text"
                            value={input.name}
                            placeholder="Name..."
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className={style.error}>{errors.name}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Image:</label>
                        <input
                            className={style.input}
                            type="text"
                            name="image"
                            value={input.image}
                            placeholder="Image..."
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.image && (
                            <p className={style.error}>{errors.image}</p>
                        )}
                    </div>
                    
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            HealthScore:
                        </label>
                        <input
                            className={style.input}
                            type="number"
                            name="healthScore"
                            value={input.healthScore}
                            min="0"
                            max={'100'}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.healthScore && (
                            <p className={style.error}>{errors.healthScore}</p>
                        )}
                    </div>
                </div>
                <div>
                    
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Step By Step:
                        </label>
                        <textarea
                            className={style.inputl}
                            value={input.steps}
                            placeholder="Step by step..."
                            name="steps"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.steps && (
                            <p className={style.error}>{errors.steps}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Summary:</label>
                        <textarea
                            rows="2" cols="30"
                            value={input.summary}
                            onChange={(e) => handleChange(e)}
                            placeholder="Summary..."
                            name="summary"
                            className={style.inputl}
                        />
                        {errors.summary && (
                            <p className={style.error}>{errors.summary}</p>
                        )}
                    </div>
                    {/* <br /> */}
                    <div className={style.definicion2}>
                        <label>Diets:</label>
                        <select
                            onChange={(e) => handleSelect(e)}
                            className={style.select}
                        >
                            <option>Type of diets</option>
                            {diet && diet.map((e, k) => {
                                return (
                                    <option key={k} value={e.name}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    
                </div>
                <div className={style.cajabtn}>
                    <button type="submit" className={style.btn}>
                         Create Recipe
                    </button>
                </div>
                
            </form>
            {input.diets?.map((e) => {
                return (
                    <div key={e} className={style.boxis}>
                        <p className={style.letra}>{e}</p>
                        <button
                            className={style.btnDelect}
                            onClick={() => handleDelet(e)}
                        >
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
