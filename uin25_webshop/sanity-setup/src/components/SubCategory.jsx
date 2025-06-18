import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCategoryByCurrentSlug, fetchCategoryBySlug } from "../sanity/catecoryServices"

export default function SubCategory ({getProductsByCategory, products}){

    const {subcategory} = useParams()
    const [category, setCategory] = useState([])

    const getCategory = async (slug)=>{
        const data = await fetchCategoryByCurrentSlug(slug)
        setCategory(data[0])
    }

    console.log(subcategory, category.categoryname, products)

    useEffect(()=>{
        getCategory(subcategory)
    },[])

    useEffect(()=>{
         getProductsByCategory(category.categoryname)
    },[category])
    

    return (
        <>
        <h1>{category.categoryname}</h1>
        {products?.map(product => <p>{product.categoryname}</p>)}
        </>

)
}