/* eslint-disable react/prop-types */
function checkFunc(e){
    console.log(e.target.name)
}
function CategoryVal(innerProp){
    return <label value='css' className="sidebar-lbl" >
    <input type="checkbox" onChange={(e)=>{checkFunc(e)}} name={innerProp.value}></input>
    {innerProp.value}
</label>
}

function SidebarCategory(props){
    let valueArr = []
    valueArr = props.valueArr
return <>
    <h3 className="sidebar-heading">{props.heading}</h3>
        {valueArr.map((element, index)=>{
            return <CategoryVal value={element} key={index}/>
        })}        
</>
}



export default SidebarCategory