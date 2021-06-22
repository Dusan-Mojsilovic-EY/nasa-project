import React, { useEffect } from 'react';
import './Responsive.scss';

const useResize = (myRef) => {
    const [width, setWidth] = useState(0)


    useEffect(() => {
        const handleResize = () => 
        setWidth(myRef.current.offsetWidth)
    
    
    window.addEventListener('resize', handleResize)

    return () => {
         window.removeEventListener('resize', handleResize)
    }
},[myRef] )

retrun {width}
}