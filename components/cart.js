import Image from "next/image"
export default function Cart({handleMouseEnter, handleMouseLeave, handleClickCart, isImageCart}){
    return (
        <div className="w-fit h-fit">
            <Image src={`/images/icons/${isImageCart ? "cart-1.png" : "cart-2.png"}`} width={40} height={40}
            alt="cart-img"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleClickCart} 
            className="w-10 md:w-14"/>
        </div>
    )
}