import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { goToPokedexPage } from '../routes/Coordinator'
import styled from 'styled-components'
import axios from 'axios'
import Imagem from '../img/Header2.png'

const HeaderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;

img{
width: 50vw;

}
`

const SubHeader = styled.div`
display: flex;
/* background-color: yellow; */
flex-direction: column;
align-items: center;
`
const CardContainer = styled.div`
display: flex;
color:white;
list-style-type:none;
    width: 100%;
    height: auto;
    padding: 5px;
    background-image: linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB);
    flex-direction:row;
    flex-wrap:wrap;
    gap: 20px;
    justify-content: center;
`
const Cardzinhos = styled.div`
display: flex;
width: 300px;
height: 300px;
flex-direction: column;
align-items: center;
border: 5px double aqua ;
padding: 15px;
img{
  width: 100px;

}
`
const Botoes = styled.div`
display: flex;

`


const FooterContainer = styled.div`
background-color: #0e141b;
display: flex;
align-items: center;
justify-content: center;
color: white;
`


export default function HomePage() {
  const navigate = useNavigate()
  const [pokemons, setPokemons] = useState([])
  const [detail, setDetail] = useState([])


  const getPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((response) => {
        console.log(response)
        setPokemons(response.data.results)
      })
      .catch((error) => {
        alert("esta dando erro")
      })
  }
  useEffect(() => {

    getPokemons()
  }, [])


  useEffect(() => {
    const newPokemons = []
    pokemons && pokemons.forEach((poke) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
        .then((response) => {
          console.log(response.data)
          newPokemons.push(response.data)
          if (newPokemons.length === 20) {
            setDetail(newPokemons)
          }


        })
        .catch((error) => {
          console.log(error)
        })

    })
  }, [pokemons])
  const listPokemons = detail && detail.map((pokemon) => {
    return (

      <Cardzinhos key={pokemon.id} pokemon={pokemon}>
        <img src={pokemon.sprites.other.dream_world.front_default} />
      <p>{pokemon.name.toUpperCase()}</p>
      <Botoes>
      <button>add pokemon</button>
      <button>detalhes</button>
      </Botoes>
      </Cardzinhos>

    )
  })
  return (
    <div>
      <HeaderContainer>
        <img src={Imagem} />
      </HeaderContainer>
      <SubHeader>
        <button onClick={() => goToPokedexPage(navigate)}>Pokedex</button>
      </SubHeader>
      <CardContainer>
          {listPokemons} 
      </CardContainer>
      <FooterContainer>
        <p>@2022 - Todos os direitos reservados</p>
      </FooterContainer>
    </div>
  )
}

