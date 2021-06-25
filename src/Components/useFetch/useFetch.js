import axios from 'axios';
import { useState, useEffect} from 'react';
import { numberReq, url } from '../../Constants';

const useFetch = () => {
  
    const [data, setData] = useState(null);

    useEffect(()=> {
        axios.get(url)
        .then(res => {setData(res.data)
            console.log(res.data)})
    },[])

    return {data, numberReq}
}

export default useFetch;