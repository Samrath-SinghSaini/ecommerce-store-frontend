import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
function ArrowBtn(){
    return <>
         <button className="arrow-btn back-btn">
          <ArrowBack/>
        </button>
        <button className="arrow-btn forward-btn">
          <ArrowForward />
        </button>
    </>
}
export default ArrowBtn; 