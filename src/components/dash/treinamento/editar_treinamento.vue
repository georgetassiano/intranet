<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Editar Treinamento</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/treinamentos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="alterar">
                <div class="input-group">
                  <span class="input-group-addon" id="nome">Nome</span>
                  <input type="text" class="form-control" id="nome" placeholder="Nome do treinamento" v-model="nome" required>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon">Código</span>
                  <input type="text" class="form-control" placeholder="Código do treinamento" v-model="codigo" required>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label" for="conteudo">Conteudo Programático:</label>
                  <textarea class="form-control" id="conteudo" rows="3" v-model="conteudoProgramatico" required></textarea>
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
    name: 'editartreinamento',
    data () {
      return {
        nome: '',
        codigo: '',
        conteudoProgramatico: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    computed: {
      treinamento () {
        return this.$store.state.treinamentos[this.$route.query.index]
      }
    },
    watch: {
      treinamento () {
        this.nome = this.$store.state.treinamentos[this.$route.query.index].nome
        this.codigo = this.$store.state.treinamentos[this.$route.query.index].codigo
        this.conteudoProgramatico = this.$store.state.treinamentos[this.$route.query.index].conteudoProgramatico
      }
    },
    mounted () {
      this.nome = this.$store.state.treinamentos[this.$route.query.index].nome
      this.codigo = this.$store.state.treinamentos[this.$route.query.index].codigo
      this.conteudoProgramatico = this.$store.state.treinamentos[this.$route.query.index].conteudoProgramatico
    },
    methods: {
      alterar () {
        this.$http.put('http://localhost:8000/dados/treinamentos/' + this.treinamento.id, {
          'Nome': this.nome,
          'Codigo': this.codigo,
          'ConteudoProgramatico': this.conteudoProgramatico
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_TREINAMENTO', {
            'index': this.$route.query.index,
            'nome': this.nome,
            'codigo': this.codigo,
            'conteudoProgramatico': this.conteudoProgramatico
          })
          this.nome = this.$store.state.treinamentos[this.$route.query.index].nome
          this.codigo = this.$store.state.treinamentos[this.$route.query.index].codigo
          this.conteudoProgramatico = this.$store.state.treinamentos[this.$route.query.index].conteudoProgramatico
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
