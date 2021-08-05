import { useState, useEffect} from "react";
import { getData } from "../../DataFetch/DataFetch";

const useFetch = (url) => {
  
    const [dataFetch, setDataFetch] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=> {
        getData(url)
        .then(res => {
            setDataFetch(res.data);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
        });
    },[]);

    return {dataFetch, error};
};

export default useFetch;