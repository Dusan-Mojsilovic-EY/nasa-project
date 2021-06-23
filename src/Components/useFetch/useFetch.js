import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react';

const useFetch = () => {

    var apiKey = "jbfndddBALH0QmDvRJIzbDOChFEdT9PoSH08CeUV";
    var numberReq = 20;
    var url =`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${numberReq}`
  
    const [data, setData] = useState(null);

    useEffect(()=> {
        axios.get(url)
        .then(res => {setData(res.data)
            console.log(res.data)})
    },[])

    return {data, numberReq}
}

export default useFetch;