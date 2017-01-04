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
              <h3 class="box-title">Novo Treinamento Realizado</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/treinamentosrealizados" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="form-group">
                  <label class="control-label" for="treinamento">Treinamento</label>
                  <select class="form-control" id="treinamento" v-model="treinamentoSelecionado" required>
                    <option v-for="treinamento in treinamentos" :value="treinamento">{{treinamento.nome}}</option>
                  </select>
                </div>
                <br/>
                <fieldset>
                <legend>Funcionarios treinados</legend>
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
                <button class="btn btn-default" type="button" @click="adicionarMembro()"><span class="fa fa-plus"> Adicionar novo</button>
                <br/>
                <div v-for="(membro,index) in membros">
                  <li>{{membro.nome}} , {{membro.matricula}} <button class="btn btn-default btn-small" type="button" @click="removerMembro(index)"><span class="fa fa-remove"></span></button></li>
                </br>
                </div>
                </fieldset>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon">Data do treinamento</span>
                  <input type="date" class="form-control" placeholder="31/12/1994" v-model="data" required>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="instrutor">Instrutor</span>
                  <input type="text" class="form-control" id="instrutor" placeholder="Nome do instrutor" v-model="instrutor" required>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="cargaHoraria">Carga Horaria</span>
                  <input type="number" class="form-control" id="cargaHoraria" placeholder="ex: 20" v-model="cargaHoraria" required>
                  <span class="input-group-addon" id="cargaHoraria">Horas</span>
                </div>
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
    nome: 'novotreinamentorealizado',
    data () {
      return {
        index: 0,
        index1: 0,
        index2: 0,
        membros2: [],
        possivelFuncionario: '',
        novosFuncionarios: [],
        novosFuncionariosCopia: [],
        funcionario: '',
        funcionariosSelecionados: [],
        funcionariosSelecionadosCopia: [],
        funcionarioSelecionado: '',
        treinamentoSelecionado: '',
        treinamentoCopia: '',
        data: '',
        dataCopia: '',
        instrutorCopia: '',
        instrutor: '',
        cargaHoraria: '',
        cargaHorariaCopia: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: '',
        nomeMembro: '',
        matriculaMembro: '',
        membros: []
      }
    },
    computed: {
      treinamentos () {
        return this.$store.state.treinamentos
      },
      funcionarios () {
        return this.$store.state.funcionarios
      }
    },
    mounted () {
      this.getTreinamentos()
      this.getFuncionarios()
    },
    methods: {
      enviar () {
        if (this.membros.length === 0) {
          this.mensagemErro = 'Insira pelo menos um funcionário que realizou o treinamento clicando em "Adicionar novo" após preencher os dados dele.'
          this.error2Class = 'alert-warning'
          this.erro = true
        } else {
          this.treinamentoCopia = this.treinamentoSelecionado
          this.cargaHorariaCopia = this.cargaHoraria
          this.dataCopia = this.data
          this.instrutorCopia = this.instrutor
          this.verificarFuncionarios()
          console.log('saiu')
          if (this.membros.length !== 0) {
            this.index = 0
            this.data = this.reverseData(this.data)
            this.funcionariosSelecionados = this.membros
            this.funcionariosSelecionadosCopia = this.funcionariosSelecionados
            for (this.funcionarioSelecionado in this.funcionariosSelecionadosCopia) {
              this.$http.post('http://localhost:8000/dados/treinamentosrealizados/' + this.funcionariosSelecionados[this.funcionarioSelecionado].matricula + '/' + this.treinamentoSelecionado.id, {
                'Data': this.data,
                'Instrutor': this.instrutor,
                'CargaHoraria': this.cargaHoraria
              }).then((response) => {
                console.log('sucess ', response.body)
                this.$store.commit('ADD_TREINAMENTOREALIZADO', {
                  'idFuncionario': this.funcionariosSelecionadosCopia[this.index],
                  'idTreinamento': this.treinamentoCopia,
                  'data': this.dataCopia,
                  'instrutor': this.instrutorCopia,
                  'cargaHoraria': this.cargaHorariaCopia
                })
                this.index++
                this.errorClass = 'has-success'
                this.mensagemEnvio = 'Enviado com sucesso'
              }, (response) => {
                console.log('erro: ', response)
                this.errorClass = 'has-warning'
                this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
              })
            }
            this.data = ''
            this.instrutor = ''
            this.treinamentoSelecionado = ''
            this.funcionariosSelecionados = []
            this.cargaHoraria = ''
          }
        }
      },
      getTreinamentos () {
        this.$http.get('http://localhost:8000/dados/treinamentos').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_TREINAMENTOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
          this.erro = true
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
      desaparecer () {
        this.erro = false
      },
      reverseData (dataIn) {
        return dataIn.split('/').reverse().join('-')
      },
      linkar (valor) {
        this.funcionarioSelecionado = valor
      },
      adicionarMembro () {
        this.membros.push({'nome': this.nomeMembro, 'matricula': this.matriculaMembro})
        this.nomeMembro = ''
        this.matriculaMembro = ''
      },
      removerMembro (index) {
        this.membros.splice(index, 1)
      },
      listaSelecionada (matricula) {
        this.matriculaMembro = matricula
      },
      verificarFuncionarios () {
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
                this.$http.post('http://localhost:8000/dados/treinamentosrealizados/' + this.novosFuncionariosCopia[this.index1].matricula + '/' + this.treinamentoSelecionado.id, {
                  'Data': this.data,
                  'Instrutor': this.instrutor,
                  'CargaHoraria': this.cargaHoraria
                }).then((response) => {
                  console.log('sucess ', response.body)
                  this.$store.commit('ADD_TREINAMENTOREALIZADO', {
                    'idFuncionario': this.novosFuncionariosCopia[this.index2],
                    'idTreinamento': this.treinamentoCopia,
                    'data': this.dataCopia,
                    'instrutor': this.instrutorCopia,
                    'cargaHoraria': this.cargaHorariaCopia
                  })
                  this.index2++
                }, (response) => {
                  console.log('erro: ', response)
                  this.errorClass = 'has-warning'
                  this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
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
      }
    }
  }
</script>
<style></style>
