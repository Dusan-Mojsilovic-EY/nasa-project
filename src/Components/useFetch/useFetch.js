import axios from 'axios';
import React from 'react';
import { useState, useEffect} from 'react';

const useFetch = () => {

    var apiKey = "jbfndddBALH0QmDvRJIzbDOChFEdT9PoSH08CeUV";
    var count = 4;
    var url =`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`
  
    const [data, setData] = useState(null);

    useEffect(()=> {
        axios.get(url)
        .then(res => {setData(res.data)
            console.log(res.data)})
    },[url])

    return {data}
}

export default useFetch;