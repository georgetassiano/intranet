<template>
  <div>
    <section class="content">
      <div class="alert alert-dismissible" :class="[error2Class]" role="alert" v-if="erro">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="desaparecer"><span aria-hidden="true">&times;</span></button>
        <strong>Atenção!</strong> {{mensagemErro}}
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Nova Análise Preliminar de Risco</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/analisesrisco" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="input-group">
                  <span class="input-group-addon">Data:</span>
                    <input type="date" class="form-control" placeholder="31/12/1994" v-model="dataOcorrido">
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label" for="localidadePolo">Local de trabalho</label>
                  <select class="form-control" id="localidadePolo" v-model="localidadePoloSelecionada" required>
                    <option v-for="localidadePolo in localidadesPolo" :value="localidadePolo">{{localidadePolo.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Processo</label>
                  <select class="form-control" v-model="tipoProcessoSelecionado" required>
                    <option v-for="tipoProcesso in tiposProcesso" :value="tipoProcesso">{{tipoProcesso.nome}}</option>
                  </select>
                </div>
                <br/>
                <fieldset>
                  <legend>Local</legend>
                  <div class="input-group">
                    <span class="input-group-addon" id="endereco">Endereço</span>
                    <input type="text" class="form-control" v-model=vm.searchPlace v-gmaps-searchbox:location=vm placeholder="ex: Passagem santa cruz">
                  </div>
                  <br/>
                  <div class="input-group">
                    <span class="input-group-addon" id="cep">CEP</span>
                    <input type="number" class="form-control" placeholder="ex: 66115080" v-model="cep" >
                  </div>
                  <br/>
                  <div class="input-group">
                    <span class="input-group-addon" id="estado">Estado</span>
                    <input type="text" class="form-control" id="estado" placeholder="ex: Pará" v-model="estado">
                  </div>
                  <br/>
                  <div class="input-group">
                    <span class="input-group-addon" id="cidade">Cidade</span>
                    <input type="text" class="form-control" id="cidade" placeholder="ex: Belém" v-model="cidade">
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Responsável</legend>
                  <div class="input-group">
                    <span class="input-group-addon" id="nome">Nome</span>
                    <input type="text" class="form-control" name="nome" placeholder="Nome do Funcionario" v-model="nomeResponsavel" list="funcionarios">
                    <datalist id="funcionarios" @submit="listaSelecionada(funcionario.matricula)">
                      <option v-for="funcionario in funcionarios" :value="funcionario.nome">
                    </datalist>
                  </div>
                  <br/>
                  <div class="input-group">
                    <span class="input-group-addon" >Matrícula</span>
                    <input type="text" class="form-control" v-model="matriculaResponsavel" placeholder="ex: 220302" list="matriculas">
                    <datalist id="matriculas">
                      <option v-for="funcionario in funcionarios" :value="funcionario.matricula">
                    </datalist>
                  </div>
                  <br/>
                </fieldset>
                <br/>
                <fieldset>
                <legend>Equipe</legend>
                <div class="input-group">
                  <span class="input-group-addon" id="nome">Nome</span>
                  <input type="text" class="form-control" name="nome" placeholder="Nome do Funcionario" v-model="nomeMembro" list="funcionarios">
                  <datalist id="funcionarios" @submit="listaSelecionada(funcionario.matricula)">
                    <option v-for="funcionario in funcionarios" :value="funcionario.nome">
                  </datalist>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" >Matrícula</span>
                  <input type="text" class="form-control" v-model="matriculaMembro" placeholder="ex: 220302" list="matriculas">
                  <datalist id="matriculas">
                    <option v-for="funcionario in funcionarios" :value="funcionario.matricula">
                  </datalist>
                </div>
                <br/>
                <button class="btn btn-default" type="button" @click="adicionarMembro()"><span class="fa fa-plus"> Adicionar membro</button>
                <br/>
                <div v-for="(membro,index) in membros">
                  <li>{{membro.nome}} , {{membro.matricula}} <button class="btn btn-default btn-small" type="button" @click="removerMembro(index)"><span class="fa fa-remove"></span></button></li>
                </br>
                </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Descrição da Atividade</legend>
                  <div class="form-group">
                    <label class="control-label" for="polo">Nº O.S</label>
                    <textarea class="form-control" rows="3" v-model="descricao"></textarea>
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Identificação de Riscos</legend>
                  <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12" v-for="riscoidentificado in riscosIdentificados">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <input type="checkbox" :value="riscoidentificado" v-model="checkedRiscosIdentificados" aria-label="...">
                        </span>
                        <input type="text" class="form-control" :value="riscoidentificado.nome" readonly>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Equipamentos de Proteção Individual - EPI's necessários</legend>
                  <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12" v-for="equipamento in equipamentosIndividuais">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <input type="checkbox" :value="equipamento" v-model="checkedEquipamentosIndividuais">
                        </span>
                        <input type="text" class="form-control" :value="equipamento.nome" readonly>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Equipamentos de Proteção Coletiva - EPC's necessários</legend>
                  <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12" v-for="equipamento in equipamentosColetivos">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <input type="checkbox" :value="equipamento" v-model="checkedEquipamentosIndividuais" aria-label="...">
                        </span>
                        <input type="text" class="form-control" :value="equipamento.nome" readonly>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Análise preliminar das atividades</legend>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th>Perguntas</th>
                        <th style="width: 50px">Sim</th>
                        <th style="width: 50px">Não</th>
                        <th style="width: 50px">N/A</th>
                      </tr>
                        <tr v-for="pergunta in perguntasRisco">
                          <td>
                            {{pergunta.pergunta}}
                          </td>
                          <td>
                            <div class="radio">
                              <label>
                                <input type="radio" name="respostas[]" value="Sim" aria-label="...">
                              </label>
                            </div>
                          </td>
                          <td>
                            <div class="radio">
                              <label>
                                <input type="radio" name="respostas[]" value="Não" aria-label="...">
                              </label>
                            </div>
                          </td>
                          <td>
                            <div class="radio">
                              <label>
                                <input type="radio" name="respostas[]" value="N/A" aria-label="...">
                              </label>
                            </div>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Parecer da Equipe</legend>
                  <div class="form-group">
                    <label class="control-label">A atividade pode ser realizada com segurança?</label>
                    <label class="radio-inline">
                      <input type="radio" name="atividadeSegura" v-model="atividadeSegura" value="Sim"> Sim
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="atividadeSegura" v-model="atividadeSegura" value="Não"> Não
                    </label>
                  </div>
                  <br/>
                  <div class="form-group" v-if="atividadeSegura === 'Não'">
                    <label class="control-label">Justificativa</label>
                    <textarea class="form-control" rows="3" v-model="justificativa"></textarea>
                  </div>
                </fieldset>
                <br/>
                <fieldset>
                  <legend>Observação</legend>
                  <div class="form-group">
                    <textarea class="form-control" rows="3" v-model="observacao"></textarea>
                  </div>
                </fieldset>
                <br/>
                <div class="input-group" :class="[errorClass]">
                  <input type="submit" id="enviar" class="btn btn-primary">
                  <span class="help-block">{{mensagemEnvio}}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'novaanaliserisco',
    data () {
      return {
        localidadePoloSelecionada: '',
        localidadePoloSelecionadaCopia: '',
        justificativa: '',
        justificativaCopia: '',
        atividadeSegura: '',
        atividadeSeguraCopia: '',
        dataCriacao: '',
        dataCriacaoCopia: '',
        horaCriacao: '',
        horaCriacaoCopia: '',
        dataOcorrido: '',
        dataOcorridoCopia: '',
        descricaoAtividade: '',
        descricaoAtividadeCopia: '',
        observacao: '',
        observacaoCopia: '',
        endereco: '',
        enderecoCopia: '',
        cep: '',
        cepCopia: '',
        posicaoGeografica: '',
        posicaoGeograficaCopia: '',
        estado: '',
        estadoCopia: '',
        cidade: '',
        cidadeCopia: '',
        funcionario: '',
        nomeResponsavel: '',
        nomeResponsavelCopia: '',
        matriculaResponsavel: '',
        matriculaResponsavelCopia: '',
        tipoProcessoSelecionado: '',
        tipoProcessoSelecionadoCopia: '',
        analiserisco: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: '',
        vm: {
          searchPlace: '',
          location: {}
        },
        nomeMembro: '',
        matriculaMembro: '',
        membros: [],
        checkedEquipamentosColetivos: [],
        checkedEquipamentosIndividuais: [],
        checkedRiscosIdentificados: [],
        respostas: [],
        membro: '',
        membros2: [],
        riscoidentificado: '',
        equipamentoIndividual: '',
        index1: 0,
        index2: 0,
        possivelFuncionario: '',
        novosFuncionarios: [],
        novosFuncionariosCopia: []
      }
    },
    computed: {
      funcionarios () {
        return this.$store.state.funcionarios
      },
      tiposProcesso () {
        return this.$store.state.tiposprocesso
      },
      dados () {
        return this.vm.location
      },
      preenchido () {
        return this.vm.searchPlace
      },
      riscosIdentificados () {
        return this.$store.state.riscosidentificados
      },
      equipamentosIndividuais () {
        return this.$store.state.equipamentosindividuais
      },
      equipamentosColetivos () {
        return this.$store.state.equipamentoscoletivos
      },
      perguntasRisco () {
        return this.$store.state.perguntasrisco
      },
      localidadesPolo () {
        return this.$store.state.localidadespolo
      }
    },
    mounted () {
      this.getFuncionarios()
      this.getTiposProcesso()
      this.getEquipamentosColetivos()
      this.getEquipamentosIndividuais()
      this.getRiscosIdentificados()
      this.getPerguntasRisco()
      this.getLocalidadesPolo()
    },
    watch: {
      dados () {
        this.carregarEnderecos()
      },
      preenchido () {
        if (this.preenchido === '') {
          this.cep = ''
          this.estado = ''
          this.cidade = ''
          this.posicaoGeografica = ''
        }
      }
    },
    methods: {
      enviar () {
        this.dataCriacao = new Date().toLocaleDateString()
        this.horaCriacao = new Date().toLocaleTimeString()
        this.dataOcorrido = this.reverseData(this.dataOcorrido)
        this.dataCriacao = this.reverseData(this.dataCriacao)
        this.atividadeSeguraCopia = this.atividadeSegura
        this.justificativaCopia = this.justificativa
        this.dataCriacaoCopia = this.dataCriacao
        this.horaCriacaoCopia = this.horaCriacao
        this.dataOcorridoCopia = this.dataOcorrido
        this.descricaoAtividadeCopia = this.descricaoAtividade
        this.observacaoCopia = this.observacao
        this.enderecoCopia = this.endereco
        this.cepCopia = this.cep
        this.posicaoGeograficaCopia = this.posicaoGeografica
        this.estadoCopia = this.estado
        this.cidadeCopia = this.cidade
        this.nomeResponsavelCopia = this.nomeResponsavel
        this.matriculaResponsavelCopia = this.matriculaResponsavel
        this.tipoProcessoSelecionadoCopia = this.tipoProcessoSelecionado
        this.localidadePoloSelecionadaCopia = this.localidadePoloSelecionada
        this.$http.post('http://localhost:8000/dados/locais/novo_local', {
          'Endereco': this.endereco,
          'CEP': this.cep,
          'PosicaoGeografica': this.posicaoGeografica,
          'Estado': this.estado,
          'Cidade': this.cidade
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((dataLocal) => {
            this.$http.post('http://localhost:8000/formularios/analisesrisco/nova_analiserisco', {
              'DataCriacao': this.dataCriacao,
              'HoraCriacao': this.horaCriacao,
              'DataOcorrido': this.dataOcorrido,
              'DescricaoAtividade': this.descricaoAtividade,
              'AtividadeSegura': this.atividadeSegura,
              'Justificativa': this.justificativa,
              'Observacao': this.observacao,
              'TB_Local_idTB_Local': dataLocal.id,
              'TB_Funcionario_idTB_Funcionario': this.matriculaResponsavel,
              'TB_TipoProcesso_idTB_TipoProcesso': this.tipoProcessoSelecionado.id
            }).then((response) => {
              console.log('sucess ', response.body)
              response.json().then((dataAnalise) => {
                this.$store.commit('ADD_ANALISERISCO', {
                  'id': dataAnalise.id,
                  'dataCriacao': this.dataCriacaoCopia,
                  'horaCriacao': this.horaCriacaoCopia,
                  'dataOcorrido': this.dataOcorridoCopia,
                  'descricaoAtividade': this.descricaoAtividade,
                  'observacao': this.observacao,
                  'local': {
                    'id': dataLocal.id,
                    'endereco': this.enderecoCopia,
                    'cep': this.cepCopia,
                    'posicaoGeografica': this.posicaoGeograficaCopia,
                    'estado': this.estadoCopia,
                    'cidade': this.cidadeCopia
                  },
                  'funcionario': {
                    'matricula': this.matriculaResponsavelCopia,
                    'nome': this.nomeResponsavelCopia,
                    'dataNascimento': '',
                    'sexo': '',
                    'estadoCivil': '',
                    'inicioFuncao': '',
                    'grauInstrucao': '',
                    'estadoInstrucao': '',
                    'inicioRefeicao': '',
                    'fimRefeicao': '',
                    'turnoTrabalho': '',
                    'nacionalidade': '',
                    'local': {
                      'id': '',
                      'endereco': '',
                      'cep': '',
                      'posicaoGeografica': '',
                      'estado': '',
                      'cidade': ''
                    },
                    'funcao': {'id': '', 'nome': ''},
                    'localidadePolo': {'id': '', 'nome': '', 'polo': {'id': '', 'nome': '', 'regional': {'id': '', 'nome': ''}}}
                  },
                  'tipoProcesso': this.tipoProcessoSelecionadoCopia
                })
                this.analiserisco = this.$store.state.analisesrisco.length - 1
                for (this.riscoidentificado in this.checkedRiscosIdentificados) {
                  this.$http.post('http://localhost:8000/dados/riscosidentificadosanaliserisco/' + dataAnalise.id + '/' + this.checkedRiscosIdentificados[this.riscoidentificado].id, {
                  }).then((response) => {
                    console.log('sucess ', response.body)
                    this.$store.commit('ADD_RISCOSIDENTIFICADOSANALISERISCO', {
                      'index': this.analiserisco,
                      'riscoidentificado': this.checkedRiscosIdentificados[this.riscoidentificado]
                    })
                  }, (response) => {
                    console.log('erro: ', response)
                    this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                    this.error2Class = 'alert-warning'
                    this.erro = true
                  })
                }
                this.verificarFuncionarios(dataAnalise)
                for (this.membro in this.membros) {
                  this.$http.post('http://localhost:8000/dados/membrosanaliserisco/' + dataAnalise.id + '/' + this.membros[this.membro].matricula, {
                  }).then((response) => {
                    console.log('sucess ', response.body)
                    this.$store.commit('ADD_MEMBROSANALISERISCO', {
                      'index': this.analiserisco,
                      'membro': this.membros[this.membro]
                    })
                  }, (response) => {
                    console.log('erro: ', response)
                    this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                    this.error2Class = 'alert-warning'
                    this.erro = true
                  })
                }
                for (this.equipamentoIndividual in this.checkedEquipamentosIndividuais) {
                  this.$http.post('http://localhost:8000/dados/equipamentosindividuaisanaliserisco/' + dataAnalise.id + '/' + this.checkedEquipamentosIndividuais[this.equipamentoIndividual].id, {
                  }).then((response) => {
                    console.log('sucess ', response.body)
                    this.$store.commit('ADD_EQUIPAMENTOSINDIVIDUAISANALISERISCO', {
                      'index': this.analiserisco,
                      'equipamentoIndividual': {
                        'id': this.checkedEquipamentosIndividuais[this.equipamentoIndividual].id,
                        'nome': this.checkedEquipamentosIndividuais[this.equipamentoIndividual].nome
                      }
                    })
                  }, (response) => {
                    console.log('erro: ', response)
                    this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                    this.error2Class = 'alert-warning'
                    this.erro = true
                  })
                }
                for (this.equipamentoColetivo in this.checkedEquipamentosColetivos) {
                  this.$http.post('http://localhost:8000/dados/equipamentoscoletivosanaliserisco/' + dataAnalise.id + '/' + this.checkedEquipamentosColetivos[this.equipamentoColetivo].id, {
                  }).then((response) => {
                    console.log('sucess ', response.body)
                    this.$store.commit('ADD_EQUIPAMENTOSCOLETIVOSANALISERISCO', {
                      'index': this.analiserisco,
                      'equipamentoColetivo': {
                        'id': this.checkedEquipamentosColetivos[this.equipamentoColetivo].id,
                        'nome': this.checkedEquipamentosColetivos[this.equipamentoColetivo].nome
                      }
                    })
                  }, (response) => {
                    console.log('erro: ', response)
                    this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                    this.error2Class = 'alert-warning'
                    this.erro = true
                  })
                }
                for (this.pergunta in this.perguntasRisco) {
                  this.$http.post('http://localhost:8000/dados/respostasrisco/nova_resposta', {
                    'TB_AnaliseRisco_idTB_AnaliseRisco': dataAnalise.id,
                    'TB_PerguntaRisco_idTB_PerguntaRisco': this.perguntasRisco[this.pergunta].id,
                    'Resposta': this.respostas[this.pergunta]
                  }).then((response) => {
                    console.log('sucess ', response.body)
                    this.$store.commit('ADD_RESPOSTASRISCO', {
                      'index': this.analiserisco,
                      'perguntasRespondidas': {
                        'idReferencia': dataAnalise.id,
                        'idPergunta': this.perguntasRisco[this.pergunta].id,
                        'resposta': this.respostas[this.pergunta]
                      }
                    })
                  }, (response) => {
                    console.log('erro: ', response)
                    this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                    this.error2Class = 'alert-warning'
                    this.erro = true
                  })
                }
              })
              this.dataCriacao = ''
              this.horaCriacao = ''
              this.dataOcorrido = ''
              this.descricaoAtividade = ''
              this.observacao = ''
              this.endereco = ''
              this.cep = ''
              this.posicaoGeografica = ''
              this.estado = ''
              this.cidade = ''
              this.funcionarioSelecionado = ''
              this.tipoProcessoSelecionado = ''
              this.justificativa = ''
              this.atividadeSegura = ''
              this.localidadePoloSelecionada = ''
              this.checkedEquipamentosColetivos = []
              this.checkedEquipamentosIndividuais = []
              this.checkedRiscosIdentificados = []
              this.analiserisco = ''
              this.nomeMembro = ''
              this.matriculaMembro = ''
              this.membros = []
              this.checkedMembros = []
              this.respostas = []
              this.membro = ''
              this.riscoidentificado = ''
              this.equipamentoIndividual = ''
              this.errorClass = 'has-success'
              this.mensagemEnvio = 'Enviado com sucesso'
            }, (response) => {
              console.log('erro: ', response)
              this.errorClass = 'has-warning'
              this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
            })
          })
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      },
      getFuncionarios () {
        this.$http.get('http://localhost:8000/dados/funcionarios').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_FUNCIONARIOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
          this.erro = true
        })
      },
      getTiposProcesso () {
        this.$http.get('http://localhost:8000/dados/tiposprocesso').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_TIPOSPROCESSO', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
          this.erro = true
        })
      },
      getRiscosIdentificados () {
        this.$http.get('http://localhost:8000/dados/riscosidentificados').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_RISCOSIDENTIFICADOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      },
      getEquipamentosIndividuais () {
        this.$http.get('http://localhost:8000/dados/equipamentosindividuais').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_EQUIPAMENTOSINDIVIDUAIS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      },
      getEquipamentosColetivos () {
        this.$http.get('http://localhost:8000/dados/equipamentoscoletivos').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_EQUIPAMENTOSCOLETIVOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      },
      getPerguntasRisco () {
        this.$http.get('http://localhost:8000/dados/perguntasrisco').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_PERGUNTASRISCO', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.errorClass = 'alert-warning'
          this.erro = true
        })
      },
      getLocalidadesPolo () {
        this.$http.get('http://localhost:8000/dados/localidadespolo').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_LOCALIDADESPOLO', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.errorClass = 'alert-warning'
          this.erro = true
        })
      },
      desaparecer () {
        this.erro = false
      },
      reverseData (dataIn) {
        return dataIn.split('/').reverse().join('-')
      },
      procurarEndereco (pol) {
        for (var endereco in this.dados.address_components) {
          for (var politica in this.dados.address_components[endereco].types) {
            if (this.dados.address_components[endereco].types[politica] === pol) {
              return this.dados.address_components[endereco].long_name
            }
          }
        }
        return ''
      },
      carregarEnderecos () {
        this.endereco = this.procurarEndereco('route') + ' - ' + this.procurarEndereco('sublocality')
        this.cidade = this.procurarEndereco('administrative_area_level_2')
        this.estado = this.procurarEndereco('administrative_area_level_1')
        var cep = this.procurarEndereco('postal_code').split('-')
        this.cep = Number(cep[0] + cep[1])
        this.posicaoGeografica = JSON.stringify(this.vm.location.geometry.location)
      },
      adicionarMembro () {
        this.membros.push({'nome': this.nomeMembro, 'matricula': this.matriculaMembro})
        this.nomeMembro = ''
        this.matriculaMembro = ''
      },
      removerMembro (index) {
        this.membros.splice(index, 1)
      },
      verificarFuncionarios (dataAnalise) {
        var novo = true
        for (this.possivelFuncionario in this.membros) {
          for (this.funcionario in this.funcionarios) {
            if (this.membros[this.possivelFuncionario].matricula === this.funcionarios[this.funcionario].matricula) {
              novo = false
            }
          }
          if (novo === true) {
            this.novosFuncionarios.push(this.membros[this.possivelFuncionario])
            this.novosFuncionariosCopia.push(this.membros[this.possivelFuncionario])
            console.log('adicionou1')
          } else {
            this.membros2.push(this.membros[this.possivelFuncionario])
            console.log('adicionou2')
          }
          novo = true
        }
        this.membros = this.membros2
        if (this.novosFuncionarios.length !== 0) {
          console.log('executou2')
          this.index1 = 0
          for (this.funcionario in this.novosFuncionariosCopia) {
            console.log('executou3')
            this.$http.post('http://localhost:8000/dados/funcionarios/novo_funcionario', {
              'Matricula': this.novosFuncionarios[this.funcionario].matricula,
              'Nome': this.novosFuncionarios[this.funcionario].nome,
              'DataNascimento': '0000-00-00',
              'Sexo': '',
              'EstadoCivil': '',
              'InicioFuncao': '',
              'GrauInstrucao': '',
              'EstadoInstrucao': '',
              'InicioRefeicao': '',
              'FinalRefeicao': '',
              'TurnoTrabalho': '',
              'Nacionalidade': '',
              'TB_Local_idTB_Local': 'NULL',
              'TB_Funcao_idTB_Funcao': 'NULL',
              'TB_LocalidadePolo_idTB_LocalidadePolo': 'NULL'
            }).then((response) => {
              console.log('sucess ', response.body)
              response.json().then((dataFuncionario) => {
                this.$store.commit('ADD_FUNCIONARIO', {
                  'matricula': this.novosFuncionariosCopia[this.index1].matricula,
                  'nome': this.novosFuncionariosCopia[this.index1].nome,
                  'dataNascimento': '',
                  'sexo': '',
                  'estadoCivil': '',
                  'inicioFuncao': '',
                  'grauInstrucao': '',
                  'estadoInstrucao': '',
                  'inicioRefeicao': '',
                  'fimRefeicao': '',
                  'turnoTrabalho': '',
                  'nacionalidade': '',
                  'local': {
                    'id': '',
                    'endereco': '',
                    'cep': '',
                    'posicaoGeografica': '',
                    'estado': '',
                    'cidade': ''
                  },
                  'funcao': {'id': '', 'nome': ''},
                  'localidadePolo': {'id': '', 'nome': '', 'polo': {'id': '', 'nome': '', 'regional': {'id': '', 'nome': ''}}}
                })
                console.log('valor ' + this.index1)
                this.$http.post('http://localhost:8000/dados/membrosanaliserisco/' + dataAnalise.id + '/' + this.membros[this.index1].matricula, {
                }).then((response) => {
                  console.log('sucess ', response.body)
                  this.$store.commit('ADD_MEMBROSANALISERISCO', {
                    'index': this.analiserisco,
                    'membro': this.membros[this.index2]
                  })
                  this.index2++
                }, (response) => {
                  console.log('erro: ', response)
                  this.mensagemErro = 'Falha na rede. Verifique sua conexão'
                  this.error2Class = 'alert-warning'
                  this.erro = true
                })
                this.index1++
              })
            }, (response) => {
              console.log('erro: ', response)
              this.errorClass = 'has-warning'
              this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
            })
          }
        }
      },
      verificarResponsavel () {
        for (this.funcionario in this.funcionarios) {
          if (this.matriculaResponsavel === this.funcionarios[this.funcionario].matricula) {
            console.log('executou3')
            this.$http.post('http://localhost:8000/dados/funcionarios/novo_funcionario', {
              'Matricula': this.matriculaResponsavel,
              'Nome': this.nomeResponsavel,
              'DataNascimento': '0000-00-00',
              'Sexo': '',
              'EstadoCivil': '',
              'InicioFuncao': '',
              'GrauInstrucao': '',
              'EstadoInstrucao': '',
              'InicioRefeicao': '',
              'FinalRefeicao': '',
              'TurnoTrabalho': '',
              'Nacionalidade': '',
              'TB_Local_idTB_Local': 'NULL',
              'TB_Funcao_idTB_Funcao': 'NULL',
              'TB_LocalidadePolo_idTB_LocalidadePolo': 'NULL'
            }).then((response) => {
              console.log('sucess ', response.body)
              response.json().then((dataFuncionario) => {
                this.$store.commit('ADD_FUNCIONARIO', {
                  'matricula': this.matriculaResponsavel,
                  'nome': this.nomeResponsavel,
                  'dataNascimento': '',
                  'sexo': '',
                  'estadoCivil': '',
                  'inicioFuncao': '',
                  'grauInstrucao': '',
                  'estadoInstrucao': '',
                  'inicioRefeicao': '',
                  'fimRefeicao': '',
                  'turnoTrabalho': '',
                  'nacionalidade': '',
                  'local': {
                    'id': '',
                    'endereco': '',
                    'cep': '',
                    'posicaoGeografica': '',
                    'estado': '',
                    'cidade': ''
                  },
                  'funcao': {'id': '', 'nome': ''},
                  'localidadePolo': {'id': '', 'nome': '', 'polo': {'id': '', 'nome': '', 'regional': {'id': '', 'nome': ''}}}
                })
              })
            }, (response) => {
              console.log('erro: ', response)
              this.errorClass = 'has-warning'
              this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
            })
            break
          }
        }
      }
    }
  }
</script>
<style></style>
