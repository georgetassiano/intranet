<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Novo Processo</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/processos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="input-group">
                  <span class="input-group-addon" id="processo">Nome</span>
                  <input type="text" class="form-control" id="processo" placeholder="Nome do processo" v-model="nome" required>
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
    name: 'novaprocesso',
    data () {
      return {
        nome: '',
        nomeCopia: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.$http.post('http://localhost:8000/dados/processos/novo_processo', {
          'Nome': this.nome
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_PROCESSO', {
              'id': data.id,
              'nome': this.nomeCopia
            })
          })
          this.nome = ''
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      }
    }
  }
</script>
<style></style>
