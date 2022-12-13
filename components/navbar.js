import ModalLogin from './ModalLogin'
import ModalCart from './ModalCart'
import Cart from './Cart'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'


export default function Navbar (){
    const [allCategory, setCategories] = useState([])
    const [categoryItems, setCategoryItems] = useState([])
    const [thisCategory, setThisCategory] = useState([])
    const [searchKeyword, setSearchKeyword ] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [userCart, setUserCart] = useState([])
    const [isImageCart, setImageCart] = useState(true)
    const [isModalCart, setIsModalCart] = useState(true)
    const [isKategori, setIsKategori] = useState(true)
    const [isSearch, setIsSearch] = useState(true)
    const [isModalLogin, setIsModalLogin] = useState(true)
    const [isLogin, setIsLogin] = useState(true)

    const getCategory = async () => {
        const res = await fetch('https://dummyjson.com/products/categories')
        const data = await res.json()
        setCategories(data)
    }

    const getCategoriesItems = async (category="smartphones") => {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`)
        const data = await res.json()
        setCategoryItems(data.products.map(item=>{
            return {
                id : item.id,
                title : item.title,
                category : item.category
            }
        }))
    }

    const getSearch = async () => {
        if(searchKeyword.length > 1){
        const res = await fetch(`https://dummyjson.com/products/search?q=${searchKeyword}`)
        const data = await res.json()
        setSearchResult(data.products.map(item=>{
            return {
                id : item.id,
                title : item.title,
                image : item.thumbnail
            }
        }))
        }
    }

    const getUser = async () => {
        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
        
                username: username,
                password: password,
                })
            })
            if(!res.ok){
                throw Error('Username atau Password Salah')
            } else {
                const data = await res.json()
                localStorage.setItem('currentUser', JSON.stringify(data))
                window.location.reload();
            }
            
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        getSearch()
        if(searchKeyword.length <= 1){
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
    }, [searchKeyword])
    
    useEffect(()=>{
        getCategory()
        getCategoriesItems()
        if(localStorage.getItem('currentUser') !== null ){
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
            setIsLogin(false)
        }
        if(sessionStorage.getItem('userCart') !== null){
            setUserCart(JSON.parse(sessionStorage.getItem('userCart')))
        }
    },[])

    const handleMouseEnter = () => {
        setImageCart(prev=>!prev)
    }
    const handleMouseLeave = () => {
        setImageCart(prev=>!prev)
    }
    const handleClickCart = () => {
        setIsModalCart(prev=>!prev)
    }

    const handleClickKategori = () => {
        setIsKategori(prev=>!prev)
    }

    const handleClickCategoriesItem = (data) => {
        getCategoriesItems(data)
        setThisCategory(data)
    }

    const handleClickSearch = () => {
        setIsSearch(prev=>!prev)
    }
    
    const handleChangeSearch = (e) => {
        setSearchKeyword(e.target.value)
    } 

    const handleClickModalLogin = () => {
        setIsModalLogin(prev=>!prev)
    }

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        getUser()
    }

    const handleClickLogout = () => {
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('userCart')
        setIsLogin(prev=>!prev)
        window.location.reload();
    }

    return (
        <>
        {!isModalLogin && <ModalLogin 
        handleClickModalLogin={handleClickModalLogin}
        handleChangeUsername={handleChangeUsername}
        handleChangePassword={handleChangePassword}
        handleSubmitLogin={handleSubmitLogin}
         />}
        {!isModalCart && <div className='relative z-20'><ModalCart 
        userCart={userCart}
        handleClickCart={handleClickCart}/></div>}
        <div className='w-full h-20 md:h-24 shadow-md sticky top-0 z-20 bg-white px-2'>
            <div className='md:max-w-7xl w-full h-full mx-auto items-center justify-between flex'>
                <Link href="/">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text md:mr-5">Estock</h1>
                </Link>
                <div className="w-full ml-5 md:mx-5 rounded-md overflow-hidden flex border-[#8D72E1] h-8 md:h-fit">
                    <button onClick={handleClickKategori} className="bg-[#8D72E1] border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6] md:px-2 md:py-1 text-white font-semibold md:text-base text-xs px-2">Kategori</button>
                    <input type="text" onChange={(e)=>handleChangeSearch(e)} id="search" name="search" className="w-full border px-2 md:px-3 focus:border-[#8D72E1] outline-none duration-200"></input>
                    <button onClick={handleClickSearch} className="bg-[#8D72E1] px-2 md:px-2 md:py-1 border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6]">
                        <Image src="/images/search.png" alt="icon-search" width={40} height={40} className="w-10"/>
                    </button>
                </div>
                <div className='hidden md:block'>
                <Cart
                isImageCart={isImageCart}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleClickCart={handleClickCart} />
                </div>
                <div className='hidden md:block'>
                    {isLogin && <div className="flex md:ml-5">
                        <button onClick={handleClickModalLogin} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold md:px-2 md:py-1 rounded-md mr-1 text-sm md:text-base p-1">Masuk</button>
                        <Link href="/daftar">
                            <button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold md:px-2 md:py-1 rounded-md md:ml-1 text-sm md:text-base p-1">Daftar</button>
                        </Link>
                    </div>}
                    {!isLogin && <div className="flex md:ml-5">
                        <div className="text-sm w-fit">
                            <span className="md:text-base text-xs">{currentUser.gender === "male" ? "Mr." : "Mrs."}</span>
                            <p className="font-semibold md:text-base text-xs">{currentUser.lastName}</p>
                        </div>
                        <button onClick={handleClickLogout} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold p-1 md:px-2 md:py-1 rounded-md ml-2 text-sm md:text-base" >Logout</button>
                    </div>}
                </div>
            </div>
            {!isKategori && <div className='absolute w-full h-screen left-0'>
                <button className='absolute w-full h-full' onClick={handleClickKategori}></button>
                <div className='absolute md:w-[70rem] h-fit bg-black opacity-90 top-0 left-1/2 transform -translate-x-1/2 p-2 md:p-5 flex md:flex-row flex-col'>
                    <section className="border-b-2 md:border-r-2 border-white w-[20rem] grid grid-cols-2 px-2 mx-auto pb-5 md:pb-0 md:border-b-0">
                        {allCategory.map(data=>{
                            return (
                            <span key={data} className="text-white hover:text-[#6C4AB6] duration-200 cursor-pointer z-20" onClick={()=>handleClickCategoriesItem(data)}>{data.toUpperCase().slice(0,1)}{data.slice(1)}</span>
                            )
                        })}
                    </section>
                    <section className='w-full md:w-[50rem] grid grid-cols-2 gap-2 px-5 h-fit items-center mt-5 mb-10 md:my-0'>
                        {categoryItems.map(data=>{
                            return (
                                <Link key={data.id} href={`/product/${data.category}/${data.id}`} className="md:border-b group grid grid-cols-2 md:grid-cols-none  md:w-full">
                                <span className='text-white group-hover:text-[#6C4AB6] duration-200' onClick={handleClickKategori}>{data.title}</span>
                                </Link>
                            )
                        }).splice(0,5)}
                        <Link href={`/product/${thisCategory !== null ? thisCategory : 'smartphones'} `} onClick={handleClickKategori} className="absolute bottom-5" >
                            <span className="text-[#6C4AB6] hover:text-[#8D72E1] font-black">View More</span>
                        </Link>
                    </section>
                </div>
            </div>}
            {!isSearch && <div className='absolute w-full h-screen'>
            <button className='absolute w-full h-full' onClick={handleClickSearch}></button>
            <div className='absolute w-80 md:w-[70rem] h-[15rem] bg-white top-0 left-1/2 transform -translate-x-1/2 px-5 flex-col overflow-y-scroll shadow-md border-b'>
            {searchResult.map(data=>{
                return (
                    <Link key={data.id} href={`/product/${data.category}/${data.id}`}>
                    <div className='flex my-1 hover:bg-[#8D72E1] p-1 overflow-hidden'>
                        <div className='w-14 h-14  border p-1 rounded-md'>
                            <Image src={data.image} alt="img-search" width={56} height={56} />
                        </div>
                        <p className='mx-10 text-lg font-semibold self-center'>{data.title}</p>
                    </div>
                    </Link>
                )
            })}
            </div>
            </div>}
        </div>
        <div className='h-fit w-full border fixed bottom-0 z-30 bg-white shadow-md items-center grid grid-cols-3 justify-around px-10 md:hidden py-1' >
            <Link href="/">
                <Image src={"/images/icons/home.png"} alt={"image"} width={40} height={40} />
            </Link>
            <div className='block'>
                <Cart
                isImageCart={isImageCart}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleClickCart={handleClickCart} />
            </div>
            <div className='block h-fit w-fit'>
                {isLogin && <div className="flex">
                    <button onClick={handleClickModalLogin} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold rounded-md mr-1 text-sm p-1">Masuk</button>
                    <Link href="/daftar">
                        <button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold rounded-md text-sm p-1">Daftar</button>
                    </Link>
                </div>}
                {!isLogin && <div className="flex p-1">
                    <div className="text-sm w-fit">
                        <span className="text-xs">{currentUser.gender === "male" ? "Mr." : "Mrs."}</span>
                        <p className="font-semibold text-xs">{currentUser.lastName}</p>
                    </div>
                    <button onClick={handleClickLogout} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold p-1 md:px-2 md:py-1 rounded-md ml-2 text-sm md:text-base" >Logout</button>
                </div>}
            </div>
        </div>
        </>
    )
}