'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function Loginpage(){
    const [login, SetLogin] = useState("");
    const [password, Setpassword] = useState("");
    const [error, SetError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página
    SetError(""); // Limpa erros antigos

    // É aqui que a "ponte" com o backend é chamada
    const result = await signIn('credentials', {
      login,
      password,
      redirect: false, // Importante!
    });

    if (result?.error) {
      // Se deu erro, atualiza a memória de erro
      SetError("Credenciais inválidas. Tente novamente.");
    } else {
      // Se deu certo, redireciona para a home
      router.push('/home');
    }
    };
    return(
        <div className="flex flex-col min-h-screen bg-[#1d1d1d] text-white font-sans">

            <header className="text-center text-6xl pt-12 tracking-wide font-serif" >Lucas Manoel</header>

            <main  className="flex flex-1 justify-center items-center">
                <div>
                    <form onSubmit={handleLogin} className="w-[390px] p-10 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.306)] hover:scale-[1.1] transition-transform duration-700">
                        <div  className="mb-4">
                            <label htmlFor="Login"  className="block mb-2">E-mail or name</label>
                            <input type="text" value={login} id="login"
                                   onChange={(e) => SetLogin(e.target.value)}
                                   required placeholder="user@example.com"
                                   className="w-full p-3 mb-2 rounded-md bg-white/5 text-white placeholder-gray-300
                                   focus:outline-none focus:bg-black/25 focus:shadow-[0_0_8px_rgba(255,255,255,0.306)]"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2">Password</label>
                            <input id="password" type="password" value={password} 
                                   onChange={(e) => Setpassword(e.target.value)} required placeholder="••••••••"
                                   className="w-full p-3 mb-2 rounded-md bg-white/5 text-white placeholder-gray-300
                                   focus:outline-none focus:bg-black/25 focus:shadow-[0_0_8px_rgba(255,255,255,0.306)]"/>
                        </div>
                        {/* Mostra a mensagem de erro se a "memória" de erro não estiver vazia */}
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <button type="submit" className="w-full p-3 mt-5 rounded-md bg-white/90 text-black 
                                   hover:bg-black/25 hover:text-white hover:shadow-[0_0_8px_rgba(255,255,255,0.306)]
                                   transition-all duration-300">Spy</button>
                    </form>
                </div>
            </main>

                <footer  className="bg-black/5 py-12 text-center">
                    <a href="https://www.instagram.com/zzlucca_/" target="_blank"  className="text-white text-3xl mx-10"><i className="fab fa-instagram"></i></a>
                    <a href="https://github.com/Luccas-Manoel" target="_blank"  className="text-white text-3xl mx-10"><i className="fab fa-github"></i></a>
                    <a href="https://x.com/Devlucaszz" target="_blank"  className="text-white text-3xl mx-10"><i className="fab fa-x-twitter"></i></a>
                </footer>   
        </div>
    )
}
