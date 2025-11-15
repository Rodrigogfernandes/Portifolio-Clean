const { ipcRenderer } = require('electron');
let registros = [];
let registroSelecionado = null;
let registrosFiltrados = [];
let registrosPorPagina = 50;
let paginaAtual = 1;
let registroAtualId = null;

// Adicionar estas variáveis no início do arquivo
 // Número de registros exibidos inicialmente
let registrosAtuais = []; // Array com todos os registros filtrados/pesquisados

// Função para aplicar tema (definida no início para garantir que seja executada primeiro)
function setTheme(theme) {
    if (typeof document !== 'undefined') {
        // Aplicar tanto no body quanto no html para garantir
        if (document.body) {
            document.body.classList.remove('dark-theme', 'light-theme', 'theme-azul');
        }
        if (document.documentElement) {
            document.documentElement.classList.remove('dark-theme', 'light-theme', 'theme-azul');
        }
        
        if (theme === 'dark') {
            if (document.body) document.body.classList.add('dark-theme');
            if (document.documentElement) document.documentElement.classList.add('dark-theme');
        } else if (theme === 'light') {
            if (document.body) document.body.classList.add('light-theme');
            if (document.documentElement) document.documentElement.classList.add('light-theme');
        } else if (theme === 'azul' || theme === 'blue') {
            if (document.body) document.body.classList.add('theme-azul');
            if (document.documentElement) document.documentElement.classList.add('theme-azul');
        }
        
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }
}

// Carregar tema salvo (executado imediatamente)
function loadTheme() {
    try {
        if (typeof document !== 'undefined' && typeof localStorage !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'azul';
            setTheme(savedTheme);
        }
    } catch (error) {
        console.error('Erro ao carregar tema:', error);
    }
}

// Executar carregamento do tema imediatamente (quando o script é carregado)
// O tema já foi aplicado no HTML, mas vamos garantir que está correto
loadTheme();

// Funções de Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    // Carregar tema novamente para garantir
    loadTheme();
    
    await carregarRegistros();
    setupEventListeners();
    atualizarTabela();
    atualizarBotoesAcao(); // Adicione esta linha para desabilitar os botões ao iniciar
});

// O evento do botão de relatório é configurado na função de inicialização dos gráficos (linha 1084)

// Listener para eventos de tema do IPC
try {
    if (typeof ipcRenderer !== 'undefined' && ipcRenderer) {
        // Remover listener anterior se existir
        ipcRenderer.removeAllListeners('change-theme');
        // Adicionar novo listener
        ipcRenderer.on('change-theme', (event, theme) => {
            setTheme(theme);
        });
    }
} catch (error) {
    console.error('Erro ao configurar listener de tema:', error);
}

function setupEventListeners() {
    // Listeners para os botões principais
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
    document.getElementById('btnLimparPesquisa').addEventListener('click', limparPesquisa);
    document.getElementById('btnFiltrarAvancado').addEventListener('click', toggleFiltroAvancado);
    document.getElementById('btnAplicarFiltroAvancado').addEventListener('click', aplicarFiltroAvancado);
    document.getElementById('btnLimparFiltroAvancado').addEventListener('click', limparFiltroAvancado);
    document.getElementById('btnExcluirRegistro').addEventListener('click', iniciarExclusao);

    // Listeners para ordenação
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => ordenarTabela(th));
    });

    // Atualiza o listener para a tabela
    const tbody = document.getElementById('listaExames');
    if (tbody) {
        // Remove o evento de clique antigo e adiciona o novo
        tbody.removeEventListener('click', handleRowClick);
        tbody.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            if (!row || !row.dataset.id) return;
            
            handleRowClick(row);
        });

        // Evento de duplo clique atualizado
        tbody.addEventListener('dblclick', (event) => {
            const row = event.target.closest('tr');
            if (!row || !row.dataset.id) return;
            
            const id = parseInt(row.dataset.id);
            const registro = registros.find(r => r.id === id);
            if (registro) {
                abrirModalObservacoes(registro);
            }
        });
    }

    // Adicionar listener para o botão de importar (se existir)
    const btnImportar = document.getElementById('btnImportar');
    if (btnImportar) {
        btnImportar.addEventListener('click', iniciarImportacao);
    }
}

// Adicione estes listeners logo após a definição dos outros event listeners
ipcRenderer.on('show-export-modal', () => {
    abrirModalExportar();
});

ipcRenderer.on('start-import', () => {
    iniciarImportacao();
});

// Funções de Manipulação de Registros
async function carregarRegistros() {
    registros = await ipcRenderer.invoke('ler-registros');
    registrosFiltrados = [...registros];
    atualizarTabela();
    // Atualizar ano selecionado baseado nos registros disponíveis
    if (registros.length > 0) {
        const anos = new Set();
        registros.forEach(registro => {
            const data = new Date(registro.dataHoraExame);
            if (!isNaN(data.getTime())) {
                anos.add(data.getFullYear().toString());
            }
        });
        const anosOrdenados = Array.from(anos).sort((a, b) => parseInt(b) - parseInt(a));
        if (anosOrdenados.length > 0) {
            anoSelecionado = anosOrdenados[0];
        }
    }
}

async function salvarRegistros() {
    await ipcRenderer.invoke('salvar-registros', registros);
}

// Funções para manipulação do formulário
window.salvarExame = function(event) {
    event.preventDefault();
    const form = document.getElementById('formExame');
    
    const novoExame = {
        id: registroSelecionado ? registroSelecionado.id : Date.now(), // Garante um ID único
        nomePaciente: form.nomePaciente.value.trim(),
        modalidade: form.modalidade.value,
        observacoes: form.observacoes.value.trim(),
        numeroAcesso: form.numeroAcesso.value.trim(),
        dataHoraExame: form.dataHoraExame.value,
        nomeTecnico: form.nomeTecnico.value.trim()
    };

    if (registroSelecionado) {
        const index = registros.findIndex(r => r.id === registroSelecionado.id);
        registros[index] = novoExame;
    } else {
        registros.unshift(novoExame);
    }

    salvarRegistros();
    registrosFiltrados = [...registros];
    registroSelecionado = null;
    paginaAtual = 1;
    
    // Usar o método hide do modal
    document.getElementById('modalForm').style.display = 'none';
    atualizarTabela();
    atualizarBotoesAcao();
}

// Adicionar função para fechar modal
window.fecharModal = function() {
    document.getElementById('modalForm').style.display = 'none';
}

window.abrirModal = function(tipo) {
    const form = document.getElementById('formExame');
    const modal = document.getElementById('modalForm');
    
    if (tipo === 'novo') {
        form.reset();
        // Ajusta para usar a hora local do sistema
        const agora = new Date();
        const dataLocal = agora.toLocaleString('sv').replace(' ', 'T').substring(0, 16);
        form.dataHoraExame.value = dataLocal;
        document.getElementById('modalTitle').textContent = 'Novo Registro';
    } else if (tipo === 'editar' && registroSelecionado) {
        form.nomePaciente.value = registroSelecionado.nomePaciente;
        form.modalidade.value = registroSelecionado.modalidade;
        form.observacoes.value = registroSelecionado.observacoes;
        form.numeroAcesso.value = registroSelecionado.numeroAcesso;
        form.dataHoraExame.value = registroSelecionado.dataHoraExame;
        form.nomeTecnico.value = registroSelecionado.nomeTecnico;
        document.getElementById('modalTitle').textContent = 'Editar Registro';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

window.fecharModal = function() {
    const modal = document.getElementById('modalForm');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

window.limparCampos = function() {
    document.getElementById('formExame').reset();
    // Ajusta para usar a hora local do sistema
    const agora = new Date();
    const dataLocal = agora.toLocaleString('sv').replace(' ', 'T').substring(0, 16);
    document.getElementById('dataHoraExame').value = dataLocal;
}

// Funções de UI
function atualizarTabela() {
    registrosAtuais = registrosFiltrados;
    const tbody = document.getElementById('listaExames');
    if (!tbody) {
        console.error('Elemento tbody não encontrado');
        return;
    }

    tbody.innerHTML = ''; // Limpa a tabela
    
    const inicio = 0;
    const fim = Math.min(registrosPorPagina, registrosAtuais.length);
    
    for (let i = inicio; i < fim; i++) {
        const registro = registrosAtuais[i];
        const tr = criarLinhaTabela(registro);
        if (registroSelecionado && registro.id === registroSelecionado.id) {
            tr.classList.add('selected');
        }
        tbody.appendChild(tr);
    }

    atualizarBotaoCarregarMais(registrosAtuais.length);
    atualizarInfoRegistros(registrosAtuais.length);
    atualizarBotoesAcao();
}

function atualizarInfoRegistros(total) {
    const registrosExibidos = Math.min(registrosPorPagina * paginaAtual, total);
    const infoElement = document.getElementById('infoRegistros');
    infoElement.textContent = `Exibindo ${registrosExibidos} de ${total} registros`;
}

// Adicionar função para atualizar visibilidade do botão "Carregar Mais"
function atualizarBotaoCarregarMais(totalRegistros) {
    const btnCarregarMais = document.getElementById('btnCarregarMais');
    const registrosExibidos = registrosPorPagina * paginaAtual;
    
    if (registrosExibidos >= totalRegistros) {
        btnCarregarMais.style.display = 'none';
    } else {
        btnCarregarMais.style.display = 'block';
    }
}

// Adicionar função para carregar mais registros
function carregarMaisRegistros() {
    const tbody = document.getElementById('listaExames');
    const inicio = registrosPorPagina * paginaAtual;
    const fim = Math.min(inicio + registrosPorPagina, registrosAtuais.length);
    
    for (let i = inicio; i < fim; i++) {
        const registro = registrosAtuais[i];
        const tr = criarLinhaTabela(registro);
        tbody.appendChild(tr);
    }
    
    paginaAtual++;
    atualizarBotaoCarregarMais(registrosAtuais.length);
    atualizarInfoRegistros(registrosAtuais.length);
}

// Adicionar reset da paginação quando aplicar filtros ou fazer pesquisa
function resetPaginacao() {
    paginaAtual = 1;
    registrosPorPagina = 20;
}

// Funções de Modal
function abrirModal(tipo) {
    const modal = document.getElementById('modalForm');
    const form = document.getElementById('formExame');
    
    if (tipo === 'novo') {
        form.reset();
        const agora = new Date();
        form.dataHoraExame.value = agora.toISOString().slice(0, 16);
        document.getElementById('modalTitle').textContent = 'Novo Registro';
    } else if (tipo === 'editar' && registroSelecionado) {
        form.nomePaciente.value = registroSelecionado.nomePaciente;
        form.modalidade.value = registroSelecionado.modalidade;
        form.observacoes.value = registroSelecionado.observacoes;
        form.numeroAcesso.value = registroSelecionado.numeroAcesso;
        form.dataHoraExame.value = registroSelecionado.dataHoraExame;
        form.nomeTecnico.value = registroSelecionado.nomeTecnico;
        document.getElementById('modalTitle').textContent = 'Editar Registro';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function fecharModal() {
    const modal = document.getElementById('modalForm');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Funções Auxiliares
function formatarData(dataString) {
    if (!dataString) return '';
    
    try {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) return 'Data inválida';
        
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data inválida';
    }
}

function handleRowClick(row) {
    const id = parseInt(row.dataset.id);
    const registro = registros.find(r => r.id === id);
    
    if (!registro) return;

    // Remove seleção de todas as linhas
    document.querySelectorAll('tr.selected').forEach(tr => {
        tr.classList.remove('selected');
    });

    if (registroSelecionado && registroSelecionado.id === id) {
        // Se clicou na linha já selecionada, remove a seleção
        registroSelecionado = null;
        row.classList.remove('selected');
    } else {
        // Seleciona a nova linha
        row.classList.add('selected');
        registroSelecionado = registro;
    }

    atualizarBotoesAcao();
}

// Funções para Pesquisa e Filtros
function handleSearchInput(event) {
    const searchText = event.target.value.toLowerCase();
    document.getElementById('btnLimparPesquisa').style.display = searchText ? 'block' : 'none';
    
    registrosFiltrados = registros.filter(registro => {
        return Object.values(registro).some(value => 
            String(value).toLowerCase().includes(searchText)
        );
    });
    
    paginaAtual = 1;
    atualizarTabela();
}

function limparPesquisa() {
    document.getElementById('searchInput').value = '';
    document.getElementById('btnLimparPesquisa').style.display = 'none';
    registrosFiltrados = [...registros];
    paginaAtual = 1;
    atualizarTabela();
}

function toggleFiltroAvancado() {
    const container = document.getElementById('filtroAvancadoContainer');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
}

function aplicarFiltroAvancado() {
    resetPaginacao();
    const modalidade = document.getElementById('filtroModalidade').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const horaFim = document.getElementById('horaFim').value;

    const inicio = dataInicio ? new Date(`${dataInicio}T${horaInicio}`) : null;
    const fim = dataFim ? new Date(`${dataFim}T${horaFim}`) : null;

    registrosFiltrados = registros.filter(registro => {
        const dataExame = new Date(registro.dataHoraExame);
        const passaModalidade = !modalidade || registro.modalidade === modalidade;
        const passaData = (!inicio || dataExame >= inicio) && (!fim || dataExame <= fim);
        return passaModalidade && passaData;
    });

    paginaAtual = 1;
    atualizarTabela();
}

function limparFiltroAvancado() {
    document.getElementById('filtroModalidade').value = '';
    document.getElementById('dataInicio').value = '';
    document.getElementById('horaInicio').value = '00:00';
    document.getElementById('dataFim').value = '';
    document.getElementById('horaFim').value = '23:59';
    registrosFiltrados = [...registros];
    paginaAtual = 1;
    atualizarTabela();
}

// Funções para Ordenação
function ordenarTabela(th) {
    const campos = ['nomePaciente', 'modalidade', 'observacoes', 'numeroAcesso', 'dataHoraExame', 'nomeTecnico'];
    const campo = campos[th.cellIndex];
    const ordem = th.dataset.sort === 'asc' ? 1 : -1;
    
    registrosFiltrados.sort((a, b) => {
        if (campo === 'dataHoraExame') {
            // Ordenação especial para datas
            const dataA = new Date(a[campo]);
            const dataB = new Date(b[campo]);
            return (dataA - dataB) * ordem;
        } else {
            // Ordenação para texto
            const valorA = String(a[campo]).toLowerCase();
            const valorB = String(b[campo]).toLowerCase();
            return valorA.localeCompare(valorB) * ordem;
        }
    });
    
    // Atualiza o indicador de ordenação em todas as colunas
    document.querySelectorAll('th[data-sort]').forEach(header => {
        header.dataset.sort = header === th ? (ordem === 1 ? 'desc' : 'asc') : 'asc';
    });
    
    atualizarTabela();
}

// Funções para Exclusão
function iniciarExclusao() {
    if (!registroSelecionado) return;

    const modalConfirmacao = document.getElementById('modalConfirmacao');
    const btnConfirmar = modalConfirmacao.querySelector('.btn-confirmar');
    const btnCancelar = modalConfirmacao.querySelector('.btn-cancelar');
    const fechar = modalConfirmacao.querySelector('.close');

    const fecharModalConfirmacao = () => {
        modalConfirmacao.classList.remove('show');
        setTimeout(() => {
            modalConfirmacao.style.display = 'none';
            // Limpar todos os event listeners
            btnConfirmar.onclick = null;
            btnCancelar.onclick = null;
            fechar.onclick = null;
        }, 300);
    };

    const confirmarExclusao = () => {
        const index = registros.findIndex(r => r.id === registroSelecionado.id);
        if (index !== -1) {
            registros.splice(index, 1);
            registrosFiltrados = registrosFiltrados.filter(r => r.id !== registroSelecionado.id);
            registroSelecionado = null;
            salvarRegistros();
            atualizarTabela();
            atualizarBotoesAcao();
        }
        fecharModalConfirmacao();
    };

    // Configurar event listeners
    btnConfirmar.onclick = confirmarExclusao;
    btnCancelar.onclick = fecharModalConfirmacao;
    fechar.onclick = fecharModalConfirmacao;

    // Abrir modal com animação
    modalConfirmacao.style.display = 'flex';
    setTimeout(() => modalConfirmacao.classList.add('show'), 10);
}

// Funções para Exportação
function abrirModalExportar() {
    const modal = document.getElementById('modalExportar');
    
    // Adicionar listeners para os radio buttons
    document.querySelectorAll('input[name="filtroExport"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const exportDateFields = document.getElementById('exportDateFields');
            exportDateFields.style.display = e.target.value === 'periodo' ? 'block' : 'none';
        });
    });

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Adicione este código após a definição da função abrirModalExportar
document.querySelectorAll('input[name="filtroExport"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const dateFields = document.getElementById('exportDateFields');
        dateFields.style.display = e.target.value === 'periodo' ? 'block' : 'none';
    });
});

async function exportarRegistros(tipo) {
    try {
        const registrosParaExportar = obterRegistrosFiltradosExportacao();
        if (registrosParaExportar.length === 0) {
            alert('Não há registros para exportar.');
            return;
        }

        if (tipo === 'backup') {
            // Para backup, enviar os registros brutos
            await ipcRenderer.invoke('salvar-arquivo', {
                conteudo: JSON.stringify(registrosParaExportar, null, 2),
                tipo: 'json'
            });
        } else if (tipo === 'pdf') {
            await ipcRenderer.invoke('exportar-pdf', registrosParaExportar);
        }
        // ... restante do código existente ...
        fecharModalExportar();
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar: ' + error.message);
    }
}

function fecharModalExportar() {
    const modal = document.getElementById('modalExportar');
    modal.classList.remove('show');
    
    // Resetar campos ao fechar
    document.getElementById('exportDateFields').style.display = 'none';
    document.querySelector('input[name="filtroExport"][value="todos"]').checked = true;
    document.getElementById('exportDataInicio').value = '';
    document.getElementById('exportDataFim').value = '';
    document.getElementById('exportHoraInicio').value = '00:00';
    document.getElementById('exportHoraFim').value = '23:59';
    
    setTimeout(() => modal.style.display = 'none', 300);
}

function obterRegistrosFiltradosExportacao() {
    const filtro = document.querySelector('input[name="filtroExport"]:checked').value;
    
    if (filtro === 'todos') {
        return registrosFiltrados;
    } else if (filtro === 'periodo') {
        const dataInicio = document.getElementById('exportDataInicio').value;
        const horaInicio = document.getElementById('exportHoraInicio').value || '00:00';
        const dataFim = document.getElementById('exportDataFim').value;
        const horaFim = document.getElementById('exportHoraFim').value || '23:59';

        if (!dataInicio || !dataFim) {
            alert('Por favor, preencha as datas inicial e final');
            return [];
        }

        const inicio = new Date(`${dataInicio}T${horaInicio}`);
        const fim = new Date(`${dataFim}T${horaFim}`);

        return registrosFiltrados.filter(registro => {
            const dataExame = new Date(registro.dataHoraExame);
            return dataExame >= inicio && dataExame <= fim;
        });
    }
    return [];
}

// Adicionar o evento de clique para exportação Excel
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...

    // Adicionar handler para exportação Excel
    document.getElementById('exportarCSV').addEventListener('click', async () => {
        try {
            const registrosParaExportar = obterRegistrosFiltradosExportacao();
            if (registrosParaExportar.length === 0) {
                alert('Não há registros para exportar.');
                return;
            }
            
            await ipcRenderer.invoke('exportar-csv', registrosParaExportar);
            fecharModalExportar();
        } catch (error) {
            console.error('Erro ao exportar Excel:', error);
            alert('Erro ao exportar para Excel: ' + error.message);
        }
    });
});

function criarLinhaTabela(registro) {
    const tr = document.createElement('tr');
    tr.dataset.id = registro.id.toString();
    tr.innerHTML = `
        <td>${registro.nomePaciente || ''}</td>
        <td>${registro.modalidade || ''}</td>
        <td>${registro.observacoes || ''}</td>
        <td>${registro.numeroAcesso || ''}</td>
        <td>${formatarData(registro.dataHoraExame) || ''}</td>
        <td>${registro.nomeTecnico || ''}</td>
        <td class="cell-with-obs">${registro.observacoesAdicionais ? '<span class="obs-icon">📝</span>' : ''}</td>
    `;
    return tr;
}

function atualizarBotoesAcao() {
    document.getElementById('btnEditarRegistro').disabled = !registroSelecionado;
    document.getElementById('btnExcluirRegistro').disabled = !registroSelecionado;
}

function abrirModalObservacoes(registro) {
    const modal = document.getElementById('modalObservacoes');
    document.getElementById('observacoesAdicionais').value = registro.observacoesAdicionais || '';
    registroAtualId = registro.id;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function fecharModalObservacoes() {
    const modal = document.getElementById('modalObservacoes');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
    registroAtualId = null;
}

function salvarObservacoes() {
    const observacoes = document.getElementById('observacoesAdicionais').value;
    if (!registroAtualId) return;
    const index = registros.findIndex(r => r.id === registroAtualId);
    if (index !== -1) {
        registros[index].observacoesAdicionais = observacoes;
        salvarRegistros();
        atualizarTabela();
        fecharModalObservacoes();
    }
}

// Adicione as novas funções de importação
let registrosParaImportar = null;

function abrirModalImportacao(novosRegistros) {
    registrosParaImportar = novosRegistros;
    const modal = document.getElementById('modalImportacao');
    
    if (!modal) {
        console.error('Modal de importação não encontrado');
        return;
    }

    const btnSubstituir = modal.querySelector('.btn-substituir');
    const btnAdicionar = modal.querySelector('.btn-adicionar');
    const btnCancelar = modal.querySelector('.btn-cancelar');
    const btnFechar = modal.querySelector('.close');

    function fecharModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            registrosParaImportar = null;
        }, 300);
    }

    btnSubstituir.onclick = async () => {
        if (registrosParaImportar) {
            registros = registrosParaImportar;
            registrosFiltrados = [...registros];
            await salvarRegistros();
            atualizarTabela();
            fecharModal();
        }
    };

    btnAdicionar.onclick = async () => {
        if (registrosParaImportar) {
            const idsExistentes = new Set(registros.map(r => r.id));
            const novosRegistros = registrosParaImportar.filter(r => !idsExistentes.has(r.id));
            registros = [...registros, ...novosRegistros];
            registrosFiltrados = [...registros];
            await salvarRegistros();
            atualizarTabela();
            fecharModal();
        }
    };

    btnCancelar.onclick = fecharModal;
    btnFechar.onclick = fecharModal;

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Modifique a função de importação existente ou adicione este listener
ipcRenderer.on('arquivo-importado', (event, dados) => {
    try {
        console.log('Recebendo dados importados:', dados); // Debug
        const novosRegistros = JSON.parse(dados);
        if (Array.isArray(novosRegistros) && novosRegistros.length > 0) {
            abrirModalImportacao(novosRegistros);
        } else {
            alert('O arquivo não contém registros válidos.');
        }
    } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        alert('Erro ao processar o arquivo. Verifique se o formato está correto.');
    }
});

// Função para iniciar o processo de importação
async function iniciarImportacao() {
    try {
        await ipcRenderer.invoke('importar-arquivo');
    } catch (error) {
        console.error('Erro ao iniciar importação:', error);
        alert('Erro ao iniciar importação de arquivo');
    }
}

// Atualizar o event listener para arquivos importados
ipcRenderer.on('arquivo-importado', (event, dados) => {
    console.log('Recebendo dados importados');
    try {
        const novosRegistros = JSON.parse(dados);
        if (!Array.isArray(novosRegistros)) {
            throw new Error('Formato inválido: os dados não são um array');
        }
        
        if (novosRegistros.length === 0) {
            alert('O arquivo não contém registros.');
            return;
        }

        // Verifica se os registros têm o formato correto
        const formatoValido = novosRegistros.every(registro => 
            registro.hasOwnProperty('nomePaciente') && 
            registro.hasOwnProperty('modalidade') &&
            registro.hasOwnProperty('numeroAcesso')
        );

        if (!formatoValido) {
            alert('O arquivo contém registros em formato inválido.');
            return;
        }

        // Abre o modal de importação
        const modal = document.getElementById('modalImportacao');
        if (!modal) {
            console.error('Modal de importação não encontrado');
            return;
        }

        registrosParaImportar = novosRegistros;
        
        // Configura os botões do modal
        const btnSubstituir = modal.querySelector('.btn-substituir');
        const btnAdicionar = modal.querySelector('.btn-adicionar');
        const btnCancelar = modal.querySelector('.btn-cancelar');
        const btnFechar = modal.querySelector('.close');

        function fecharModalImportacao() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                registrosParaImportar = null;
            }, 300);
        }

        btnSubstituir.onclick = async () => {
            registros = [...novosRegistros];
            registrosFiltrados = [...registros];
            await salvarRegistros();
            atualizarTabela();
            fecharModalImportacao();
        };

        btnAdicionar.onclick = async () => {
            const idsExistentes = new Set(registros.map(r => r.id));
            const registrosAdicionais = novosRegistros.filter(r => !idsExistentes.has(r.id));
            registros = [...registros, ...registrosAdicionais];
            registrosFiltrados = [...registros];
            await salvarRegistros();
            atualizarTabela();
            fecharModalImportacao();
        };

        btnCancelar.onclick = fecharModalImportacao;
        btnFechar.onclick = fecharModalImportacao;

        // Exibe o modal com animação
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);

    } catch (error) {
        console.error('Erro ao processar arquivo importado:', error);
        alert('Erro ao processar o arquivo. Verifique se o formato está correto.');
    }
});

// Variáveis globais para o gráfico
let chartInstance = null;
let modalidadeSelecionada = 'Tudo';
let anoSelecionado = new Date().getFullYear().toString();

// Função para fechar o modal de gráfico
window.fecharModalGrafico = function() {
    const modal = document.getElementById('modalGrafico');
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        // Destruir o gráfico ao fechar
        if (chartInstance) {
            try {
                chartInstance.destroy();
            } catch (e) {
                console.error('Erro ao destruir gráfico:', e);
            }
            chartInstance = null;
        }
    }, 300);
}

// Variável para controlar se os dropdowns já foram inicializados
let dropdownsInicializados = false;

// Função para inicializar os dropdowns
function inicializarDropdowns() {
    // Evitar múltiplas inicializações
    if (dropdownsInicializados) {
        atualizarAnosDropdown();
        return;
    }
    
    // Dropdown de modalidade
    const modalidadeButton = document.getElementById('modalidadeDropdownButton');
    const modalidadeMenu = document.getElementById('modalidadeDropdownMenu');
    
    if (modalidadeButton && modalidadeMenu) {
        modalidadeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            modalidadeMenu.classList.toggle('show');
        });
        
        modalidadeMenu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                modalidadeSelecionada = item.dataset.modalidade;
                modalidadeButton.textContent = item.textContent;
                modalidadeMenu.classList.remove('show');
                atualizarGrafico();
            });
        });
    }
    
    // Inicializar dropdown de ano
    atualizarAnosDropdown();
    
    // Botão de exportar PDF
    const exportPDFButton = document.getElementById('exportPDF');
    if (exportPDFButton && !exportPDFButton.hasAttribute('data-initialized')) {
        exportPDFButton.setAttribute('data-initialized', 'true');
        exportPDFButton.addEventListener('click', exportarGraficoPDF);
    }
    
    dropdownsInicializados = true;
}

// Função para atualizar o dropdown de anos
function atualizarAnosDropdown() {
    const yearButton = document.getElementById('yearDropdownButton');
    const yearMenu = document.getElementById('yearDropdownMenu');
    
    if (yearButton && yearMenu) {
        // Extrair anos únicos dos registros
        const anos = new Set();
        (registros || []).forEach(registro => {
            if (registro && registro.dataHoraExame) {
                const data = new Date(registro.dataHoraExame);
                if (!isNaN(data.getTime())) {
                    anos.add(data.getFullYear().toString());
                }
            }
        });
        
        // Ordenar anos em ordem decrescente
        const anosOrdenados = Array.from(anos).sort((a, b) => parseInt(b) - parseInt(a));
        
        // Se não houver anos, usar o ano atual
        if (anosOrdenados.length === 0) {
            anosOrdenados.push(new Date().getFullYear().toString());
        }
        
        // Limpar menu e adicionar anos
        yearMenu.innerHTML = '';
        anosOrdenados.forEach(ano => {
            const li = document.createElement('li');
            li.textContent = ano;
            li.dataset.ano = ano;
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                anoSelecionado = ano;
                yearButton.textContent = `Ano: ${ano}`;
                yearMenu.classList.remove('show');
                atualizarGrafico();
            });
            yearMenu.appendChild(li);
        });
        
        // Definir ano padrão se ainda não estiver definido
        if (anosOrdenados.length > 0 && (!anoSelecionado || !anosOrdenados.includes(anoSelecionado))) {
            anoSelecionado = anosOrdenados[0];
            yearButton.textContent = `Ano: ${anoSelecionado}`;
        } else if (anoSelecionado) {
            yearButton.textContent = `Ano: ${anoSelecionado}`;
        }
        
        // Adicionar listener apenas uma vez
        if (!yearButton.hasAttribute('data-initialized')) {
            yearButton.setAttribute('data-initialized', 'true');
            yearButton.addEventListener('click', (e) => {
                e.stopPropagation();
                yearMenu.classList.toggle('show');
            });
        }
    }
    
    // Fechar dropdowns ao clicar fora (adicionar apenas uma vez)
    if (!window.dropdownClickHandlerAdded) {
        window.dropdownClickHandlerAdded = true;
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }
}

// Função para atualizar o gráfico
function atualizarGrafico() {
    try {
        // Verificar se Chart.js está disponível
        if (typeof Chart === 'undefined') {
            console.error('Chart.js não está carregado');
            alert('Erro: Chart.js não está carregado. Verifique a conexão com a internet.');
            return;
        }
        
        // Filtrar registros por modalidade e ano
        const registrosFiltrados = (registros || []).filter(registro => {
            if (!registro || !registro.dataHoraExame) return false;
            const data = new Date(registro.dataHoraExame);
            if (isNaN(data.getTime())) return false;
            
            const ano = data.getFullYear().toString();
            const passaAno = ano === anoSelecionado;
            const passaModalidade = modalidadeSelecionada === 'Tudo' || registro.modalidade === modalidadeSelecionada;
            
            return passaAno && passaModalidade;
        });
        
        // Agrupar por mês
        const dadosPorMes = {};
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        registrosFiltrados.forEach(registro => {
            const data = new Date(registro.dataHoraExame);
            if (!isNaN(data.getTime())) {
                const mes = data.getMonth();
                const chave = meses[mes];
                
                if (!dadosPorMes[chave]) {
                    dadosPorMes[chave] = 0;
                }
                dadosPorMes[chave]++;
            }
        });
        
        // Preparar dados para o gráfico - mostrar todos os meses
        const labels = meses;
        const valores = meses.map(mes => dadosPorMes[mes] || 0);
        
        // Obter o canvas
        const canvas = document.getElementById('barChart');
        if (!canvas) {
            console.error('Canvas não encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Não foi possível obter o contexto do canvas');
            return;
        }
        
        // Destruir gráfico anterior se existir
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        
        // Criar novo gráfico
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Exames',
                    data: valores,
                    backgroundColor: 'rgba(79, 129, 189, 0.8)',
                    borderColor: 'rgba(79, 129, 189, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: `Exames por Mês - ${anoSelecionado}${modalidadeSelecionada !== 'Tudo' ? ' - ' + modalidadeSelecionada : ''}`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
        
        // Atualizar relatório
        atualizarRelatorio(registrosFiltrados, dadosPorMes);
    } catch (error) {
        console.error('Erro ao atualizar gráfico:', error);
        alert('Erro ao atualizar gráfico: ' + error.message);
    }
}

// Função para atualizar o relatório
function atualizarRelatorio(registrosFiltrados, dadosPorMes) {
    const relatorioContent = document.getElementById('relatorioContent');
    if (!relatorioContent) return;
    
    const totalExames = registrosFiltrados.length;
    const totalPorModalidade = {};
    
    registrosFiltrados.forEach(registro => {
        const modalidade = registro.modalidade || 'Não especificado';
        totalPorModalidade[modalidade] = (totalPorModalidade[modalidade] || 0) + 1;
    });
    
    let html = `<p><strong>Total de Exames:</strong> ${totalExames}</p>`;
    
    if (modalidadeSelecionada === 'Tudo') {
        html += '<p><strong>Por Modalidade:</strong></p><ul>';
        Object.keys(totalPorModalidade).sort().forEach(modalidade => {
            html += `<li>${modalidade}: ${totalPorModalidade[modalidade]}</li>`;
        });
        html += '</ul>';
    }
    
    html += '<p><strong>Por Mês:</strong></p><ul>';
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    meses.forEach(mes => {
        if (dadosPorMes[mes]) {
            html += `<li>${mes}: ${dadosPorMes[mes]}</li>`;
        }
    });
    html += '</ul>';
    
    relatorioContent.innerHTML = html;
}

// Função para exportar gráfico como PDF
async function exportarGraficoPDF() {
    try {
        if (!chartInstance) {
            alert('Nenhum gráfico para exportar');
            return;
        }
        
        // Filtrar registros por modalidade e ano (mesmo filtro usado no gráfico)
        const registrosFiltrados = (registros || []).filter(registro => {
            if (!registro || !registro.dataHoraExame) return false;
            const data = new Date(registro.dataHoraExame);
            if (isNaN(data.getTime())) return false;
            
            const ano = data.getFullYear().toString();
            const passaAno = ano === anoSelecionado;
            const passaModalidade = modalidadeSelecionada === 'Tudo' || registro.modalidade === modalidadeSelecionada;
            
            return passaAno && passaModalidade;
        });
        
        // Calcular dados do relatório
        const totalExames = registrosFiltrados.length;
        const totalPorModalidade = {};
        const dadosPorMes = {};
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        registrosFiltrados.forEach(registro => {
            // Por modalidade
            const modalidade = registro.modalidade || 'Não especificado';
            totalPorModalidade[modalidade] = (totalPorModalidade[modalidade] || 0) + 1;
            
            // Por mês
            const data = new Date(registro.dataHoraExame);
            if (!isNaN(data.getTime())) {
                const mes = data.getMonth();
                const nomeMes = meses[mes];
                dadosPorMes[nomeMes] = (dadosPorMes[nomeMes] || 0) + 1;
            }
        });
        
        // Usar jsPDF para criar o PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        
        let yPos = 20; // Posição vertical inicial
        
        // Adicionar título
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.text('Relatório de Exames Médicos', 148.5, yPos, { align: 'center' });
        yPos += 10;
        
        // Adicionar informações do filtro
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Ano: ${anoSelecionado}`, 20, yPos);
        pdf.text(`Modalidade: ${modalidadeSelecionada === 'Tudo' ? 'Todas as Modalidades' : modalidadeSelecionada}`, 20, yPos + 7);
        yPos += 15;
        
        // Converter canvas para imagem
        const canvas = document.getElementById('barChart');
        const imgData = canvas.toDataURL('image/png');
        
        // Calcular dimensões da imagem (ajustar para caber bem)
        const imgWidth = 240;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Adicionar imagem do gráfico ao PDF
        pdf.addImage(imgData, 'PNG', 20, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 15;
        
        // Adicionar seção de relatório textual
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('Resumo Estatístico', 20, yPos);
        yPos += 8;
        
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'normal');
        
        // Total de exames
        pdf.setFont(undefined, 'bold');
        pdf.text(`Total de Exames: ${totalExames}`, 20, yPos);
        yPos += 7;
        
        // Por modalidade (se filtro = "Tudo")
        if (modalidadeSelecionada === 'Tudo') {
            pdf.setFont(undefined, 'bold');
            pdf.text('Por Modalidade:', 20, yPos);
            yPos += 7;
            pdf.setFont(undefined, 'normal');
            
            const modalidadesOrdenadas = Object.keys(totalPorModalidade).sort();
            modalidadesOrdenadas.forEach(modalidade => {
                const quantidade = totalPorModalidade[modalidade];
                pdf.text(`  • ${modalidade}: ${quantidade}`, 25, yPos);
                yPos += 6;
                
                // Quebra de página se necessário
                if (yPos > 180) {
                    pdf.addPage();
                    yPos = 20;
                }
            });
        }
        
        // Por mês
        yPos += 3;
        pdf.setFont(undefined, 'bold');
        pdf.text('Por Mês:', 20, yPos);
        yPos += 7;
        pdf.setFont(undefined, 'normal');
        
        meses.forEach(mes => {
            const quantidade = dadosPorMes[mes] || 0;
            pdf.text(`  • ${mes}: ${quantidade}`, 25, yPos);
            yPos += 6;
            
            // Quebra de página se necessário
            if (yPos > 180) {
                pdf.addPage();
                yPos = 20;
            }
        });
        
        // Adicionar data/hora de geração no rodapé
        const dataHora = new Date().toLocaleString('pt-BR');
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'italic');
        pdf.text(`Relatório gerado em: ${dataHora}`, 20, 195, { align: 'left' });
        
        // Salvar PDF
        const nomeModalidade = modalidadeSelecionada === 'Tudo' ? 'Todas' : modalidadeSelecionada.replace(/\s+/g, '_');
        const fileName = `relatorio_exames_${anoSelecionado}_${nomeModalidade}.pdf`;
        pdf.save(fileName);
        
    } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        alert('Erro ao exportar PDF. Verifique se a biblioteca jsPDF está carregada.\n\nErro: ' + error.message);
    }
}

// Função para abrir o modal de gráfico
function abrirModalGrafico() {
    const modal = document.getElementById('modalGrafico');
    if (!modal) {
        console.error('Modal de gráfico não encontrado');
        return;
    }
    
    // Verificar se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        alert('Erro: Chart.js não está carregado. Verifique a conexão com a internet.');
        return;
    }
    
    // Adicionar listener para fechar ao clicar fora (apenas uma vez)
    if (!modal.hasAttribute('data-click-handler')) {
        modal.setAttribute('data-click-handler', 'true');
        modal.addEventListener('click', function(e) {
            // Fechar apenas se clicar no overlay (fora do conteúdo)
            if (e.target === modal) {
                window.fecharModalGrafico();
            }
        });
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
        // Aguardar um pouco mais para garantir que o modal está totalmente visível
        setTimeout(() => {
            inicializarDropdowns();
            atualizarGrafico();
        }, 100);
    }, 10);
}

// Atualizar a função que abre o modal para inicializar os dropdowns
// Aguardar o DOM estar pronto e depois configurar o botão de relatório
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configurarBotaoRelatorio);
} else {
    // DOM já está pronto
    setTimeout(configurarBotaoRelatorio, 100);
}

function configurarBotaoRelatorio() {
    const relatorioBtn = document.getElementById('relatorio');
    if (relatorioBtn && !relatorioBtn.hasAttribute('data-initialized')) {
        relatorioBtn.setAttribute('data-initialized', 'true');
        relatorioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModalGrafico();
        });
    }
}

// Exportar funções necessárias
module.exports = {
    salvarExame,
    abrirModal,
    carregarMaisRegistros: () => {
        paginaAtual++;
        atualizarTabela();
    }
};


