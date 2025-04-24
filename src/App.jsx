import { useState } from 'react'
import './App.css'

import Skeleton from '@mui/material/Skeleton';

import { notify } from './utils/notify';

function App() {
   const [inputValue, setInputValue] = useState("")
   const [userData, setUserData] = useState({ name: '', bio: '', profile: '' })
   const [userFetched, setUserFetched] = useState(false)
   const [fetchError, setFetchError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   async function buscarPerfil() {

      if(typeof inputValue !== 'string' || inputValue === "") {
         return
      }

      setIsLoading(true)

      const res = await fetch(`https://api.github.com/users/${inputValue}`)

      if (!res.ok) {
         setFetchError(true)
         setIsLoading(false)

         if(res.status === 403) {

            const errorBody = await res.json()

            if(errorBody.message.includes('API rate limit exceeded')) {

               notify('error', `A API pública do Github atingiu o total de requisições por hora!`)
               return
            }
         }

         notify('error', `Usuário ${inputValue} não encontrado!`)
         return
      }

      const data = await res.json()
      
      setUserData({ name: data.name, bio: data.bio, profile: data.avatar_url })

      setUserFetched(true)
      setFetchError(false)
      setIsLoading(false)

      notify('success', `Usuário ${inputValue} encontrado com sucesso!`)
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

                  { 
                     isLoading ?
                     <Skeleton variant="circular" width={200} height={200} style={{ flexShrink: 0 }} />
                     :
                     <img src={userData.profile} alt="foto do usuário" />
                  }


                  <div className="usuario-card__info-area">

                  { 
                     isLoading ?
                     <Skeleton variant="text" width="70%" height={30} style={{ flexShrink: 0 }} />
                     :
                     <h2>{ userData.name }</h2>
                  }

                  { 
                     isLoading ?
                     <Skeleton variant="text" width="100%" height={150} style={{ flexShrink: 0 }} />
                     :
                     <p>
                        { userData.bio }
                     </p>
                  }

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
