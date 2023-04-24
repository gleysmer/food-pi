import axios from 'axios'

export function getRecipe() {
    return async (dispatch) => {
        try {
            let json = await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: 'GET_RECIPE',
                payload: json.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getRecipeByName(name) {
    return async (dispatch) => {
        try {
            let json = await axios.get(
                `http://localhost:3001/recipes?name=${name}`
            );
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data,
            });
        } catch (error) {
            alert('No se encontro la receta');
            // window.location.reload();
            console.log(error);
        }
    };
}

export function getDetail(id) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function cleanRecipe(dispatch) {
    return dispatch({
        type: 'CLEAN_RECIPE',
        payload: [],
    });
}
export function cleanDetail(dispatch) {
    return dispatch({
        type: 'CLEAN_DETAIL',
        payload: [],
    });
}

export function createRecipe(payload){
    return async function(dispatch){
        try {
            let response = await axios.post('http://localhost:3001/recipes',payload)
        dispatch({
        type: 'POST_RECIPE',
        payload: response.data,
     }) 
        } catch (error) {
            console.log(error);
        }
       
    }
}

export function getDiets() {
    return async (dispatch) => {
        try {
            let diet = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: 'GET_DIETS',
                payload: diet.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function FilterByDiet(payload) {
    return {
        type: 'FILTER_DIET',
        payload,
    };
}

export function orderName(payload) {
    return {
        type: 'ORDER_NAME',
        payload,
    };
}

export function FilterScore(payload) {
    return {
        type: 'FILTER_SCORE',
        payload,
    };
}