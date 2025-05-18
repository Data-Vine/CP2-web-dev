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
      "BYD Dolphin": {
        img: "../assets/images/image1.jpg",
        descricao: "O Dolphin é um hatch compacto ideal para quem busca economia e praticidade no dia a dia.",
        especificacoes: "Motor elétrico de 95 cv e 18,4 kgfm de torque. | Porta-malas: 345L | Preço médio: R$ 80.000",
        match: [
          "até r$ 100.000", "economia", "cidade", "compacto", "3", "4", "5",
          "simplicidade", "todo dia", "moderno", "segurança", "importante"
        ]
      },
      "Volvo EX30": {
        img: "../assets/images/image2.jpg",
        descricao: "O Volvo EX30 é um SUV elétrico que combina estilo e eficiência, com uma autonomia de até 400 km.",
        especificacoes: "Motor elétrico de 272 cv e 35 kgfm de torque. | Porta-malas: 400L | Preço médio: R$ 280.000",
        match: [
          "r$ 300.000", "conforto", "viagens", "SUV",
          "tecnologia", "todo dia", "moderno", "segurança", "muito importante", "3", "4", "5"
        ]
      },
      "BMW IX3 M Sport": {
        img: "../assets/images/image3.jpg",
        descricao: "O BMW IX3 M Sport é um SUV elétrico que combina desempenho e sustentabilidade, com uma autonomia de até 460 km.",
        especificacoes: "Motor elétrico de 286 cv e 40,78 kgfm de torque. | Porta-malas: 510L | Preço médio: R$ 400.000",
        match: [
          "performance", "esportivo", "potência", "1", "2",
          "tecnologia", "fins de semana", "esportivo", "segurança", "importante", "r$ 800.000"
        ]
      },
      "Renault Kwid E-Tech": {
        img: "../assets/images/image4.jpg",
        descricao: "O Renault Kwid E-Tech é um carro elétrico compacto que oferece eficiência e praticidade para o dia a dia.",
        especificacoes: "Motor elétrico de 65cv e 11,52 kgfm de torque | Porta-malas:290L | Preço médio: R$ 100.000",
        match: [
          "compacto", "exclusivo", "1", "2", "futurista",
          "performance", "tecnologia", "fins de semana", "segurança", "muito importante", "não tenho limite"
        ]
      }
    };

    const questoes = [
      {
        pergunta: "Qual o máximo que estaria disposto a pagar?",
        opcoes: ["até R$ 100.000", "R$ 400.000", "R$ 800.000", "não tenho limite"]
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
        opcoes: ["compacto", "SUV", "esportivo"]
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
      
        const pessoasResposta = respostas[3]; // resposta da 4ª pergunta (quantas pessoas)
      
        Object.keys(carros).forEach(carro => {
          scores[carro] = 0;
          const carroLowerMatch = carros[carro].match.map(m => m.toLowerCase());
      
          // Filtrar carros com base no critério de número de pessoas
          if ((pessoasResposta === "3-4" || pessoasResposta === "5+") && 
              (carroLowerMatch.includes("1") && carroLowerMatch.includes("2")) && 
              !carroLowerMatch.some(s => ["3","4","5"].includes(s))) {
            // Este carro só suporta 1 ou 2 pessoas, mas o usuário escolheu transportar >= 3
            scores[carro] = -1; // excluir este carro
            return;
          }
      
          // Verificação do preço para filtrar carros fora do orçamento
          const precoResposta = respostas[0].toLowerCase();
      
          if ((precoResposta === "até r$ 100.000" && !carroLowerMatch.includes("até r$ 100.000")) ||
              (precoResposta === "r$ 300.000" && carroLowerMatch.includes("luxo") && carro !== "Toyota Camry") ||
              (precoResposta === "r$ 300.000" && carroLowerMatch.includes("acima de r$ 150.000") && carro !== "Toyota Camry")) {
            scores[carro] = -1;
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
