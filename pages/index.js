import { useEffect, useState } from "react"
import Carousel from "../components/carousel"
import ItemsCard from "../components/itemsCard"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [allItems, setAllItems] = useState([])
  const [menubar] = useState([
    {
      category : "smartphones", 
      icon : "smartphone.png"
    },
    {
      category : "laptops", 
      icon : "laptops.png"
    },
    {
      category : "fragrances", 
      icon : "parfume.png"
    },
    {
      category : "skincare", 
      icon : "skincare.png"
    },
    {
      category : "automotive", 
      icon : "otomotive.png"
    },
    {
      category : "motorcycle", 
      icon : "motorcycle.png"
    },
    {
      category : "groceries", 
      icon : "groceries.png"
    },
    {
      category : "lighting", 
      icon : "lamp.png"
    },
    {
      category : "furniture", 
      icon : "furnitures.png"
    },
  ])

  const getAllItems = async () => {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    setAllItems(data.products)
  }

  const menu = menubar.map(data=>{
    return (
      <Link key={data.category} href={`/product/${data.category}`}>
        <div className="h-16 w-16 my-5 flex flex-col justify-center items-center rounded-full group hover:-translate-y-3 duration-200 p-3 bg-white">
        <Image src={`/images/icons/${data.icon}`} width="64" height="64" />
        <span className="font-bold -bottom-4 absolute text-transparent -z-10 group-hover:text-white drop-shadow-2xl duration-200 group-hover:translate-y-1">{data.category}</span>
        </div>
      </Link>
    )
  })

  const simplyBackground = () => {
    return (
      <>
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] -z-10 absolute right-1/2"></div>
      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] -z-10 absolute left-96 -bottom-5"></div>
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] absolute left-3/4 -bottom-5"></div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] absolute right-24 top-5"></div>
      </>
      )
  }

  useEffect(()=>{
    getAllItems()
  }, [])

  const [electronitsFirstNumber, setElectronitsFirstNumber] = useState(0)
  const [yourBodyFirstNumber, setYourBodyFirstNumber] = useState(0)

  const getElectronics = allItems.filter(data => data.category === "smartphones" || data.category === "laptops").splice(electronitsFirstNumber,5)
  const getForYourBody = allItems.filter(data => data.category === "fragrances" || data.category === "skincare").splice(yourBodyFirstNumber,5)


  const handleNext = (a) => {
    if(a === 'electronics'){
    setElectronitsFirstNumber(prev=>prev < 5 ? prev+1 : prev+0)
    } else {
      setYourBodyFirstNumber(prev=>prev < 5 ? prev+1 : prev+0)
    }
  }
  
  const handleBefore = (a) => {
    if(a === 'electronics'){
      setElectronitsFirstNumber(prev=>prev > 0 ? prev-1 : prev+0)
    } else {
      setYourBodyFirstNumber(prev=>prev > 0 ? prev-1 : prev+0)
    }
  }

  console.log(electronitsFirstNumber)

  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <Carousel />
        <section className="my-16 relative px-5">
          <div className="w-[22rem] h-[24rem] absolute -top-6 left-0 rounded-tl-md rounded-bl-md rounded-tr-[15rem] rounded-br-[15rem] bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] -z-10"></div>
          {simplyBackground()}
          <h2 className="text-white font-semibold text-2xl italic">Electronics</h2>
          <div className="flex justify-center">
            <button onClick={()=>handleBefore('electronics')} className="shadow-md absolute left-5 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white hover:bg-[#e7dfff] duration-200 px-3 hover:px-1 hover:-translate-x-3 origin-right">
              <Image src="/images/left-icon.png" width="64" height="64"/>
            </button>
              <ItemsCard getDataItems={getElectronics} />
            <button onClick={()=>handleNext('electronics')} className="shadow-md absolute right-5 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-[#8D72E1] hover:bg-[#6C4AB6] duration-200 px-3 hover:px-1 hover:translate-x-3 origin-left">
              <Image src="/images/right-arrow.png" width="64" height="64"/>
            </button>
          </div>
        </section>
        <section className="mb-16 relative px-5">
          <div className="w-[22rem] h-[24rem] absolute -top-6 left-0 rounded-tl-md rounded-bl-md rounded-tr-[15rem] rounded-br-[15rem] bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] -z-10"></div>
          {simplyBackground()}
          <h2 className="text-white font-semibold text-2xl italic">For your body !</h2>
          <div className="flex justify-center">
            <button onClick={()=>handleBefore('foryourbody')} className="shadow-md absolute left-5 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white hover:bg-[#e7dfff] duration-200 px-3 hover:px-1 hover:-translate-x-3 origin-right">
              <Image src="/images/left-icon.png" width="64" height="64"/>
            </button>
              <ItemsCard getDataItems={getForYourBody} />
            <button onClick={()=>handleNext('foryourbody')} className="shadow-md absolute right-5 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-[#8D72E1] hover:bg-[#6C4AB6] duration-200 px-3 hover:px-1 hover:translate-x-3 origin-left">
              <Image src="/images/right-arrow.png" width="64" height="64"/>
            </button>
          </div>
        </section>
        <section className="border-t-4 border-[#6C4AB6] w-full py-2">
          <div className="grid grid-cols-9 w-full relative text-center justify-items-center bg-gradient-to-r from-[#6C4AB6] to-[#b19eeb] rounded-[5rem] my-3">
            {menu}
          </div>
          <div className="grid grid-cols-5 justify-items-center">
            <ItemsCard getDataItems={allItems} />
          </div>
        </section>
      </main>
    </div>
  )
  
}

