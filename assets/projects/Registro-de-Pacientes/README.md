<div align="center">

<h1> 🏥 Registro de Pacientes v2.0</h1>

![imagem](src/assets/images/image.gif)

Aplicação desktop desenvolvida em Electron para gerenciamento completo de registros médicos, ocorrências e controle de ponto.

![Electron](https://img.shields.io/badge/Electron-25.9.8-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.7-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
---

[![rodrigodev.net](https://img.shields.io/badge/rodrigodev.net-green?style=for-the-badge&logo=rodrigodev&logoColor=white)](https://www.rodrigodev.net/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rodrigogfernandes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rodrigogfernandes/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rodrigogfernandes1/)

</div>

## 📋 Sobre o Projeto

Sistema desktop completo desenvolvido em Electron para gerenciamento de registros de exames radiológicos, livro de ocorrências e controle de ponto de funcionários. A aplicação oferece uma interface moderna e intuitiva, com suporte a múltiplos temas (claro, escuro e azul), gráficos interativos, exportação para PDF e Excel, além de funcionalidades avançadas de pesquisa e filtragem.

## ✨ Funcionalidades Principais

### 📝 Registro de Pacientes
- **Cadastro Completo**: Registro de exames radiológicos com informações detalhadas
- **Modalidades Suportadas**: Raio-X (RX), Tomografia (TC), Ressonância (RM), Densitometria (DO), Mamografia (MG)
- **Campos Automáticos**: Data e hora preenchidas automaticamente
- **Observações Adicionais**: Sistema de observações com ícone indicador
- **Pesquisa Avançada**: Busca instantânea em todos os campos
- **Filtros Personalizados**: Filtro por modalidade, período e outros critérios
- **Gráficos Interativos**: Visualização de dados com Chart.js
- **Exportação Múltipla**: Exportação para PDF, Excel e JSON
- **Paginação Inteligente**: Navegação eficiente entre registros

### 📚 Livro de Ocorrências
- **Registro de Ocorrências**: Sistema completo para registro de eventos
- **Campos Organizados**: Data, turno, descrição, responsável e status
- **Ordenação Dinâmica**: Ordenação por qualquer coluna
- **Filtros Personalizados**: Busca e filtragem avançada
- **Exportação de Dados**: Exportação para diferentes formatos

### ⏰ Sistema de Ponto
- **Controle de Funcionários**: Cadastro e gerenciamento de funcionários
- **Registro de Ponto**: Bater ponto por turno (manhã/tarde)
- **Cálculo Automático**: Cálculo automático de horas trabalhadas e valores
- **Horas Extras**: Suporte a registro de horas extras
- **Folha de Ponto**: Geração de folha de ponto em PDF
- **Modo Administrativo**: Controle administrativo com senha
- **Filtros por Mês/Ano**: Visualização filtrada por período

### 🎨 Interface e Temas
- **Temas Múltiplos**: Tema claro, escuro e azul
- **Transições Suaves**: Animações e transições fluidas
- **Design Responsivo**: Interface adaptável e moderna
- **Variáveis CSS Globais**: Sistema unificado de cores
- **Aplicação Instantânea**: Temas aplicados antes da renderização

### 💾 Gerenciamento de Dados
- **Backup e Restauração**: Sistema completo de backup
- **Importação/Exportação**: Importar e exportar dados facilmente
- **Armazenamento Local**: Dados armazenados em JSON
- **Integração IPC**: Comunicação segura entre processos
- **Persistência Automática**: Salvamento automático de alterações

## 🛠️ Tecnologias Utilizadas

### Core
- **Electron ^25.9.8**: Framework para aplicações desktop
- **Node.js**: Runtime JavaScript
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS
- **JavaScript (ES6+)**: Lógica e interatividade

### Bibliotecas e Dependências
- **Chart.js ^4.4.7**: Gráficos interativos e visualizações
- **jsPDF ^2.5.1**: Geração de documentos PDF
- **xlsx ^0.18.5**: Manipulação de arquivos Excel
- **electron-store ^8.1.0**: Armazenamento persistente
- **pdfkit ^0.13.0**: Geração avançada de PDFs

### Ferramentas de Desenvolvimento
- **electron-builder ^24.13.3**: Build e distribuição
- **rimraf ^5.0.5**: Limpeza de diretórios

## 📁 Estrutura do Projeto

```
registro-v2.2.6/
│
├── src/                          # Código-fonte da aplicação
│   ├── pages/                    # Páginas HTML
│   │   ├── index.html            # Página inicial
│   │   ├── registros/            # Módulo de registros
│   │   │   └── registros.html
│   │   ├── ocorrencias/          # Módulo de ocorrências
│   │   │   └── ocorrencias.html
│   │   └── ponto/                # Módulo de ponto
│   │       └── ponto.html
│   ├── scripts/                  # Scripts JavaScript
│   │   ├── registros/            # Scripts do módulo de registros
│   │   │   └── registros.js
│   │   ├── ocorrencias/          # Scripts do módulo de ocorrências
│   │   │   └── ocorrencias.js
│   │   └── ponto/                # Scripts do módulo de ponto
│   │       └── ponto.js
│   ├── styles/                   # Arquivos CSS
│   │   ├── common.css            # Variáveis globais e estilos comuns
│   │   ├── index.css             # Estilos da página inicial
│   │   ├── registros.css         # Estilos do módulo de registros
│   │   ├── ocorrencias.css       # Estilos do módulo de ocorrências
│   │   └── ponto.css             # Estilos do módulo de ponto
│   └── assets/                   # Recursos estáticos
│       └── images/               # Imagens e ícones
│           ├── config.png
│           ├── excel.png
│           ├── export.png
│           ├── import.png
│           ├── json.png
│           ├── ocorrencia.png
│           ├── pdf.png
│           ├── ponto.png
│           └── registro.png
│
├── data/                         # Arquivos de dados
│   ├── registros.json            # Dados de registros
│   ├── ocorrencias.json          # Dados de ocorrências
│   ├── ponto.json                # Dados de ponto
│   └── config.json               # Configurações da aplicação
│
├── main.js                       # Processo principal do Electron
├── preload.js                    # Preload script do Electron
├── package.json                  # Dependências e configurações
├── icon.ico                      # Ícone da aplicação
├── MANUAL.md                     # Manual do usuário
├── ESTRUTURA.md                  # Documentação da estrutura
└── README.md                     # Este arquivo
```

## 🚀 Como Usar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Rodrigogfernandes/Pagina-de-Registro.git
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   ```bash
   npm start
   ```

### Build para Produção

Para gerar um instalador Windows:

```bash
npm run build
```

O instalador será gerado na pasta `dist/`.

### Outros Comandos

```bash
# Limpar pasta de build
npm run clean

# Criar pacote (sem instalador)
npm run pack
```

## 📱 Módulos da Aplicação

### 🏠 Página Inicial
- Navegação para todos os módulos
- Configurações gerais
- Sistema de temas
- Exportação e importação de dados
- Backup e restauração

### 📝 Registro de Pacientes
- Cadastro de exames radiológicos
- Pesquisa e filtros avançados
- Visualização em tabela
- Gráficos e relatórios
- Exportação para PDF/Excel
- Observações adicionais por registro

### 📚 Livro de Ocorrências
- Registro de eventos e ocorrências
- Ordenação por colunas
- Filtros personalizados
- Histórico completo

### ⏰ Sistema de Ponto
- Cadastro de funcionários
- Registro de ponto por turno
- Cálculo automático de horas
- Geração de folha de ponto
- Modo administrativo

## 🎨 Temas Disponíveis

### Tema Claro
- Interface limpa e clara
- Ideal para uso diurno
- Excelente legibilidade

### Tema Escuro
- Reduz fadiga visual
- Ideal para uso noturno
- Economia de energia em telas OLED

### Tema Azul
- Estilo profissional
- Paleta azul corporativa
- Design moderno

## 💾 Gerenciamento de Dados

### Backup
- Exporte todos os dados para backup
- Formato JSON estruturado
- Facilita migração entre máquinas

### Restauração
- Importe backups facilmente
- Restauração completa ou seletiva
- Validação de dados

### Exportação
- **PDF**: Relatórios formatados
- **Excel**: Planilhas editáveis
- **JSON**: Dados brutos para integração

## 🔒 Segurança

- **IPC Seguro**: Comunicação entre processos isolada
- **Validação de Dados**: Validação completa de entradas
- **Modo Administrativo**: Proteção com senha no módulo de ponto
- **Armazenamento Local**: Dados armazenados localmente

## 📊 Funcionalidades Avançadas

### Gráficos e Relatórios
- Gráficos interativos com Chart.js
- Visualização mensal e anual
- Exportação de relatórios
- Análise de tendências

### Pesquisa e Filtros
- Busca instantânea
- Filtros por múltiplos critérios
- Ordenação dinâmica
- Paginação inteligente

### Exportação Inteligente
- Exportação por período
- Múltiplos formatos
- Formatação profissional
- Inclusão de observações

## 🎯 Características Técnicas

- **Arquitetura Modular**: Código organizado e manutenível
- **Variáveis CSS Globais**: Sistema unificado de cores
- **IPC Communication**: Comunicação segura entre processos
- **Performance Otimizada**: Carregamento rápido e eficiente
- **Código Limpo**: Estrutura bem organizada e documentada

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 📧 Contato

**Rodrigo G Fernandes**

- 📱 Telefone: [+55 (83) 99925-1636](tel:+5583999251636)
- 📧 Email: [rodrigo.guedes.f@gmail.com](mailto:rodrigo.guedes.f@gmail.com)
- 📍 Localização: João Pessoa - PB, Brasil
- 🖥️ Rodrigodev.net: [rodrigodev.net](http://www.rodrigodev.net/)
- 💼 LinkedIn: [rodrigogfernandes](https://www.linkedin.com/in/rodrigogfernandes/)
- 💻 GitHub: [Rodrigogfernandes](https://github.com/Rodrigogfernandes)
- 📷 Instagram: [@rodrigogfernandes1](https://www.instagram.com/rodrigogfernandes1/)

## 🙏 Agradecimentos

- [Electron](https://www.electronjs.org/) - Framework para aplicações desktop
- [Chart.js](https://www.chartjs.org/) - Biblioteca de gráficos
- [jsPDF](https://github.com/parallax/jsPDF) - Geração de PDFs
- Comunidade open source por inspiração e recursos

---

<div align="center">

**Desenvolvido com ❤️ por Rodrigo G Fernandes**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>

