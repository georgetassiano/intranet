<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Informação do Funcionario</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/funcionarios" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <dl class="dl-horizontal">
                <dt>Nome:</dt>
                <dd>{{funcionario.nome|capitalize}}</dd>
                <dt>Matrícula:</dt>
                <dd>{{funcionario.matricula|capitalize}}</dd>
                <dt>Data de Nascimento:</dt>
                <dd>{{funcionario.dataNascimento|reverse}}</dd>
                <dt>Sexo:</dt>
                <dd>{{funcionario.sexo|capitalize}}</dd>
                <dt>Estado Civil:</dt>
                <dd>{{funcionario.estadoCivil|capitalize}}</dd>
                <dt>Cargo:</dt>
                <dd>{{funcionario.funcao.nome|capitalize}}</dd>
                <dt>Inicio na Função:</dt>
                <dd>{{funcionario.inicioFuncao|reverse}}</dd>
                <dt>Grau de Instrução:</dt>
                <dd>{{funcionario.grauInstrucao|capitalize}}</dd>
                <dt>Estado da instrução:</dt>
                <dd>{{funcionario.estadoInstrucao|capitalize}}</dd>
                <dt>Inicio das refeições:</dt>
                <dd>{{funcionario.inicioRefeicao|capitalize}}</dd>
                <dt>Fim das refeições:</dt>
                <dd>{{funcionario.fimRefeicao|capitalize}}</dd>
                <dt>Turno de trabalho:</dt>
                <dd>{{funcionario.turnoTrabalho|capitalize}}</dd>
                <dt>Nacionalidade:</dt>
                <dd>{{funcionario.nacionalidade|capitalize}}</dd>
                <dt>Endereço:</dt>
                <dd>{{funcionario.local.endereco|capitalize}}</dd>
                <dt>CEP:</dt>
                <dd>{{funcionario.local.cep|capitalize}}</dd>
                <dt>Estado:</dt>
                <dd>{{funcionario.local.estado|capitalize}}</dd>
                <dt>Cidade:</dt>
                <dd>{{funcionario.local.cidade|capitalize}}</dd>
                <dt>Local de trabalho:</dt>
                <dd>{{funcionario.localidadePolo.nome|capitalize}}</dd>
              </dl>
            </div>
            <div style="width: 100%; height: 300px">
              <google-map :center="center" :zoom="17">
                <map-marker :position="marker" :opacity="marker.opacity" v-model="marker">
                </map-marker>
              </google-map>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  export default {
    name: 'funcionario',
    data () {
      return {
        marker: { lat: JSON.parse(this.$store.state.funcionarios[this.$route.query.index].local.posicaoGeografica).lat, lng: JSON.parse(this.$store.state.funcionarios[this.$route.query.index].local.posicaoGeografica).lng },
        center: { lat: JSON.parse(this.$store.state.funcionarios[this.$route.query.index].local.posicaoGeografica).lat, lng: JSON.parse(this.$store.state.funcionarios[this.$route.query.index].local.posicaoGeografica).lng }
      }
    },
    computed: {
      funcionario () {
        return this.$store.state.funcionarios[this.$route.query.index]
      }
    },
    components: {
      'googleMap': VueGoogleMaps.Map,
      'MapMarker': VueGoogleMaps.Marker
    }
  }
</script>
<style>

</style>
