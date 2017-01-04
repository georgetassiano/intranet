<template>
<section class="container">
<router-view></router-view>
	<form class="form-horizontal" @submit.prevent="enviar">
	<fieldset>
	<legend>Novo Equipamento </legend>
	<div v-for="equipamento in equipamentos">
		<div>
		<input type="checkbox" :id="equipamento.nome" :value="equipamento" v-model="checkedEquipamentos">
		<label :for="equipamento.nome">{{equipamento.nome}}</label>
		</div>
	</div >
		<input type="submit" class="btn btn-default">
		</fieldset>
	</form>

		<router-link to="/analisesrisco">Fechar</router-link>


</section>
</template>
<script>
  export default {
    name: 'editarequipamentoscoletivos',
    data () {
      return {
        checkedEquipamentos: [],
        analiseriscoidCopia: '',
        equipamento: ''
      }
    },
    computed: {
      equipamentos () {
        return this.$store.state.equipamentoscoletivos
      },
      analiseriscoid () {
        return this.$store.state.analisesrisco[this.$route.query.index].id
      }
    },
    mounted () {
      this.getEquipamentosColetivos()
      this.getAnalisesRisco()
    },
    methods: {
      enviar () {
        this.$store.state.analisesrisco[this.$route.query.index].equipamentosColetivos = []
        this.$http.delete('http://endicon.esy.es/dados/equipamentoscoletivosanaliserisco/' + this.analiseriscoid).then((response) => {
          console.log('sucess ' + response)
        }, (response) => {
          console.log('erro: ', response)
          this.erro = true
          this.mensagemErro = 'Erro: a analise risco selecionada está sendo utilizado por um ou mais dados, exclua-os primeiro'
        })
        for (this.equipamento in this.checkedEquipamentos) {
          this.$http.post('http://endicon.esy.es/dados/equipamentoscoletivosanaliserisco/' + this.analiseriscoid + '/' + this.checkedEquipamentos[this.equipamento].id, {
          }).then((response) => {
            console.log('sucess ', response.body)
            this.$store.commit('ADD_EQUIPAMENTOSCOLETIVOSANALISERISCO', {
              'index': this.$route.query.index,
              'equipamentoColetivo': {
                'id': this.equipamento.id,
                'nome': this.equipamento.nome
              }
            })
          }, (response) => {
            console.log('erro: ', response)
          })
        }
        this.checkedEquipamentos = []
      },
      getEquipamentosColetivos () {
        this.$http.get('http://endicon.esy.es/dados/equipamentoscoletivos').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_EQUIPAMENTOSCOLETIVOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      },
      getAnalisesRisco () {
        this.$http.get('http://endicon.esy.es/formularios/analisesrisco').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_ANALISESRISCO', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      }
    }
  }
</script>
<style></style>