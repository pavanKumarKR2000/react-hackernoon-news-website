//createContext ✅
//provider ✅
//useContext

import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer";
export const AppContext = createContext();

const initialState = {
    isLoading: true,
    query: "",
    nbPages: 0,
    page: 0,
    hits: []
};

const AppProvider = ({ children }) => {
     
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const URL = "http://hn.algolia.com/api/v1/search?";

    const fetchData = async (url) => {
        dispatch({ type: "SET_LOADING" });

        try {
            const res = await fetch(url);
            const data = await res.json();
            dispatch({ type: "GET_STORIES", payload: { hits: data.hits, nbPages: data.nbPages } });
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(`${URL}query=${state.query}&page=${state.page}`);
    }, [ state.page]);
    
    useEffect(() => {
        fetchData(`${URL}query=${state.query}&page=${state.page}`);
        dispatch({ type: "SET_PAGE_1" });
    }, [state.query]);


    const removePost = (ID) => {
        dispatch({ type: "REMOVE_POST", payload: ID });
    }

    const searchPost = (QUERY) => {
        dispatch({ type: "SEARCH_QUERY", payload: QUERY });
    }

    const getPrevPage = () => {
        dispatch({ type: "PREV_PAGE" });
    }

    const getNextPage = () => {
        dispatch({ type: "NEXT_PAGE" });
    }
    
    return (
        <AppContext.Provider value={{ ...state,removePost,searchPost,getPrevPage,getNextPage}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
} 

export default AppProvider; 