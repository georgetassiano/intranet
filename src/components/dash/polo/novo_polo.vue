<template>
	<div>
		<section class="content">
      <div class="alert alert-dismissible" :class="[error2Class]" role="alert" v-if="erro">
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="desaparecer"><span aria-hidden="true">&times;</span></button>
			  <strong>Atenção!</strong> {{mensagemErro}}
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Novo Polo</h3>
							<div class="box-tools pull-right">
      					<!-- Buttons, labels, and many other things can be placed here! -->
	      				<!-- Here is a label for example -->
      					<router-link to="/polos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
    					</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<form @submit.prevent="enviar">
								<div class="form-group">
									<label class="control-label" for="regional">Regional</label>
									<select class="form-control" id="regional" v-model="regionalSelecionada" required>
										<option v-for="regional in regionais" :value="regional">{{regional.nome}}</option>
									</select>
								</div>
								<br/>
								<div class="input-group">
									<span class="input-group-addon" id="nome">Nome</span>
									<input type="text" class="form-control" id="nome" placeholder="Nome do Polo" v-model="nome" required>
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
    name: 'novopolo',
    data () {
      return {
        nome: '',
        nomeCopia: '',
        regionalCopia: '',
        regionalSelecionada: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      regionais () {
        return this.$store.state.regionais
      }
    },
    mounted () {
      this.getRegionais()
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.regionalCopia = this.regionalSelecionada
        this.$http.post('http://localhost:8000/dados/polos/novo_polo', {
          'Nome': this.nome,
          'TB_Regional_idTB_Regional': this.regionalSelecionada.id
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_POLO', {
              'id': data.id,
              'nome': this.nomeCopia,
              'regional': this.regionalCopia
            })
          })
          this.nome = ''
          this.regional = ''
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      },
      getRegionais () {
        this.$http.get('http://localhost:8000/dados/regionais').then((response) => {
          console.log('sucess regionais')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_REGIONAIS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
          this.erro = true
        })
      },
      desaparecer () {
        this.erro = false
      }
    }
  }
</script>
<style></style>
