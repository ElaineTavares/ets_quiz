import Card from '../components/Card'
import Footer from '../components/Footer'

import logo from '/logo.webp'

import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useState } from 'react'


export default function Home() {
  const [nome, setNome] = useState("")
  console.log(nome)

  const navigate = useNavigate()

  const pegarNome = (e) => {
    e.preventDefault()
    const userName = nome
    console.log("USUARIO", userName)
    navigate(`/game?player=${userName}`) 
  }
 

  return (
    <main className='home'>
        <Link to="/">
             <img className='home_logo' src={logo} alt="logo do ETS Quiz" />
        </Link>
        <Card
          headerTitle="Teste suas habilidades"
        >
          <section className='card_body'>
              <p className='home_p'>
                  Teste os seus conhecimentos sobre o universo do Front-End, aqui no ETS Quiz!
              </p>
              <form className='form_name' onSubmit={pegarNome}>
                <input 
                  className='form_name_input' 
                  type="text" name="playerName" 
                  placeholder='Diz aí seu nome para jogar ;) '
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Button>Jogar</Button>
              </form>
          </section>           
        </Card>   
        <Footer/>
    </main>
  )
}
