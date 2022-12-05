import ModalLogin from './modalLogin'
import ModalCart from './modalCart'
import Cart from './cart'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'


export default function Navbar (){
    const [allCategory, setCategories] = useState([])
    const [categoryItems, setCategoryItems] = useState([])
    const [thisCategory, setThisCategory] = useState(null)
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
                setCurrentUser(data)
            }
            
        } catch (error) {
            alert(error)
        }
    }
    const getUserCart = async () => {
        const res = await fetch(`https://dummyjson.com/carts/user/${currentUser.id}`)
        const data = await res.json()
        setUserCart(data.carts)
    }

    useEffect(()=>{
        getSearch()
        if(searchKeyword.length <= 1){
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
    }, [searchKeyword])
    console.log(userCart)
    useEffect(()=>{
        getCategory()
        getCategoriesItems()
        if(localStorage.getItem('currentUser') !== null){
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
        }
    },[])

    useEffect(()=>{
        setIsLogin(prev=>!prev)
        if(currentUser !== null){
            getUserCart()
        }
    },[currentUser])
    
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
        handleClickModalLogin()
        getUser()

    }

    const handleClickLogout = () => {
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
        setUserCart([])
        // setIsLogin(prev=>!prev)
    }
    

    return (
        <>
        {!isModalLogin && <ModalLogin 
        handleClickModalLogin={handleClickModalLogin}
        handleChangeUsername={handleChangeUsername}
        handleChangePassword={handleChangePassword}
        handleSubmitLogin={handleSubmitLogin}
         />}
        {!isModalCart && <ModalCart userCart={userCart}/>}
        <div className='w-full h-24 shadow-md sticky top-0 z-10 bg-white'>
            <div className='max-w-7xl h-full mx-auto items-center justify-between flex'>
                <Link href="/">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text mr-5">Estock</h1>
                </Link>
                <div className="w-full mx-5 rounded-md overflow-hidden flex border-[#8D72E1]">
                    <button onClick={handleClickKategori} className="bg-[#8D72E1] border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6] px-2 py-1 text-white font-semibold">Kategori</button>
                    <input type="text" onChange={(e)=>handleChangeSearch(e)} id="search" name="search" className="w-full border px-3 focus:border-[#8D72E1] outline-none duration-200"></input>
                    <button onClick={handleClickSearch} className="bg-[#8D72E1] px-2 py-1 border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6]">
                        <img src="../../images/search.png" className="w-7"/>
                    </button>
                </div>
                <Cart
                isImageCart={isImageCart}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleClickCart={handleClickCart} />
                {isLogin && <div className="flex ml-5">
                    <button onClick={handleClickModalLogin} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold px-2 py-1 rounded-md mr-1">Masuk</button>
                    <Link href="/daftar"><button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold px-2 py-1 rounded-md ml-1">Daftar</button></Link>
                </div>}
                {!isLogin && <div className="flex ml-5 justify-between">
                    <div className="text-sm mx-2">
                        <p className="">Welcome</p>
                        <p className="font-semibold">{currentUser!==null ? currentUser.lastName : ''}  </p>
                    </div>
                    <button onClick={handleClickLogout} className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold px-2 py-1 rounded-md mx-2" >Logout</button>
                </div>}
                
            </div>
            {!isKategori && <div className='absolute w-full h-screen'>
                <button className='absolute w-full h-full' onClick={handleClickKategori}></button>
                <div className='absolute w-[70rem] h-fit bg-black opacity-90 top-0 left-1/2 transform -translate-x-1/2 p-5 flex'>
                    <section className="border-r-2 border-white w-[20rem] grid grid-cols-2 px-2">
                        {allCategory.map(data=>{
                            return (
                            <span key={data} className="text-white hover:text-[#6C4AB6] duration-200 cursor-pointer z-20" onClick={()=>handleClickCategoriesItem(data)}>{data.toUpperCase().slice(0,1)}{data.slice(1)}</span>
                            )
                        })}
                    </section>
                    <section className='w-[50rem] grid grid-cols-2 gap-2 px-5 h-fit'>
                        {categoryItems.map(data=>{
                            return (
                                <Link key={data.id} href={`/product/${data.category}/${data.id}`} className="border-b group">
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
            <div className='absolute w-[70rem] h-[15rem] bg-white top-0 left-1/2 transform -translate-x-1/2 px-5 flex-col overflow-y-scroll shadow-md border-b'>
            {searchResult.map(data=>{
                return (
                    <Link key={data.id} href={`/product/${data.category}/${data.id}`}>
                    <div className='flex my-1 hover:bg-[#8D72E1] p-1 overflow-hidden'>
                        <div className='w-14 h-14  border p-1 rounded-md'>
                            <img src={data.image} />
                        </div>
                        <p className='mx-10 text-lg font-semibold self-center'>{data.title}</p>
                    </div>
                    </Link>
                )
            })}
            </div>
            </div>}
        </div>
        </>
    )
}