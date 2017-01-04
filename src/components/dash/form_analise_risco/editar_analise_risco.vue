<template>
<section class="container">
	<form class="form-horizontal" @submit.prevent="alterar">

<div class="form-group">
  <select class="form-control" v-model="funcionarioSelecionado">
    <option v-for="funcionario in funcionarios" :value="funcionario">{{funcionario.nome}}</option>
  </select>
</div>
<div class="form-group">
  <select class="form-control" v-model="tipoProcessoSelecionado">
    <option v-for="tipoProcesso in tiposProcesso" :value="tipoProcesso">{{tipoProcesso.nome}}</option>
  </select>
</div>
		 	<div class="form-group">
		<input type="date" class="form-control" placeholder="Nome da funcao" v-model="dataCriacao">
		</div>
		<div class="form-group">
		<input type="time" class="form-control" placeholder="Nome da funcao" v-model="horaCriacao">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Nome da funcao" v-model="descricaoAtividade">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Nome da funcao" v-model="observacao">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Estado da regional" v-model="endereco">
		</div>
		<div class="form-group">
		<input type="number" class="form-control" placeholder="Estado da regional" v-model="cep">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Estado da regional" v-model="posicaoGeografica">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Estado da regional" v-model="estado">
		</div>
		<div class="form-group">
		<input type="text" class="form-control" placeholder="Estado da regional" v-model="cidade">
		</div>
		<input type="submit">

	</form>
	<p>valores atuais:</p>
		<p>analiserisco: {{analiserisco}}</p>
	<router-link :to="{path:'/analisesrisco/alterarequipamentoscoletivos', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
	<router-link :to="{path:'/analisesrisco/alterarequipamentosindividuais', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
	<router-link :to="{path:'/analisesrisco/alterarmembros', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
	<router-link :to="{path:'/analisesrisco/alterariscosidentificados', query:{index:this.$route.query.index}}">Add Equipamentos</router-link>
	<router-link to="/analisesrisco">Fechar</router-link>
</section>
</template>
<script>
  export default {
    name: 'editaranaliserisco',
    data () {
      return {
        dataCriacao: '',
        dataCriacaoCopia: '',
        horaCriacao: '',
        horaCriacaoCopia: '',
        descricaoAtividade: '',
        descricaoAtividadeCopia: '',
        observacao: '',
        observacaoCopia: '',
        endereco: '',
        enderecoCopia: '',
        cep: '',
        cepCopia: '',
        posicaoGeografica: '',
        posicaoGeograficaCopia: '',
        estado: '',
        estadoCopia: '',
        cidade: '',
        cidadeCopia: '',
        funcionarioSelecionado: '',
        funcionarioSelecionadoCopia: '',
        tipoProcessoSelecionado: '',
        tipoProcessoSelecionadoCopia: ''
      }
    },
    computed: {
      funcionarios () {
        return this.$store.state.funcionarios
      },
      tiposProcesso () {
        return this.$store.state.tiposprocesso
      },
      analiserisco () {
        return this.$store.state.analisesrisco[this.$route.query.index]
      }
    },
    mounted () {
      this.getFuncionarios()
      this.getTiposProcesso()
    },
    methods: {
      alterar () {
        this.dataCriacaoCopia = this.dataCriacao
        this.horaCriacaoCopia = this.horaCriacao
        this.descricaoAtividadeCopia = this.descricaoAtividade
        this.observacaoCopia = this.observacao
        this.funcionarioSelecionadoCopia = this.funcionarioSelecionado
        this.tipoProcessoSelecionadoCopia = this.tipoProcessoSelecionado
        this.$http.put('http://endicon.esy.es/dados/locais/' + this.analiserisco.local.id, {
          'Endereco': this.endereco,
          'CEP': this.cep,
          'PosicaoGeografica': this.posicaoGeografica,
          'Estado': this.estado,
          'Cidade': this.cidade
        }).then((response) => {
          console.log('sucess ', response.body)
          this.$http.put('http://endicon.esy.es/formularios/analisesrisco/' + this.analiserisco.id, {
            'DataCriacao': this.dataCriacao,
            'HoraCriacao': this.horaCriacao,
            'DescricaoAtividade': this.descricaoAtividade,
            'Observacao': this.observacao,
            'TB_Local_idTB_Local': this.analiserisco.local.id,
            'TB_Funcionario_idTB_Funcionario': this.funcionarioSelecionado.id,
            'TB_TipoProcesso_idTB_TipoProcesso': this.tipoProcessoSelecionado.id
          }).then((response) => {
            console.log('sucess ', response.body)
            this.$store.commit('ATUALIZAR_ANALISERISCO', {
              'index': this.$route.query.index,
              'dataCriacao': this.dataCriacaoCopia,
              'horaCriacao': this.horaCriacaoCopia,
              'descricaoAtividade': this.descricaoAtividadeCopia,
              'observacao': this.observacaoCopia,
              'local': {
                'id': this.analiserisco.id,
                'endereco': this.enderecoCopia,
                'cep': this.cepCopia,
                'posicaoGeografica': this.posicaoGeograficaCopia,
                'estado': this.estadoCopia,
                'cidade': this.cidadeCopia
              },
              'funcionario': this.funcionarioSelecionadoCopia,
              'tipoProcesso': this.tipoProcessoSelecionadoCopia
            })
          }, (response) => {
            console.log('erro: ', response)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
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
      getTiposProcesso () {
        this.$http.get('http://endicon.esy.es/dados/tiposprocesso').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_TIPOSPROCESSO', data)
          })
        }, (response) => {
          console.log('erro: ', response)
        })
      }
    }
  }
</script>
<style></style>