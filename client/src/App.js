import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import Card from './components/cards/card';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();

  /**Abaixo pegando a lista de games e setando na var de estado */
  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data)
    })
  }, [listGames])

  /**Abaixo função para setar na var values os valores que são digitados nos inputs
   * e também os valores dos 'name' dos inputs */
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  /**Abaixo a função que envia os dados para o banco através do metodo post */
  const handleClickButton = () => {
    Axios.post('http://localhost:3001/register', {
      /**Abaixo como objeto coloca tudo que quer mandar para lá */
      name: values.name,
      cost: values.cost,
      category: values.category
    }).then((response) => {
      setListGames([
        ...listGames,
        {
          name: values.name,
          cost: values.cost,
          category: values.category
        }
      ])
    });
  };

  return (
    <div className="app-container">
      <div className='register-container'>
        <h1>Scrim Shop</h1>
        <input
          type="text"
          name="name"
          placeholder='Nome'
          className='register-input'
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="cost"
          placeholder='Preço'
          className='register-input'
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="category"
          placeholder='Categoria'
          className='register-input'
          onChange={handleChangeValues}
        />

        <button
          className='register-button'
          onClick={() => handleClickButton()}
        >Cadastrar</button>
      </div>
      {console.log(listGames)}
      {typeof listGames !== "undefined" && listGames.map((item) => {
        return <Card
          /**Abaixo passo props para card que vieram do banco de dados */
          key={item.idgames}
          listCard={listGames}
          setListCard={setListGames}
          id={item.idgames}
          name={item.name}
          cost={item.cost}
          category={item.category}
        >{item}</Card>
      })}

    </div>
  );
}

export default App;
