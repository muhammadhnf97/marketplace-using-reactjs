import { useState } from "react"

export default function ModalLogin({userCart}){
    // const [userCart, setUserCart] = useState([])

    const getUserCart = async () => {

    }
    return(
        <div className='fixed w-[24rem] h-full bg-gradient-to-br from-[#6C4AB6] to-[#8D9EFF] z-10 right-0 py-28 px-5'>
            <h2 className="text-lg font-bold text-white">KERANJANG</h2>
            {userCart.map(data=>{
                return data.products.map(data=>{
                    return (
                        <div className="flex border p-2 rounded-2xl my-2 ">
                            <div className="text-white w-2/3">
                                <h1 className="font-semibold text-lg">{data.title}</h1>
                                <p>Rp.{(data.price * 15000) - ((data.price * 15000)*Math.ceil(data.discountPercentage)/100)},-</p>
                            </div>
                            <div className="w-1/3 text-center">
                                <p className="font-bold text-3xl text-white">{data.quantity}</p>
                            </div>
                        </div>
                    )
                })
            })}
            {userCart.map(data=>{
                return(
                    <p className="text-white text-xl font-semibold">Total Belanja : Rp. {data.total * 15000} ,-</p>
                )
            })}
        </div>
    )
}