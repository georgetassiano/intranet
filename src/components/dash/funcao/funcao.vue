<template>
  <div>
		<section class="content">
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-info">
						<!-- Input Addons -->
						<div class="box-header with-border">
							<h3 class="box-title">Informação do Cargo</h3>
							<div class="box-tools pull-right">
								<!-- Buttons, labels, and many other things can be placed here! -->
								<!-- Here is a label for example -->
								<router-link to="/funcoes" tag="button" class="btn btn-danger btn-sm"><i class="fa fa-remove"> Fechar</router-link>
							</div><!-- /.box-tools -->
						</div>
						<div class="box-body">
							<dl class="dl-horizontal">
			  				<dt>Nome:</dt>
			  				<dd>{{funcao.nome|capitalize}}</dd>
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
    name: 'funcao',
    data () {
      return {
      }
    },
    computed: {
      funcao () {
        return this.$store.state.funcoes[this.$route.query.index]
      }
    }
  }
</script>
<style>

</style>
