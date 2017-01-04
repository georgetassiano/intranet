<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Nova Pergunta</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/perguntasrisco" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="input-group">
                  <span class="input-group-addon" id="pergunta">Pergunta</span>
                  <input type="text" class="form-control" id="pergunta" placeholder="Nome da pergunta" v-model="pergunta" required>
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
    name: 'novaperguntarisco',
    data () {
      return {
        pergunta: '',
        perguntaCopia: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    methods: {
      enviar () {
        this.perguntaCopia = this.pergunta
        this.$http.post('http://localhost:8000/dados/perguntasrisco/nova_perguntarisco', {
          'Pergunta': this.pergunta
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_PERGUNTARISCO', {
              'id': data.id,
              'pergunta': this.perguntaCopia
            })
          })
          this.pergunta = ''
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
