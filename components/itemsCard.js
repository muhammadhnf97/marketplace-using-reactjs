import Link from "next/link"
import { useState } from "react"

export default function ItemsCard(props){
    const [product] = useState(true)
    const card = props.getDataItems.map(data=>{
        return (
            <Link key={data.id} href={`/product/${data.category}/${data.id}`} >
                <div className="w-56 h-72 my-2 rounded-lg mr-2 bg-white p-2 shadow-md relative border">
                    <div className="absolute w-fit p-1 rounded-lg bg-white shadow-md top-2 left-2">
                        <img src="../images/star.png" alt="star" className="w-5 float-left" />
                        <span>{data.rating}</span>
                    </div>
                    <img src={data.thumbnail} alt="itemImg" className="w-full h-2/3 object-contain border-b-4 border-[#8D72E1]" />
                    <h4 className="font-bold text-lg">{data.title.length > 18 ? data.title.slice(0,18) + "..." : data.title}</h4>
                    <p className="font-semibold">Rp.{(data.price * 15000) - ((data.price * 15000)*Math.ceil(data.discountPercentage)/100)},-</p>
                    <p className="text-sm text-slate-500"><span className="bg-red-300 rounded-sm px-1 font-semibold text-red-700">{Math.ceil(data.discountPercentage)}%</span> <span className="line-through">Rp.{data.price * 15000},- </span></p>
                    <p className="text-sm text-slate-500">Stock : {data.stock}</p>    
                </div>
            </Link>
            )
        })

        console.log(product)
    return (
        <>
        {card}
        </>
    )
}