alert("BEM VINDO AO QUIZ");

  document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const elements = {
      pergunta: document.getElementById('pergunta'),
      opcoesContainer: document.getElementById('opcoes-container'),
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

    const carros = {
      "Citroën C3": {
        img: "../assets/images/c3.webp",
        descricao: "O Citroën C3 é perfeito para quem busca economia, praticidade e conforto no dia a dia urbano.",
        especificacoes: "Motor 1.6 Flex | Consumo: 14km/l (cidade) | Porta-malas: 300L | Preço médio: R$ 80.000",
        match: [
          "até r$ 100.000", "economia", "cidade", "compacto", "3", "4", "5",
          "simplicidade", "automático", "todo dia", "moderno", "segurança", "importante"
        ]
      },
      "Toyota Camry": {
        img: "../assets/images/camry.webp",
        descricao: "O Toyota Camry é ideal para quem busca conforto, qualidade e tecnologia em um sedã premium.",
        especificacoes: "Motor 2.5 Hybrid | Consumo: 18km/l | Porta-malas: 524L | Preço médio: R$ 280.000",
        match: [
          "r$ 300.000", "conforto", "viagens", "sedã",
          "tecnologia", "automático", "todo dia", "moderno", "segurança", "muito importante", "3", "4", "5"
        ]
      },
      "Nissan GT-R": {
        img: "../assets/images/GTR.webp",
        descricao: "O Nissan GT-R é para os apaixonados por performance e tecnologia automotiva de alto nível.",
        especificacoes: "Motor 3.8 V6 Bi-Turbo | 565cv | 0-100km/h em 2.7s | Preço médio: R$ 750.000",
        match: [
          "performance", "esportivo", "potência", "1", "2",
          "tecnologia", "manual", "fins de semana", "esportivo", "segurança", "importante", "r$ 800.000"
        ]
      },
      "Aston Martin DB12": {
        img: "../assets/images/DB12.webp",
        descricao: "O Aston Martin DB12 é o supercarro perfeito para quem busca exclusividade e desempenho extraordinário.",
        especificacoes: "Motor 4.0 V8 Bi-Turbo | 680cv | 0-100km/h em 3.5s | Preço médio: R$ 2.500.000",
        match: [
          "luxo", "exclusivo", "1", "2", "futurista",
          "performance", "tecnologia", "manual", "fins de semana", "segurança", "muito importante", "não tenho limite"
        ]
      }
    };

    const questoes = [
      {
        pergunta: "Qual o máximo que estaria disposto a pagar?",
        opcoes: ["até R$ 100.000", "R$ 300.000", "R$ 800.000", "não tenho limite"]
      },
      {
        pergunta: "Você prioriza economia ou performance?",
        opcoes: ["economia", "performance", "equilíbrio"]
      },
      {
        pergunta: "Qual é o principal uso do veículo?",
        opcoes: ["cidade", "estrada", "viagens", "trabalho", "lazer"]
      },
      {
        pergunta: "Quantas pessoas costuma transportar?",
        opcoes: ["1-2", "3-4", "5+"]
      },
      {
        pergunta: "Qual tipo de carro prefere?",
        opcoes: ["compacto", "sedã", "SUV", "esportivo", "luxo"]
      },
      {
        pergunta: "Você valoriza mais tecnologia ou simplicidade no interior do carro?",
        opcoes: ["tecnologia", "simplicidade", "tanto faz"]
      },
      {
        pergunta: "Qual a sua prioridade em relação à segurança?",
        opcoes: ["muito importante", "importante", "não me preocupo muito"]
      },
      {
        pergunta: "Você prefere câmbio automático ou manual?",
        opcoes: ["automático", "manual", "tanto faz"]
      },
      {
        pergunta: "Com que frequência pretende usar o carro?",
        opcoes: ["todo dia", "fins de semana", "ocasionalmente"]
      },
      {
        pergunta: "Qual estilo de design você prefere?",
        opcoes: ["moderno", "clássico", "esportivo", "futurista"]
      }
    ];

    let perguntaAtual = 0;
    const respostas = [];

    function mostrarPergunta() {
      elements.mensagem.textContent = '';
      if (perguntaAtual < questoes.length) {
        const questao = questoes[perguntaAtual];
        elements.pergunta.textContent = questao.pergunta;
        elements.opcoesContainer.innerHTML = '';

        questao.opcoes.forEach(opcao => {
          const btnOpcao = document.createElement('button');
          btnOpcao.classList.add('opcao-btn');
          btnOpcao.textContent = opcao;
          btnOpcao.setAttribute('type', 'button');
          btnOpcao.addEventListener('click', () => {
            selecionarResposta(opcao);
          });
          elements.opcoesContainer.appendChild(btnOpcao);
        });
      } else {
        mostrarResultado();
      }
    }

    function selecionarResposta(resposta) {
      respostas.push(resposta);
      perguntaAtual++;
      mostrarPergunta();
    }

    function analisarRespostas() {
      // Juntar todas as respostas e converter para caixa baixa
      const termos = respostas.join(' ').toLowerCase();
      let scores = {};

      Object.keys(carros).forEach(carro => {
        scores[carro] = 0;
        const carroLowerMatch = carros[carro].match.map(m => m.toLowerCase());

        // Verificação do preço para filtrar carros fora do orçamento
        const precoResposta = respostas[0].toLowerCase();

        // Condições para filtrar carros fora do orçamento
        if ((precoResposta === "até r$ 100.000" && !carroLowerMatch.includes("até r$ 100.000")) ||
            (precoResposta === "r$ 300.000" && carroLowerMatch.includes("luxo") && carro !== "Toyota Camry") ||
            (precoResposta === "r$ 300.000" && carroLowerMatch.includes("acima de r$ 150.000") && carro !== "Toyota Camry")) {
          // Pular carro fora do orçamento
          scores[carro] = -1; // Para não escolher
          return;
        }

        // Somar pontos para termos coincididos nas respostas
        carroLowerMatch.forEach(termo => {
          if (termos.includes(termo)) {
            scores[carro]++;
          }
        });
      });

      // Selecionar o carro com maior pontuação (excluindo -1)
      let melhorCarro = null;
      let maiorScore = -Infinity;
      for (const [carro, score] of Object.entries(scores)) {
        if (score > maiorScore) {
          maiorScore = score;
          melhorCarro = carro;
        }
      }
      return melhorCarro;
    }

    function mostrarResultado() {
      elements.containerPerguntas.classList.add('hidden');
      elements.containerResultado.classList.remove('hidden');
      elements.listaResultado.innerHTML = '';

      questoes.forEach((questao, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${questao.pergunta}</strong><br>Sua resposta: <span>${respostas[index]}</span>`;
        elements.listaResultado.appendChild(li);
      });

      const recomendacao = analisarRespostas();
      if (!recomendacao) {
        elements.carroNome.textContent = 'Nenhum carro adequado encontrado';
        elements.carroImg.src = '';
        elements.carroImg.alt = 'Nenhum carro';
        elements.carroDescricao.textContent = '';
        elements.carroEspecificacoes.textContent = '';
        return;
      }
      const carro = carros[recomendacao];

      elements.carroNome.textContent = recomendacao;
      elements.carroImg.src = carro.img;
      elements.carroImg.alt = recomendacao;
      elements.carroDescricao.textContent = carro.descricao;
      elements.carroEspecificacoes.textContent = carro.especificacoes;
    }

    function reiniciarQuiz() {
      perguntaAtual = 0;
      respostas.length = 0;
      elements.containerResultado.classList.add('hidden');
      elements.containerPerguntas.classList.remove('hidden');
      mostrarPergunta();
    }

    // Evento para reiniciar o quiz
    elements.reiniciarBotao.addEventListener('click', reiniciarQuiz);

    // Iniciar quiz
    mostrarPergunta();
  });
