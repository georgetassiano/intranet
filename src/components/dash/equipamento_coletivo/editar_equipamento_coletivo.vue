<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Editar Equipamento</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/equipamentoscoletivos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="alterar">
                <div class="input-group">
                  <span class="input-group-addon" id="equipamento">Nome</span>
                  <input type="text" class="form-control" id="equipamento" placeholder="Nome do equipamento" v-model="nome" required>
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
    name: 'editarequipamentocoletivo',
    data () {
      return {
        id: '',
        nome: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    computed: {
      equipamentocoletivo () {
        return this.$store.state.equipamentoscoletivos[this.$route.query.index]
      }
    },
    watch: {
      equipamentocoletivo () {
        this.nome = this.$store.state.equipamentoscoletivos[this.$route.query.index].nome
      }
    },
    mounted () {
      this.nome = this.$store.state.equipamentoscoletivos[this.$route.query.index].nome
    },
    methods: {
      alterar () {
        this.$http.put('http://localhost:8000/dados/equipamentoscoletivos/' + this.equipamentocoletivo.id, {
          'Nome': this.nome
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_EQUIPAMENTOCOLETIVO', {
            'index': this.$route.query.index,
            'nome': this.nome
          })
          this.nome = this.$store.state.equipamentoscoletivos[this.$route.query.index].nome
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro ' + response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      }
    }
  }
</script>
<style></style>
