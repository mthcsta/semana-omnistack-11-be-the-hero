import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'
import './styles.css'

import Notify, { useNotify } from '../../components/Notify'
import Loading from '../../components/Loading'

export default ()=>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const notify = useNotify()

    const [phoneFormat, setPhoneFormat] = useState(true)

    async function handeRegister(e){
        e.preventDefault()

        setLoading(true)

        const data = {
            name, 
            email,
            whatsapp,
            city,
            uf
        }
        try{
            await new Promise(r=>setTimeout(r, 5000, true))
            const response = await api.post('ongs', data)

            localStorage.setItem("loginId", response.data.id)

            notify.push({
                message:`Seu ID de acesso: ${response.data.id}`,
                buttons:[{text:'Ok', click: ()=>history.push('/') }]
            })
        } catch (err){
            notify.push('Erro no cadastro, tente novamente.')
        }
        setLoading(false)
    }    

    function checkValidity(e){
        e.setCustomValidity("")
        if(!e.checkValidity()){
            e.style.borderColor = 'red'
            console.log(e.value)
            e.setCustomValidity(e.getAttribute('message'))
        }else{
            e.style.borderColor = ''
            e.setCustomValidity("")
        }
    }

    return(<div>
            <Notify message={notify.message} />
            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" id="logo" width={250} height={106} />

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
                            message="O Nome da ONG precisa conter ao menos 3 caracteres"                            
                            onChange={e=>!setName(e.target.value.replace(/\B\s/g, '')) && checkValidity(e.target)} />
                        <input
                            required
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            message="O Email precisa ser válido"
                            onChange={e=>!setEmail(e.target.value) && checkValidity(e.target)} />
                        <input
                            required 
                            pattern="\([0-9]{2}\) 9{1} [0-9]{4}-[0-9]{4}|\d{2}9\d{8}"
                            maxLength="11"
                            type="text" 
                            placeholder="Whatsapp"
                            value={phoneFormat ? whatsapp.padEnd(11, '_').replace(/(..)?(.)(....)?(....)?/, '($1) $2 $3-$4') : whatsapp}
                            onBlur={(e)=>!setPhoneFormat(true) && setTimeout(checkValidity, 100, e.target)}
                            onFocus={()=>setPhoneFormat(false)}
                            message="O número precisa conter DDD e o Nono Digito."
                            onChange={e=>!setWhatsapp(e.target.value.replace(/\D/g,''))} />
                        <div className="input-group">
                            <input
                                required
                                pattern="[a-zA-ZÀ-ú ]{4,}"
                                type="text"
                                placeholder="Cidade"
                                value={city}
                                message="Sua cidade precisa conter somente letras"
                                onChange={e=>!setCity(e.target.value.replace(/^.|\s\b./gi, l=>l.toUpperCase())) && checkValidity(e.target)} />
                            <input 
                                required 
                                pattern="[A-Z]{2}"
                                maxLength="2"
                                type="text"
                                placeholder="UF"
                                style={{ width: 80 }}
                                value={uf}
                                onBlur = {e=>checkValidity(e.target)}
                                message="Sua região precisa conter somente 2 letras"
                                onChange={e=>!setUf(e.target.value.toUpperCase()) && setTimeout(checkValidity, 100, e.target)} />
                        </div>
                        
                        <button className="button" type="submit" disabled={loading} >{loading ? <Loading /> : 'Cadastrar'}</button>
                    </form>
                </div>
            </div>
           </div>)
}