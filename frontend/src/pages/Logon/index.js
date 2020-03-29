import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import api from '../../services/api'

import Notify, { useNotify } from '../../components/Notify'

export default props=>{

    const [id, setId] = useState(localStorage.getItem("loginId"))

    const history = useHistory()

    const notify = useNotify()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('sessions',{ id })
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        }catch(err){
            notify.push('Falha no login. Tente Novamente.')
        }
    }

    return(<div>
            <Notify message={notify.message} />
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" width={250} height={106} id="logo" />

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>
                        <input
                            type="text"
                            placeholder="Sua ID"
                            value={id}
                            onChange={e=>setId(e.target.value)} />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size="16" color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>

                <img src={heroesImg} alt="Heroes" id="heroes" width={596} height={574} />
            </div>
           </div>)
}