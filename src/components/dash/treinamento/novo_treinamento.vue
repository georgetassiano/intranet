<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Novo Treinamento</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/treinamentos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
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
    name: 'novotreinamento',
    data () {
      return {
        nome: '',
        codigo: '',
        nomeCopia: '',
        codigoCopia: '',
        conteudoProgramatico: '',
        conteudoProgramaticoCopia: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.codigoCopia = this.codigo
        this.conteudoProgramaticoCopia = this.conteudoProgramatico
        this.$http.post('http://localhost:8000/dados/treinamentos/novo_treinamento', {
          'Nome': this.nome,
          'Codigo': this.codigo,
          'ConteudoProgramatico': this.conteudoProgramatico
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_TREINAMENTO', {
              'id': data.id,
              'nome': this.nomeCopia,
              'codigo': this.codigoCopia,
              'conteudoProgramatico': this.conteudoProgramaticoCopia
            })
          })
          this.nome = ''
          this.codigo = ''
          this.conteudoProgramatico = ''
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
