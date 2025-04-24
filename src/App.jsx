import { useState } from 'react'
import './App.css'

function App() {
   const [inputValue, setInputValue] = useState("")
   const [userData, setUserData] = useState({ name: '', bio: '', profile: '' })
   const [userFetched, setUserFetched] = useState(false)
   const [fetchError, setFetchError] = useState(false)

   async function buscarPerfil() {
      setFetchError(false)

      const res = await fetch(`https://api.github.com/users/${inputValue}`)

      if (!res.ok) {
         setFetchError(true)
         setUserFetched(false)
         return
      }

      const data = await res.json()
      
      setUserData({ name: data.name, bio: data.bio, profile: data.avatar_url })
      setUserFetched(true)
      setFetchError(false)
   }

   return (
      <>
         <div className="content-wrapper">

            <div class="brilho-esquerda"></div>
            <div class="brilho-direita"></div>

            <article className='github-card'>

               <img className='github-logo' src="/logo.svg" alt="logo" />

               <div className="input-wrapper">

                  <input 
                     type="text" 
                     placeholder='Digite um usuário do Github' 
                     onChange={(e) => setInputValue(e.currentTarget.value)}
                     onKeyDown={(e) => e.key === 'Enter' && buscarPerfil()}
                     value={inputValue}
                  />

                  <button onClick={buscarPerfil}> <img src="/icone-lupa.svg" alt="ícone de lupa" /> </button>

               </div>

               <section className="usuario-card" style={{ display: userFetched && !fetchError ? 'flex' : 'none' }}>

                  <img src={userData.profile} alt="foto do usuário" />

                  <div className="usuario-card__info-area">

                     <h2>{ userData.name }</h2>

                     <p>
                        { userData.bio }
                     </p>

                  </div>

               </section>

               <section className="sem-usuario" style={{ display: fetchError ? 'block' : 'none' }}>
                  <p>Nenhum perfil foi encontrado com esse nome de usuário.</p>
                  <p>Tente novamente</p>
               </section>

            </article>

         </div>
      </>
   )
}

export default App
