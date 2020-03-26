import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'
import './styles.css'

import Notify from '../../components/Notify'

export default ()=>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const [mensagem, setMensagem] = useState('')

    const history = useHistory()

    const [phoneFormat, setPhoneFormat] = useState(true)

    async function handeRegister(e){
        e.preventDefault()
        const data = {
            name, 
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('ongs', data)
            setMensagem({
                message:`Seu ID de acesso: ${response.data.id}`,
                buttons:[{text:'Ok', click: ()=>history.push('/') }]
            })
        } catch (err){
            setMensagem('Erro no cadastro, tente novamente.')
        }
    }    

    function checkValidity(e){
        !e.checkValidity() && (e.style.borderColor = 'red') || (e.style.borderColor = '')
    }

    return(<div>
            <Notify message={mensagem} />
            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />

                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className="back-link" to="/">
                            <FiArrowLeft size="16" color="#E02041" />
                            Voltar para o Logon
                        </Link>                
                    </section>
                    <form onSubmit={handeRegister}>
                        <input
                            required
                            pattern=".{3,}"
                            type="text" 
                            placeholder="Nome da ONG" 
                            value={name} 
                            onBlur={e=>checkValidity(e.target)}
                            onChange={e=>setName(e.target.value.replace(/\B\s/g, ''))} />
                        <input
                            required
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            onBlur={e=>checkValidity(e.target)}
                            onChange={e=>setEmail(e.target.value)} />
                        <input
                            required 
                            pattern="\([0-9]{2}\) 9{1}[0-9]{4}-[0-9]{4}"
                            maxLength="11"
                            type="text" 
                            placeholder="Whatsapp"
                            value={phoneFormat && whatsapp.padEnd(11, '_').replace(/(..)?(.....)?(....)?/, '($1) $2-$3') || whatsapp}
                            onBlur={(e)=>!setPhoneFormat(true) && setTimeout(checkValidity, 100, e.target)}
                            onFocus={()=>setPhoneFormat(false)}
                            onChange={e=>setWhatsapp(e.target.value.replace(/\D/g,''))} />
                        <div className="input-group">
                            <input
                                required
                                pattern="[a-zA-ZÀ-ú ]{4,}"
                                type="text"
                                placeholder="Cidade"
                                value={city}
                                onBlur={e=>checkValidity(e.target)}
                                onChange={e=>setCity(e.target.value.replace(/^.|\s\b./gi, l=>l.toUpperCase()))} />
                            <input 
                                required 
                                pattern="[A-Z]{2}"
                                maxLength="2"
                                type="text"
                                placeholder="UF"
                                style={{ width: 80 }}
                                value={uf}
                                onBlur={e=>checkValidity(e.target)}
                                onChange={e=>setUf(e.target.value.toUpperCase())} />
                        </div>

                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
           </div>)
}