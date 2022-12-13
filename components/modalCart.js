import Image from "next/image"

export default function ModalLogin({userCart, handleClickCart}){
    const handleClickTutup = () => {
        handleClickCart()
    }

    return(
        <div key={1} className='fixed w-[24rem] h-full bg-gradient-to-br from-[#6C4AB6] to-[#8D9EFF] z-10 right-0 py-28 px-5'>
            <h2 className="text-lg font-bold text-white">KERANJANG</h2>
            <div className="h-[30rem] overflow-y-scroll px-2 border-b-4 border-white mb-5">
            {userCart.map(data=>{
            return (
                <div key={data.id} className="flex border p-2 rounded-2xl my-2">
                    <div className="text-white w-3/5">
                        <p className="font-semibold">{data.title}</p>
                        <p>Rp. {(data.price * 15000) - ((data.price * 15000)*Math.ceil(data.discountPercentage)/100)},-</p>
                    </div>
                    <div className="w-2/5 text-center border-l-2">
                        <p className="font-semibold text-white">Jumlah beli</p>
                        <p className="font-bold text-white">{data.quantity}</p>
                    </div>
                </div>
            )
            })}
            </div>
            <p className="text-white text-xl font-semibold">Total Belanja : Rp. {userCart.reduce((prev, current)=>{
                return prev + (current.price * 15000)
            }, 0)}</p>

            
            <button onClick={handleClickTutup} className="shadow-md absolute left-1/2 -translate-x-1/2 md:left-10 md:transform-none bottom-20 transform md:-translate-y-1/2 z-10 w-fit h-fit md:h-16 rounded-full bg-white hover:bg-[#e7dfff] duration-200 px-3 hover:px-1 hover:-translate-y-3  md:hover:-translate-x-3 origin-right">
                <div className="flex">
                    <Image src="/images/left-icon.png" alt="left-icon" width={64} height={64} className="w-10 md:w-16 tranform md:transform-none -rotate-90 md:rotate-0" />
                    <span className="hidden md:block text-lg md:text-2xl text-[#6C4AB6] font-semibold self-center mx-5">T u t u p</span>
                </div>
            </button>
        </div>
    )
}