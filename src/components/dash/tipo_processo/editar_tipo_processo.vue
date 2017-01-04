<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Editar Nome de Processo</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/tiposprocesso" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <form @submit.prevent="alterar">
                <div class="form-group">
                  <label class="control-label" for="processo">Processo</label>
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
                  <span class="input-group-addon">Nome</span>
                  <input type="text" class="form-control" id="nome" placeholder="Nome do processo" v-model="nome" required>
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
    name: 'editartipoprocesso',
    data () {
      return {
        nome: '',
        nomeCopia: '',
        processoCopia: '',
        regionalCopia: '',
        processoSelecionado: '',
        regionalSelecionada: '',
        errorClass: '',
        error2Class: '',
        mensagemEnvio: '',
        mensagemErro: '',
        erro: ''
      }
    },
    computed: {
      tipoprocesso () {
        return this.$store.state.tiposprocesso[this.$route.query.index]
      },
      regionais () {
        return this.$store.state.regionais
      },
      processos () {
        return this.$store.state.processos
      }
    },
    watch: {
      tipoprocesso () {
        this.nome = this.$store.state.tiposprocesso[this.$route.query.index].nome
        this.processoSelecionado = this.$store.state.tiposprocesso[this.$route.query.index].processo
        this.regionalSelecionada = this.$store.state.tiposprocesso[this.$route.query.index].regional
      }
    },
    mounted () {
      this.getRegionais()
      this.getProcessos()
      this.nome = this.$store.state.tiposprocesso[this.$route.query.index].nome
      this.processoSelecionado = this.$store.state.tiposprocesso[this.$route.query.index].processo
      this.regionalSelecionada = this.$store.state.tiposprocesso[this.$route.query.index].regional
    },
    methods: {
      alterar () {
        this.nomeCopia = this.nome
        this.processoCopia = this.processoSelecionado
        this.regionalCopia = this.regionalSelecionada
        this.$http.put('http://localhost:8000/dados/tiposprocesso/' + this.tipoprocesso.id, {
          'Nome': this.nome,
          'TB_Processo_idTB_Processo': this.processoSelecionado.id,
          'TB_Regional_idTB_Regional': this.regionalSelecionada.id
        }).then((response) => {
          console.log('sucess ' + response)
          this.$store.commit('ATUALIZAR_TIPOPROCESSO', {
            'index': this.$route.query.index,
            'nome': this.nomeCopia,
            'processo': this.processoCopia,
            'regional': this.regionalCopia
          })
          this.nome = this.$store.state.tiposprocesso[this.$route.query.index].nome
          this.processoSelecionado = this.$store.state.tiposprocesso[this.$route.query.index].processo
          this.regionalSelecionada = this.$store.state.tiposprocesso[this.$route.query.index].regional
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
