<template>
<section class="container">
<router-view></router-view>
	<form class="form-horizontal" @submit.prevent="enviar">
	<fieldset>
	<legend>Editar risco identificado </legend>
	<div v-for="riscoidentificado in riscosidentificados">
		<div>
		<input type="checkbox" :id="riscoidentificado.nome" :value="riscoidentificado" v-model="checkedRiscosIdentificados">
		<label :for="riscoidentificado.nome">{{riscoidentificado.nome}}</label>
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
    name: 'editariscosidentificados',
    data () {
      return {
        checkedRiscosIdentificados: [],
        analiseriscoidCopia: '',
        riscoidentificado: ''
      }
    },
    computed: {
      riscosidentificados () {
        return this.$store.state.riscosidentificados
      },
      analiseriscoid () {
        return this.$store.state.analisesrisco[this.$route.query.index].id
      }
    },
    mounted () {
      this.getRiscosIdentificados()
      this.getAnalisesRisco()
    },
    methods: {
      enviar () {
        this.$store.state.analisesrisco[this.$route.query.index].riscosIdentificados = []
        this.$http.delete('http://endicon.esy.es/dados/riscosidentificadosanaliserisco/' + this.analiseriscoid).then((response) => {
          console.log('sucess ' + response)
        }, (response) => {
          console.log('erro: ', response)
          this.erro = true
          this.mensagemErro = 'Erro: a analise risco selecionada está sendo utilizado por um ou mais dados, exclua-os primeiro'
        })
        for (this.riscoidentificado in this.checkedRiscosIdentificados) {
          this.$http.post('http://endicon.esy.es/dados/riscosidentificadosanaliserisco/' + this.analiseriscoid + '/' + this.checkedRiscosIdentificados[this.riscoidentificado].id, {
          }).then((response) => {
            console.log('sucess ', response.body)
            this.$store.commit('ADD_RISCOSIDENTIFICADOSANALISERISCO', {
              'index': this.$route.query.index,
              'riscoidentificado': this.checkedRiscosIdentificados[this.riscoidentificado]
            })
          }, (response) => {
            console.log('erro: ', response)
          })
        }
        this.checkedRiscosIdentificados = []
      },
      getRiscosIdentificados () {
        this.$http.get('http://endicon.esy.es/dados/riscosidentificados').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_RISCOSIDENTIFICADOS', data)
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