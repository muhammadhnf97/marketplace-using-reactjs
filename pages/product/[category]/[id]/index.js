import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

export default function Detail(){
    const [item, setItem] = useState([])
    const [quantity, setQuantity] = useState(1)
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

    const handleClickinc = () => {
        setQuantity(prev=>prev+1)
    }
    
    const handleClickDec = () => {
        setQuantity(prev=>prev < 1 ? prev - 0 : prev)
    }

    const handleClickBuy = async (id) => {
        const res = await fetch('https://dummyjson.com/carts/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              merge: true, // this will include existing products in the cart
              products: [
                {
                  id: id,
                  quantity: quantity,
                },
              ]
            })
        })
        const data = await res.json()
        sessionStorage.setItem('userCart', JSON.stringify([data]))
        window.location.reload();
    }

    const view = item.map(data=>{
        return (
        <div key={data.id} className="my-5 flex">
            <div className="w-[500px] h-full flex flex-col border p-2 mr-3 rounded-lg">
                <div className="w-full h-[17rem] overflow-hidden mb-1 flex justify-items-center items-center">
                    <img src={data.thumbnail} alt="thumbnail" className="rounded-lg"/>
                </div>
                <div className="grid grid-cols-3 w-full gap-1">
                    {data.images!==undefined && data.images.map(imeg=>{
                        return(
                        <div key={nanoid()} className="w-full h-full flex-col flex justify-center p-1 rounded-lg border">
                            <img src={imeg} className="rounded-lg"/>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="border p-5 mx-3 rounded-lg">
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
            <div className="w-80 h-fit border ml-3 rounded-lg p-5">
                <p className="font-semibold text-lg mb-3">Atur jumlah</p>
                <div className="border border-[#b19eeb] hover:border-[#6C4AB6] rounded-lg flex justify-between overflow-hidden">
                    <button onClick={handleClickDec} className="bg-[#b19eeb] hover:bg-[#6C4AB6] w-16 text-white font-black text-2x ">-</button>
                    <span className="text-lg">{quantity}</span>
                    <button onClick={handleClickinc} className="bg-[#b19eeb] hover:bg-[#6C4AB6] w-16 text-white font-black text-2xl">+</button>
                </div>
                <p className="text-gray-400 text-sm">Min. pembelian 1 pcs</p>
                <button onClick={()=>handleClickBuy(data.id)} className="w-full rounded-lg my-5 bg-[#b19eeb] hover:bg-[#6C4AB6] h-10 text-lg font-semibold text-white">B e l i</button>
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
