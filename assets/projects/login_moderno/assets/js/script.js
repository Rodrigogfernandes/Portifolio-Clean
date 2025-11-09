document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (!container || !registerBtn || !loginBtn) {
        console.error('Elementos necessários não encontrados na página');
        return;
    }

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});

// Tratamento de mensagens de erro e sucesso via URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const erro = urlParams.get('erro');
    const sucesso = urlParams.get('sucesso');
    const container = document.getElementById('container');
    
    // Mensagens de erro
    const errorMessages = {
        'campos_vazios': 'Por favor, preencha todos os campos!',
        'email_invalido': 'Formato de email inválido!',
        'credenciais_invalidas': 'Email ou senha inválidos!',
        'email_existente': 'Este email já está cadastrado!',
        'senha_curta': 'A senha deve ter no mínimo 6 caracteres!',
        'erro_cadastro': 'Erro ao cadastrar. Por favor, tente novamente.'
    };
    
    // Mensagens de sucesso
    const successMessages = {
        'cadastro_realizado': 'Cadastro realizado com sucesso! Faça login para continuar.'
    };
    
    // Se houver sucesso, mostra mensagem verde e exibe formulário de login
    if (sucesso && successMessages[sucesso]) {
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        // Muda para estilo de sucesso (verde)
        errorDiv.style.background = '#4caf50';
        errorText.textContent = successMessages[sucesso];
        errorDiv.style.display = 'block';
        
        // Remove classe 'active' para mostrar formulário de login
        if (container) {
            container.classList.remove('active');
        }
        
        // Remove o parâmetro da URL sem recarregar a página
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Auto-ocultar após 5 segundos
        setTimeout(function() {
            errorDiv.style.display = 'none';
        }, 5000);
    }
    
    // Se houver erro, mostra mensagem vermelha
    if (erro && errorMessages[erro]) {
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        // Garante que está vermelho (caso tenha sido verde antes)
        errorDiv.style.background = '#ff4444';
        errorText.textContent = errorMessages[erro];
        errorDiv.style.display = 'block';
        
        // Remove o parâmetro da URL sem recarregar a página
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Auto-ocultar após 5 segundos
        setTimeout(function() {
            errorDiv.style.display = 'none';
        }, 5000);
    }
});