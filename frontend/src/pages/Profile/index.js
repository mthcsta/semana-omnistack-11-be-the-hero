import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import Notify from '../../components/Notify'

export default ()=>{
    const [incidents, setIncidents] = useState([])

    const [mensagem, setMensagem] = useState('')
    let hideMensagem = null;

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')


    useEffect(()=> {
        api.get('profile', {
            headers:{
                Authorization: ongId
            }
        }).then(response=>{
            setIncidents(response.data)
        })
    }, [ongId])

    async function handeDeleteIncident(id, title){
        try{
            
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId
                }
            })
            
            setIncidents(incidents.filter(incident=>incident.id !== id))

            setMensagem(`O caso ${title} foi deletado.`)
            clearTimeout(hideMensagem)
            hideMensagem = setTimeout(()=>setMensagem(''),30500)
        }catch(err){
            setMensagem('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear()

        history.push('/')
    }

    return(<div>
            <Notify message={mensagem} />
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero" />
                    <span>Bem Vinda, {ongName}</span>

                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button onClick={handleLogout} type="button">
                        <FiPower size="18" color="#E02041" />
                    </button>
                </header>

                <h1>Casos Cadastrados</h1>

                {
                    incidents.length === 0 && 
                    (<div style={{padding: '1em', 'text-align':'center', color: 'dimgray'}}>
                        Não há nenhum caso cadastrado
                    </div>)
                }

                <ul>
                    {incidents.map(incident=>(
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
                            
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={()=>handeDeleteIncident(incident.id, incident.title)} type="button">
                                <FiTrash2 size="20" color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
           </div>)
}