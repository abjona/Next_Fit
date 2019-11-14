import React, { useState } from 'react';
import { HuePicker } from 'react-color'

import './style.css';
import { isNumber } from 'util';
import dados from './blocos';

const App = () => {

  const [capbloco, setCapBloco] = useState([])
  const [valor, setValor] = useState('');
  const [valorProcess, setvalorProcess] = useState('');
  const [colorProcess, setColorProcess] = useState('');
  const [inicio, setInicio] = useState(0);
  const [erro, setErro] = useState('');

  const resetar = () => setCapBloco([])
  const predefinido = () => setCapBloco(JSON.parse(JSON.stringify(dados)));

  const createBlock = () => {
    if (!valor) return;
    if (capbloco.length > 0) {
      capbloco[capbloco.length - 1].prox = capbloco.length;
    }

    const dados = {
      id: capbloco.length,
      color: '#FFF',
      valor: valor,
      prox: 0,
    }

    capbloco.push(dados);
    setCapBloco(capbloco);
    setValor('');
  }

  const retornaErro = () => {
    if (!colorProcess) setErro('Selecione uma cor para o processo!');
    else if (!valorProcess) setErro('Insira um valor válido!');
    else if(capbloco.length == 0) setErro('Sem bloco de memória! =(');
    else setErro('')
    return erro ? true : false;
  }

  const setProcess = () => {
    
    if (retornaErro()) return;    
    var indice = inicio;
    const novo_capblock = capbloco;
    
    while (1) {
      if(novo_capblock[indice].valor >= valorProcess && novo_capblock[indice].color == '#FFF'){
        novo_capblock[indice].color = colorProcess;
        setInicio(indice);
        break;
      } else indice = novo_capblock[indice].prox;
      if(inicio == indice) break;
    }

    setCapBloco(novo_capblock);
    setvalorProcess('')
  }

  return (
    <div className="container">
      <h1>Next Fit</h1>
      <div className="form">
      {erro && (<span className='spanerro'>{erro}</span>)}
        <label>Digite a capacidade dos blocos:</label>
        <input type="number" value={valor} onChange={event => setValor(event.target.value)} onKeyUp={event => event.keyCode == 13 && createBlock()}></input>

        <div className='btngroup'>
        <button type="submit" className="btn" onClick={() => createBlock()}>Enviar</button>
          <button type="submit" className="btn-resetar" onClick={() => predefinido()}>Blocos pre definidos</button>
        </div>
      </div>

      <ul>
        {capbloco.map(ele => (
          <li style={{ background: ele.color, color: ele.color != '#FFF' ? 'white' : 'black' }}>{ele.valor}</li>
        ))}
      </ul>

      <div className="form">

        <label>Digite a capacidade :</label>
        <input type="number" value={valorProcess} onChange={event => setvalorProcess(event.target.value)} onKeyUp={event => event.keyCode == 13 && setProcess()}></input>

        <label >Selecione a cor do processo: {colorProcess ? colorProcess : '#.....'} </label>
        <HuePicker color={colorProcess} onChangeComplete={color => setColorProcess(color.hex)} />
        <br />
        <div className='btngroup'>
        
          <button type="submit" className="btn" onClick={() => setProcess()}>Enviar</button>
          <button type="submit" className="btn-resetar" onClick={() => resetar()}>Resetar</button>
        </div>
      </div>

    </div>
  );
}

export default App;
