import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock, User, Mail } from "lucide-react"

export default function Register() {
    const {register} = useContext(AuthContext)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            await register(name, email, password)
            navigate("/")
        }catch(err){
            setError(err.response?.data?.message || "Registration Failed")
        }
    }
  return (
    <div className="min-h-screen bg-linear-to-b
    from-[#faf6ef] to-[#f0e5d2] flex flex-col items-center justify-center pt-24 pb-10 p-6">
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.7}}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#C9A86A]/30
        rounded-3xl shadow-2xl p-10">
            <div className="flex flex-col items-center mb-8">
                <div className="p-4 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/30 mb-3">
                <Lock size={36} className="text-[#C9A86A]"/>

                </div>

                <h1 className="text-3xl font-bold text-neutral-900">Create Your Account</h1>

                <p className="text-neutral-600 mt-2 text-center">
                    Register to access the Dashboard 
                </p>
                 
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>

                    <label className="text-neutral-800 font-medium">Name</label>

                    <div className="flex items-center border border-neutral-300 rounded-xl p-2
                    bg-white shadow-sm focus-within:border-[#C9A86A] transition">

                        <User size={20} className="text-[#C9A86A] mr-2"/>

                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
                        required className="w-full outline-none p-2 bg-transparent"
                        placeholder="YourName" />

                    </div>
                </motion.div>

                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>

                    <label className="text-neutral-800 font-medium">Email</label>

                    <div className="flex items-center border border-neutral-300 rounded-xl p-2
                    bg-white shadow-sm focus-within:border-[#C9A86A] transition">

                        <User size={20} className="text-[#C9A86A] mr-2"/>

                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                        required className="w-full outline-none p-2 bg-transparent"
                        placeholder="you@example.com" />

                    </div>
                </motion.div>


                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>

                    <label className="text-neutral-800 font-medium">Password</label>

                    <div className="flex items-center border border-neutral-300 rounded-xl p-2
                    bg-white shadow-sm focus-within:border-[#C9A86A] transition">

                        <Lock size={20} className="text-[#C9A86A] mr-2"/>

                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        required className="w-full outline-none p-2 bg-transparent"
                        placeholder="*************" />

                    </div>
                </motion.div>

                {error &&(
                    <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 text-sm">
                        {error}
                    </motion.p>
                )}

                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} type="submit"
                className="mt-4 py-3 bg-[#C9A86A] text-white font-semibold rounded-xl shadow-lg
                hover:bg-[#b8965f] transition text-lg">
                    Register
                </motion.button>

            </form>

            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mt-8 text-center
            text-neutral-600 text-sm">
                © 2025 POS System

            </motion.div>
        </motion.div>

        
      
    </div>
  )
}


