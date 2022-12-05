import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

export default function Detail(){
    const [item, setItem] = useState([])
    const router = useRouter()
    const query = router.query.id
    
    if(query!==undefined || query!==null){
        useEffect(()=>{
            fetch(`https://dummyjson.com/products/${query}`)
            .then(res=>res.json())
            .then(data=>setItem(()=>{
                return [
                    {...data}
                ]
            }))
        }, [router.query])
    }

    const view = item.map(data=>{
        const img = data.images!==undefined && data.images.map(imeg=>{
            return(
                <div key={nanoid()} className="w-full h-full flex-col flex justify-center border p-1">
                    <img src={imeg}/>
                </div>
            )
        })
        return (
        <div key={data.id} className="my-5 grid grid-cols-3 gap-2 p-2">
        <div className="w-full h-full flex flex-col border p-2">
            <div className="w-full h-[17rem] overflow-hidden mb-1">
                <img src={data.thumbnail} alt="thummnail"/>
            </div>
            <div className="grid grid-cols-3 w-full">
                {img}
            </div>
        </div>
        <div className="border col-span-2 p-3 ">
            <h1 className="font-bold text-2xl">{data.title}</h1>
            <div className="flex gap-5">
                <div className="flex mb-3">
                    <img src="../../images/star.png" className="h-5 w-5"/>
                    <span>{data.rating}</span>
                </div>
                <div className="flex mb-3">
                    <span>Stok tersisa : {data.stock}</span>
                </div>

            </div>
            <p className="font-semibold my-2">{data.brand}</p>
            <p className="text-3xl font-bold">Rp.{(data.price * 15000) - ((data.price * 15000)*Math.ceil(data.discountPercentage)/100)},-</p>
            <p className="text-sm text-slate-500"><span className="bg-red-300 rounded-sm px-1 font-semibold text-red-700">{Math.ceil(data.discountPercentage)}%</span> <span className="line-through">Rp.{data.price * 15000},- </span></p>
            <p>{data.description}</p>
        </div>
        </div>
        )
    })

    return (
        <>
        <div className="max-w-7xl mx-auto">
            {view}
        </div>
        </>
    )
}
