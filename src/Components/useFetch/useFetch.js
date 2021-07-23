import { useState, useEffect} from 'react';
import { dataGet } from '../Axios/Axios';

const useFetch = (url) => {
  
    const [dataFetch, setDataFetch] = useState([]);
    const [error, setError] = useState(null)

    useEffect(()=> {
        dataGet(url)
        .then(res => {
            setDataFetch(res.data)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
        })
    },[])

    return {dataFetch, error}
}

export default useFetch;