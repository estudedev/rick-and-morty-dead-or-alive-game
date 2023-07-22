import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";


const getRandomCharacter = async () => {
  const random = () => {
    const totalCharacters = 826;
    return Math.floor(Math.random() * totalCharacters) + 1;
  };

  const url = `https://rickandmortyapi.com/api/character/${random()}`;
  try {
    return axios.get(url);
  } catch (error) {
    throw new Error(error);
  }
};



export const Character = () => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [toggleNewCharacter, setToggleNewCharacter] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRandomCharacter()
      .then(({ data }) => {
        setCharacter(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [toggleNewCharacter]);

  const game = (choice) => () => {
    const statusMapper = {
      "dead": "morto",
      "alive": "vivo",
      "unknown": "desconhecido"
    }
    console.log(character, choice)

    const currentStatus = statusMapper[character.status.toLowerCase()]
    const isRight = choice === character.status.toLowerCase();

    if (isRight) {
      toast.success("Voce acertou")
    } else {
      toast.error(`Voce errou, o personagem esta ${currentStatus}`)
    }

    setToggleNewCharacter(!toggleNewCharacter);
  };


  return (
    <div className="character">
      <img className="picture" src={character.image} alt={character.name} />


      <table className="table">
        <tbody>
          <tr>
            <th>Informação</th>
            <th>Dados</th>
          </tr>
          <tr>
            <td>Nome</td>
            <td>{character.name}</td>
          </tr>
          <tr>
            <td>Origem</td>
            <td>{character.origin?.name}</td>
          </tr>
          <tr>
            <td>Espécie</td>
            <td>{character.species}</td>
          </tr>
          <tr>
            <td>Gênero</td>
            <td>{character.gender}</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons">
        <button className="alive" onClick={game("alive")}>
          Vivo
        </button>

        <button className="dead" onClick={game("dead")}>
          Morto
        </button>

        <button className="unknown" onClick={game("unknown")}>
          Não se sabe
        </button>
      </div>
    </div>
  );
};
