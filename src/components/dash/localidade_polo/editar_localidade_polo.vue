<template>
  <div>
		<section class="content">
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Editar Localidade</h3>
							<div class="box-tools pull-right">
      					<!-- Buttons, labels, and many other things can be placed here! -->
	      				<!-- Here is a label for example -->
      					<router-link to="/localidadespolo" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
    					</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<form @submit.prevent="alterar">
                <div class="form-group">
                  <label class="control-label" for="polo">Polo</label>
                  <select class="form-control" id="polo" v-model="poloSelecionado" required>
                    <option v-for="polo in polos" :value="polo">{{polo.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="nome">Nome</span>
                  <input type="text" class="form-control" id="nome" placeholder="Nome da Localidade" v-model="nome" required>
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
    name: 'editarlocalidadepolo',
    data () {
      return {
        id: '',
        nome: '',
        polo: '',
        poloSelecionado: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      localidadepolo () {
        return this.$store.state.localidadespolo[this.$route.query.index]
      },
      polos () {
        return this.$store.state.polos
      }
    },
    watch: {
      localidadepolo () {
        this.nome = this.$store.state.localidadespolo[this.$route.query.index].nome
        this.poloSelecionado = this.$store.state.localidadespolo[this.$route.query.index].polo
      }
    },
    mounted () {
      this.getPolos()
      this.nome = this.$store.state.localidadespolo[this.$route.query.index].nome
      this.poloSelecionado = this.$store.state.localidadespolo[this.$route.query.index].polo
    },
    methods: {
      alterar () {
        this.$http.put('http://localhost:8000/dados/polos/' + this.localidadepolo.id, {
          'Nome': this.nome,
          'TB_Polo_idTB_Polo': this.poloSelecionado.id
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_LOCALIDADEPOLO', {
            'index': this.$route.query.index,
            'nome': this.nome,
            'polo': this.poloSelecionado
          })
          this.nome = this.$store.state.localidadespolo[this.$route.query.index].nome
          this.poloSelecionado = this.$store.state.localidadespolo[this.$route.query.index].polo
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
        }, (response) => {
          console.log('erro: ', response)
          this.errorClass = 'has-warning'
          this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
        })
      },
      getPolos () {
        this.$http.get('http://localhost:8000/dados/polos').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_POLOS', data)
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
