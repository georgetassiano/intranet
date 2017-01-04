<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>Você está perdido.</h1>
            <h4>Essa página não existe.</h4>
            <router-link to="/">Retorne-me para home.</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style>
</style>
