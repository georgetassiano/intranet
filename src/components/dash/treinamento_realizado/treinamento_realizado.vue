<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Informação do Treinamento</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/treinamentosrealizados" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <dl class="dl-horizontal">
                <dt>Funcionário:</dt>
                <dd>{{treinamentoRealizado.idFuncionario.nome|capitalize}}</dd>
                <dt>Treinamento:</dt>
                <dd>{{treinamentoRealizado.idTreinamento.nome|capitalize}}</dd>
                <dt>Data:</dt>
                <dd>{{treinamentoRealizado.data|reverse}}</dd>
                <dt>Instrutor:</dt>
                <dd>{{treinamentoRealizado.instrutor|capitalize}}</dd>
                <dt>Carga Horária:</dt>
                <dd>{{treinamentoRealizado.cargaHoraria|capitalize}}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'treinamentorealizado',
    data () {
      return {
      }
    },
    computed: {
      treinamentoRealizado () {
        return this.$store.state.treinamentosRealizados[this.$route.query.index]
      },
      reverseData (dataIn) {
        return dataIn.split('/').reverse().join('-')
      }
    }
  }
</script>
<style>

</style>
