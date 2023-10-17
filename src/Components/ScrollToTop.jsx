import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop(){
    /* Since react opens some components half way scrolled, this component will get the path name of the component being rendered and then manually scroll it to the top of the page. */
    const {pathname} = useLocation()

    useEffect(()=>{
        window.scrollTo({top:0})
},[pathname])
}
export default ScrollToTop