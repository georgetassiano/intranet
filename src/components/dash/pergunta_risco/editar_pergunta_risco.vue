<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Editar Pergunta</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/perguntasrisco" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="alterar">
                <div class="input-group">
                  <span class="input-group-addon" id="pergunta">Pergunta</span>
                  <input type="text" class="form-control" id="pergunta" placeholder="Nome da pergunta" v-model="pergunta" required>
                </div>
                <br/>
                <div class="input-group" :class="[errorClass]">
                  <input type="submit" class="btn btn-primary">
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
    name: 'editarperguntarisco',
    data () {
      return {
        id: '',
        pergunta: '',
        perguntaCopia: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    computed: {
      perguntarisco () {
        return this.$store.state.perguntasrisco[this.$route.query.index]
      }
    },
    watch: {
      perguntarisco () {
        this.pergunta = this.$store.state.perguntasrisco[this.$route.query.index].pergunta
      }
    },
    mounted () {
      this.pergunta = this.$store.state.perguntasrisco[this.$route.query.index].pergunta
    },
    methods: {
      alterar () {
        this.perguntaCopia = this.pergunta
        this.$http.put('http://localhost:8000/dados/perguntasrisco/' + this.perguntarisco.id, {
          'Pergunta': this.pergunta
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_PERGUNTARISCO', {
            'index': this.$route.query.index,
            'pergunta': this.perguntaCopia
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
