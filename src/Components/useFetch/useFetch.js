import axios from 'axios';
import { useState, useEffect} from 'react';
import { numberReq, url } from '../../Constants';

const useFetch = () => {
  
    const [data, setData] = useState([]);
    const [error, setError] = useState(null)

    useEffect(()=> {
        axios.get(url)
        .then(res => {
            setData(res.data)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
        })
    },[])

    return {data, numberReq}
}

export default useFetch;