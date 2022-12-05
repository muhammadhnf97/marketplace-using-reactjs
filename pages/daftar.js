import Link from "next/link"

export default function Daftar(){
    return (
        <div className="max-w-7xl h-screen mx-auto flex flex-col text-center p-20">
            <h1 className="text-7xl font-bold bg-gradient-to-tr from-[#6C4AB6] to-[#8D9EFF] text-transparent bg-clip-text">Estock</h1>
            <p className="text-lg font-bold italic">"Best place to buy stuff"</p>
            <div className="flex w-full h-fit items-center justify-evenly p-10">
                <div className="flex flex-col">
                    <img src="./images/usagi.png" className="w-[450px] h-[450px]" />
                    <p className="font-bold text-2xl">Jual Beli Mudah Hanya di Estock</p>
                    <p className="">Gabung dan rasakan kemudahan bertransaksi di Estock</p>
                </div>
                <div className="w-96 h-full border rounded-lg shadow-md p-5 relative">
                    <h2 className="text-lg font-bold">Daftar Sekarang</h2>
                    <p>Sudah punya akun Estock? <Link href="/login"><span className="text-[#8D72E1] hover:text-[#6C4AB6]">Masuk</span></Link></p>
                    <form className="my-10 relative">
                        <div className="text-left my-10">
                            <label htmlFor="email" className="font-semibold">Nomor HP atau e-mail
                                <input type="text" className="w-full h-10 px-3 rounded-lg border outline-none focus:border-[#6C4AB6]" />
                                <span className="text-sm">Contoh: email@estock.com</span>
                            </label>
                        </div>
                        <div className="text-right my-10">
                            <Link href="/bantuan">
                            </Link>
                            <input type="submit" value="Daftar" className="w-full h-10 px-3 rounded-lg border-2 border-[#8D72E1] hover:border-[#6C4AB6] bg-[#8D72E1] hover:bg-[#6C4AB6] text-white font-semibold" />
                        </div>
                    </form>
                    <p className="text-sm text-[#8D72E1] hover:text-[#6C4AB6] absolute bottom-10 mx-5 transform -translate-x-2">Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta Kebijakan Privasi</p>
                </div>
            </div>
        </div>
    )
}