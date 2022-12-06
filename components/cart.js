export default function Cart({handleMouseEnter, handleMouseLeave, handleClickCart, isImageCart}){
    return (
        <div className="w-fit h-fit">
            <img src={`../../images/icons/${isImageCart ? "cart-1.png" : "cart-2.png"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickCart} className="w-14"/>
        </div>
    )
}