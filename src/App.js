import './App.css'
import Header from './components/Header/Header'
import PokemonBody from './components/Pokemon_body/PokemonBody'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import catchError_css from './catchError.module.css'
import Paginationcons from './components/Paginathion/Paginationcons'
import { Form, reduxForm } from 'redux-form'

function App () {
  const [pokemons, setPokemons] = useState([])
  const [totalCount, SetTotalCount] = useState([])
  const [changeLimit, setChangeLimit] = useState(10)
  const [curPages, setCurPages] = useState(0)
  const [type, SetType] = useState([])
  const [loading, setLoading] = useState(false)
  const [valType, setValType] = useState([])
  const [namefil, setNamefil] = useState()
  const [filterObj, setFilterObj] = useState([])
  const [isErr, setIsErr] = useState(false)
  const objLength = Object.keys(filterObj).length

  useEffect(() => {
    const {
      attack,
      hp,
      defense,
      specialAttack,
      specialDefense,
      speed
    } = filterObj
    const statFilter = []
    if (attack) statFilter.push({ attack })
    if (hp) statFilter.push({ hp })
    if (defense) statFilter.push({ defense })
    if (specialAttack) statFilter.push({ specialAttack })
    if (specialDefense) statFilter.push({ specialDefense })
    if (speed) statFilter.push({ speed })
    setLoading(true)
    axios
      .post('https://pokemonapishort.herokuapp.com/PokeApi/getPokemons', {
        filterOptions: [
          objLength === 0
            ? []
            : {
                statFilter
              },
          { nameFilter: namefil },
          { typeFilter: valType }
        ],
        offset: curPages,
        limit: changeLimit
      })
      .then(result => {
        setPokemons(result.data.pokemons)
        SetTotalCount(result.data.count)
        setLoading(false)
      })
      .catch(error => {
        if (error.request) {
          setIsErr(true)
        }
      })
  }, [changeLimit, valType, namefil, filterObj, curPages])

  useEffect(() => {
    axios
      .get('https://pokemonapishort.herokuapp.com/PokeApi/getPokemonsTypes')
      .then(res => {
        SetType(res.data.types)
      })
  }, [])

  const handleFilterPokemons = () => {
    setLoading(true)
    axios
      .post('https://pokemonapishort.herokuapp.com/PokeApi/getPokemons', {
        filterOptions: [{ nameFilter: namefil }, { typeFilter: valType }],
        offset: curPages,
        limit: changeLimit
      })
      .then(result => {
        console.log(result)
        setPokemons(result.data.pokemons)
        SetTotalCount(result.data.count)
        setLoading(false)
      })
      .catch(error => {
        if (error.request) {
          setIsErr(true)
        }
      })
  }

  if (!isErr) {
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
  } else {
    return (
      <div>
          <BrowserRouter>
            <Route exact path={'/'} />

            <NavLink to={'/'}>
              <div>
                <button onSubmit={handleFilterPokemons}>Go back</button>
              </div>
            </NavLink>
          </BrowserRouter>
          <div className={catchError_css.catchPokemons}>
            <p className={catchError_css.textCatchPokemons}>
              This pokemons does not exist!
            </p>
          </div>
      </div>
    )
  }
}

export default App 
