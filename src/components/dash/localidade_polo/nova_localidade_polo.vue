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
              <h3 class="box-title">Nova Localidade</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/localidadespolo" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
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
    nome: 'novalocalidadepolo',
    data () {
      return {
        nome: '',
        nomeCopia: '',
        poloCopia: '',
        poloSelecionado: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      polos () {
        return this.$store.state.polos
      }
    },
    mounted () {
      this.getPolos()
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.poloCopia = this.poloSelecionado
        this.$http.post('http://localhost:8000/dados/localidadespolo/nova_localidadepolo', {
          'Nome': this.nome,
          'TB_Polo_idTB_Polo': this.poloSelecionado.id
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_LOCALIDADEPOLO', {
              'id': data.id,
              'nome': this.nomeCopia,
              'polo': this.poloCopia
            })
          })
          this.nome = ''
          this.polo = ''
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
