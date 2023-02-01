import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import Product from "../product/product";
import "./productPage.css";


export default function ProductPage(){

    const [data,setData] = useState([]);
    const [usingData,setUsingData] = useState([]);
    const [optionData,setOptionData] = useState([]);
    const [optionValue,setOptionValue] = useState("Select category");
    const [pageNum,setPageNum] = useState(0);
    const [errorPage,setErrorPage] = useState(false);

    const FCall = async()=>{

        try{

            const res = await fetch("https://dummyjson.com/products?skip=0&limit=100");
            const data = await res.json();
            
            data.products.sort((a,b)=>{
                return b.rating - a.rating;
            });
            
            setData(data.products);
            setUsingData(data.products.slice(0,50));
        }
        catch(e){
            setErrorPage(true);
        }




    }

    useEffect(()=>{
        FCall();
    },[]);
    

    useMemo(() =>{
        
        let optiondata = new Set();

        for(let i = 0; i < data.length;i++){
            optiondata.add(data[i].category);
        }
    
        setOptionData(Array.from(optiondata));
    } , [data])



    
    function handleSelect(e){

   
        if(e.target.value !== "Select category"){
             setUsingData((pre)=>{
                let temp = [...data];
                temp = temp.filter(elm=>{
                    return elm.category === e.target.value;
                })
                // console.log(temp);
                if(temp.length > 50){
                    return temp.slice(0,50);
                }else{
                    return temp;
                }
             })
        }else{
            setUsingData(data.slice(0,50));
        }
        // console.log(usingData);
        setPageNum(0);
        setOptionValue(e.target.value);
    }

    function handlePage(btn){
        if(btn === "prev"){
            setPageNum(pre=>pre-1);
        }else{
            setPageNum(pre=>pre+1);
        }
    }

    return<>
    <h2 id="product-title">Available Products</h2>
    <div id="page-container">
        <button onClick={()=>{handlePage("prev")}} disabled = {pageNum === 0 ? true : false}>Prev</button>
        <p>Page {pageNum+1}</p>
        <button onClick={()=>{handlePage("next")}} disabled = {(pageNum+1)*10 >= usingData.length ? true : false} >Next</button>
    </div>
    <select id="filter" onInput={handleSelect} value = {optionValue}>
        <option>Select category</option>
        {optionData.length && optionData.map(option=>{
            let key = new Date().getTime()-(Math.random()*1000);
            return <option key={key}>{option}</option>
        })}
    </select>

    <Product usingData={usingData.slice((10*pageNum),(10*(pageNum+1)))} />

    {
        errorPage&& <h2>
            Please refresh #Failed to fetch
        </h2>
    }
    </>
}