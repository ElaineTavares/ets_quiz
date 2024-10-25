import Card from '../components/Card'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'

import config from '../../config.json'

import logo from '../images/logo.webp'

import './Game.css'
import { Link } from 'react-router-dom'
import Alternatives from '../components/Alternatives'
import { useEffect, useState } from 'react'
import Button from '../components/Button'

export default function Game() {

    const questions = config.questions
    const[currentQuestion, setCurrentQuestion] = useState(0);
    const question = questions[currentQuestion];
    const questionNumber = currentQuestion + 1;
    const [answerState, setAnswerState] = useState("default")
    const isLastQuestion = questionNumber === questions.length
    const navigate = useNavigate()
    const [userAnswers, setUsersAnswers] = useState([])
    const [ticado, setTicado] = useState(false)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const playerName = queryParams.get('player');
    console.log("PLAYERNAME", playerName)

    useEffect(() => {
        if(isLastQuestion){               
            const totalPoints = userAnswers.reduce((totalPoints, currentAnswer) =>{
                if(currentAnswer === true) {
                    return totalPoints + 1
                } else {
                    return totalPoints;
                }                          
            }, 0);

            if(totalPoints <= 2){
                alert(`Dessa vez você não foi muito bem ${playerName}, mas não desanime, continue estudando e praticando sempre :) Você concluiu o desafio e acertou apenas ${totalPoints} de ${questions.length}.`)
            }
            if(totalPoints == 3){
                alert(`Muito bem ${playerName}! Continue estudando que você está no caminho certo ;) Você concluiu o desafio e acertou ${totalPoints} de ${questions.length}`)
            }
            if(totalPoints > 4){
                alert(`Parabéns ${playerName}! Você mandou super bem!! O sucesso tá garantido :D Você concluiu o desafio e acertou ${totalPoints} de ${questions.length}.`)
            }

            navigate("/")               
        }
        
    }, [userAnswers, navigate, questions.length])

    const ticar = () =>{
        setTicado(true)
     
    }
   

    const confirmar = (e) => {
        e.preventDefault()
            console.log("TESTANDO O SUBMIT")
            //informações da pergunta, mas não consigo manipular
            const questionInfo = e.target
            console.log("DADOS DA PERGUNTA QUE NÃO CONSIGO MANIPULAR", questionInfo)
            //dados da pergunta passados para o objeto formData para que eu possa manipular
            const formData = new FormData(questionInfo)
            console.log("DADOS DA PERGUNTA APÓS O new FormData() QUE AGORA EU CONSIGO MANIPULAR (TENHO QUE MARCAR UMA ALTERNATIVA (RADIO))", formData)
            //valor da alternativa marcada
            console.log("ALTERNATIVA (RADIO) MARCADA", (Object.fromEntries(formData.entries())) )
            //extraindo o valor da alternativa marcada que vou passar para o componente Alternatives
            const {alternative} = Object.fromEntries(formData.entries())
            console.log("ALTERNATIVA (RADIO) MARCADA EXTRAÍDA DO OBJ new FormData()", alternative)
            console.log("RESPOSTA CORRETA DO const questions = config.questions", question.answer)

            const isCorrectAnswer = alternative === question.answer
            console.log(isCorrectAnswer) 

            if(isCorrectAnswer){
                setUsersAnswers([
                    ...userAnswers,
                    true
                ])
                setAnswerState("success")
                setTimeout(() => {
                    setAnswerState("default")
                }, 2000);
            }
            if(!isCorrectAnswer) {
                setUsersAnswers([
                    ...userAnswers,
                    false
                ])
                setAnswerState("error")
                setTimeout(() => {
                    setAnswerState("default")
                }, 2000);
            }

            if(isLastQuestion){ 
                return
            }
    
            setTimeout(() => {
                setTicado(false)
                setCurrentQuestion(currentQuestion +1)   
            }, 2000);               
    }

    
// VER DEPOIS ALTERAR BACKGROUND DE CADA PERGUNTA  1h:09m do vídeo, style={{backgroundImage: `url("https://place-hold.it/1366x768")`}} 
  return (
    <main className='home'> 
        <Link to="/">
                <img className='home_logo' src={logo} alt="logo do ETS Quiz" />
        </Link>
        <Card    
            headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}
            altura="530px"
        >
            <section className='card_body'>
                <h2>Seja Bem-Vindo(a) {playerName}!</h2>
                <h1>
                    {question.title}
                </h1>
            </section>  
            <form 
                onSubmit={confirmar}>
                {question.alternatives.map((alternative, index) => (
                    <Alternatives
                        key={index}
                        alternative={alternative}
                        order={index}
                        ticado={ticado}
                        ticar={ticar}
                    />
                ))} 
                {answerState == "default" && (
                        <Button>Confirmar</Button>
                    )}
                <div className='game_container_emojis'>
                    
                    {answerState == "error" && (
                        <p>👎</p> 
                    )}
                    {answerState == "success" && (
                        <p>✅</p>
                        
                    )}
                </div>               
            </form>
        </Card>
        <Footer/>
    </main>
  )
}
