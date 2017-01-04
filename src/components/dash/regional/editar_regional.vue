<template>
	<div>
		<section class="content">
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Editar Regional</h3>
							<div class="box-tools pull-right">
      					<!-- Buttons, labels, and many other things can be placed here! -->
	      				<!-- Here is a label for example -->
      					<router-link to="/regionais" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
    					</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<form @submit.prevent="alterar">
								<div class="input-group">
									<span class="input-group-addon" id="regional">Nome</span>
									<input type="text" class="form-control" id="regional" placeholder="Nome da regional" v-model="nome" required>
								</div>
								<br/>
								<div class="input-group">
									<span class="input-group-addon" id="estado">Estado</span>
									<input type="text" class="form-control" id="estado" placeholder="Estado da regional" v-model="estado" required>
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
    name: 'editaregional',
    data () {
      return {
        nome: '',
        estado: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    computed: {
      regional () {
        return this.$store.state.regionais[this.$route.query.index]
      }
    },
    watch: {
      regional () {
        this.nome = this.$store.state.regionais[this.$route.query.index].nome
        this.estado = this.$store.state.regionais[this.$route.query.index].estado
      }
    },
    mounted () {
      this.nome = this.$store.state.regionais[this.$route.query.index].nome
      this.estado = this.$store.state.regionais[this.$route.query.index].estado
    },
    methods: {
      alterar () {
        this.$http.put('http://localhost:8000/dados/regionais/' + this.regional.id, {
          'Nome': this.nome,
          'Estado': this.estado
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_REGIONAL', {
            'index': this.$route.query.index,
            'nome': this.nome,
            'estado': this.estado
          })
          this.nome = this.$store.state.regionais[this.$route.query.index].nome
          this.estado = this.$store.state.regionais[this.$route.query.index].estado
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      }
    }
  }
</script>
<style></style>
