<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- errors -->

            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Usuario" type="text" v-model="login">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Senha" type="password" v-model="senha">
              </div>
              <button type="submit" class="btn btn-primary btn-lg">Entrar</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
module.exports = {
  name: 'Login',
  data () {
    return {
      login: '',
      senha: '',
      error: ''
    }
  },
  methods: {
    checkCreds () {
      this.$http.post('http://localhost:8000/login', {
        'Login': this.login,
        'Senha': this.senha
      }).then((response) => {
        if (response.status === 201) {
          console.log('sucess')
          response.json().then((data) => {
            window.sessionStorage.setItem('id_token', data.id_token)
            window.sessionStorage.setItem('permissao', data.permissao)
          })
          this.errorClass = 'has-success'
          this.mensagemEnvio = 'Enviado com sucesso'
          this.$store.commit('ALTERAR_AUTENTIFICACAO', {
            'auth': true
          })
          this.$router.push({ path: '/' })
        } else {
          console.log('erro1')
          this.errorClass = 'has-danger'
          this.mensagemEnvio = 'Usuário ou senha incorreta'
        }
      }, (response) => {
        console.log('erro: ', response)
        this.errorClass = 'has-warning'
        this.mensagemEnvio = 'Falha na rede. Verifique sua conexão'
      })
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
