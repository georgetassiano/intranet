import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views principais
import DashboardView from './components/dash/Dashboard.vue'
import TablesView from './components/dash/Tables.vue'
import TasksView from './components/dash/Tasks.vue'
import SettingView from './components/dash/Setting.vue'
import AccessView from './components/dash/Access.vue'
import ServerView from './components/dash/Server.vue'
import ReposView from './components/dash/Repos.vue'

// import viws secundárias
import ListaRegionais from './components/dash/regional/lista_regional.vue'
import NovaRegional from './components/dash/regional/nova_regional.vue'
import Regional from './components/dash/regional/regional.vue'
import EditarRegional from './components/dash/regional/editar_regional.vue'

import ListaPolos from './components/dash/polo/lista_polo.vue'
import NovoPolo from './components/dash/polo/novo_polo.vue'
import Polo from './components/dash/polo/polo.vue'
import EditarPolo from './components/dash/polo/editar_polo.vue'

import ListaLocalidadesPolo from './components/dash/localidade_polo/lista_localidade_polo.vue'
import NovaLocalidadePolo from './components/dash/localidade_polo/nova_localidade_polo.vue'
import LocalidadePolo from './components/dash/localidade_polo/localidade_polo.vue'
import EditarLocalidadePolo from './components/dash/localidade_polo/editar_localidade_polo.vue'

import ListaFuncoes from './components/dash/funcao/lista_funcao.vue'
import NovaFuncao from './components/dash/funcao/nova_funcao.vue'
import EditarFuncao from './components/dash/funcao/editar_funcao.vue'
import Funcao from './components/dash/funcao/funcao.vue'

import ListaFuncionarios from './components/dash/funcionario/lista_funcionario.vue'
import NovoFuncionario from './components/dash/funcionario/novo_funcionario.vue'
import EditarFuncionario from './components/dash/funcionario/editar_funcionario.vue'
import Funcionario from './components/dash/funcionario/funcionario.vue'

import ListaTreinamentos from './components/dash/treinamento/lista_treinamento.vue'
import NovoTreinamento from './components/dash/treinamento/novo_treinamento.vue'
import EditarTreinamento from './components/dash/treinamento/editar_treinamento.vue'
import Treinamento from './components/dash/treinamento/treinamento.vue'

import ListaTreinamentosRealizados from './components/dash/treinamento_realizado/lista_treinamento_realizado.vue'
import NovoTreinamentoRealizado from './components/dash/treinamento_realizado/novo_treinamento_realizado.vue'
import EditarTreinamentoRealizado from './components/dash/treinamento_realizado/editar_treinamento_realizado.vue'
import TreinamentoRealizado from './components/dash/treinamento_realizado/treinamento_realizado.vue'

import ListaProcessos from './components/dash/processo/lista_processo.vue'
import NovoProcesso from './components/dash/processo/novo_processo.vue'
import EditarProcesso from './components/dash/processo/editar_processo.vue'
import Processo from './components/dash/processo/processo.vue'

import ListaTiposProcesso from './components/dash/tipo_processo/lista_tipo_processo.vue'
import NovoTipoProcesso from './components/dash/tipo_processo/novo_tipo_processo.vue'
import EditarTipoProcesso from './components/dash/tipo_processo/editar_tipo_processo.vue'
import TipoProcesso from './components/dash/tipo_processo/tipo_processo.vue'

import ListaEquipamentosColetivos from './components/dash/equipamento_coletivo/lista_equipamento_coletivo.vue'
import NovoEquipamentoColetivo from './components/dash/equipamento_coletivo/novo_equipamento_coletivo.vue'
import EditarEquipamentoColetivo from './components/dash/equipamento_coletivo/editar_equipamento_coletivo.vue'
import EquipamentoColetivo from './components/dash/equipamento_coletivo/equipamento_coletivo.vue'

import ListaEquipamentosIndividuais from './components/dash/equipamento_individual/lista_equipamento_individual.vue'
import NovoEquipamentoIndividual from './components/dash/equipamento_individual/novo_equipamento_individual.vue'
import EditarEquipamentoIndividual from './components/dash/equipamento_individual/editar_equipamento_individual.vue'
import EquipamentoIndividual from './components/dash/equipamento_individual/equipamento_individual.vue'

import ListaPerguntasRisco from './components/dash/pergunta_risco/lista_pergunta_risco.vue'
import NovaPerguntaRisco from './components/dash/pergunta_risco/nova_pergunta_risco.vue'
import EditarPerguntaRisco from './components/dash/pergunta_risco/editar_pergunta_risco.vue'
import PerguntaRisco from './components/dash/pergunta_risco/pergunta_risco.vue'

import ListaRiscosIdentificados from './components/dash/risco_identificado/lista_risco_identificado.vue'
import NovoRiscoIdentificado from './components/dash/risco_identificado/novo_risco_identificado.vue'
import EditarRiscoIdentificado from './components/dash/risco_identificado/editar_risco_identificado.vue'
import RiscoIdentificado from './components/dash/risco_identificado/risco_identificado.vue'

import ListaAnalisesRisco from './components/dash/form_analise_risco/lista_analise_risco.vue'
import NovaAnaliseRisco from './components/dash/form_analise_risco/nova_analise_risco.vue'
import EditarAnaliseRisco from './components/dash/form_analise_risco/editar_analise_risco.vue'
import AnaliseRisco from './components/dash/form_analise_risco/analise_risco.vue'

import AddEquipamentosColetivos from './components/dash/form_analise_risco/equipamentos_coletivos/novo_equipamento_coletivo.vue'
import AlterarEquipamentosColetivos from './components/dash/form_analise_risco/equipamentos_coletivos/editar_equipamento_coletivo.vue'

import AddEquipamentosIndividuais from './components/dash/form_analise_risco/equipamentos_individuais/novo_equipamento_individual.vue'
import AlterarEquipamentosIndividuais from './components/dash/form_analise_risco/equipamentos_individuais/editar_equipamento_individual.vue'

import AddMembros from './components/dash/form_analise_risco/membros/novo_membro.vue'
import AlterarMembros from './components/dash/form_analise_risco/membros/editar_membro.vue'

import AddRiscosIdentificados from './components/dash/form_analise_risco/riscos_identificados/novo_risco_identificado.vue'
import AlterarRiscosIdentificados from './components/dash/form_analise_risco/riscos_identificados/editar_risco_identificado.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  }, {
    path: '/',
    component: DashView,
    children: [
      {
        path: '',
        component: DashboardView,
        name: 'Dashboard',
        description: 'Overview of environment'
      }, {
        path: '/tables',
        component: TablesView,
        name: 'Tables',
        description: 'Simple and advance table in CoPilot',
        meta: { requiresAuth: true }
      }, {
        path: '/tasks',
        component: TasksView,
        name: 'Tasks',
        description: 'Tasks page in the form of a timeline'
      }, {
        path: '/setting',
        component: SettingView,
        name: 'Settings',
        description: 'User settings page'
      }, {
        path: '/access',
        component: AccessView,
        name: 'Access',
        description: 'Example of using maps'
      }, {
        path: '/server',
        component: ServerView,
        name: 'Servers',
        description: 'List of our servers'
      }, {
        path: '/repos',
        component: ReposView,
        name: 'Repository',
        description: 'List of popular javascript repos'
      }, {
        path: '/regionais',
        component: ListaRegionais,
        name: 'Regionais',
        description: 'Lista das regionais',
        children: [
          {
            path: 'novaregional',
            component: NovaRegional,
            name: 'NovaRegional',
            description: 'Formulario de nova regional'
          },
          {
            path: 'editaregional',
            component: EditarRegional,
            name: 'EditarRegional',
            description: 'Formulario de edição de regional'
          },
          {
            path: 'veregional',
            component: Regional,
            name: 'Regional',
            description: 'Resumo de uma regional'
          }
        ]
      }, {
        path: '/polos',
        component: ListaPolos,
        name: 'Polos',
        description: 'Lista de polos',
        children: [
          {
            path: 'novopolo',
            component: NovoPolo,
            name: 'NovoPolo',
            description: 'Formulario de novo polo'
          },
          {
            path: 'editarpolo',
            component: EditarPolo,
            name: 'EditarPolo',
            description: 'Formulario de edição de polo'
          },
          {
            path: 'verpolo',
            component: Polo,
            name: 'Polo',
            description: 'Resumo de polo'
          }
        ]
      }, {
        path: '/localidadespolo',
        component: ListaLocalidadesPolo,
        name: 'LocalidadesPolo',
        description: 'Lista de localidades de polo',
        children: [
          {
            path: 'novalocalidadepolo',
            component: NovaLocalidadePolo,
            name: 'NovaLocalidadePolo',
            description: 'Formulario de localidade polo'
          },
          {
            path: 'editarlocalidadepolo',
            component: EditarLocalidadePolo,
            name: 'EditarLocalidadePolo',
            description: 'Formulario de edição de localidade de polo'
          },
          {
            path: 'verlocalidadepolo',
            component: LocalidadePolo,
            name: 'LocalidadePolo',
            description: 'Resumo de localidade de polo'
          }
        ]
      }, {
        path: '/funcoes',
        component: ListaFuncoes,
        name: 'Funcoes',
        description: 'Lista de funções',
        children: [
          {
            path: 'novafuncao',
            component: NovaFuncao,
            name: 'NovaFuncao',
            description: 'Formulario de nova função'
          },
          {
            path: 'editarfuncao',
            component: EditarFuncao,
            name: 'EditarFuncao',
            description: 'Formulario de edição de função'
          },
          {
            path: 'verfuncao',
            component: Funcao,
            name: 'Funcao',
            description: 'Resumo de função'
          }
        ]
      }, {
        path: '/funcionarios',
        component: ListaFuncionarios,
        name: 'Funcionarios',
        description: 'Lista de funcionarios',
        children: [
          {
            path: 'novofuncionario',
            component: NovoFuncionario,
            name: 'NovoFuncionario',
            description: 'Formulario de novo funcionario'
          },
          {
            path: 'editarfuncionario',
            component: EditarFuncionario,
            name: 'EditarFuncionario',
            description: 'Formulario de edição de funcionario'
          },
          {
            path: 'verfuncionario',
            component: Funcionario,
            name: 'Funcionario',
            description: 'Resumo de funcionario'
          }
        ]
      }, {
        path: '/treinamentos',
        component: ListaTreinamentos,
        name: 'Treinamentos',
        description: 'Lista de treinamentos',
        children: [
          {
            path: 'novotreinamento',
            component: NovoTreinamento,
            name: 'NovoTreinamento',
            description: 'Formulario de novo treinamento'
          },
          {
            path: 'editartreinamento',
            component: EditarTreinamento,
            name: 'EditarTreinamento',
            description: 'Formulario de edição de treinamento'
          },
          {
            path: 'vertreinamento',
            component: Treinamento,
            name: 'Treinamento',
            description: 'Resumo de treinamento'
          }
        ]
      }, {
        path: '/treinamentosrealizados',
        component: ListaTreinamentosRealizados,
        name: 'TreinamentosRealizados',
        description: 'Lista de treinamentos realizados',
        children: [
          {
            path: 'novotreinamentorealizado',
            component: NovoTreinamentoRealizado,
            name: 'NovoTreinamentoRealizado',
            description: 'Formulario de novo treinamento realizado'
          },
          {
            path: 'editartreinamentorealizado',
            component: EditarTreinamentoRealizado,
            name: 'EditarTreinamentoRealizado',
            description: 'Formulario de edição de treinamento realizado'
          },
          {
            path: 'vertreinamentorealizado',
            component: TreinamentoRealizado,
            name: 'TreinamentoRealizado',
            description: 'Resumo de treinamento realizado'
          }
        ]
      }, {
        path: '/processos',
        component: ListaProcessos,
        name: 'Processos',
        description: 'Lista de processos',
        children: [
          {
            path: 'novoprocesso',
            component: NovoProcesso,
            name: 'NovoProcesso',
            description: 'Formulario de Novo Processo'
          },
          {
            path: 'editarprocesso',
            component: EditarProcesso,
            name: 'EditarProcesso',
            description: 'Formulario de edição de processo'
          },
          {
            path: 'verprocesso',
            component: Processo,
            name: 'Processo',
            description: 'Resumo de processo'
          }
        ]
      }, {
        path: '/tiposprocesso',
        component: ListaTiposProcesso,
        name: 'TiposProcesso',
        description: 'Lista de tipos processo',
        children: [
          {
            path: 'novotipoprocesso',
            component: NovoTipoProcesso,
            name: 'NovoTipoProcesso',
            description: 'Formulario de novo tipo processo'
          },
          {
            path: 'editartipoprocesso',
            component: EditarTipoProcesso,
            name: 'EditarTipoProcesso',
            description: 'Formulario de edição de tipo processo'
          },
          {
            path: 'vertipoprocesso',
            component: TipoProcesso,
            name: 'TipoProcesso',
            description: 'Resumo de tipo processo'
          }
        ]
      }, {
        path: '/equipamentoscoletivos',
        component: ListaEquipamentosColetivos,
        name: 'EquipamentosColetivos',
        description: 'Lista de equipamentos coletivos',
        children: [
          {
            path: 'novoequipamentocoletivo',
            component: NovoEquipamentoColetivo,
            name: 'NovoEquipamentoColetivo',
            description: 'Formulario de novo equipamento coletivo'
          },
          {
            path: 'editarequipamentocoletivo',
            component: EditarEquipamentoColetivo,
            name: 'EditarEquipamentoColetivo',
            description: 'Formulario de edição de novo equipamento coletivo'
          },
          {
            path: 'verequipamentocoletivo',
            component: EquipamentoColetivo,
            name: 'EquipamentoColetivo',
            description: 'Resumo de equipamento coletivo'
          }
        ]
      }, {
        path: '/equipamentosindividuais',
        component: ListaEquipamentosIndividuais,
        name: 'EquipamentosIndividuais',
        description: 'Lista de equipamentos individuais',
        children: [
          {
            path: 'novoequipamentoindividual',
            component: NovoEquipamentoIndividual,
            name: 'NovoEquipamentoIndividual',
            description: 'Formulario de novo equipamento individual'
          },
          {
            path: 'editarequipamentoindividual',
            component: EditarEquipamentoIndividual,
            name: 'EditarEquipamentoIndividual',
            description: 'Formulario de edição de equipamento individual'
          },
          {
            path: 'verequipamentoindividual',
            component: EquipamentoIndividual,
            name: 'EquipamentoIndividual',
            description: 'Resumo de equipamento individual'
          }
        ]
      }, {
        path: '/perguntasrisco',
        component: ListaPerguntasRisco,
        name: 'PerguntasRisco',
        description: 'Lista de perguntas de analise preliminar de risco',
        children: [
          {
            path: 'novaperguntarisco',
            component: NovaPerguntaRisco,
            name: 'NovaPerguntaRisco',
            description: 'Formulario de nova pergunta da analise preliminar de risco'
          },
          {
            path: 'editarperguntarisco',
            component: EditarPerguntaRisco,
            name: 'EditarPerguntaRisco',
            description: 'Formulario de edição de pergunta risco'
          },
          {
            path: 'verperguntarisco',
            component: PerguntaRisco,
            name: 'PerguntaRisco',
            description: 'Resumo de pergunta risco'
          }
        ]
      }, {
        path: '/riscosidentificados',
        component: ListaRiscosIdentificados,
        name: 'RiscosIdentificados',
        description: 'Lista de riscos identificados',
        children: [
          {
            path: 'novoriscoidentificado',
            component: NovoRiscoIdentificado,
            name: 'NovoRiscoIdentificado',
            description: 'Formulario de risco identificado'
          },
          {
            path: 'editariscoidentificado',
            component: EditarRiscoIdentificado,
            name: 'EditarRiscoIdentificado',
            description: 'Formulario de risco identificado'
          },
          {
            path: 'veriscoidentificado',
            component: RiscoIdentificado,
            name: 'RiscoIdentificado',
            description: 'Resumo de risco identificado'
          }
        ]
      }, {
        path: '/analisesrisco',
        component: ListaAnalisesRisco,
        name: 'AnalisesRisco',
        description: 'Lista de analises preliminar de risco',
        children: [
          {
            path: 'novanaliserisco',
            component: NovaAnaliseRisco,
            name: 'NovaAnaliseRisco',
            description: 'Formulario de nova analise risco'
          },
          {
            path: 'editaranaliserisco',
            component: EditarAnaliseRisco,
            name: 'EditarAnaliseRisco',
            description: 'Formulario de edição de analise risco'
          },
          {
            path: 'veranaliserisco',
            component: AnaliseRisco,
            name: 'AnaliseRisco',
            description: 'Resumo de analise risco'
          },
          {
            path: 'addequipamentoscoletivos',
            component: AddEquipamentosColetivos,
            name: 'AddEquipamentosColetivos',
            description: 'Adicionar equipamentos coletivos'
          },
          {
            path: 'alterarequipamentoscoletivos',
            component: AlterarEquipamentosColetivos,
            name: 'AlterarEquipamentosColetivos',
            description: 'Editar equipamentos coletivos'
          },
          {
            path: 'addequipamentosindividuais',
            component: AddEquipamentosIndividuais,
            name: 'AddEquipamentosIndividuais',
            description: 'Adicionar equipamentos individuais'
          },
          {
            path: 'alterarequipamentosindividuais',
            component: AlterarEquipamentosIndividuais,
            name: 'AlterarEquipamentosIndividuais',
            description: 'Alterar equipamentos individuais'
          },
          {
            path: 'addmembros',
            component: AddMembros,
            name: 'AddMembros',
            description: 'Adicionar membros'
          },
          {
            path: 'alterarmembros',
            component: AlterarMembros,
            name: 'AlterarMembros',
            description: 'Alterar membros'
          },
          {
            path: 'addriscosidentificados',
            component: AddRiscosIdentificados,
            name: 'AddRiscosIdentificados',
            description: 'Adicionar riscos identificados'
          },
          {
            path: 'alterariscosidentificados',
            component: AlterarRiscosIdentificados,
            name: 'AlterarRiscosIdentificados',
            description: 'Alterar riscos identificados'
          }
        ]
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
