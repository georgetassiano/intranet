<template>
	<div>
		<section class="content">
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Nova Regional</h3>
							<div class="box-tools pull-right">
      					<!-- Buttons, labels, and many other things can be placed here! -->
	      				<!-- Here is a label for example -->
      					<router-link to="/regionais" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
    					</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<form @submit.prevent="enviar">
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
  								<input type="submit" id="enviar" class="btn btn-primary">
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
    name: 'novaregional',
    data () {
      return {
        nome: '',
        estado: '',
        nomeCopia: '',
        estadoCopia: '',
        errorClass: '',
        mensagemEnvio: ''
      }
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.estadoCopia = this.estado
        this.$http.post('http://localhost:8000/dados/regionais/nova_regional', {
          'Nome': this.nome,
          'Estado': this.estado
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_REGIONAL', {
              'id': data.id,
              'nome': this.nomeCopia,
              'estado': this.estadoCopia
            })
          })
          this.nome = ''
          this.estado = ''
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
