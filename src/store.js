import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authenticated: false,
  user: null,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  },
  regionais: [],
  polos: [],
  localidadespolo: [],
  funcoes: [],
  funcionarios: [],
  treinamentos: [],
  treinamentosRealizados: [],
  processos: [],
  tiposprocesso: [],
  equipamentoscoletivos: [],
  equipamentosindividuais: [],
  perguntasrisco: [],
  riscosidentificados: [],
  analisesrisco: []
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  ALTERAR_AUTENTIFICACAO (state, payload) {
    state.authenticated = payload.auth
  },
  ATUALIZAR_REGIONAIS (state, payload) {
    state.regionais = payload
  },
  ATUALIZAR_REGIONAL (state, payload) {
    state.regionais[payload.index].nome = payload.nome
    state.regionais[payload.index].estado = payload.estado
  },
  ADD_REGIONAL (state, payload) {
    state.regionais.push(payload)
  },
  ATUALIZAR_POLOS (state, payload) {
    state.polos = payload
  },
  ATUALIZAR_POLO (state, payload) {
    state.polos[payload.index].nome = payload.nome
    state.polos[payload.index].regional = payload.regional
  },
  ADD_POLO (state, payload) {
    state.polos.push(payload)
  },
  ATUALIZAR_LOCALIDADESPOLO (state, payload) {
    state.localidadespolo = payload
  },
  ATUALIZAR_LOCALIDADEPOLO (state, payload) {
    state.localidadespolo[payload.index].nome = payload.nome
    state.localidadespolo[payload.index].polo = payload.polo
  },
  ADD_LOCALIDADEPOLO (state, payload) {
    state.localidadespolo.push(payload)
  },
  ATUALIZAR_FUNCOES (state, payload) {
    state.funcoes = payload
  },
  ATUALIZAR_FUNCAO (state, payload) {
    state.funcoes[payload.index].nome = payload.nome
  },
  ADD_FUNCAO (state, payload) {
    state.funcoes.push(payload)
  },
  ATUALIZAR_FUNCIONARIOS (state, payload) {
    state.funcionarios = payload
  },
  ATUALIZAR_FUNCIONARIO (state, payload) {
    state.funcionarios[payload.index].nome = payload.nome
    state.funcionarios[payload.index].dataNascimento = payload.dataNascimento
    state.funcionarios[payload.index].sexo = payload.sexo
    state.funcionarios[payload.index].estadoCivil = payload.estadoCivil
    state.funcionarios[payload.index].inicioFuncao = payload.inicioFuncao
    state.funcionarios[payload.index].grauInstrucao = payload.grauInstrucao
    state.funcionarios[payload.index].estadoInstrucao = payload.estadoInstrucao
    state.funcionarios[payload.index].inicioRefeicao = payload.inicioRefeicao
    state.funcionarios[payload.index].fimRefeicao = payload.fimRefeicao
    state.funcionarios[payload.index].turnoTrabalho = payload.turnoTrabalho
    state.funcionarios[payload.index].nacionalidade = payload.nacionalidade
    state.funcionarios[payload.index].funcao = payload.funcao
    state.funcionarios[payload.index].local = payload.local
    state.funcionarios[payload.index].localidadePolo = payload.localidadePolo
  },
  ADD_FUNCIONARIO (state, payload) {
    state.funcionarios.push(payload)
  },
  ATUALIZAR_TREINAMENTOS (state, payload) {
    state.treinamentos = payload
  },
  ATUALIZAR_TREINAMENTO (state, payload) {
    state.treinamentos[payload.index].nome = payload.nome
    state.treinamentos[payload.index].codigo = payload.codigo
    state.treinamentos[payload.index].conteudoProgramatico = payload.conteudoProgramatico
  },
  ADD_TREINAMENTO (state, payload) {
    state.treinamentos.push(payload)
  },
  ATUALIZAR_TREINAMENTOSREALIZADOS (state, payload) {
    state.treinamentosRealizados = payload
  },
  ATUALIZAR_TREINAMENTOREALIZADO (state, payload) {
    state.treinamentosRealizados[payload.index].data = payload.data
    state.treinamentosRealizados[payload.index].instrutor = payload.instrutor
    state.treinamentosRealizados[payload.index].cargaHoraria = payload.cargaHoraria
  },
  ADD_TREINAMENTOREALIZADO (state, payload) {
    state.treinamentosRealizados.push(payload)
  },
  ATUALIZAR_PROCESSOS (state, payload) {
    state.processos = payload
  },
  ATUALIZAR_PROCESSO (state, payload) {
    state.processos[payload.index].nome = payload.nome
    state.processos[payload.index].estado = payload.estado
  },
  ADD_PROCESSO (state, payload) {
    state.processos.push(payload)
  },
  ATUALIZAR_TIPOSPROCESSO (state, payload) {
    state.tiposprocesso = payload
  },
  ATUALIZAR_TIPOPROCESSO (state, payload) {
    state.tiposprocesso[payload.index].nome = payload.nome
    state.tiposprocesso[payload.index].processo = payload.processo
    state.tiposprocesso[payload.index].regional = payload.regional
  },
  ADD_TIPOPROCESSO (state, payload) {
    state.tiposprocesso.push(payload)
  },
  ATUALIZAR_EQUIPAMENTOSINDIVIDUAIS (state, payload) {
    state.equipamentosindividuais = payload
  },
  ATUALIZAR_EQUIPAMENTOINDIVIDUAL (state, payload) {
    state.equipamentosindividuais[payload.index].nome = payload.nome
  },
  ADD_EQUIPAMENTOINDIVIDUAL (state, payload) {
    state.equipamentosindividuais.push(payload)
  },
  ATUALIZAR_EQUIPAMENTOSCOLETIVOS (state, payload) {
    state.equipamentoscoletivos = payload
  },
  ATUALIZAR_EQUIPAMENTOCOLETIVO (state, payload) {
    state.equipamentoscoletivos[payload.index].nome = payload.nome
  },
  ADD_EQUIPAMENTOCOLETIVO (state, payload) {
    state.equipamentoscoletivos.push(payload)
  },
  ATUALIZAR_PERGUNTASRISCO (state, payload) {
    state.perguntasrisco = payload
  },
  ATUALIZAR_PERGUNTARISCO (state, payload) {
    state.perguntasrisco[payload.index].pergunta = payload.pergunta
  },
  ADD_PERGUNTARISCO (state, payload) {
    state.perguntasrisco.push(payload)
  },
  ATUALIZAR_RISCOSIDENTIFICADOS (state, payload) {
    state.riscosidentificados = payload
  },
  ATUALIZAR_RISCOIDENTIFICADO (state, payload) {
    state.riscosidentificados[payload.index].nome = payload.nome
  },
  ADD_RISCOIDENTIFICADO (state, payload) {
    state.riscosidentificados.push(payload)
  },
  ATUALIZAR_ANALISESRISCO (state, payload) {
    state.analisesrisco = payload
  },
  ATUALIZAR_ANALISERISCO (state, payload) {
    state.analisesrisco[payload.index].dataCriacao = payload.dataCriacao
    state.analisesrisco[payload.index].horaCriacao = payload.horaCriacao
    state.analisesrisco[payload.index].dataOcorrido = payload.dataOcorrido
    state.analisesrisco[payload.index].descricaoAtividade = payload.descricaoAtividade
    state.analisesrisco[payload.index].observacao = payload.observacao
    state.analisesrisco[payload.index].local = payload.local
    state.analisesrisco[payload.index].funcionario = payload.funcionario
    state.analisesrisco[payload.index].tipoProcesso = payload.tipoProcesso
  },
  ADD_ANALISERISCO (state, payload) {
    state.analisesrisco.push(payload)
  },
  ADD_EQUIPAMENTOSCOLETIVOSANALISERISCO (state, payload) {
    state.analisesrisco[payload.index].equipamentosColetivos.push(payload.equipamentoColetivo)
  },
  ADD_EQUIPAMENTOSINDIVIDUAISANALISERISCO (state, payload) {
    state.analisesrisco[payload.index].equipamentosIndividuais.push(payload.equipamentoIndividual)
  },
  ADD_MEMBROSANALISERISCO (state, payload) {
    state.analisesrisco[payload.index].membros.push(payload.membro)
  },
  ADD_RISCOSIDENTIFICADOSANALISERISCO (state, payload) {
    state.analisesrisco[payload.index].riscosidentificados.push(payload.riscoidentificado)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
