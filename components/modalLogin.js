export default function ModalLogin({handleClickModalLogin, handleChangeUsername, handleChangePassword, handleSubmitLogin}){
    return(
        <div key={1} className="w-full h-full mx-auto text-center p-20 bg-black bg-opacity-70 fixed z-20">
            <button onClick={handleClickModalLogin} className="absolute w-full h-full top-0 right-0 -z-10"></button>
            <div className="w-96 h-fit border mx-auto my-32 rounded-lg shadow-md bg-white py-10 px-5 opacity-100">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text">Estock</h1>
                <p className="font-bold italic">"Your best place to buy stuff"</p>
                <div className="flex justify-between my-5 h-fit items-baseline">
                    <span className="text-2xl font-bold">Masuk</span>
                </div>
                <form onSubmit={(e)=>handleSubmitLogin(e)}>
                    <div className="text-left my-5">
                        <label htmlFor="username" className="font-semibold">Username
                            <input type="text" id="username" name="username" onChange={(e)=>handleChangeUsername(e)}  className="w-full h-10 px-3 rounded-lg border outline-none focus:border-[#6C4AB6]" />
                        </label>
                        <label htmlFor="password" className="font-semibold">Password
                            <input type="password" id="password" name="password" onChange={(e)=>handleChangePassword(e)}  className="w-full h-10 px-3 rounded-lg border outline-none focus:border-[#6C4AB6]" />
                        </label>
                    </div>
                    <div className="text-right my-5">
                        <input type="submit" value="Selanjutnya" className="w-full h-10 px-3 rounded-lg border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold" />
                    </div>
                </form>
            </div>
        </div>
    )
}