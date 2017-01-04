<template>
<section class="container">
<router-view></router-view>
	<form class="form-horizontal" @submit.prevent="enviar">
	<fieldset>
	<legend>Novo membro </legend>
        <label>Membros:</label>
	<div v-for="membro in membros">
		<div>
		<input type="checkbox" :id="membro.nome" :value="membro" v-model="checkedMembros">
		<label :for="membro.nome">{{membro.nome}}</label>
		</div>
	</div >
		<input type="submit" class="btn btn-default">
		</fieldset>
	</form>
		<router-link :to="{path:'/analisesrisco/addriscosidentificados', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
		<router-link to="/analisesrisco">Fechar</router-link>


</section>
</template>
<script>
  export default {
    name: 'novosmembros',
    data () {
      return {
        checkedMembros: [],
        analiseriscoidCopia: '',
        membro: ''
      }
    },
    computed: {
      membros () {
        return this.$store.state.funcionarios
      },
      analiseriscoid () {
        return this.$store.state.analisesrisco[this.$route.query.index].id
      }
    },
    mounted () {
      this.getFuncionarios()
      this.getAnalisesRisco()
    },
    methods: {
      enviar () {
        for (this.membro in this.checkedMembros) {
          this.$http.post('http://endicon.esy.es/dados/membrosanaliserisco/' + this.analiseriscoid + '/' + this.checkedMembros[this.membro].id, {
          }).then((response) => {
            console.log('sucess ', response.body)
            this.$store.commit('ADD_MEMBROSANALISERISCO', {
              'index': this.$route.query.index,
              'membro': this.checkedMembros[this.membro]
            })
          }, (response) => {
            console.log('erro: ', response)
          })
        }
        this.checkedMembros = []
      },
      getFuncionarios () {
        this.$http.get('http://endicon.esy.es/dados/funcionarios').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_FUNCIONARIOS', data)
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