import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function ItemsCard(props){
    const [product] = useState(true)
    const card = props.getDataItems.map(data=>{
        return (
            <Link key={data.id} href={`/product/${data.category}/${data.id}`} >
                <div className="w-44 h-64 md:w-56 md:h-72 my-2 rounded-lg mx-1 md:mr-2 bg-white p-2 shadow-md relative border">
                    <div className="absolute w-fit p-1 rounded-lg bg-white shadow-md top-2 left-2 z-10">
                        <Image src="/images/star.png" alt="star" width={20} height={20} className="w-5 float-left" />
                        <span className="text-xs md:text-base">{data.rating}</span>
                    </div>
                    <div className="w-full h-2/3 relative">
                        <Image src={data.thumbnail} alt="itemImg" fill className="object-contain absolute" />
                    </div>
                    <h4 className="font-bold text-sm md:text-lg">{data.title.length > 18 ? data.title.slice(0,18) + "..." : data.title}</h4>
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
