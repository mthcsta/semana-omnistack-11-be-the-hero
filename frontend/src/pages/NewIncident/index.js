import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import Notify, { useNotify } from '../../components/Notify'

import Loading from '../../components/Loading'

export default ()=>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const [loading, setLoading] = useState(false)
   
    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    const notify = useNotify()

    async function handleNewIncident(e){
        e.preventDefault()

        setLoading(true)

        const data = {
            title,
            description,
            value: parseFloat(value.replace(',','.'))
        }

        try{
            if(description.length < 10)  throw new Error("description");

            api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }
            })
            history.push('/profile')
        }catch(err){
            if(err.message === "description")
                notify.push('A descrição deve conter pelo menos 10 caracteres.')
            else
                notify.push('Erro ao cadastrar caso. Tente novamente.')
        }
        setLoading(false)
    }
    return(<div>
            <Notify message={notify.message} />
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />

                        <h1>Cadastro novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size="16" color="#E02041" />
                            Voltar para Home
                        </Link>                
                    </section>
                    <form onSubmit={handleNewIncident}>
                        <input 
                            required 
                            pattern=".{5,}"
                            type="text" 
                            placeholder="Titulo do Caso"
                            value={title}
                            onChange={e=>setTitle(e.target.value)} />
                        <textarea
                            required 
                            pattern=".{10,}" 
                            placeholder="Descrição"
                            value={description}
                            onChange={e=>setDescription(e.target.value)} />
                        <input
                            required
                            pattern="[0-9]{1,}(,[0-9]{2})?"
                            type="text" 
                            placeholder="Valor em reais"
                            value={value}
                            onChange={e=>setValue(e.target.value.replace(/[^\d,]/,'').replace(/(?<=,..).*/,''))} />

                        <button className="button" type="submit" disabled={loading} >{ loading ? <Loading /> : 'Cadastrar' }</button>
                    </form>
                </div>
            </div>
           </div>)
}