import { useState } from "react";
import "./product.css";

export default function Product({usingData}){
    const [hoverInfo,setHoverInfo] =useState({
        view:false,
        data:{}
    });

    const [mouseData,setMousedata] = useState({
        top:0,
        left:0,
    })

    // console.log(usingData);
    function handleMouseover(product,e){
        setHoverInfo(pre=>{
            let temp = {...pre};
            temp.view = true;
            temp.data = product;
            return temp;
        })
        // console.log(e)
        setMousedata({
            top:e.clientY,
            left:e.clientX

        })
        // console.log(product);
    }

    return<>
    <div id="product-container" >
    {usingData.map((product)=>{
        return<div key={product.id}>
            <img className="main-product-img"  onMouseEnter={(e)=>handleMouseover(product,e)}   src={product.thumbnail} alt = {product.title}/>
            <p><b>{product.title}</b></p>
            </div>
        })}

    </div>
    {
        hoverInfo.view && <>
        <div id="hover-container" style={mouseData}>

        <div id="hover-header">
            <h5>{hoverInfo.data.category}</h5>
            <button onClick={()=>{setHoverInfo(pre=>{
                let temp = {...pre};
                temp.view = false;  
                return temp;              
            })}}>close</button>
        </div>
        <div id="hover-content">
            <img src={hoverInfo.data.thumbnail} alt = {hoverInfo.data.title}/>
            <p>{hoverInfo.data.description}</p>
        </div>
        </div>
        </>
    }
    
    </>
}

