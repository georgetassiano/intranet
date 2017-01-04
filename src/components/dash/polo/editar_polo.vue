<template>
  <div>
		<section class="content">
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Editar Polo</h3>
							<div class="box-tools pull-right">
      					<!-- Buttons, labels, and many other things can be placed here! -->
	      				<!-- Here is a label for example -->
      					<router-link to="/polos" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
    					</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<form @submit.prevent="alterar">
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
    name: 'editarpolo',
    data () {
      return {
        nome: '',
        regionalSelecionada: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      polo () {
        return this.$store.state.polos[this.$route.query.index]
      },
      regionais () {
        return this.$store.state.regionais
      }
    },
    watch: {
      polo () {
        this.nome = this.$store.state.polos[this.$route.query.index].nome
        this.regionalSelecionada = this.$store.state.polos[this.$route.query.index].regional
      }
    },
    mounted () {
      this.getRegionais()
      this.nome = this.$store.state.polos[this.$route.query.index].nome
      this.regionalSelecionada = this.$store.state.polos[this.$route.query.index].regional
    },
    methods: {
      alterar () {
        this.$http.put('http://localhost:8000/dados/polos/' + this.polo.id, {
          'Nome': this.nome,
          'TB_Regional_idTB_Regional': this.regionalSelecionada.id
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_POLO', {
            'index': this.$route.query.index,
            'nome': this.nome,
            'regional': this.regionalSelecionada
          })
          this.nome = this.$store.state.polos[this.$route.query.index].nome
          this.regionalSelecionada = this.$store.state.polos[this.$route.query.index].regional
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
          console.log('sucess')
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
