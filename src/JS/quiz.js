document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const elements = {
        pergunta: document.getElementById('pergunta'),
        resposta: document.getElementById('resposta'),
        proximaPergunta: document.getElementById("proximo"),
        mensagem: document.getElementById('message'),
        containerPerguntas: document.getElementById('container-perguntas'),
        containerResultado: document.getElementById('container-resultado'),
        listaResultado: document.getElementById('lista-resultado'),
        reiniciarBotao: document.getElementById('inicio-btn'),
        carroNome: document.getElementById('carro-nome'),
        carroImg: document.getElementById('carro-img'),
        carroDescricao: document.getElementById('carro-descricao'),
        carroEspecificacoes: document.getElementById('carro-especificacoes')
    };

    // Banco de dados de carros com caminhos relativos para as imagens
    const carros = {
        "Citroën C3": {
            img: "../assets/images/c3.webp",
            descricao: "O Citroën C3 é perfeito para quem busca economia, praticidade e conforto no dia a dia urbano.",
            especificacoes: "Motor 1.6 Flex | Consumo: 14km/l (cidade) | Porta-malas: 300L | Preço médio: R$ 80.000",
            match: [
                "até 100000", "economia", "cidade", "compacto", "3","4","5",
                "simplicidade", "automático", "todo dia", "moderno", "segurança", "importante"
            ]
        },
        "Toyota Camry": {
            img: "../assets/images/camry.webp",
            descricao: "O Toyota Camry é ideal para quem busca conforto, qualidade e tecnologia em um sedã premium.",
            especificacoes: "Motor 2.5 Hybrid | Consumo: 18km/l | Porta-malas: 524L | Preço médio: R$ 280.000",
            match: [
                "300000", "conforto", "viagens", "família", "sedã",
                "tecnologia", "automático", "todo dia", "moderno", "segurança", "muito importante","3","4","5"
            ]
        },
        "Nissan GT-R": {
            img: "../assets/images/GTR.webp",
            descricao: "O Nissan GT-R é para os apaixonados por performance e tecnologia automotiva de alto nível.",
            especificacoes: "Motor 3.8 V6 Bi-Turbo | 565cv | 0-100km/h em 2.7s | Preço médio: R$ 750.000",
            match: [
                "performance", "esportivo", "potência","1", "2",
                "tecnologia", "manual", "fins de semana", "esportivo", "segurança", "importante", "800000"
            ]
        },
        "Aston Martin DB12": {
            img: "../assets/images/DB12.webp",
            descricao: "O Aston Martin DB12 é o supercarro perfeito para quem busca exclusividade e desempenho extraordinário.",
            especificacoes: "Motor 4.0 V8 Bi-Turbo | 680cv | 0-100km/h em 3.5s | Preço médio: R$ 2.500.000",
            match: [
                "luxo", "exclusivo","1", "2", "futurista",
                "performance", "tecnologia", "manual", "fins de semana", "segurança", "muito importante", "não tenho limite"
            ]
        }
    };

    const questoes = [
        "Qual o máximo que estaria disposto a pagar? (até R$ 100.000 / R$ 300.000 / R$800.000 / não tenho limite)",
        "Você prioriza economia ou performance? (economia / performance / equilíbrio)",
        "Qual é o principal uso do veículo? (cidade / estrada / viagens / trabalho / lazer)",
        "Quantas pessoas costuma transportar? (1-2 / 3-4 / 5+)",
        "Qual tipo de carro prefere? (compacto / sedã / SUV / esportivo / luxo)",
        "Você valoriza mais tecnologia ou simplicidade no interior do carro? (tecnologia / simplicidade / tanto faz)",
        "Qual a sua prioridade em relação à segurança? (muito importante / importante / não me preocupo muito)",
        "Você prefere câmbio automático ou manual? (automático / manual / tanto faz)",
        "Com que frequência pretende usar o carro? (todo dia / fins de semana / ocasionalmente)",
        "Qual estilo de design você prefere? (moderno / clássico / esportivo / futurista)"
    ];

    let perguntas = 0;
    const respostas = [];

    function mostrarPergunta() {
        if (perguntas < questoes.length) {
            elements.pergunta.textContent = questoes[perguntas];
            elements.resposta.value = '';
            elements.mensagem.textContent = '';
        } else {
            mostrarResultado();
        }
    }

    function analisarRespostas() {
        const termos = respostas.join(' ').toLowerCase();
        let scores = {};
    
        Object.keys(carros).forEach(carro => {
            // Filtro por preço
            const precoLimite = respostas[0]; // resposta da pergunta 1 (preço)
            if (
                (precoLimite === "até R$ 100.000" && !carros[carro].match.includes("até R$ 100.000")) ||
                (precoLimite === "R$ 300.000" && carros[carro].match.includes("luxo")) ||
                (precoLimite === "R$ 300.000" && carros[carro].match.includes("acima de R$ 150.000") && carro !== "Toyota Camry")
            ) {
                return; // pular carros fora do orçamento
            }
    
            scores[carro] = 0;
            carros[carro].match.forEach(termo => {
                if (termos.includes(termo.toLowerCase())) {
                    scores[carro]++;
                }
            });
        });
    
        // Retorna o carro com maior pontuação dentro do orçamento
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }
    

    function mostrarResultado() {
        elements.containerPerguntas.classList.add('hidden');
        elements.containerResultado.classList.remove('hidden');
        elements.listaResultado.innerHTML = '';

        questoes.forEach((questao, index) => {
            const listaItem = document.createElement('li');
            listaItem.innerHTML = `<strong>${questao}</strong><br>Sua Resposta: <span>${respostas[index]}</span>`;
            elements.listaResultado.appendChild(listaItem);
        });
        
        const recomendacao = analisarRespostas();
        const carro = carros[recomendacao];
        
        elements.carroNome.textContent = recomendacao;
        elements.carroImg.src = carro.img;
        elements.carroImg.alt = recomendacao;
        elements.carroDescricao.textContent = carro.descricao;
        elements.carroEspecificacoes.textContent = carro.especificacoes;
    }

    function nextQuestao() {
        const respostaAtual = elements.resposta.value.trim();
        if (respostaAtual === '') {
            elements.mensagem.textContent = "Por favor, digite sua resposta";
            return;
        }
        respostas.push(respostaAtual);
        perguntas++;
        mostrarPergunta();
    }

    function reiniciarQuiz() {
        perguntas = 0;
        respostas.length = 0;
        elements.containerResultado.classList.add('hidden');
        elements.containerPerguntas.classList.remove('hidden');
        mostrarPergunta();
    }

    // Event listeners
    elements.resposta.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') nextQuestao();
    });
    
    elements.proximaPergunta.addEventListener('click', nextQuestao);
    elements.reiniciarBotao.addEventListener('click', reiniciarQuiz);

    // Iniciar quiz
    mostrarPergunta();
});