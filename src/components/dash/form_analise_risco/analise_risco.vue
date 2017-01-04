<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-sm-12">
          <div class="box box-info">
            <!-- Input Addons -->
            <div class="box-header with-border">
              <h3 class="box-title">Informação da Localidade</h3>
              <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <router-link to="/localidadespolo" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
              </div><!-- /.box-tools -->
            </div>
            <div class="box-body">
              <dl class="dl-horizontal">
                <dt>Funcionário responsável:</dt>
                <dd>{{analiserisco.funcionario.nome|capitalize}}</dd>
                <dt>Processo:</dt>
                <dd>{{analiserisco.tipoProcesso.nome|capitalize}}</dd>
                <dt>Data de Criação:</dt>
                <dd>{{analiserisco.dataCriacao|reverse}}</dd>
                <dt>Hora de Criação:</dt>
                <dd>{{analiserisco.horaCriacao|capitalize}}</dd>
                <dt>Descrição:</dt>
                <dd>{{analiserisco.descricaoAtividade|capitalize}}</dd>
                <dt>Observação:</dt>
                <dd>{{analiserisco.observacao|capitalize}}</dd>
                <dt>Local:</dt>
                <dd>{{analiserisco.local.endereco|capitalize}}</dd>
                <dd>{{analiserisco.local.cep|capitalize}}</dd>
                <dd>{{analiserisco.local.estado|capitalize}}</dd>
                <dd>{{analiserisco.local.cidade|capitalize}}</dd>
                <div v-for="perguntas in analiserisco.perguntasRespondidas">
              		<p>Pergunta: {{perguntas.idPergunta.pergunta}}</p>
              		<p>Resposta: {{perguntas.resposta}}</p>
              	</div >
              	<div v-for="equipamentosIndividuais in analiserisco.equipamentosIndividuais">
              		<p>Equipamento Individual: {{equipamentosIndividuais.nome}}</p>
              	</div >
              	<div v-for="equipamentosColetivos in analiserisco.equipamentosColetivos">
              		<p>Equipamento Coletivo: {{equipamentosColetivos.nome}}</p>
              	</div >
              	<div v-for="riscosIdentificados in analiserisco.riscosIdentificados">
              		<p>risco identificado: {{riscosIdentificados.nome}}</p>
              	</div >
              	<div v-for="membros in analiserisco.membros">
              		<p>nome do membro: {{membros.nome}}</p>
              	</div >
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'analisesrisco',
    data () {
      return {
      }
    },
    computed: {
      analiserisco () {
        return this.$store.state.analisesrisco[this.$route.query.index]
      }
    }
  }
</script>
<style>

</style>
