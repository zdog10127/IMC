import React, { Fragment, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image
} from "react-native";
import { color } from "react-native-reanimated";

import Estadio from '../../../arquivos/Estadio.png';

import api from "../../services/api";

const Sorteio = () => {
  const [potes, setPotes] = useState([]);

  var grupoA = [];
  var grupoB = [];
  var grupoC = [];
  var grupoD = [];
  var grupoE = [];
  var grupoF = [];
  var grupoG = [];
  var grupoH = [];

  const [stateGrupoA, setStateGrupoA] = useState([]);
  const [stateGrupoB, setStateGrupoB] = useState([]);
  const [stateGrupoC, setStateGrupoC] = useState([]);
  const [stateGrupoD, setStateGrupoD] = useState([]);
  const [stateGrupoE, setStateGrupoE] = useState([]);
  const [stateGrupoF, setStateGrupoF] = useState([]);
  const [stateGrupoG, setStateGrupoG] = useState([]);
  const [stateGrupoH, setStateGrupoH] = useState([]);

  function iniciarSorteio() {
    //logica do soteio em cima da variavel pote
    let pote1 = potes[0].integrantes;
    let pote2 = potes[1].integrantes;
    let pote3 = potes[2].integrantes;
    let pote4 = potes[3].integrantes;

    SorteioPote1(pote1);
    //SorteioOutrosPotes(pote2);
    //SorteioOutrosPotes(pote3);
    //SorteioOutrosPotes(pote4);
  }

  function SorteioPote1(pote) {
    //tirar do pote 1 e distribuir nos grupos.
    //regra qatar tem que ta no grupoA
    let participante = pote[0];
    grupoA.push(participante);
    pote.splice(0, 1);
    let sorteio = 0;

    let nroGrupo = 2;
    while (pote.length > 0) {
      sorteio = Math.floor(Math.random() * pote.length);
      switch (nroGrupo) {
        case 2:
          grupoB.push(pote[sorteio]);
          break;
        case 3:
          grupoC.push(pote[sorteio]);
          break;
        case 4:
          grupoD.push(pote[sorteio]);
          break;
        case 5:
          grupoE.push(pote[sorteio]);
          break;
        case 6:
          grupoF.push(pote[sorteio]);
          break;
        case 7:
          grupoG.push(pote[sorteio]);
          break;
        case 8:
          grupoH.push(pote[sorteio]);
          break;
      }

      pote.splice(sorteio, 1);
      nroGrupo++;
    }
  }

  function SorteioOutrosPotes(pote) {
    let sorteio = 0;
    let nroGrupo = 1;
    while (pote.length > 0) {
      // sorteio = (Math.floor(Math.random() * pote.length));
      let paisSorteado;
      let podeInserir = false;
      switch (nroGrupo) {
        case 1:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoA, paisSorteado);
          }
          grupoA.push(paisSorteado);
          break;
        case 2:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoB, paisSorteado);
          }
          grupoB.push(pote[sorteio]);
          break;
        case 3:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoC, paisSorteado);
          }
          grupoC.push(pote[sorteio]);
          break;
        case 4:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoD, paisSorteado);
          }
          grupoD.push(pote[sorteio]);
          break;
        case 5:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoE, paisSorteado);
          }
          grupoE.push(pote[sorteio]);
          break;
        case 6:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoF, paisSorteado);
          }
          grupoF.push(pote[sorteio]);
          break;
        case 7:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoG, paisSorteado);
          }
          grupoG.push(pote[sorteio]);
          break;
        case 8:
          while (!podeInserir) {
            sorteio = Math.floor(Math.random() * pote.length);
            paisSorteado = pote[sorteio];
            podeInserir = InserirGrupo(grupoH, paisSorteado);
          }
          grupoH.push(pote[sorteio]);
          break;
      }

      pote.splice(sorteio, 1);
      nroGrupo++;
    }
  }

  function InserirGrupo(pGrupo, pPaisSorteado) {
    let limiteMaxContinente = ObterLimiteContinente(pPaisSorteado.continente);

    let qtdPaisMesmoConinenteNoGrupo = 0;
    for (let i = 0; i < pGrupo.length; i++) {
      if (pGrupo[i].continente == pPaisSorteado.continente) {
        qtdPaisMesmoConinenteNoGrupo++;
        if (qtdPaisMesmoConinenteNoGrupo == limiteMaxContinente) return false;
      }
    }
    return true;
  }

  function ObterLimiteContinente(pContinente) {
    if (pContinente == "Europa") return 2;
    return 1;
  }

  useEffect(() => {
    api.get("/pote/ObterPotes/").then((response) => {
      setPotes(response.data);
      //console.log(response.data);
    });
  }, []);

  const atualizaState = () => {
    setStateGrupoA(grupoA);
    setStateGrupoB(grupoB);
    setStateGrupoC(grupoC);
    setStateGrupoD(grupoD);
    setStateGrupoE(grupoE);
    setStateGrupoF(grupoF);
    setStateGrupoG(grupoG);
    setStateGrupoH(grupoH);
  };

  return (
    <ImageBackground source={Estadio} style={styles.background} resizeMode="cover">
      <Fragment>
        <Text style={styles.title}> Listagem de Potes </Text>

        <View style={styles.button}>
          <Button title="Inicia Sorteio" onPress={iniciarSorteio} color='#0D3146'/>
        </View> 

        <View style={styles.button}>
          <Button title="Atualiza Grupo" onPress={atualizaState} color='#0D3'/>
        </View> 

        <View>
            <Text style={[styles.title, styles.grid]}>GRUPO A</Text>
            {stateGrupoA.map((e) => (
              <Text key={e.idPais} style={styles.groupA}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO B</Text>
            {stateGrupoB.map((e) => (
              <Text key={e.idPais} style={styles.groupB}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO C</Text>
            {stateGrupoC.map((e) => (
              <Text key={e.idPais} style={styles.groupC}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO D</Text>
            {stateGrupoD.map((e) => (
              <Text key={e.idPais} style={styles.groupD}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO E</Text>
            {stateGrupoE.map((e) => (
              <Text key={e.idPais} style={styles.groupE}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO F</Text>
            {stateGrupoF.map((e) => (
              <Text key={e.idPais} style={styles.groupF}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO G</Text>
            {stateGrupoG.map((e) => (
              <Text key={e.idPais} style={styles.groupG}>{e.idPais}</Text>
            ))}
            <Text style={[styles.title, styles.grid]}>GRUPO H</Text>
            {stateGrupoH.map((e) => (
              <Text key={e.idPais} style={styles.groupH}>{e.idPais}</Text>
            ))}
            <View style={styles.button}>
              <Button title="Sorteio" onPress={() => navigation.navigate("Home")} color="#5E332C" />
            </View>
        </View>
      </Fragment>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38,
    color: '#ffffff',
    marginTop: 15
  },
  grid: {
    width: 150,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },  
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupA: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#606060',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupB: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#FFFFFF',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupC: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#606060',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupD: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#FFFFFF',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupE: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#606060',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupF: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#FFFFFF',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupG: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#606060',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  groupH: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#FFFFFF',
    width: 90,
    height: 41,
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default Sorteio;
