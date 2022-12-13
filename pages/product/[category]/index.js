import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ItemsCard from "../../../components/ItemsCard"

export default function Item (){
    const [items, setItems] = useState([])
    
    const router = useRouter()
    const category = router.query.category
    
    useEffect(()=>{
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(data=>setItems(data.products))
    }, [router.query])

    return (
        <>
        <div className="max-w-7xl mx-auto my-10">
            <div className="w-full grid grid-cols-2 md:grid-cols-5 justify-items-center">
                <ItemsCard getDataItems={items} />
            </div>
        </div>
        </>
    )
}