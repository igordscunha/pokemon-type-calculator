import types from '../../data/pokemonsTypes.json'
import { Botao } from '../../components/button'
import { useState, useEffect } from 'react'
import { calculadoraDeTipos } from '../../utils/calculadora'
import './Home.css'

export const Home = () => {

  const [primeiraEscolha, setPrimeiraEscolha] = useState(null);
  const [segundaEscolha, setSegundaEscolha] = useState(null);
  const [escolhido, setEscolhido] = useState(false);
  const [escolhidoDois, setEscolhidoDois] = useState(false);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (primeiraEscolha) {
      const tipos = segundaEscolha 
        ? [primeiraEscolha.type, segundaEscolha.type] 
        : [primeiraEscolha.type];
      
      setResultado(calculadoraDeTipos(tipos));
    } else {
      setResultado({ weakAgainst: [], strongAgainst: [], immuneTo: [] });
    }
  }, [primeiraEscolha, segundaEscolha]);

  const typeMap = {};

  types.forEach(type => {
    typeMap[type.type] = {
      strongAgainst: type.strongAgainst,
      weakAgainst: type.weakAgainst,
      immuneTo: type.immuneTo,
      color: type.color
    };
  });
  
  function handleBotaoClick(tipo){
    if(!primeiraEscolha) {
      setPrimeiraEscolha(tipo)
    }
    else {
      setSegundaEscolha(tipo)
    }
  }

  function calcularEfetividade(){
    if(primeiraEscolha && segundaEscolha){
      setEscolhidoDois(true);
    }
    else if(primeiraEscolha){
      setEscolhido(true);
    }
  }

  function Resetar(){
    setPrimeiraEscolha(null);
    setSegundaEscolha(null);
    setEscolhido(false);
    setEscolhidoDois(false);
    setResultado(null);
  }

  return(
    <section>
      <h1>Pokémon Type Calculator</h1>
      <div>

        {types.map((types, index) => (
          <Botao 
            key={index}
            texto={types.type.charAt(0).toUpperCase() + types.type.slice(1)} 
            cor={types.color}
            onClick={() => handleBotaoClick(types)}
          />
        ))}

      </div>


      {/* DISPLAY ESCOLHAS */}
      <div>
        {primeiraEscolha && (
          <>
            <p>Você escolheu:</p>
            <div className='escolha'>
              <Botao 
                texto={primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)} 
                cor={primeiraEscolha.color}
              />
              {segundaEscolha && (
              <>
                <Botao 
                  texto={segundaEscolha.type.charAt(0).toUpperCase() + segundaEscolha.type.slice(1)} 
                  cor={segundaEscolha.color}
                />
              </>
              )}
            </div>
          </>
        )}

        {primeiraEscolha && (
          <div className='cont-peq'>
            <button onClick={calcularEfetividade} className='botao-efet'>Calcular Efetividade</button>
            <button onClick={Resetar} className='botao-reset'>Resetar</button>
          </div>
        )}

      </div>

      {/* ESCOLHEU UM TIPO */}
      <div>
        {escolhido && resultado && (
          <section>
            <div>
              <div>
                <h3>{`Strong against ${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)}:`}</h3>
                {resultado.strongAgainst.map((strongType) => (
                  <Botao
                    key={strongType}
                    texto={strongType.toUpperCase()}
                    cor={typeMap[strongType].color}
                  />
                ))}
              </div>

              <div>
                <h3>{`Weak against ${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)}:`}</h3>
                {resultado.weakAgainst.map((weakType) => (
                    <Botao
                      key={weakType}
                      texto={weakType.toUpperCase()}
                      cor={typeMap[weakType].color}
                    />
                  ))}
              </div>

              {resultado.immuneTo.length > 0 && (
                <div>
                  <h3>{`Immune against ${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)}:`}</h3>
                  {resultado.immuneTo.map((immuneType) => (
                    <Botao
                      key={immuneType}
                      texto={immuneType.toUpperCase()}
                      cor={typeMap[immuneType]?.color || "#ccc"}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>          
        )}
      </div>

      {/* ESCOLHEU DOIS TIPOS */}
      <div>
        {escolhidoDois && resultado && (
          <section>
            <div>
                            
              <div>
                <h3>Strong against {`${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)} and ${segundaEscolha.type.charAt(0).toUpperCase() + segundaEscolha.type.slice(1)}:`}:</h3>
                {resultado.strongAgainst.map((strongType) => (
                  <Botao
                    key={strongType}
                    texto={strongType.toUpperCase()}
                    cor={typeMap[strongType]?.color || "#ccc"} // Fallback para cor não encontrada
                  />
                ))}
              </div>

              <div>
                <h3>Weak against {`${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)} and ${segundaEscolha.type.charAt(0).toUpperCase() + segundaEscolha.type.slice(1)}:`}:</h3>
                {resultado.weakAgainst.map((weakType) => (
                  <Botao
                    key={weakType}
                    texto={weakType.toUpperCase()}
                    cor={typeMap[weakType]?.color || "#ccc"}
                  />
                ))}
              </div>

              {resultado.immuneTo.length > 0 && (
                <div>
                  <h3>Immune to {`${primeiraEscolha.type.charAt(0).toUpperCase() + primeiraEscolha.type.slice(1)} and ${segundaEscolha.type.charAt(0).toUpperCase() + segundaEscolha.type.slice(1)}:`}:</h3>
                  {resultado.immuneTo.map((immuneType) => (
                    <Botao
                      key={immuneType}
                      texto={immuneType.toUpperCase()}
                      cor={typeMap[immuneType]?.color || "#ccc"}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}