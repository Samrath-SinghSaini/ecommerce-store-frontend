import { Shop } from '@mui/icons-material'
import ShopCard from './ShopCard'

function Wishlist(){
    let itemNum = [...Array(15).fill(Number,0)]
    return <div className='wishlist-div'>
        <h1 className='wish-head'>Your Wishlist ({itemNum.length} items)</h1>
        <div className='wish-main-container'>
        {itemNum.map((element ,index)=>{
            return <ShopCard name='Sample' price='1000' category='Headphones' image='6503968d55082a9540e94259' key={index}/>
        })}
        </div>
    </div>
}

export default Wishlist