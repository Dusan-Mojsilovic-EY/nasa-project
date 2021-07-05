import axios from 'axios';
import { useState, useEffect} from 'react';
import { numberReq, url } from '../../Constants';

const useFetch = () => {
  
    const [data, setData] = useState([]);

    useEffect(()=> {
        axios.get(url)
        .then(res => {
            setData(res.data)
        })
    },[])

    return {data, numberReq}
}

export default useFetch;