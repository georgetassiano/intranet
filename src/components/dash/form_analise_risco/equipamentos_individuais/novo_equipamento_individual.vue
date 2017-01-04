<template>
<section class="container">
<router-view></router-view>
	<form class="form-horizontal" @submit.prevent="enviar">
	<fieldset>
	<legend>Novo Equipamento </legend>
        <label>Equipamentos individuais usados:</label>
	<div v-for="equipamento in equipamentos">
		<div>
		<input type="checkbox" :id="equipamento.nome" :value="equipamento" v-model="checkedEquipamentos">
		<label :for="equipamento.nome">{{equipamento.nome}}</label>
		</div>
	</div >
		<input type="submit" class="btn btn-default">
		</fieldset>
	</form>
		<router-link :to="{path:'/analisesrisco/addmembros', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
		<router-link to="/analisesrisco">Fechar</router-link>


</section>
</template>
<script>
  export default {
    name: 'novosequipamentosindividuais',
    data () {
      return {
        checkedEquipamentos: [],
        analiseriscoidCopia: '',
        equipamento: ''
      }
    },
    computed: {
      equipamentos () {
        return this.$store.state.equipamentosindividuais
      },
      analiseriscoid () {
        return this.$store.state.analisesrisco[this.$route.query.index].id
      }
    },
    mounted () {
      this.getEquipamentosIndividuais()
      this.getAnalisesRisco()
    },
    methods: {
      enviar () {
        for (this.equipamento in this.checkedEquipamentos) {
          this.$http.post('http://endicon.esy.es/dados/equipamentosindividuaisanaliserisco/' + this.analiseriscoid + '/' + this.checkedEquipamentos[this.equipamento].id, {
          }).then((response) => {
            console.log('sucess ', response.body)
            this.$store.commit('ADD_EQUIPAMENTOSINDIVIDUAISANALISERISCO', {
              'index': this.$route.query.index,
              'equipamentoIndividual': {
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
      getEquipamentosIndividuais () {
        this.$http.get('http://endicon.esy.es/dados/equipamentosindividuais').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_EQUIPAMENTOSINDIVIDUAIS', data)
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