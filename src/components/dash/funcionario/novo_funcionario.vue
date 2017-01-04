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
              <h3 class="box-title">Novo Funcionario</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/funcionarios" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="form-group">
                  <label class="control-label" for="localidadePolo">Local de trabalho</label>
                  <select class="form-control" id="localidadePolo" v-model="localidadePoloSelecionada" required>
                    <option v-for="localidadePolo in localidadesPolo" :value="localidadePolo">{{localidadePolo.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Cargo:</label>
                  <select v-model="funcaoSelecionada" class="form-control">
                    <option v-for="funcao in funcoes" :value="funcao">{{funcao.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="nome">Nome</span>
                  <input type="text" class="form-control" id="nome" placeholder="Nome do Funcionario" v-model="nome" required>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="matricula">Matrícula</span>
                  <input type="number" class="form-control" id="matricula" placeholder="9999999" v-model="matricula" maxlength="15" required>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon">Data de Nascimento</span>
                    <input type="date" class="form-control" placeholder="31/12/1994" v-model="dataNascimento">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="nacionalidade">Nacionalidade</span>
                  <input type="text" class="form-control" id="nacionalidade" placeholder="Brasileira,..etc" v-model="nacionalidade">
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Sexo </label>
                  <br/>
                  <label class="radio-inline">
                    <input type="radio" value="Masculino" v-model="sexo"> Masculino
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Feminino" v-model="sexo"> Feminino
                  </label>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Estado Civíl </label>
                  <br/>
                  <label class="radio-inline">
                    <input type="radio" value="Solteiro(a)" v-model="estadoCivil"> Solteiro(a)
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Casado(a)" v-model="estadoCivil"> Casado(a)
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Divorciado(a)" v-model="estadoCivil"> Divorciado(a)
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Outros" v-model="estadoCivil"> Outros
                  </label>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon">Inicio no cargo</span>
                    <input type="date" class="form-control" placeholder="31/12/1994" v-model="inicioFuncao">
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Grau de instrução </label>
                  <br/>
                  <label class="radio-inline">
                    <input type="radio" value="Ensino médio" v-model="grauInstrucao"> Ensino médio
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Ensino superior" v-model="grauInstrucao"> Ensino Superior
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Ensino técnico" v-model="grauInstrucao"> Ensino Técnico
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Pós-graduação/Especialização" v-model="grauInstrucao"> Pós-graduação/Especialização
                  </label>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Estado da Instrução </label>
                  <br/>
                  <label class="radio-inline">
                    <input type="radio" value="Incompleta" v-model="estadoInstrucao"> Incompleto
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Completa" v-model="estadoInstrucao"> Completo
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Cursando" v-model="estadoInstrucao"> Cursando
                  </label>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="inicioRefeicao">Inicio das Refeições</span>
                  <input type="time" class="form-control" id="inicioRefeicao" v-model="inicioRefeicao">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="fimRefeicao">Fim das Refeições</span>
                  <input type="time" class="form-control" id="fimRefeicao" v-model="fimRefeicao">
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label">Turno de trabalho </label>
                  <br/>
                  <label class="radio-inline">
                    <input type="radio" value="Revezamento(6 e 4 horas ininterruptas)" v-model="turnoTrabalho"> Revezamento(6 e 4 horas ininterruptas)
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Normal(08:00-12:00/14:00-18:00)" v-model="turnoTrabalho"> Normal(08:00-12:00/14:00-18:00)
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="Outros" v-model="turnoTrabalho"> Outros
                  </label>
                </div>
                <br/>
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
    name: 'novofuncionario',
    data () {
      return {
        nome: '',
        matricula: '',
        dataNascimento: '',
        sexo: '',
        estadoCivil: '',
        inicioFuncao: '',
        grauInstrucao: '',
        estadoInstrucao: '',
        inicioRefeicao: '',
        fimRefeicao: '',
        turnoTrabalho: '',
        nacionalidade: '',
        endereco: '',
        cep: '',
        posicaoGeografica: '',
        estado: '',
        cidade: '',
        funcaoSelecionada: '',
        localidadePoloSelecionada: '',
        nomeCopia: '',
        matriculaCopia: '',
        dataNascimentoCopia: '',
        sexoCopia: '',
        estadoCivilCopia: '',
        inicioFuncaoCopia: '',
        grauInstrucaoCopia: '',
        estadoInstrucaoCopia: '',
        inicioRefeicaoCopia: '',
        fimRefeicaoCopia: '',
        turnoTrabalhoCopia: '',
        nacionalidadeCopia: '',
        enderecoCopia: '',
        cepCopia: '',
        posicaoGeograficaCopia: '',
        estadoCopia: '',
        cidadeCopia: '',
        funcaoSelecionadaCopia: '',
        localidadePoloSelecionadaCopia: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: '',
        vm: {
          searchPlace: '',
          location: {}
        }
      }
    },
    computed: {
      funcoes () {
        return this.$store.state.funcoes
      },
      localidadesPolo () {
        return this.$store.state.localidadespolo
      },
      dados () {
        return this.vm.location
      },
      preenchido () {
        return this.vm.searchPlace
      }
    },
    mounted () {
      this.getFuncoes()
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
        this.dataNascimento = this.reverseData(this.dataNascimento)
        this.inicioFuncao = this.reverseData(this.inicioFuncao)
        this.nomeCopia = this.nome
        this.matriculaCopia = this.matricula
        this.dataNascimentoCopia = this.dataNascimento
        this.sexoCopia = this.sexo
        this.estadoCivilCopia = this.estadoCivil
        this.inicioFuncaoCopia = this.inicioFuncao
        this.grauInstrucaoCopia = this.grauInstrucao
        this.estadoInstrucaoCopia = this.estadoInstrucao
        this.inicioRefeicaoCopia = this.inicioRefeicao
        this.fimRefeicaoCopia = this.fimRefeicao
        this.turnoTrabalhoCopia = this.turnoTrabalho
        this.nacionalidadeCopia = this.nacionalidade
        this.enderecoCopia = this.endereco
        this.cepCopia = this.cep
        this.posicaoGeograficaCopia = this.posicaoGeografica
        this.estadoCopia = this.estado
        this.cidadeCopia = this.cidade
        this.funcaoCopia = this.funcaoSelecionada
        this.localidadePoloCopia = this.localidadePoloSelecionada
        this.$http.post('http://localhost:8000/dados/locais/novo_local', {
          'Endereco': this.endereco,
          'CEP': this.cep,
          'PosicaoGeografica': this.posicaoGeografica,
          'Estado': this.estado,
          'Cidade': this.cidade
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((dataLocal) => {
            this.$http.post('http://localhost:8000/dados/funcionarios/novo_funcionario', {
              'Matricula': this.matricula,
              'Nome': this.nome,
              'DataNascimento': this.dataNascimento,
              'Sexo': this.sexo,
              'EstadoCivil': this.estadoCivil,
              'InicioFuncao': this.inicioFuncao,
              'GrauInstrucao': this.grauInstrucao,
              'EstadoInstrucao': this.estadoInstrucao,
              'InicioRefeicao': this.inicioRefeicao,
              'FinalRefeicao': this.fimRefeicao,
              'TurnoTrabalho': this.turnoTrabalho,
              'Nacionalidade': this.nacionalidade,
              'TB_Local_idTB_Local': dataLocal.id,
              'TB_Funcao_idTB_Funcao': this.funcaoSelecionada.id,
              'TB_LocalidadePolo_idTB_LocalidadePolo': this.localidadePoloSelecionada.id
            }).then((response) => {
              console.log('sucess ', response.body)
              response.json().then((dataFuncionario) => {
                this.$store.commit('ADD_FUNCIONARIO', {
                  'matricula': this.matriculaCopia,
                  'nome': this.nomeCopia,
                  'dataNascimento': this.dataNascimentoCopia,
                  'sexo': this.sexoCopia,
                  'estadoCivil': this.estadoCivilCopia,
                  'inicioFuncao': this.inicioFuncaoCopia,
                  'grauInstrucao': this.grauInstrucaoCopia,
                  'estadoInstrucao': this.estadoInstrucaoCopia,
                  'inicioRefeicao': this.inicioRefeicaoCopia,
                  'fimRefeicao': this.fimRefeicaoCopia,
                  'turnoTrabalho': this.turnoTrabalhoCopia,
                  'nacionalidade': this.nacionalidadeCopia,
                  'local': {
                    'id': dataLocal.id,
                    'endereco': this.enderecoCopia,
                    'cep': this.cepCopia,
                    'posicaoGeografica': this.posicaoGeograficaCopia,
                    'estado': this.estadoCopia,
                    'cidade': this.cidadeCopia
                  },
                  'funcao': this.funcaoCopia,
                  'localidadePolo': this.localidadePoloCopia
                })
              })
              this.nome = ''
              this.matricula = ''
              this.dataNascimento = ''
              this.sexo = ''
              this.estadoCivil = ''
              this.inicioFuncao = ''
              this.grauInstrucao = ''
              this.estadoInstrucao = ''
              this.inicioRefeicao = ''
              this.fimRefeicao = ''
              this.turnoTrabalho = ''
              this.nacionalidade = ''
              this.endereco = ''
              this.cep = ''
              this.posicaoGeografica = ''
              this.estado = ''
              this.cidade = ''
              this.funcaoSelecionada = ''
              this.localidadePoloSelecionada = ''
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
      getFuncoes () {
        this.$http.get('http://localhost:8000/dados/funcoes').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_FUNCOES', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
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
      }
    }
  }
</script>
<style>

</style>
