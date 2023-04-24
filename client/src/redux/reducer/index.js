

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    details: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPE':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };

            case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
            };
        case 'GET_DETAIL':
            return {
                ...state,
                details: action.payload,
            };
        case 'POST_RECIPE':
            return {
                ...state,
            };

            case 'CLEAN_RECIPE':
            return {
                ...state,
                allRecipe: action.payload,
            };

            case 'CLEAN_DETAIL':
            return {
                ...state,
                details: action.payload,
            };

        
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload,
            };
        
        
       
        case 'FILTER_DIET':
            let copy = [...state.allRecipes];
            let typeDiet =
                action.payload === 'all'
                    ? copy
                    : copy.filter((e) =>
                          e.diets.some((e) => e.name === action.payload)
                      );
            if (typeDiet.length <= 0) {
                typeDiet = copy;
            }
            return {
                ...state,
                recipes: typeDiet,
            };
            
        case 'ORDER_NAME':
            let order = [...state.allRecipes];
            let filterAZ =
                action.payload === 'A-Z'
                    ? order.sort((a, b) => {
                          if (a.name > b.name) {
                              return 1;
                          }
                          if (b.name > a.name) {
                              return -1;
                          }
                          return 0;
                      })
                    : order.sort((a, b) => {
                          if (a.name > b.name) {
                              return -1;
                          }
                          if (b.name > a.name) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : filterAZ,
            };

        case 'FILTER_SCORE':
            let copyS = [...state.allRecipes];
            let filterScore =
                action.payload === 'min'
                    ? copyS.sort((a, b) => {
                          if (a.healthScore > b.healthScore) {
                              return 1;
                          }
                          if (b.healthScore > a.healthScore) {
                              return -1;
                          }
                          return 0;
                      })
                    : copyS.sort((a, b) => {
                          if (a.healthScore > b.healthScore) {
                              return -1;
                          }
                          if (b.healthScore > a.healthScore) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                recipes:
                    action.payload === 'all' ? state.allRecipes : filterScore,
            };
        
        default:
            return state ;
    }
}
