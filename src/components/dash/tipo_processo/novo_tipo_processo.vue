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
              <h3 class="box-title">Novo Nome de Processo</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/tiposprocesso" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="enviar">
                <div class="form-group">
                  <label class="control-label" for="processo">Regional</label>
                  <select class="form-control" id="processo" v-model="processoSelecionado" required>
                    <option v-for="processo in processos" :value="processo">{{processo.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="form-group">
                  <label class="control-label" for="regional">Regional</label>
                  <select class="form-control" id="regional" v-model="regionalSelecionada" required>
                    <option v-for="regional in regionais" :value="regional">{{regional.nome}}</option>
                  </select>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon" id="nome">Nome</span>
                  <input type="text" class="form-control" id="nome" placeholder="Nome do nome do processo" v-model="nome" required>
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
        processoSelecionado: '',
        nomeCopia: '',
        processoCopia: '',
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
      },
      processos () {
        return this.$store.state.processos
      }
    },
    mounted () {
      this.getRegionais()
      this.getProcessos()
    },
    methods: {
      enviar () {
        this.nomeCopia = this.nome
        this.processoCopia = this.processoSelecionado
        this.regionalCopia = this.regionalSelecionada
        this.$http.post('http://localhost:8000/dados/tiposprocesso/novo_tipoprocesso', {
          'Nome': this.nome,
          'TB_Processo_idTB_Processo': this.processoSelecionado.id,
          'TB_Regional_idTB_Regional': this.regionalSelecionada.id
        }).then((response) => {
          console.log('sucess ', response.body)
          response.json().then((data) => {
            this.$store.commit('ADD_TIPOPROCESSO', {
              'id': data.id,
              'nome': this.nomeCopia,
              'processo': this.processoCopia,
              'regional': this.regionalCopia
            })
          })
          this.nome = ''
          this.regionalSelecionada = ''
          this.processoSelecionado = ''
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
      getProcessos () {
        this.$http.get('http://localhost:8000/dados/processos').then((response) => {
          console.log('sucess')
          response.json().then((data) => {
            this.$store.commit('ATUALIZAR_PROCESSOS', data)
          })
        }, (response) => {
          console.log('erro: ', response)
          this.mensagemErro = 'Falha na rede. Verifique sua conexão'
          this.error2Class = 'alert-warning'
          this.erro = true
        })
      }
    }
  }
</script>
<style></style>
