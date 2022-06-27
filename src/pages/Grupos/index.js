import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";

import api from "../../services/api";

export default function Grupos() {
  const [potes, setPotes] = useState([]);

  var grupoA = [];
  var grupoB = [];
  var grupoC = [];
  var grupoD = [];
  var grupoE = [];
  var grupoF = [];
  var grupoG = [];
  var grupoH = [];

  function iniciarSorteio() {
    //logica do soteio em cima da variavel pote
    let pote1 = potes[0].integrantes;
    let pote2 = potes[1].integrantes;
    let pote3 = potes[2].integrantes;
    let pote4 = potes[3].integrantes;

    SorteioPote1(pote1);
    SorteioOutrosPotes(pote2);
    SorteioOutrosPotes(pote3);
    SorteioOutrosPotes(pote4);
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

    console.log("pote como está");
    console.log(grupoA);
    console.log(grupoB);
    console.log(grupoC);
    console.log(grupoD);
    console.log(grupoE);
    console.log(grupoF);
    console.log(grupoG);
    console.log(grupoH);
    console.log(pote);
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

    console.log("Grupos como está");
    console.log(grupoA);
    console.log(grupoB);
    console.log(grupoC);
    console.log(grupoD);
    console.log(grupoE);
    console.log(grupoF);
    console.log(grupoG);
    console.log(grupoH);
    console.log("Potes como está");
    console.log(pote);
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
      console.log(response.data);
    });

    //dados carregados na variavel potes

    //logica do sorteio em cima da variavel potes

    //click do botao faz o sorteio
  }, []);

  return (
    <View>
      <Text> Listagem de Potes </Text>

      <TouchableOpacity onPress={iniciarSorteio}>
        <Text>Inicia Sorteio</Text>
      </TouchableOpacity>
    </View>
  );
}

Grupos.navigationOptions = {
  title: "Home",
};
