<template>
  <div>
    <h1 class="text-center">Equipamentos Individuais</h1>
    <section class="content">
      <div class="alert alert-dismissible" :class="[errorClass]" role="alert" v-if="erro">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="desaparecer"><span aria-hidden="true">&times;</span></button>
        <strong>Atenção!</strong> {{mensagemErro}}
      </div>
      <router-view></router-view>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Lista de equipamentos individuais cadastrados</h3>
            <div class="box-tools pull-right">
              <!-- Buttons, labels, and many other things can be placed here! -->
              <!-- Here is a label for example -->
              <router-link to="/equipamentosindividuais/novoequipamentoindividual" tag="button" class="btn btn-success"><i class="fa fa-plus"> Novo Equipamento</router-link>
              <button @click="getEquipamentosIndividuais" class="btn btn-info"><i class="fa fa-refresh"> Atualizar</button>
            </div><!-- /.box-tools -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable table-responsive">
                    <thead>
                      <tr role="row">
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting" v-for="coluna in colunas">{{coluna|capitalize}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" v-for="(equipamentoindividual,index) in equipamentosindividuais" :class="paridade(index)">
                        <td class="sorting_1">{{equipamentoindividual.nome|capitalize}}</td>
                        <td>
                          <router-link :to="{path:'/equipamentosindividuais/verequipamentoindividual', query:{index:index}}" tag="button"  class="btn btn-primary btn-sm"><i class="fa fa-search"> Ver</router-link>
                          <router-link :to="{path:'/equipamentosindividuais/editarequipamentoindividual', query:{index:index}}" tag="button"  class="btn btn-warning btn-sm"><i class="fa fa-pencil"> Alterar</router-link>
                          <router-link to="/equipamentosindividuais"><button @click="deletar(equipamentoindividual.id)" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Remover</button></router-link>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan="1" rowspan="1" v-for="coluna in colunas">{{coluna|capitalize}}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import $ from 'jquery'
  // Require needed datatables modules
  require('datatables.net')
  require('datatables.net-bs')
  export default {
    name: 'listaequipamentosindividuais',
    data () {
      return {
        colunas: ['nome', 'ações'],
        erro: false,
        mensagemErro: '',
        errorClass: '',
        table: $('#example1').DataTable()
      }
    },
    computed: {
      equipamentosindividuais () {
        return this.$store.state.equipamentosindividuais
      }
    },
    mounted () {
      this.getEquipamentosIndividuais()
    },
    methods: {
      deletar (id) {
        this.$http.delete('http://localhost:8000/dados/equipamentosindividuais/' + id).then((response) => {
          console.log('sucess ' + response)
          this.getEquipamentosIndividuais()
        }, (response) => {
          console.log('erro: ', response)
          if (response.status === 500) {
            this.mensagemErro = 'Erro: A regional selecionada está sendo utilizada por um ou mais dados, exclua-os primeiro'
            this.errorClass = 'alert-danger'
          } else {
            this.mensagemErro = 'Falha na rede. Verifique sua conexão'
            this.errorClass = 'alert-warning'
          }
          this.erro = true
        })
      },
      getEquipamentosIndividuais () {
        this.$http.get('http://localhost:8000/dados/equipamentosindividuais').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_EQUIPAMENTOSINDIVIDUAIS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.errorClass = 'alert-warning'
          this.erro = true
        })
      },
      desaparecer () {
        this.erro = false
      },
      paridade (index) {
        var modo = index % 2 === 0
        return modo ? 'odd' : 'even'
      }
    }
  }
</script>
<style>

</style>
