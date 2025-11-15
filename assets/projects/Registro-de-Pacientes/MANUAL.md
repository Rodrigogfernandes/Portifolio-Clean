# Manual do Sistema de Registro de Pacientes v2.0

## 📋 Sumário

1. [Visão Geral](#1-visão-geral)
2. [Página Inicial](#2-página-inicial)
3. [Registro de Pacientes](#3-registro-de-pacientes)
4. [Livro de Ocorrências](#4-livro-de-ocorrências)
5. [Sistema de Ponto](#5-sistema-de-ponto)
6. [Temas e Interface](#6-temas-e-interface)
7. [Exportação e Importação](#7-exportação-e-importação)
8. [Backup e Restauração](#8-backup-e-restauração)
9. [Dicas e Sugestões](#9-dicas-e-sugestões)

---

## 1. Visão Geral

O Sistema de Registro de Pacientes v2.0 é uma aplicação desktop desenvolvida em Electron que oferece gerenciamento completo para:
- **Registro de Exames Radiológicos**: Cadastro e gerenciamento de exames de pacientes
- **Livro de Ocorrências**: Registro e controle de eventos e ocorrências
- **Sistema de Ponto**: Controle de ponto de funcionários com cálculo automático

O sistema oferece interface moderna, suporte a múltiplos temas, gráficos interativos, relatórios e exportação para diversos formatos.

---

## 2. Página Inicial

### 🏠 Acesso aos Módulos

A página inicial apresenta três módulos principais:

1. **Registro de Pacientes** - Clique no card para acessar o módulo de registros
2. **Livro de Ocorrências** - Clique no card para acessar o livro de ocorrências
3. **Sistema de Ponto** - Clique no card para acessar o controle de ponto

### ⚙️ Configurações

#### Acessar Configurações
- Clique no ícone de **configurações** no canto superior direito

#### Opções Disponíveis

**Temas:**
- **Tema Claro**: Interface clara e contraste suave (padrão)
- **Tema Escuro**: Fundo escuro que reduz fadiga visual
- **Tema Azul**: Paleta azul corporativa e profissional

**Arquivos:**
- **Exportar**: Exportar dados dos registros
- **Importar**: Importar dados de arquivos

### 📤 Exportação (Menu Inicial)

1. Clique em **"Exportar"**
2. Escolha o formato:
   - **PDF**: Relatórios formatados para impressão
   - **Excel**: Planilhas editáveis (.xlsx)

### 💾 Backup e Restauração (Menu Inicial)

#### Fazer Backup
1. Acesse **"Configurações"** > **"Fazer Backup"**
2. Ou use o menu **"Arquivo"** > **"Fazer Backup"**
3. Selecione o tipo de backup:
   - **Registros**: Backup apenas dos registros de pacientes
   - **Ocorrências**: Backup apenas do livro de ocorrências
4. Escolha o local para salvar o arquivo

#### Restaurar Backup
1. Acesse **"Configurações"** > **"Importar"**
2. Ou use o menu **"Arquivo"** > **"Importar Backup"**
3. Selecione o tipo de arquivo:
   - **Registros**: Restaurar registros de pacientes
   - **Ocorrências**: Restaurar livro de ocorrências
   - **Ponto**: Restaurar dados do sistema de ponto
4. Localize o arquivo de backup
5. Confirme a restauração

---

## 3. Registro de Pacientes

### ➕ Criar Novo Registro

1. Clique no botão **"Novo Registro"**
2. Preencha os campos:
   - **Nome do Paciente** *(obrigatório)*
   - **Modalidade** *(obrigatório)*: RX, TC, RM, DO ou MG
   - **Exame Realizado** *(obrigatório)*
   - **Número de Acesso**
3. A **data e hora** são preenchidas automaticamente com o horário atual do sistema
4. Clique em **"Registrar"** para salvar

### ✏️ Editar Registro

1. **Selecione** um registro na tabela (clique na linha)
2. Clique no botão **"Editar"**
3. Faça as alterações necessárias
4. Clique em **"Registrar"** para salvar as alterações

### 🗑️ Excluir Registro

1. **Selecione** um registro na tabela
2. Clique no botão **"Excluir"**
3. Confirme a exclusão na janela de confirmação

**⚠️ Atenção:** A exclusão é permanente e não pode ser desfeita.

### 📝 Observações Adicionais

1. Dê um **duplo clique** em qualquer registro da tabela
2. Digite informações complementares sobre o exame
3. Clique em **"Salvar"** para guardar as observações
4. Registros com observações são marcados com um ícone **📝** na tabela

### 🔍 Pesquisa e Filtros

#### Pesquisa Rápida
- Use a **barra de pesquisa** no topo da tabela
- A pesquisa busca em **todos os campos** automaticamente
- A pesquisa é **instantânea** e atualiza conforme você digita
- Clique no **X** ao lado da pesquisa para limpar

#### Filtro Avançado
1. Clique no botão **"Filtro Avançado"**
2. Configure os filtros:
   - **Modalidade**: Filtre por modalidade específica (RX, TC, RM, DO, MG)
   - **Período**: Defina data e hora inicial e final
3. Clique em **"Aplicar Filtro"**
4. Use **"Limpar Filtro"** para remover todos os filtros aplicados

### 📊 Gráficos e Relatórios

#### Acessar Gráficos
1. Clique no botão **"Relatório"** na página de registros
2. Um modal será aberto com:
   - Gráfico de barras interativo
   - Relatório textual com estatísticas
   - Opções de filtro e exportação

#### Filtros do Gráfico

**Por Modalidade:**
- Clique no dropdown **"Modalidade"**
- Selecione uma modalidade específica ou **"Tudo"**
- O gráfico atualiza automaticamente

**Por Ano:**
- Clique no dropdown **"Ano"**
- Selecione o ano desejado
- O gráfico mostra os dados mensais do ano selecionado

#### Visualização do Gráfico
- O gráfico exibe a quantidade de exames por mês
- **Todos os 12 meses** são sempre exibidos (meses sem dados aparecem com valor 0)
- O gráfico é **interativo** e responsivo

#### Relatório Textual
O relatório exibe:
- **Total de Exames**: Quantidade total no período filtrado
- **Por Modalidade**: Distribuição por tipo de exame (quando filtro = "Tudo")
- **Por Mês**: Quantidade de exames por cada mês

#### Exportar Gráfico/Relatório
1. No modal de gráfico, clique no botão **"Exportar PDF"**
2. Um PDF será gerado contendo:
   - Título do relatório
   - Ano e modalidade filtrados
   - Imagem do gráfico
   - Dados do relatório textual
3. O arquivo será salvo automaticamente com nome: `relatorio_exames_[ano]_[modalidade].pdf`

### 📄 Exportação de Dados

#### Exportar para PDF
1. Use o menu **"Arquivo"** > **"Exportar"** (na página inicial)
2. Ou clique em **"Exportar"** no módulo de registros (se disponível)
3. Selecione **"PDF"**
4. Escolha o escopo:
   - Todos os registros
   - Apenas registros filtrados (se houver filtros ativos)
5. O PDF gerado inclui:
   - Cabeçalho com data/hora
   - Tabela formatada com todos os registros
   - Observações adicionais incluídas em fonte menor
   - Ideal para impressão ou arquivamento digital

#### Exportar para Excel
1. Use o menu **"Arquivo"** > **"Exportar"**
2. Selecione **"Excel"**
3. Um arquivo `.xlsx` será gerado
4. O arquivo pode ser aberto no Microsoft Excel, Google Sheets ou LibreOffice Calc
5. Todos os dados são formatados em colunas editáveis

### 📑 Paginação

- A tabela exibe **50 registros por página** por padrão
- Use os controles de paginação na parte inferior da tabela:
  - **Anterior**: Voltar para página anterior
  - **Próxima**: Avançar para próxima página
  - **Números de página**: Clique diretamente em um número

---

## 4. Livro de Ocorrências

### ➕ Nova Ocorrência

1. Clique no botão **"Nova Ocorrência"**
2. Preencha os campos:
   - **Data** *(obrigatório)*
   - **Turno** *(obrigatório)*: Manhã, Tarde ou Noite
   - **Descrição** *(obrigatório)*
   - **Responsável** *(obrigatório)*
   - **Status** *(obrigatório)*: Aberto, Em Andamento ou Resolvido
3. Clique em **"Salvar"** para registrar

### ✏️ Editar Ocorrência

1. **Selecione** uma ocorrência na tabela (clique na linha)
2. Clique no botão **"Editar"**
3. Modifique os campos desejados
4. Clique em **"Salvar"** para atualizar

### 🗑️ Excluir Ocorrência

1. **Selecione** uma ocorrência na tabela
2. Clique no botão **"Excluir"**
3. Confirme a exclusão na janela de confirmação

### 🔍 Pesquisa

- Use a **barra de pesquisa** para buscar ocorrências
- A busca funciona em **todos os campos**: data, turno, descrição, responsável e status
- A pesquisa é **instantânea** e atualiza em tempo real
- Clique no **X** para limpar a pesquisa

### 📊 Ordenação

- **Clique no cabeçalho** de qualquer coluna para ordenar
- A ordenação alterna entre **crescente** e **decrescente**
- Funciona para: Data, Turno, Descrição, Responsável e Status

### 📄 Paginação

- A tabela exibe **50 ocorrências por página**
- Navegue usando os controles de paginação
- O número de ocorrências total é exibido

---

## 5. Sistema de Ponto

### 👤 Gerenciamento de Funcionários

#### Adicionar Funcionário
1. Ative o **Modo Administrador** (veja seção abaixo)
2. Clique no botão **"Adicionar Funcionário"** na sidebar
3. Preencha os dados:
   - **Nome** *(obrigatório)*
   - **CPF** *(obrigatório)*
   - **Valor Hora** *(obrigatório)*: Valor pago por hora trabalhada
   - **Multiplicador Extra** *(obrigatório)*: Multiplicador para horas extras
   - **Carga Horária**:
     - **Meio Período**: 6 horas (manhã: 07:00-13:00, tarde: 13:00-19:00)
     - **Período Integral**: 12 horas
     - **Horário Especial**: Defina horários personalizados
   - **Senha** *(obrigatório)*: Senha para o funcionário acessar seu ponto
4. Clique em **"Adicionar Funcionário"**

#### Editar Funcionário
1. Ative o **Modo Administrador**
2. Selecione um funcionário na lista
3. Clique com o botão direito ou use o menu de opções
4. Selecione **"Editar Funcionário"**
5. Modifique os dados desejados
6. Clique em **"Salvar"**

#### Excluir Funcionário
1. Ative o **Modo Administrador**
2. Selecione o funcionário
3. Abra o menu de opções
4. Selecione **"Excluir Funcionário"**
5. Confirme a exclusão

**⚠️ Atenção:** Todos os registros de ponto do funcionário serão perdidos.

### 🔐 Modo Administrador

#### Ativar Modo Administrador
1. Clique no botão **"Administrador"** no canto inferior esquerdo
2. Digite a **senha do administrador** (padrão: 123456)
3. Clique em **"Acessar"**

#### Funcionalidades no Modo Admin

Ao ativar o modo admin, você terá acesso a:

- **Adicionar Funcionários**: Botão aparece na sidebar
- **Editar Funcionários**: Acesso ao menu de edição
- **Excluir Funcionários**: Permissão para excluir
- **Alterar Senha de Funcionários**: Botão "Alterar Senha" disponível
- **Alterar Senha do Admin**: Opção no menu de admin
- **Controlar Exclusão de Ponto**: Checkbox para permitir/bloquear exclusão por funcionários
- **Visualizar Todos os Registros**: Acesso completo aos dados

#### Indicador Visual
- Quando o modo admin está ativo, aparece um indicador **"Modo Administrador"** no canto superior direito

#### Desativar Modo Admin
1. Clique no botão **"Administrador"**
2. Selecione **"Opções do Administrador"**
3. Clique em **"Logout"**

### ⏰ Bater Ponto

#### Acessar como Funcionário
1. Selecione seu **nome na lista** de funcionários (sidebar esquerda)
2. Digite sua **senha** quando solicitado
3. Clique em **"Confirmar"**

#### Registrar Ponto
1. Com o funcionário selecionado, clique no botão **"Bater Ponto"**
2. Preencha:
   - **Data**: Data do registro (padrão: data atual)
   - **Horas Extras**: Quantidade de horas extras (opcional, padrão: 0)
   - **Turno**: Selecione o turno
     - **Manhã**: Apenas turno da manhã
     - **Tarde**: Apenas turno da tarde
     - **Ambos**: Manhã e Tarde
3. Clique em **"Salvar"**

#### Editar Registro de Ponto
1. **Clique duas vezes** em um registro da tabela
2. Modifique os horários:
   - **Carga Horária do Dia**: Horas trabalhadas no dia
   - **Turno Manhã**: Entrada e saída
   - **Turno Tarde**: Entrada e saída
   - **Horas Extras**: Quantidade de horas extras
3. Clique em **"Salvar Alterações"**

#### Excluir Registro de Ponto
- **Para Funcionários**: Apenas se o administrador permitir (checkbox ativo)
- **Para Administradores**: Sempre permitido

1. Edite o registro (duplo clique)
2. Clique em **"Excluir Registro"**
3. Confirme a exclusão

### 📅 Filtrar por Mês/Ano

1. No topo da tabela, selecione o **mês e ano** no campo de data
2. A tabela é atualizada automaticamente mostrando apenas os registros do período selecionado
3. Os cálculos de totais são atualizados conforme o filtro

### 📊 Visualização de Dados

A tabela de registros exibe:
- **Data**: Data do registro
- **Turno Manhã**: Horário de entrada e saída
- **Turno Tarde**: Horário de entrada e saída
- **Horas Extras**: Quantidade de horas extras
- **Total Horas**: Soma de todas as horas trabalhadas
- **Valor Diário**: Valor calculado automaticamente

#### Total a Receber
- No rodapé da tabela, é exibido o **total a receber** no período filtrado
- O valor é calculado automaticamente com base em:
  - Horas normais trabalhadas × Valor Hora
  - Horas extras × Valor Hora × Multiplicador Extra

### 📄 Exportar Folha de Ponto

1. Clique no botão **"Exportar PDF"**
2. Selecione:
   - **Funcionário**: Escolha um funcionário específico ou "Todos os Funcionários" (apenas no modo admin)
   - **Mês/Ano**: Selecione o período desejado
3. Clique em **"Exportar"**
4. Um arquivo PDF será gerado contendo:
   - Cabeçalho com nome do funcionário e período
   - Tabela completa com todos os registros
   - Total a receber
   - Formatação profissional para impressão

### 🔑 Gerenciamento de Senhas

#### Alterar Senha do Funcionário
1. Ative o **Modo Administrador**
2. Selecione o funcionário na lista
3. Clique no botão **"Alterar Senha"**
4. Preencha:
   - **Senha Atual**: Senha atual do funcionário
   - **Nova Senha**: Nova senha desejada
   - **Confirmar Nova Senha**: Confirme a nova senha
5. Clique em **"Alterar Senha"**

#### Alterar Senha do Administrador
1. Ative o **Modo Administrador**
2. Clique no botão **"Administrador"**
3. Selecione **"Opções do Administrador"**
4. Clique em **"Alterar Senha"**
5. Preencha:
   - **Senha Atual**: Senha atual do admin
   - **Nova Senha**: Nova senha desejada
   - **Confirmar Nova Senha**: Confirme a nova senha
6. Clique em **"Alterar"**

**⚠️ Importante:** Guarde a nova senha em local seguro. Sem ela, não será possível acessar o modo administrador.

### 👋 Logout de Funcionário

1. Com um funcionário selecionado, clique novamente no seu nome
2. Selecione **"Opções do Funcionário"**
3. Clique em **"Logout"**
4. Você será deslogado e voltará para a tela inicial

---

## 6. Temas e Interface

### 🎨 Alternar Temas

#### Método 1: Menu Superior
1. Clique no menu **"Temas"** no topo da janela
2. Escolha entre:
   - **Claro**: Interface clara e contraste suave
   - **Escuro**: Fundo escuro que reduz fadiga visual
   - **Azul**: Paleta azul corporativa

#### Método 2: Configurações
1. Clique no **ícone de configurações** (canto superior direito)
2. Na seção **"Temas"**, escolha o tema desejado

### 🌈 Características dos Temas

#### Tema Claro
- **Cor de Fundo**: Claro e suave (#f0f2f5)
- **Textos**: Escuros para boa legibilidade
- **Ideal para**: Uso diurno e ambientes bem iluminados
- **Recursos**: Contraste alto, fácil leitura

#### Tema Escuro
- **Cor de Fundo**: Escuro (#1e1e2e)
- **Textos**: Claros (#e2e2e2)
- **Ideal para**: Uso noturno e ambientes com pouca luz
- **Recursos**: 
  - Reduz fadiga visual
  - Economia de energia em telas OLED
  - Cores ajustadas para melhor legibilidade

#### Tema Azul
- **Cor de Fundo**: Azul claro (#e8f5fe)
- **Textos**: Azul escuro (#0d47a1)
- **Ideal para**: Ambiente profissional e corporativo
- **Recursos**: Paleta azul moderna e elegante

### 💾 Persistência de Tema

- O tema selecionado é **salvo automaticamente**
- Ao reiniciar a aplicação, o último tema escolhido será aplicado automaticamente
- O tema é aplicado **antes da renderização** para evitar flash de conteúdo

### 🎭 Elementos da Interface

#### Modais
- Modais com animações suaves de abertura/fechamento
- Fecham ao clicar fora ou pressionar ESC
- Design responsivo e adaptável

#### Botões
- Feedback visual ao passar o mouse
- Estados desabilitados claramente indicados
- Ícones visuais para melhor identificação

#### Tabelas
- Linhas destacadas ao passar o mouse
- Seleção visual de registros
- Ordenação por colunas (no módulo de ocorrências)

#### Campos de Formulário
- Validação visual em tempo real
- Campos obrigatórios marcados
- Mensagens de erro claras

---

## 7. Exportação e Importação

### 📤 Exportação de Dados

#### Exportar Registros
1. Na **página inicial**, clique no ícone de configurações
2. Selecione **"Exportar"**
3. Ou use o menu **"Arquivo"** > **"Exportar"**
4. Escolha o formato:
   - **PDF**: Relatório formatado para impressão
   - **Excel**: Planilha editável (.xlsx)

#### Exportar Ocorrências
- Use o mesmo processo acima para exportar ocorrências
- Selecione o tipo de arquivo quando necessário

#### Exportar Folha de Ponto
- Veja seção específica em [Sistema de Ponto > Exportar Folha de Ponto](#-exportar-folha-de-ponto)

### 📥 Importação de Dados

1. Na **página inicial**, clique no ícone de configurações
2. Selecione **"Importar"**
3. Ou use o menu **"Arquivo"** > **"Importar"**
4. Escolha o tipo de arquivo:
   - **Registros**: Importar registros de pacientes
   - **Ocorrências**: Importar livro de ocorrências
   - **Ponto**: Importar dados do sistema de ponto
5. Selecione o arquivo no explorador
6. Confirme a importação

**⚠️ Atenção:** Importar dados pode sobrescrever dados existentes. Certifique-se de fazer backup antes.

---

## 8. Backup e Restauração

### 💾 Fazer Backup

#### Backup Completo
1. Use o menu **"Arquivo"** > **"Fazer Backup"**
2. Ou acesse **Configurações** > **"Fazer Backup"**
3. Escolha o tipo de backup:
   - **Registros**: Backup dos registros de pacientes
   - **Ocorrências**: Backup do livro de ocorrências
4. Escolha o local para salvar o arquivo
5. O arquivo será salvo em formato JSON

#### Backup Individual
- Cada módulo pode ter seu backup feito separadamente
- Isso permite restaurar apenas um tipo de dado quando necessário

### 🔄 Restaurar Backup

#### Restauração Completa
1. Use o menu **"Arquivo"** > **"Importar Backup"**
2. Selecione o tipo de arquivo a restaurar:
   - **Registros**: Restaurar registros
   - **Ocorrências**: Restaurar ocorrências
   - **Ponto**: Restaurar dados de ponto
3. Localize o arquivo de backup
4. Confirme a restauração

#### Notas Importantes
- **Backup Recomendado**: Faça backup regularmente
- **Antes de Restaurar**: Sempre faça backup dos dados atuais antes de restaurar
- **Formato**: Os arquivos de backup estão em formato JSON
- **Compatibilidade**: Backups são compatíveis entre versões do sistema

### 📁 Localização dos Dados

Os arquivos de dados são armazenados na pasta `data/`:
- `data/registros.json`: Registros de pacientes
- `data/ocorrencias.json`: Livro de ocorrências
- `data/ponto.json`: Dados do sistema de ponto
- `data/config.json`: Configurações da aplicação

**💡 Dica:** Você pode fazer backup manual copiando a pasta `data/` inteira.

---

## 9. Dicas e Sugestões

### 💡 Dicas Gerais

- **Use o tema escuro** em ambientes com pouca iluminação para reduzir fadiga visual
- **Faça backups regulares** dos seus dados para evitar perda de informações
- **Use observações adicionais** para informações complementares importantes sobre os exames
- **Aproveite os filtros avançados** para encontrar registros específicos rapidamente
- **Verifique as informações** antes de salvar para evitar erros

### 📊 Trabalhando com Gráficos

- **Explore diferentes anos** para ver tendências históricas
- **Filtre por modalidade** para análises específicas
- **Exporte os gráficos em PDF** para apresentações e relatórios
- **Compare períodos** mudando o ano selecionado

### ⏰ Sistema de Ponto

- **Organize os funcionários** com nomes claros para facilitar a busca
- **Defina horários padrão** para cada tipo de carga horária
- **Revise os cálculos** periodicamente para garantir precisão
- **Use o modo admin** com cuidado, especialmente ao excluir dados
- **Mantenha senhas seguras** e altere a senha padrão do administrador

### 🔍 Busca e Filtros

- **Use a pesquisa rápida** para buscas simples
- **Combine pesquisa e filtros** para encontrar registros específicos
- **Limpe os filtros** quando terminar de usar
- **Salve filtros frequentes** usando os critérios que você usa mais

### 💾 Backup e Segurança

- **Automatize backups**: Faça backup semanal ou mensal
- **Armazene backups externos**: Salve em pendrive ou nuvem
- **Documente mudanças**: Mantenha um log de alterações importantes
- **Teste restaurações**: Periodicamente, teste se os backups estão funcionando

### 🎨 Personalização

- **Escolha o tema** que mais se adequa ao seu ambiente de trabalho
- **Organize os dados** de forma consistente para facilitar buscas
- **Use convenções** de nomenclatura para facilitar identificação

### 🚨 Problemas Comuns

#### Tema não está sendo aplicado
- Recarregue a página (F5)
- Verifique se o tema foi selecionado corretamente
- Limpe o cache do navegador se necessário

#### Dados não estão salvando
- Verifique se há espaço em disco
- Confirme que não há outros processos usando os arquivos
- Tente fazer logout e login novamente

#### Gráfico não aparece
- Verifique sua conexão com a internet (Chart.js é carregado via CDN)
- Recarregue a página
- Tente abrir o modal de gráfico novamente

#### Senha do admin esquecida
- A senha padrão é: `123456`
- Se foi alterada e esquecida, será necessário editar o arquivo `data/config.json` manualmente

---

## 📧 Suporte

Para dúvidas, sugestões ou problemas, entre em contato:

**Rodrigo G Fernandes**
- 📱 Telefone: [+55 (83) 99925-1636](tel:+5583999251636)
- 📧 Email: [rodrigo.guedes.f@gmail.com](mailto:rodrigo.guedes.f@gmail.com)
- 🖥️ Website: [rodrigodev.net](http://www.rodrigodev.net/)
- 💼 LinkedIn: [rodrigogfernandes](https://www.linkedin.com/in/rodrigogfernandes/)
- 💻 GitHub: [Rodrigogfernandes](https://github.com/Rodrigogfernandes)

---

**Versão do Manual**: 2.0  
**Última Atualização**: 2025
