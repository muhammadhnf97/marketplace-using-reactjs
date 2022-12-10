import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Image from "next/image"

export default function Detail(){
    const [item, setItemm] = useState([])
    const [buyed, setBuyed] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [isBeli, setIsBeli] = useState(false)
    const router = useRouter()
    const query = router.query.id
    
    useEffect(()=>{
        if(query!==undefined || query!==null){
            fetch(`https://dummyjson.com/products/${query}`)
            .then(res=>res.json())
            .then(data=>setItemm(data))
        }
    }, [router.query])

    const handleClickinc = () => {
        setQuantity(prev=>prev+1)
    }
    
    const handleClickDec = () => {
        setQuantity(prev=>prev > 1 ? prev - 1 : prev)
    }

    const handleClickBuy = () => {
        if(buyed !== null) {
            setBuyed( prevBuyed => {
                return [
                    ...prevBuyed,
                    {
                    id : item.id,
                    title : item.title,
                    price : item.price,
                    quantity : quantity,
                    discountPercentage : item.discountPercentage
                    }
                ]
            })
        } else {
            setBuyed( () => {
                return [
                    {
                    id : item.id,
                    title : item.title,
                    price : item.price,
                    quantity : quantity,
                    discountPercentage : item.discountPercentage
                    }
                ]
            })

        }
        window.location.reload();
        
    }
    useEffect(()=>{
        if(buyed !== null){
            sessionStorage.setItem('userCart', JSON.stringify(buyed))
        }
    }, [buyed])

    useEffect(()=>{
        if(localStorage.getItem('currentUser') !== null){
            setIsBeli(prev=>!prev)
        }
        if(buyed === null){
            setBuyed(JSON.parse(sessionStorage.getItem('userCart')))
        }
    }, [])

    return (
        <>
        <div className="max-w-7xl mx-auto">
        <div key={item.id} className="my-5 flex">
            <div className="w-[500px] h-full flex flex-col border p-2 mr-3 rounded-lg">
                <div className="w-full h-[17rem] overflow-hidden mb-1 flex justify-items-center items-center relative">
                    <Image src={item.thumbnail} alt="img" fill className="rounded-lg relative"/>
                </div>
                <div className="grid grid-cols-3 w-full gap-1">
                    {item.images!==undefined && item.images.map(imeg=>{
                        return(
                        <div key={nanoid()} className="w-full h-full flex-col flex justify-center p-1 rounded-lg border">
                            <div className="w-full relative">
                            <Image src={imeg} alt="img" width={100} height={100}/>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="border p-5 mx-3 rounded-lg">
                <h1 className="font-bold text-2xl">{item.title}</h1>
                <div className="flex gap-5">
                    <div className="flex mb-3">
                        <picture>
                            <img src="../../images/star.png" className="h-5 w-5"/>
                        </picture>
                        <span>{item.rating}</span>
                    </div>
                    <div className="flex mb-3">
                        <span>Stok tersisa : {item.stock}</span>
                    </div>
                </div>
                <p className="font-semibold my-2">{item.brand}</p>
                <p className="text-3xl font-bold">Rp.{(item.price * 15000) - ((item.price * 15000)*Math.ceil(item.discountPercentage)/100)},-</p>
                <p className="text-sm text-slate-500"><span className="bg-red-300 rounded-sm px-1 font-semibold text-red-700">{Math.ceil(item.discountPercentage)}%</span> <span className="line-through">Rp.{item.price * 15000},- </span></p>
                <p>{item.description}</p>
            </div>
            <div className="w-80 h-fit border ml-3 rounded-lg p-5">
                <p className="font-semibold text-lg mb-3">Atur jumlah</p>
                <div className="border border-[#b19eeb] hover:border-[#6C4AB6] rounded-lg flex justify-between overflow-hidden">
                    <button onClick={handleClickDec} className="bg-[#b19eeb] hover:bg-[#6C4AB6] w-16 text-white font-black text-2x ">-</button>
                    <span className="text-lg">{quantity}</span>
                    <button onClick={handleClickinc} className="bg-[#b19eeb] hover:bg-[#6C4AB6] w-16 text-white font-black text-2xl">+</button>
                </div>
                <p className="text-gray-400 text-sm">Min. pembelian 1 pcs</p>
                <button type="button" onClick={()=>handleClickBuy(item.id)} className="w-full rounded-lg my-5 bg-[#b19eeb] hover:bg-[#6C4AB6] h-10 text-lg font-semibold text-white" disabled={isBeli ? false : true}>B e l i</button>
            </div>
        </div>
        </div>
        </>
    )
}
