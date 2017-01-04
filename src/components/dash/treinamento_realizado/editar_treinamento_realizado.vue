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
              <form @submit.prevent="alterar">
                <div class="input-group">
                  <span class="input-group-addon">Funcionario</span>
                  <input type="text" class="form-control" v-model="idFuncionario.nome" readonly>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon">Treinamento</span>
                  <input type="text" class="form-control" v-model="idTreinamento.nome" readonly>
                </div>
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
    name: 'editartreinamentosrealizados',
    data () {
      return {
        idFuncionario: '',
        idTreinamento: '',
        data: '',
        instrutor: '',
        dataCopia: '',
        instrutorCopia: '',
        cargaHoraria: '',
        cargaHorariaCopia: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      treinamentoRealizado () {
        return this.$store.state.treinamentosRealizados[this.$route.query.index]
      }
    },
    watch: {
      treinamentoRealizado () {
        this.idFuncionario = this.$store.state.treinamentosRealizados[this.$route.query.index].idFuncionario
        this.idTreinamento = this.$store.state.treinamentosRealizados[this.$route.query.index].idTreinamento
        this.data = this.$store.state.treinamentosRealizados[this.$route.query.index].data
        this.instrutor = this.$store.state.treinamentosRealizados[this.$route.query.index].instrutor
        this.cargaHoraria = this.$store.state.treinamentosRealizados[this.$route.query.index].cargaHoraria
      }
    },
    mounted () {
      this.idFuncionario = this.$store.state.treinamentosRealizados[this.$route.query.index].idFuncionario
      this.idTreinamento = this.$store.state.treinamentosRealizados[this.$route.query.index].idTreinamento
      this.data = this.$store.state.treinamentosRealizados[this.$route.query.index].data
      this.instrutor = this.$store.state.treinamentosRealizados[this.$route.query.index].instrutor
      this.cargaHoraria = this.$store.state.treinamentosRealizados[this.$route.query.index].cargaHoraria
    },
    methods: {
      alterar () {
        this.data = this.reverseData(this.data)
        this.dataCopia = this.data
        this.instrutorCopia = this.instrutor
        this.$http.put('http://localhost:8000/dados/treinamentosrealizados/' + this.$store.state.treinamentosRealizados[this.$route.query.index].idFuncionario.matricula + '/' + this.$store.state.treinamentosRealizados[this.$route.query.index].idTreinamento.id, {
          'Data': this.data,
          'Instrutor': this.instrutor,
          'CargaHoraria': this.cargaHoraria
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_TREINAMENTOREALIZADO', {
            'index': this.$route.query.index,
            'data': this.dataCopia,
            'instrutor': this.instrutorCopia,
            'cargaHoraria': this.cargaHorariaCopia
          })
          this.idFuncionario = this.$store.state.treinamentosRealizados[this.$route.query.index].idFuncionario
          this.idTreinamento = this.$store.state.treinamentosRealizados[this.$route.query.index].idTreinamento
          this.data = this.$store.state.treinamentosRealizados[this.$route.query.index].data
          this.instrutor = this.$store.state.treinamentosRealizados[this.$route.query.index].instrutor
          this.cargaHoraria = this.$store.state.treinamentosRealizados[this.$route.query.index].cargaHoraria
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      },
      desaparecer () {
        this.erro = false
      },
      reverseData (dataIn) {
        return dataIn.split('/').reverse().join('-')
      }
    }
  }
</script>
<style></style>
