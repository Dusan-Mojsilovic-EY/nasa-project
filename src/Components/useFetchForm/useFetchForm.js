import { dataGet } from '../Axios/Axios';
import { useState, useEffect} from 'react';
// import { url2 } from '../../Constants';

const useFetchForm = (url) => {
  
    const [dataStates, setDataStates] = useState([])
    const [error, setError] = useState(null);

    useEffect(()=> {
        dataGet(url)
        .then(res => {
            setDataStates(res.data)
        })
        .catch(err => {
            setError(err.message)
        })
    },[url])

    return {dataStates, error}
}

export default useFetchForm;