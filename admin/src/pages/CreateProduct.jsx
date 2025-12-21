import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"
import { FiPackage, FiPlusCircle } from "react-icons/fi"
import { motion } from "framer-motion"

const CreateProduct = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [qty, setQty] = useState("")

  const nav = useNavigate()

  const submit = async(e)=>{
    e.preventDefault()
    await API.post("/products", {name, price, qty})
    nav("/products")
  }
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-linear-to-b from-[#faf6ef] to-[#e8ddc9] p-6">

      <motion.div initial={{opacity:0 ,y:-25}} animate={{opacity:1, y:0}}
      transition={{duration:0.55}} className="w-full max-w-lg bg-white/90 backdrop-blur-xl p-10
      rounded-3xl shadow-2xl border border-[#C9A86A]/30">
        <div className="flex justify-center mb-5">
          <FiPackage size={42} className="text-[#C9A86A]"/>

        </div>

        <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">
          Add a new Product
        </h2>

        <form onSubmit={submit} className="flex flex-col gap-5">

          <div>
            <label className="text-neutral-700 font-medium">Product Name</label>

            <input className="w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all
            outline-none" placeholder="example: Pepsi 330ml"
            value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>

          <div>
            <label className="text-neutral-700 font-medium">Price($)</label>

            <input className="w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all
            outline-none" placeholder="example: 1.50"
            value={price} onChange={(e)=>setPrice(e.target.value)}
            type="number"
            step="0.01"/>
          </div>

          <div>
            <label className="text-neutral-700 font-medium">Quantity</label>

            <input className="w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all
            outline-none" placeholder="example: 24"
            value={qty} onChange={(e)=>setQty(e.target.value)}/>
          </div>

          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.96}}
          className="bg-[#C9A86A] text-white py-3 rounded-xl flex
          items-center justify-center gap-2 font-semibold shadow-lg
          hover:shadow-xl transition-all">
            <FiPlusCircle size={20}/>
            Add Product

          </motion.button>
        </form>

      </motion.div>
      
    </div>
  )
}

export default CreateProduct
