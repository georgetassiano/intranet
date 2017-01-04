<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Informação da Localidade</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/localidadespolo" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <dl class="dl-horizontal">
                <dt>Nome:</dt>
                <dd>{{localidadepolo.nome|capitalize}}</dd>
                <dt>Polo:</dt>
                <dd>{{localidadepolo.polo.nome|capitalize}}</dd>
                <dt>Regional:</dt>
                <dd>{{localidadepolo.polo.regional.nome|capitalize}}</dd>
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
    name: 'localidadepolo',
    data () {
      return {
      }
    },
    computed: {
      localidadepolo () {
        return this.$store.state.localidadespolo[this.$route.query.index]
      }
    }
  }
</script>
<style>

</style>
