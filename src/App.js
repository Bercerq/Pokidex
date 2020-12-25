import './App.css'
import Header from './components/Header/Header'
import PokemonBody from './components/Pokemon_body/PokemonBody'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Paginationcons from './components/Paginathion/Paginationcons'

function App () {
  const [pokemons, setPokemons] = useState([])
  const [totalCount, SetTotalCount] = useState([])
  const [changeLimit, setChangeLimit] = useState(10)
  const [inputValue, setInputValue] = useState()
  const [curPages, setCurPages] = useState(0)
  const [type, SetType] = useState([])
  // Page Load
  const [loading, setLoading] = useState(false)
  const [valType, setValType] = useState([])
  const [namefil, setNamefil] = useState()
  const [attackStat, setAttackStat] = useState({})
  const [filterObj, setFilterObj] = useState()

  console.log(filterObj);

  useEffect(() => {
    console.log(attackStat)
  }, [attackStat])

  useEffect(() => {
    setLoading(true)
    axios
      .post('https://pokemonapishort.herokuapp.com/PokeApi/getPokemons', {
        filterOptions: [
          { nameFilter: namefil },
          { typeFilter: valType },
          { statFilter: [{ attack: { from: 0, to: 200 } }] }
        ],
        offset: curPages,
        limit: changeLimit
      })
      .then(result => {
        setPokemons(result.data.pokemons)
        SetTotalCount(result.data.count)
        setLoading(false)
      })
  }, [changeLimit, valType, namefil, curPages])

  useEffect(() => {
    axios
      .get('https://pokemonapishort.herokuapp.com/PokeApi/getPokemonsTypes')
      .then(res => {
        SetType(res.data.types)
      })
  }, [])
  return (
    <div className='App'>
      <BrowserRouter>
        <Header
          filterObj={filterObj}
          setFilterObj={setFilterObj}
          setNamefil={setNamefil}
          setValType={setValType}
          valType={valType}
          type={type}
        />
        <PokemonBody pokemons={pokemons} loading={loading} />
        <Paginationcons
          setCurPages={setCurPages}
          setChangeLimit={setChangeLimit}
          changeLimit={changeLimit}
          totalCount={totalCount}
          setPokemons={setPokemons}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
