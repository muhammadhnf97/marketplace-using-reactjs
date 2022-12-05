import Link from "next/link";
import Cart from "./cart"
import { useEffect, useState } from "react";

export default function Navbar(){
    const [allCategory, setCategories] = useState([])
    const [categoryItems, setCategoryItems] = useState([])
    const [whatCategory, setWhatCategory] = useState([])
    const [search, setSearch] = useState('')
    const [hasilSearch, setHasilSearch] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState([])
    const [isSearch, setHiddenSearch] = useState(true)
    const [isKategori, setIsKategori] = useState(true)
    const [isLogin, setIsLogin] = useState(true)
    const [isProfil, setIsProfil] = useState(true)

    const getCategory = async () => {
        const res = await fetch('https://dummyjson.com/products/categories')
        const data = await res.json()
        setCategories(data)
      }

        

    const getCategoriesItems = async (category) => {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`)
        const data = await res.json()
        setCategoryItems(data.products.map(data=>{
                return {
                    title : data.title
                }
            })
        )
    }

    const style = {
        display : isKategori ? "none" : "block"
    }

    const handleViewCategory =() => {
        setIsKategori(prevIsKategori=> !prevIsKategori)
    }

    const handleClickCategoryItems = (data) => {
        setWhatCategory(data)
        getCategoriesItems(data)
    }

    const handleClickLogin = () => {
        setIsLogin(prevLogin=> !prevLogin)
    }

    const handleChangeSearchKey = (event) => {
        setSearch(event.target.value)
        setHiddenSearch(false)
    }

    const handleClickSearchHidden = () => {
        setHiddenSearch(prev=>!prev)
    }

    const getSearch = async () => {
        if(search.length > 1){
        const res = await fetch(`https://dummyjson.com/products/search?q=${search}`)
        const data = await res.json()
        setHasilSearch(data.products)
        }
    }

    useEffect(()=>{
        getSearch()
    }, [search])

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }
    
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // try {
        //     const res = await fetch('https://dummyjson.com/auth/login', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        
        //         username: username,
        //         password: password,
        //         })
        //     })
        //     if(!res.ok){
        //         throw Error('ID atau Password salah')
        //     } else {
        //         localStorage.setItem("userData", JSON.stringify(await res.json()))
        //         setUsername('')
        //         setPassword('')   
        //     }
        // } catch (error) {
        //     alert(error)
        // }
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
        
                username: username,
                password: password,
                })
            })
            .then(res=>{
                if(!res.ok){
                    throw Error ('ID atau Password salah !')
                } else {
                    return res.json()
                }
            })
            .then(data=>{
                localStorage.setItem("userData", JSON.stringify(data))
                setUser(JSON.parse(localStorage.getItem('userData')))   
                setIsProfil(prev=>!prev)
                setIsLogin(prev=>!prev)
                setUsername('')
                setPassword('')    
            }) 
            .catch(error =>{
                alert(error)
            })
    }
    
    useEffect(()=>{
        getCategory()
        getCategoriesItems()
        // setUser(JSON.parse(localStorage.getItem("userData")))
        // setIsProfil(false)
        // setIsLogin(prev=>!prev)
    },[])

    console.log(user)
    
    const handleClickLogout = () => {
        setIsProfil(prev=>!prev)
        localStorage.removeItem('userData')
    }

    const categories = allCategory.map(data=>{
        return (
            <span key={data} className="hover:text-[#6C4AB6] duration-200 cursor-pointer z-20" onClick={()=>handleClickCategoryItems(data)}>{data.toUpperCase().slice(0,1)}{data.slice(1)}</span>
        )
    })

    const viewItems = categoryItems.map(data=>{
        return (
            <span className="hover:text-[#6C4AB6] duration-200 cursor-pointer mx-5 h-fit border-white z-20">{data.title}</span>
        )
    })

    console.log(user)
    return (
        <>
            {!isLogin && <div className="w-full h-full mx-auto text-center p-20 bg-black bg-opacity-70 fixed z-20">
                <button className="absolute w-full h-full top-0 right-0 -z-10" onClick={handleClickLogin}></button>
                <div className="w-96 h-fit border mx-auto my-20 rounded-lg shadow-md bg-white py-10 px-5 opacity-100">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text">Estock</h1>
                    <p className="font-bold italic">"Your best place to buy stuff"</p>
                    <div className="flex justify-between my-5 h-fit items-baseline">
                        <span className="text-2xl font-bold">Masuk</span>
                        <Link href="/daftar" onClick={handleClickLogin}>
                            <span className="text-[#8D72E1] hover:text-[#6C4AB6] font-semibold">Daftar</span>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="text-left my-5">
                            <label htmlFor="username" className="font-semibold">Username
                                <input type="text" id="username" name="username" value={username} onChange={handleChangeUsername} className="w-full h-10 px-3 rounded-lg border outline-none focus:border-[#6C4AB6]" />
                            </label>
                            <label htmlFor="password" className="font-semibold">Password
                                <input type="password" id="password" name="password" value={password} onChange={handleChangePassword} className="w-full h-10 px-3 rounded-lg border outline-none focus:border-[#6C4AB6]" />
                            </label>
                        </div>
                        <div className="text-right my-5">
                            <input type="submit" value="Selanjutnya" className="w-full h-10 px-3 rounded-lg border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold" />
                        </div>
                    </form>
                </div>
            </div>}


{/* NAVBAR !! */}
            <div className="w-full h-24 shadow-md sticky top-0 z-10 bg-white">
                <div className="max-w-7xl h-full mx-auto items-center justify-between flex">
                    <Link href="/">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text">Estock</h1>
                    </Link>
                    <div className="w-full mx-10 rounded-md overflow-hidden flex border-[#8D72E1]">
                        <button className="bg-[#8D72E1] border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6] px-2 py-1 text-white font-semibold" onClick={handleViewCategory}>Kategori</button>
                        <input type="text" className="w-full border px-3 focus:border-[#8D72E1] outline-none duration-200" id="search" name="search"  onChange={handleChangeSearchKey}></input>
                        <button className="bg-[#8D72E1] px-2 py-1 border-2 border-[#8D72E1] hover:border-[#6C4AB6] hover:bg-[#6C4AB6]">
                            <img src="../../images/search.png" className="w-7"/>
                        </button>
                    </div>
                    <div className="flex w-96 h-full items-center justify-evenly">
                        <Cart />
{/* PROFIL */}
                        {isProfil && <div className="flex">
                            <button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold px-2 py-1 rounded-md mr-1" onClick={handleClickLogin}>Masuk</button>
                            <Link href="/daftar"><button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold px-2 py-1 rounded-md ml-1">Daftar</button></Link>
                        </div>}
                        {!isProfil && <div className="flex justify-between">
                            <div className="text-sm mx-2">
                                <p className="">Welcome</p>
                                <p className="font-semibold">{user.gender === 'male' ? "Mr" : "Mrs. "} {user.lastName} </p>
                            </div>
                            <button className="border-2 border-[#8D72E1] hover:border-[#6C4AB6] text-[#8D72E1] hover:text-[#6C4AB6] font-semibold px-2 py-1 rounded-md mx-2" onClick={handleClickLogout}>Logout</button>
                        </div>}
                    </div>
                </div>
            </div>


{/* KATEGORI ! */}
            <div className="w-full h-[80vh] absolute z-10 opacity-90 font-semibold" style={style}>
                <button className="absolute -z-10 w-full h-full" onClick={handleViewCategory}></button>
                <div className="bg-black">
                    <div className="max-w-7xl mx-auto text-white flex py-2">
                        <section className="border-r-2 border-white w-1/4 grid grid-cols-2 px-2">
                            {categories}
                        </section>
                        <section className="flex w-3/4 relative">
                            {viewItems}
                            <Link href={`/product/${whatCategory}`} className="absolute bottom-0 left-5" onClick={handleViewCategory} >
                                <span className="text-[#6C4AB6] hover:text-[#8D72E1] font-black">View More</span>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>


{/* PENCARIAN */}
            {!isSearch  && <div className="max-w-fit">
                <button className="absolute h-full transparent w-full z-10" onClick={handleClickSearchHidden}></button>
                <div className="max-h-96 w-[80rem] overflow-y-scroll absolute z-10 bg-white shadow-md px-5 py-3 left-1/2 transform -translate-x-1/2">
                {hasilSearch.map(data=>{
                    return (
                        <Link href={`/product/${data.category}/${data.id}`} onClick={handleClickSearchHidden}>
                        <div className="flex my-1 hover:bg-[#8D72E1] p-1">
                            <div className="w-14 h-14 overflow-hidden border p-1 rounded-lg">
                                <img src={data.thumbnail} />
                            </div>
                            <h1 className="mx-10 text-lg font-semibold self-center">{data.title}</h1>
                        </div>
                        </Link>
                        )
                    })}
                </div>
            </div>}
        </>
    )
}