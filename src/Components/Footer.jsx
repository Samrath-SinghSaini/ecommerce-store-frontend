import List from "./List"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState, useEffect } from "react";
function Footer(){
    const [showBtn, setShowBtn] = useState(false)
    function scrollToTop(){
        console.log(window.scrollY)
        if(window.scrollY > 700){
            setShowBtn(true)
        } else{setShowBtn(false)}
    }
    function scrollOnClick(){
        window.scrollTo({top:0, behavior:'smooth'})
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollToTop)
        
        return ()=>{window.removeEventListener('scroll', scrollToTop)}
    })

return <div className="footer-div">
<button className="footer-btn" onClick={scrollOnClick} style={{display: showBtn? 'block' : 'none'}}>Back to Top</button>
    <img src="/src/images/storeIcon.png" className="footer-icon"></img>
    <List title="List 1" listItems={["Item 1","Item 2", "Item 3"]} src='/'/>
    <List title="List 1" listItems={["Item 1","Item 2", "Item 3"]}/>
    <List title="List 1" listItems={["Item 1","Item 2", "Item 3"]}/>
    <List title="List 1" listItems={["Item 1","Item 2", "Item 3"]}/>
    <List title="List 1" listItems={["Item 1","Item 2", "Item 3"]}/>
    <div className="social-div">
        <p>Follow Us:</p>
        <button className="social-btn"><FacebookIcon style={{color:'blue', fontSize:'28px', margin:'5px 5px 0 5px'}}/></button>
        <button className="social-btn"><InstagramIcon style={{color:'purple', fontSize:'28px', margin:'5px 5px 0 5px'}}/></button>
        <button className="social-btn"><TwitterIcon style={{color:'blue', fontSize:'28px', margin:'5px 5px 0 5px'}}/></button>
    </div>
    <p >This is an ecommerce store selling random stuff.</p>
    <p className="footer-btm">Made by Samrath Singh Saini - 2023</p>
</div>
}
export default Footer