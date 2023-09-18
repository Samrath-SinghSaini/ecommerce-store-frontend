/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
function List(props){
    return <div className="footer-list-div">
    <h2 className="footer-list-title">{props.title}</h2>
    <ul className="footer-list">
        {props.listItems.map((value, index)=>{
            return <li className="footer-list-item"  key={index}><a href={props.src}>{value}</a></li>
        })}
    </ul>
</div>
}
export default List