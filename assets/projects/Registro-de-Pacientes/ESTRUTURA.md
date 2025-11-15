# Estrutura do Projeto - Registro de Pacientes v2.0

## Visão Geral
Este projeto foi reorganizado para melhorar a organização e manutenibilidade do código.

## Estrutura de Diretórios

```
registro-v2.2.6/
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
│   │   ├── main.js               # Processo principal do Electron (cópia)
│   │   ├── preload.js            # Preload script do Electron (cópia)
│   │   ├── registros/            # Scripts do módulo de registros
│   │   │   └── registros.js
│   │   ├── ocorrencias/          # Scripts do módulo de ocorrências
│   │   │   └── ocorrencias.js
│   │   └── ponto/                # Scripts do módulo de ponto
│   │       └── ponto.js
│   ├── styles/                   # Arquivos CSS
│   │   ├── index.css             # Estilos da página inicial
│   │   ├── registros.css         # Estilos do módulo de registros
│   │   ├── ocorrencias.css       # Estilos do módulo de ocorrências
│   │   └── ponto.css             # Estilos do módulo de ponto
│   └── assets/                   # Recursos estáticos
│       └── images/               # Imagens
│           ├── config.png
│           ├── excel.png
│           ├── export.png
│           ├── import.png
│           ├── json.png
│           ├── ocorrencia.png
│           ├── pdf.png
│           ├── ponto.png
│           └── registro.png
├── data/                         # Arquivos de dados
│   ├── registros.json            # Dados de registros
│   ├── ocorrencias.json          # Dados de ocorrências
│   ├── ponto.json                # Dados de ponto
│   └── config.json               # Configurações da aplicação
├── main.js                       # Processo principal do Electron
├── preload.js                    # Preload script do Electron
├── package.json                  # Dependências e configurações
├── icon.ico                      # Ícone da aplicação
├── MANUAL.md                     # Manual do usuário
└── ESTRUTURA.md                  # Este arquivo
```

## Arquivos Principais

### Processo Principal (main.js)
- Gerencia a janela principal do Electron
- Configura os handlers IPC para comunicação entre processos
- Gerencia operações de arquivo (leitura/escrita de JSON)
- Exportação de PDF e Excel

### Páginas HTML
- **index.html**: Página inicial com navegação para os módulos
- **registros/registros.html**: Interface de registro de pacientes
- **ocorrencias/ocorrencias.html**: Interface de livro de ocorrências
- **ponto/ponto.html**: Interface de sistema de ponto

### Scripts JavaScript
- **registros/registros.js**: Lógica do módulo de registros
- **ocorrencias/ocorrencias.js**: Lógica do módulo de ocorrências
- **ponto/ponto.js**: Lógica do módulo de ponto

### Estilos CSS
- Cada módulo tem seu próprio arquivo CSS
- Estilos compartilhados podem ser adicionados em um arquivo comum

### Dados (data/)
- Todos os arquivos JSON são armazenados no diretório `data/`
- Os arquivos são gerenciados através de handlers IPC no `main.js`

## Comunicação IPC

A aplicação usa IPC (Inter-Process Communication) para comunicação entre o processo principal e os processos de renderização:

### Handlers IPC Disponíveis

#### Registros
- `ler-registros`: Lê os registros do arquivo JSON
- `salvar-registros`: Salva os registros no arquivo JSON
- `exportar-pdf`: Exporta registros para PDF
- `exportar-csv`: Exporta registros para Excel

#### Ocorrências
- `ler-ocorrencias`: Lê as ocorrências do arquivo JSON
- `salvar-ocorrencias`: Salva as ocorrências no arquivo JSON

#### Ponto
- `ler-ponto`: Lê os dados de ponto do arquivo JSON
- `salvar-ponto`: Salva os dados de ponto no arquivo JSON

#### Configuração
- `ler-config`: Lê as configurações do arquivo JSON
- `salvar-config`: Salva as configurações no arquivo JSON

## Como Executar

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar em modo de desenvolvimento:
   ```bash
   npm start
   ```

3. Construir para produção:
   ```bash
   npm run build
   ```

## Migração

Se você está migrando de uma versão anterior:

1. Os arquivos foram movidos para a nova estrutura
2. As referências nos arquivos HTML foram atualizadas
3. Os caminhos nos scripts foram atualizados para usar IPC
4. Os arquivos JSON foram movidos para `data/`

## Notas

- Os arquivos na raiz (main.js, preload.js, package.json) são mantidos para compatibilidade com Electron
- Os arquivos duplicados na raiz devem ser removidos após verificar que tudo está funcionando
- A estrutura permite fácil expansão e manutenção

