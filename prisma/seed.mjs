import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

const missions = [
  {
    slug: "mundo-criancas-resgate-da-infancia",
    title: "Resgate da Infância",
    region: "mundo",
    audience: "criancas",
    description:
      "Apoio a crianças em situação de vulnerabilidade em campos missionários transculturais, oferecendo alimento, educação e o evangelho.",
    details:
      "Em muitas nações, crianças crescem sem acesso a uma educação digna, alimentação adequada ou à mensagem do evangelho. O projeto Resgate da Infância atua em parceria com missionários locais para garantir cuidado integral às crianças.\n\nNossas frentes de trabalho incluem reforço escolar, distribuição de cestas básicas, atividades bíblicas recreativas e acompanhamento das famílias. Cada criança recebe atenção individual e é convidada a conhecer o amor de Jesus de forma simples e acolhedora.\n\nO objetivo é que cada menino e cada menina descubra que é amado por Deus e tenha a oportunidade de crescer em um ambiente seguro, com esperança e dignidade.",
    goal: "R$ 25.000 por ano para materiais, alimentação e apoio aos missionários locais.",
  },
  {
    slug: "mundo-adolescentes-geracao-enviada",
    title: "Geração Enviada",
    region: "mundo",
    audience: "adolescentes",
    description:
      "Discipulado de adolescentes em campos transculturais, formando uma geração que conhece a Palavra e vive a missão.",
    details:
      "A adolescência é uma janela decisiva para a formação espiritual. O Geração Enviada investe em encontros semanais de discipulado, acampamentos e projetos de serviço em comunidades de missão ao redor do mundo.\n\nOs adolescentes são desafiados a entender a fé de forma profunda, a desenvolver amizades saudáveis e a servir ao próximo com os dons que Deus lhes deu.\n\nAcreditamos que Deus chama adolescentes para grandes coisas. Por isso, incentivamos a leitura bíblica diária, a oração e o envolvimento real na obra missionária, mesmo antes de saírem de suas cidades.",
    goal: "R$ 18.000 por ano para encontros, materiais de discipulado e viagens de serviço.",
  },
  {
    slug: "mundo-adultos-fronteiras-abertas",
    title: "Fronteiras Abertas",
    region: "mundo",
    audience: "adultos",
    description:
      "Treinamento e envio de obreiros brasileiros para nações onde o evangelho ainda é pouco conhecido.",
    details:
      "Fronteiras Abertas é o braço de treinamento missionário da Almas Para Cristo. Preparamos obreiros para servir em contextos transculturais com sensibilidade cultural, base bíblica sólida e profundo amor pelas pessoas.\n\nO programa inclui cursos de missiologia, aprendizado de idiomas, mentoria com missionários experientes e acompanhamento pastoral durante todo o processo de envio.\n\nNosso compromisso é cuidar bem de cada obreiro, desde a preparação até o retorno, para que a obra avance de forma saudável e sustentável.",
    goal: "R$ 60.000 por ano para treinamento, sustento e envio de obreiros.",
  },
  {
    slug: "brasil-criancas-sementinhas-do-reino",
    title: "Sementinhas do Reino",
    region: "brasil",
    audience: "criancas",
    description:
      "Escolas bíblicas de férias e ministérios infantis em comunidades carentes de todo o Brasil.",
    details:
      "Sementinhas do Reino leva a mensagem de Jesus às crianças por meio de escolas bíblicas de férias, teatros, músicas, brincadeiras e materiais didáticos adaptados a cada idade.\n\nAtuamos em parceria com igrejas locais, capacitando voluntários e fornecendo todo o material necessário para que cada encontro seja inesquecível e transformador.\n\nMuitas crianças ouvem falar de Jesus pela primeira vez nesses encontros. Por isso, cada atividade é preparada com oração, cuidado e compromisso com a verdade bíblica.",
    goal: "R$ 30.000 por ano para materiais, lanches e capacitação de voluntários.",
  },
  {
    slug: "brasil-adolescentes-adolescentes-com-proposito",
    title: "Adolescentes com Propósito",
    region: "brasil",
    audience: "adolescentes",
    description:
      "Acampamentos, mentoria e grupos de discipulado para adolescentes em todo o território brasileiro.",
    details:
      "Adolescentes com Propósito existe para mostrar que a vida tem sentido quando é vivida com Deus. Promovemos acampamentos, encontros regionais e grupos de discipulado onde os adolescentes podem fazer perguntas, crescer na fé e construir amizades verdadeiras.\n\nCada adolescente é acompanhado por um mentor cristão que caminha junto, ora e ajuda a aplicar a Palavra de Deus no dia a dia.\n\nTambém incentivamos o protagonismo juvenil na igreja e na missão, desafiando cada um a usar seus talentos para servir.",
    goal: "R$ 35.000 por ano para acampamentos, materiais e formação de mentores.",
  },
  {
    slug: "brasil-adultos-igreja-em-missao",
    title: "Igreja em Missão",
    region: "brasil",
    audience: "adultos",
    description:
      "Plantação de igrejas e fortalecimento de congregações em regiões brasileiras com pouca presença evangélica.",
    details:
      "Igreja em Missão apoia a plantação de novas igrejas em bairros, distritos e cidades onde a presença do evangelho ainda é pequena.\n\nTrabalhamos junto a líderes locais, oferecendo capacitação, apoio financeiro inicial e acompanhamento pastoral. O foco é formar comunidades saudáveis, centradas na Palavra, na oração e no serviço ao próximo.\n\nNosso sonho é ver cada região do Brasil alcançada por uma igreja viva, que ama a Deus e cuida das pessoas ao seu redor.",
    goal: "R$ 80.000 por ano para apoio a novos pontos de pregação e liderança local.",
  },
  {
    slug: "nordeste-criancas-criancas-do-sertao",
    title: "Crianças do Sertão",
    region: "nordeste",
    audience: "criancas",
    description:
      "Kits bíblicos, alimentação e atividades recreativas para crianças do sertão nordestino.",
    details:
      "No sertão, a seca e a distância não podem impedir que as crianças conheçam o amor de Deus. Crianças do Sertão percorre comunidades rurais levando kits bíblicos, alimentos, brinquedos e muita alegria.\n\nEm cada visita, realizamos cultos infantis, contação de histórias bíblicas e momentos de oração com as famílias. Também distribuímos materiais de apoio para que os pais possam continuar ensinando a Palavra em casa.\n\nÉ um trabalho simples, mas cheio de significado: um copo de água, um abraço e uma história de Jesus podem mudar o rumo de uma vida inteira.",
    goal: "R$ 22.000 por ano para kits, alimentos e deslocamento das equipes.",
  },
  {
    slug: "nordeste-adolescentes-juventude-do-agreste",
    title: "Juventude do Agreste",
    region: "nordeste",
    audience: "adolescentes",
    description:
      "Formação de líderes adolescentes e grupos de discipulado na região do agreste nordestino.",
    details:
      "Juventude do Agreste investe no potencial dos adolescentes do interior nordestino. Por meio de encontros, retiros e mentoria, formamos jovens líderes que influenciam positivamente suas escolas, famílias e igrejas.\n\nO projeto também oferece orientação vocacional, oficinas de música e esporte, e acompanhamento espiritual contínuo.\n\nAcreditamos que quando um adolescente encontra seu propósito em Cristo, toda uma comunidade é alcançada.",
    goal: "R$ 26.000 por ano para retiros, oficinas e mentoria de líderes.",
  },
  {
    slug: "nordeste-adultos-sertao-para-cristo",
    title: "Sertão para Cristo",
    region: "nordeste",
    audience: "adultos",
    description:
      "Evangelização de porta em porta, cultos ao ar livre e plantação de igrejas no sertão nordestino.",
    details:
      "Sertão para Cristo mobiliza equipes de evangelistas para visitar casas, praças e comunidades rurais, compartilhando o evangelho de forma respeitosa e acolhedora.\n\nRealizamos cultos ao ar livre, distribuição de Bíblias e acompanhamento de novos convertidos. Onde há um grupo de novos discípulos, buscamos apoiar a formação de uma nova congregação.\n\nNosso alvo é que o sertão não seja apenas lembrado pela seca, mas pela esperança que há em Jesus Cristo.",
    goal: "R$ 45.000 por ano para Bíblias, transporte e apoio a novos grupos.",
  },
  {
    slug: "piaui-criancas-piaui-kids",
    title: "Piauí Kids",
    region: "piaui",
    audience: "criancas",
    description:
      "Ministério infantil em comunidades ribeirinhas e bairros carentes do Piauí.",
    details:
      "O Piauí Kids leva o evangelho às crianças de comunidades ribeirinhas, assentamentos e bairros periféricos de Teresina e do interior piauiense.\n\nNossas equipes realizam encontros semanais com histórias bíblicas, música, brincadeiras e lanche. Também capacitamos professores locais para que o trabalho continue de forma permanente.\n\nCada criança piauiense merece saber que Deus a conhece pelo nome e tem um propósito lindo para sua vida.",
    goal: "R$ 20.000 por ano para materiais, lanches e capacitação de professores.",
  },
  {
    slug: "piaui-adolescentes-adolescentes-piauienses",
    title: "Adolescentes Piauienses",
    region: "piaui",
    audience: "adolescentes",
    description:
      "Discipulado, esporte e mentoria para adolescentes piauienses, com acompanhamento escolar e espiritual.",
    details:
      "Adolescentes Piauienses une esporte, discipulado e mentoria para alcançar jovens em situação de vulnerabilidade. Realizamos campeonatos, encontros de oração e grupos de estudo bíblico.\n\nCada adolescente é acompanhado por um mentor que o ajuda a tomar decisões sábias, a permanecer na escola e a crescer na fé.\n\nO projeto também envolve as famílias, promovendo encontros e orientação para que o lar seja um lugar de paz e esperança.",
    goal: "R$ 24.000 por ano para materiais esportivos, encontros e mentoria.",
  },
  {
    slug: "piaui-adultos-missao-piaui",
    title: "Missão Piauí",
    region: "piaui",
    audience: "adultos",
    description:
      "Capacitação de evangelistas e missionários locais para alcançar o Piauí de norte a sul.",
    details:
      "Missão Piauí é um movimento de capacitação e envio de cristãos piauienses para alcançar seu próprio estado. Oferecemos cursos de evangelismo, discipulado e liderança em parceria com igrejas locais.\n\nEquipes são enviadas a cidades do interior, comunidades rurais e áreas sem presença evangélica, levando a Palavra e apoiando a formação de novos grupos de discipulado.\n\nNosso desejo é ver o Piauí inteiro alcançado pelo evangelho, de norte a sul, com igrejas saudáveis e líderes bem preparados.",
    goal: "R$ 40.000 por ano para cursos, transporte e apoio às equipes locais.",
  },
];

const messages = [
  {
    slug: "o-amor-que-transforma",
    title: "O amor que transforma",
    excerpt:
      "Antes mesmo de você amar a Deus, Ele já o amava. A cruz é a prova de que ninguém está longe demais do Seu perdão.",
    verse:
      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. — João 3:16",
    author: "Equipe Almas Para Cristo",
    content:
      "Existe uma pergunta que acompanha a humanidade desde o início: será que Deus realmente se importa comigo? Em meio às lutas, às quedas e às decepções da vida, muitos carregam a sensação de que estão sozinhos. Mas o evangelho começa com uma afirmação que muda tudo: Deus amou o mundo.\n\nEsse amor não é fruto do nosso mérito. Não amamos primeiro para sermos amados. A Bíblia diz que Deus nos amou quando ainda éramos pecadores. Ele não esperou que estivéssemos prontos, limpos ou perfeitos. Ele tomou a iniciativa.\n\nA cruz é a medida desse amor. Ali, Jesus carregou as nossas culpas, dores e vergonhas. Ele não fez isso por obrigação, mas por amor. Cada gota de sangue derramada naquela cruz declarou ao mundo que o coração de Deus está aberto para quem se aproxima.\n\nTalvez você pense que já foi longe demais. Que seus erros são grandes demais. Que Deus não teria interesse em alguém como você. Mas a verdade é que o amor de Deus é maior do que o seu passado. Não há pecado que a graça não possa perdoar quando há arrependimento sincero.\n\nHoje você pode dar um passo. Não precisa ter todas as respostas. Basta se aproximar com fé e reconhecer que precisa de um Salvador. Jesus disse que quem vem a Ele de maneira nenhuma será lançado fora. O amor que transforma começa quando você permite que Deus entre na sua história.\n\nSe este é o seu desejo, faça esta simples oração: Senhor Jesus, eu reconheço que sou pecador e que preciso de Ti. Obrigado por morrer na cruz em meu lugar. Perdoa os meus pecados, entra no meu coração e transforma a minha vida. Eu creio que Tu ressuscitaste e vives para sempre. Amém.\n\nSe você fez essa oração com sinceridade, procure uma igreja que ensina a Bíblia e comece a caminhar com Jesus. O amor de Deus não é apenas um sentimento; é uma nova vida que começa hoje.",
  },
  {
    slug: "ha-esperanca-para-voce",
    title: "Há esperança para você",
    excerpt:
      "Os planos de Deus não são frustrados pelas circunstâncias. Mesmo no deserto, Ele prepara um futuro de esperança.",
    verse:
      "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais. — Jeremias 29:11",
    author: "Equipe Almas Para Cristo",
    content:
      "Jeremias escreveu estas palavras a um povo que estava no exílio. Eles haviam perdido a terra, o templo e a esperança. Parecia que Deus os havia esquecido. Mas no meio da dor, Deus enviou uma mensagem clara: ainda tenho planos para vocês.\n\nA esperança que Deus oferece não é um otimismo vazio. É a certeza de que Ele está no controle, mesmo quando não entendemos o que está acontecendo. O deserto não é o fim da história; muitas vezes, é o lugar onde Deus nos ensina a confiar.\n\nTalvez hoje você esteja atravessando um deserto. Uma enfermidade, uma perda, um desemprego, uma crise familiar. Talvez as lágrimas tenham se tornado companheiras diárias. Deus não ignora o seu sofrimento. Ele vê, Ele se importa e Ele está trabalhando.\n\nA Palavra de Deus nos ensina a esperar. Esperar não é ficar parado, mas permanecer fiel enquanto Deus age. É continuar orando, continuar crendo, continuar dando passos pequenos na direção certa.\n\nNo tempo de Deus, a resposta chega. Ele é especialista em transformar vales em portas de esperança. O mesmo Deus que abriu o mar Vermelho, que fez o sol parar e que ressuscitou Jesus continua vivo e poderoso para agir na sua vida.\n\nNão desista. Entregue a sua dor a Deus. Busque-O em oração e na leitura da Bíblia. Cerque-se de pessoas que fortalecem a sua fé. E lembre-se: o que Deus prometeu, Ele é fiel para cumprir. Há esperança para você.",
  },
  {
    slug: "o-caminho-de-volta-para-casa",
    title: "O caminho de volta para casa",
    excerpt:
      "Não importa quão longe você tenha ido: o Pai continua olhando para a estrada, esperando o seu retorno.",
    verse:
      "E, quando ainda estava longe, viu-o seu pai, e moveu-se de íntima compaixão; e, correndo, lançou-se-lhe ao pescoço e o beijou. — Lucas 15:20",
    author: "Equipe Almas Para Cristo",
    content:
      "A parábola do filho pródigo é uma das histórias mais conhecidas de Jesus. Nela, um filho pede sua herança, abandona o pai e desperdiça tudo em uma vida de pecado. Quando chega ao fundo do poço, ele decide voltar para casa, esperando ser recebido como um empregado.\n\nMas o pai faz algo inesperado. Ele não espera o filho chegar com um discurso pronto. Ele o vê de longe, corre ao seu encontro, abraça-o e o beija. Não há humilhação, não há cobrança, não há porta fechada. Há apenas amor.\n\nEssa é a imagem que Jesus nos dá de Deus. Um Pai que não se cansa de esperar. Um Pai que não desiste de você, mesmo quando você desiste de si mesmo. Um Pai que corre ao encontro do filho que volta.\n\nTalvez você tenha se afastado de Deus. Talvez tenha buscado felicidade em lugares que só trouxeram vazio. Talvez sinta vergonha de voltar. Mas a verdade é que o caminho de volta para casa está aberto. O Pai não está de braços cruzados; Ele está de braços abertos.\n\nVoltar para casa significa reconhecer o erro, pedir perdão e permitir ser amado. Não é fácil, mas é libertador. O filho pródigo pensou que voltaria como servo, mas o pai o recebeu como filho. Assim também Deus faz com cada um que se arrepende.\n\nHoje é um bom dia para voltar. Deixe o orgulho de lado. Deixe o medo. Deixe a vergonha. Dê o primeiro passo na direção do Pai. Ele já está olhando para a estrada, esperando por você.",
  },
  {
    slug: "a-paz-que-o-mundo-nao-pode-dar",
    title: "A paz que o mundo não pode dar",
    excerpt:
      "Em meio ao caos, Jesus oferece uma paz que não depende das circunstâncias, mas da presença de Deus.",
    verse:
      "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize. — João 14:27",
    author: "Equipe Almas Para Cristo",
    content:
      "O mundo promete paz, mas entrega ansiedade. Promete segurança, mas espalha medo. Promete descanso, mas cobra um preço alto demais. A paz que Jesus oferece é diferente: ela não depende de circunstâncias favoráveis, mas da presença de Deus no coração.\n\nJesus pronunciou estas palavras na noite em que seria traído. Ele sabia o que estava por vir: a dor, a cruz, a separação. Ainda assim, ofereceu paz aos seus discípulos. Isso nos mostra que a paz de Cristo não é ausência de problemas, mas a certeza de que Ele está conosco em meio a eles.\n\nA ansiedade se alimenta de pensamentos sobre o futuro. O medo cresce quando nos sentimos sozinhos. Mas quando Deus está no centro, o coração encontra descanso. A fé não elimina as tempestades, mas nos dá um porto seguro para onde correr.\n\nVocê pode experimentar essa paz hoje. Comece entregando suas preocupações a Deus em oração. Leia a Bíblia e deixe a Palavra acalmar o seu coração. Cante, ainda que baixinho, louvores que lembrem quem Deus é. Caminhe com pessoas que fortalecem a sua fé.\n\nA paz de Cristo é um presente. Não pode ser comprada, conquistada ou merecida. É recebida pela fé. E uma vez que habita o coração, nenhuma circunstância pode roubá-la completamente.\n\nNão se turbe o seu coração. Não se atemorize. O Príncipe da Paz está com você. Onde Ele está, há descanso. Onde Ele fala, o medo se aquieta. Receba hoje a paz que o mundo não pode dar.",
  },
  {
    slug: "levanta-te-e-anda",
    title: "Levanta-te e anda",
    excerpt:
      "Jesus não apenas vê a sua dor: Ele tem poder para transformar a sua história. É hora de se levantar.",
    verse:
      "Jesus disse-lhe: Levanta-te, toma o teu leito, e anda. — João 5:8",
    author: "Equipe Almas Para Cristo",
    content:
      "Havia um homem junto ao tanque de Betesda que esperava por um milagre há trinta e oito anos. Ele estava paralítico, sem forças para chegar à água na hora certa. Sua vida era marcada pela espera e pela frustração.\n\nEntão Jesus se aproximou e fez uma pergunta simples: queres ficar são? A resposta do homem revelou sua dor: não tenho ninguém que me ponha no tanque. Ele via apenas a limitação, o abandono e a impossibilidade.\n\nMas Jesus não o mandou esperar mais. Ele ordenou: levanta-te, toma o teu leito e anda. Naquele instante, o impossível aconteceu. O homem foi curado. Não porque merecesse, mas porque Jesus se aproximou com poder e compaixão.\n\nTalvez você esteja esperando há muito tempo por uma mudança. Talvez a sua situação pareça tão paralisada quanto a daquele homem. Mas o mesmo Jesus que o curou continua agindo hoje. Ele vê a sua dor, conhece a sua história e tem poder para transformá-la.\n\nO milagre começou quando o homem obedeceu à palavra de Jesus. Ele não esperou sentir-se forte; ele se levantou pela fé. Assim também, muitas vezes, Deus nos chama a dar um passo antes de vermos o resultado.\n\nLevante-se hoje. Deixe o leito da incredulidade, da amargura e do medo. Creia que Deus pode fazer o que ninguém mais pode. E se você ainda não conhece Jesus, saiba que Ele está passando perto de você neste momento, oferecendo vida nova. Levanta-te e anda.",
  },
  {
    slug: "o-poder-do-nome-de-jesus",
    title: "O poder do nome de Jesus",
    excerpt:
      "Não há outro nome que salve, cure e liberte. O nome de Jesus é a maior esperança da humanidade.",
    verse:
      "E em nenhum outro há salvação, porque também debaixo do céu nenhum outro nome há, dado entre os homens, pelo qual devamos ser salvos. — Atos 4:12",
    author: "Equipe Almas Para Cristo",
    content:
      "O nome de Jesus não é apenas uma palavra. É o nome do Filho de Deus, que veio ao mundo para salvar, curar e libertar. A Bíblia declara que não há outro nome dado entre os homens pelo qual possamos ser salvos.\n\nPedro e João, diante de um homem paralítico, disseram: não tenho prata nem ouro, mas o que tenho te dou: em nome de Jesus Cristo, levanta-te e anda. E o homem foi curado. O nome de Jesus tem poder real, porque pertence Àquele que venceu a morte.\n\nEm um mundo que oferece tantos caminhos, a mensagem do evangelho é clara: Jesus é o caminho, a verdade e a vida. Nenhum outro nome pode perdoar pecados, transformar corações e dar vida eterna.\n\nTalvez você tenha tentado muitas coisas para preencher o vazio interior. Talvez tenha buscado respostas em lugares que só trouxeram mais confusão. Mas o nome de Jesus continua disponível, poderoso e acessível a todos que creem.\n\nInvocar o nome de Jesus não é uma fórmula mágica. É uma expressão de fé em quem Ele é. É reconhecer que precisamos de um Salvador e confiar que Ele é suficiente.\n\nHoje você pode chamar por Ele. O nome de Jesus é a maior esperança da humanidade. Não importa o seu passado, a sua dor ou a sua condição: em nome de Jesus há salvação, há cura, há libertação e há vida nova.",
  },
];

const ebooks = [
  {
    slug: "primeiro-passo-com-cristo",
    title: "O Primeiro Passo com Cristo",
    description:
      "Um guia simples e profundo para quem está começando a caminhada com Jesus.",
    category: "evangelismo",
    pages: 5,
    content:
      "## Um novo começo\n\nDar o primeiro passo com Cristo é o início da maior aventura que uma pessoa pode viver. Talvez você tenha acabado de entregar sua vida a Jesus e não saiba exatamente o que fazer agora. Este pequeno guia foi preparado para caminhar com você nesses primeiros dias.\n\nNão se preocupe em ter todas as respostas. A vida cristã é uma caminhada de aprendizado. O mais importante é que você saiba que foi recebido por um Pai que o ama profundamente.\n\n## Quem é Jesus?\n\nJesus é o Filho de Deus, que veio ao mundo para nos mostrar o amor do Pai e nos salvar do pecado. Ele viveu uma vida perfeita, morreu na cruz em nosso lugar e ressuscitou ao terceiro dia. Hoje Ele está vivo e intercede por aqueles que creem.\n\nJesus não é apenas um mestre ou um exemplo. Ele é o Salvador. Ele disse: eu sou o caminho, a verdade e a vida; ninguém vem ao Pai senão por mim.\n\n## O que é o pecado?\n\nO pecado é tudo aquilo que desagrada a Deus, seja em pensamentos, palavras ou atitudes. Todos nós pecamos e, por isso, precisamos de perdão. O pecado nos separa de Deus, mas Jesus veio para restaurar essa comunhão.\n\nReconhecer o pecado não é motivo de desespero, mas de esperança. Quando confessamos, Deus é fiel e justo para perdoar e purificar.\n\n## A cruz e o perdão\n\nNa cruz, Jesus tomou sobre si a culpa que era nossa. Ele pagou um preço que não podíamos pagar. A cruz é a prova de que o amor de Deus é maior do que o nosso pecado.\n\nO perdão de Deus é completo. Ele não apenas perdoa, mas também lança os nossos pecados nas profundezas do mar e não se lembra mais deles. Você não precisa carregar culpa depois de ter recebido o perdão de Cristo.\n\n## Como receber a Cristo\n\nReceber a Cristo é reconhecer que você precisa de um Salvador e confiar nele de todo o coração. Não é apenas repetir palavras, mas abrir a vida para Jesus e permitir que Ele transforme o seu interior.\n\nSe você ainda não fez isso, pode orar agora: Senhor Jesus, reconheço que sou pecador. Obrigado por morrer na cruz em meu lugar. Perdoa os meus pecados e entra no meu coração. Eu creio que Tu ressuscitaste e vives. Quero caminhar contigo todos os dias. Amém.\n\n## A importância da Bíblia\n\nA Bíblia é a Palavra de Deus. É por meio dela que conhecemos quem Deus é, o que Ele deseja de nós e como viver de forma agradável a Ele. Leia a Bíblia todos os dias, mesmo que seja um pequeno trecho.\n\nComece pelos Evangelhos: Mateus, Marcos, Lucas e João. Eles contam a história de Jesus e ajudam você a conhecê-lo melhor. Anote o que chamar a sua atenção e converse com Deus sobre o que leu.\n\n## A oração\n\nA oração é a conversa com Deus. Não precisa de palavras difíceis. Fale com Deus com sinceridade, como um filho fala com o pai. Agradeça, peça perdão, apresente as suas necessidades e ore pelas pessoas que ama.\n\nA oração pode ser feita em qualquer lugar e a qualquer hora. O importante é que seja um hábito constante, que fortalece o seu relacionamento com Deus.\n\n## A igreja\n\nVocê não foi chamado para caminhar sozinho. A igreja é a família de Deus, o lugar onde encontramos comunhão, ensino e apoio. Procure uma igreja que ensina a Bíblia com fidelidade e que ama as pessoas.\n\nEnvolva-se com a igreja: participe dos cultos, dos grupos pequenos e dos projetos de serviço. Ali você crescerá na fé e fará amizades que vão sustentar a sua caminhada.\n\n## O batismo\n\nO batismo é um passo público de obediência a Jesus. Ele simboliza a morte para o pecado e a ressurreição para uma vida nova. Se você creu em Cristo, procure o seu pastor para saber como dar esse passo.\n\nO batismo não salva, mas é uma demonstração de fé e compromisso com Jesus. É o começo de uma nova história aos olhos de Deus.\n\n## Próximos passos\n\nLeia a Bíblia todos os dias. Ore sem cessar. Participe de uma igreja saudável. Procure um mentor cristão que possa ajudá-lo a crescer. E lembre-se: a caminhada cristã não é perfeita, mas é acompanhada por um Deus fiel.\n\nVocê deu o primeiro passo. Agora continue caminhando, um dia de cada vez, confiando que Deus é fiel para completar a boa obra que começou em você.",
  },
  {
    slug: "30-dias-de-oracao-pelas-missoes",
    title: "30 Dias de Oração pelas Missões",
    description:
      "Um devocional de um mês para orar pelo mundo, pelo Brasil, pelo Nordeste e pelo Piauí.",
    category: "missões",
    pages: 5,
    content:
      "## Como usar este guia\n\nEste devocional foi preparado para 30 dias de oração pelas missões. Cada dia traz um tema e um motivo de oração. Reserve alguns minutos, abra a sua Bíblia, leia o versículo e ore com fé.\n\nVocê pode usar este guia sozinho, em família ou em grupo. O importante é que a oração seja constante e cheia de esperança.\n\n## Semana 1 - O mundo\n\nDia 1 - Ore pelas nações onde o evangelho ainda é pouco conhecido. Peça a Deus que levante obreiros e abra portas.\n\nDia 2 - Ore pelos missionários que deixaram suas casas para servir em outros países. Peça proteção e provisão.\n\nDia 3 - Ore pelas crianças do mundo que vivem em situação de pobreza. Peça que elas conheçam o amor de Jesus.\n\nDia 4 - Ore pelos adolescentes em campos missionários. Peça que encontrem esperança e propósito em Cristo.\n\nDia 5 - Ore pelos governantes das nações, para que haja liberdade religiosa e paz.\n\nDia 6 - Ore pelas traduções da Bíblia em línguas ainda não alcançadas.\n\nDia 7 - Ore por avivamento espiritual em todas as nações da terra.\n\n## Semana 2 - O Brasil\n\nDia 8 - Ore pelo Brasil, suas cidades, famílias e igrejas.\n\nDia 9 - Ore pelos missionários brasileiros que servem em outras regiões do país.\n\nDia 10 - Ore pelas crianças brasileiras que ainda não ouviram falar de Jesus.\n\nDia 11 - Ore pelos adolescentes, para que sejam protegidos das drogas e da violência.\n\nDia 12 - Ore pelas famílias brasileiras, para que sejam restauradas pelo amor de Deus.\n\nDia 13 - Ore pelas igrejas em regiões de pouca presença evangélica.\n\nDia 14 - Ore pelos líderes cristãos, para que tenham sabedoria e integridade.\n\n## Semana 3 - O Nordeste\n\nDia 15 - Ore pelo Nordeste, sua gente, sua cultura e suas necessidades.\n\nDia 16 - Ore pelas crianças do sertão, para que tenham alimento, escola e fé.\n\nDia 17 - Ore pelos adolescentes do agreste, para que encontrem mentores e oportunidades.\n\nDia 18 - Ore pelas famílias que enfrentam a seca, para que tenham provisão e esperança.\n\nDia 19 - Ore pelos evangelistas que percorrem o sertão levando a Palavra.\n\nDia 20 - Ore pelas novas igrejas que estão sendo plantadas no Nordeste.\n\nDia 21 - Ore por unidade entre as igrejas nordestinas, para que trabalhem juntas na missão.\n\n## Semana 4 - O Piauí\n\nDia 22 - Ore pelo Piauí, de norte a sul, para que o evangelho alcance cada lar.\n\nDia 23 - Ore pelas crianças piauienses, especialmente as que vivem em comunidades ribeirinhas.\n\nDia 24 - Ore pelos adolescentes piauienses, para que encontrem propósito em Cristo.\n\nDia 25 - Ore pelos missionários locais que servem no interior do estado.\n\nDia 26 - Ore pelas igrejas piauienses, para que sejam saudáveis e missionárias.\n\nDia 27 - Ore pelos líderes e pastores do Piauí, para que sejam fortalecidos.\n\nDia 28 - Ore pelos projetos sociais que levam esperança às comunidades carentes.\n\nDia 29 - Ore por um grande avivamento no Piauí e em todo o Brasil.\n\nDia 30 - Ore por você mesmo, para que seja um instrumento de Deus onde estiver.\n\n## Conclusão\n\nA oração é a base da missão. Nada acontece no Reino de Deus sem oração. Continue orando, mesmo depois destes 30 dias. Deus ouve, Deus responde e Deus age.",
  },
  {
    slug: "criancas-no-caminho-da-fe",
    title: "Crianças no Caminho da Fé",
    description:
      "Orientações práticas para pais e professores ensinarem a Bíblia às crianças com amor.",
    category: "crianças",
    pages: 4,
    content:
      "## A criança e o Reino de Deus\n\nJesus disse: deixai vir a mim as crianças e não as impeçais, porque de tais é o Reino de Deus. As crianças não são o futuro da igreja apenas; elas são parte do presente. Ensiná-las é uma missão sagrada.\n\nEste guia oferece orientações simples para pais, mães e professores que desejam conduzir as crianças no caminho da fé.\n\n## Ensine com o exemplo\n\nAs crianças aprendem mais com o que veem do que com o que ouvem. Se você ora, lê a Bíblia e demonstra amor, a criança aprende naturalmente. O exemplo é o primeiro e mais poderoso professor.\n\n## Crie uma rotina de leitura bíblica\n\nSepare um momento diário para ler a Bíblia com as crianças. Use histórias conhecidas, faça perguntas e permita que elas expressem o que entenderam. A constância vale mais do que a quantidade.\n\n## Use linguagem adequada\n\nAdapte a mensagem à idade da criança. Use ilustrações, objetos e brincadeiras. A verdade bíblica pode ser profunda e, ao mesmo tempo, acessível.\n\n## Ore com e pela criança\n\nOre com a criança em voz alta, usando palavras simples. Ensine-a a orar por suas próprias necessidades e pelas pessoas que ama. A oração desenvolve intimidade com Deus.\n\n## A importância da igreja\n\nLeve a criança à igreja e envolva-a nas atividades. Ela precisa sentir que pertence a uma família espiritual. Professores e líderes devem ser exemplos de amor e acolhimento.\n\n## Enfrente as perguntas difíceis\n\nAs crianças fazem perguntas profundas sobre Deus, dor e morte. Não evite. Responda com honestidade, de acordo com a Bíblia e com a idade da criança. Mostre que é seguro buscar respostas.\n\n## Cultive gratidão e serviço\n\nEnsine a criança a agradecer e a servir. Pequenos gestos, como ajudar em casa, compartilhar brinquedos e visitar alguém doente, formam um coração generoso.\n\n## Conclusão\n\nEnsinar uma criança no caminho da fé é uma das maiores obras que alguém pode realizar. Faça isso com amor, oração e paciência, confiando que Deus é fiel para guardar a semente plantada.",
  },
  {
    slug: "esperanca-para-o-nordeste",
    title: "Esperança para o Nordeste",
    description:
      "Um devocional missionário sobre o amor de Deus pelo povo nordestino.",
    category: "missões",
    pages: 4,
    content:
      "## O sertão e a esperança\n\nO sertão nordestino é marcado por belezas e desafios. A seca, a distância e a pobreza fazem parte da realidade de muitas famílias. Mas onde há dor, há também oportunidade para o amor de Deus se manifestar.\n\nEste devocional é um convite para olhar o Nordeste com os olhos do Pai e se envolver na missão.\n\n## Deus vê o sertão\n\nDeus não esquece o sertão. Ele vê cada casa, cada criança, cada família que enfrenta dificuldades. O Deus que cuida dos lírios do campo também cuida do povo nordestino.\n\n## A força da fé nordestina\n\nA fé do povo nordestino é uma riqueza. Em meio às lutas, muitos encontram força em Deus. As igrejas locais são lugares de acolhimento, oração e esperança.\n\n## O papel da igreja\n\nA igreja tem a responsabilidade de cuidar das pessoas de forma integral. Isso inclui alimentar os famintos, visitar os doentes, ensinar as crianças e proclamar o evangelho.\n\n## Desafios e oportunidades\n\nO Nordeste enfrenta desafios como a seca, o desemprego e a violência. Mas também há oportunidades imensas: comunidades abertas, crianças sedentas de amor e igrejas dispostas a servir.\n\n## Como participar\n\nVocê pode participar orando, contribuindo e servindo. Ore pelo Nordeste, apoie projetos missionários e, se Deus chamar, vá. A missão não é apenas de alguns, mas de toda a igreja.\n\n## Conclusão\n\nO Nordeste é um campo amado por Deus. Que a nossa esperança não seja apenas em dias melhores, mas em Cristo, que transforma vidas e comunidades.",
  },
  {
    slug: "liberto-para-servir",
    title: "Liberto para Servir",
    description:
      "Um guia bíblico sobre libertação, cura interior e uma vida de serviço a Deus.",
    category: "libertação",
    pages: 4,
    content:
      "## A verdade que liberta\n\nJesus disse: conhecereis a verdade, e a verdade vos libertará. A verdade é que em Cristo há libertação completa. Não precisamos viver presos ao medo, à culpa ou ao pecado.\n\n## O que é libertação\n\nLibertação é o ato de Deus quebrando as correntes que nos prendem. Pode ser do pecado, do medo, da amargura, da dependência ou de influências espirituais. Em Cristo, temos autoridade para vencer.\n\n## A cruz e o poder de Jesus\n\nA cruz não foi derrota; foi vitória. Jesus venceu o pecado, a morte e o inimigo. Por meio dele, somos mais que vencedores. A ressurreição é a garantia de que o mal não tem a palavra final.\n\n## Cura interior\n\nMuitas pessoas carregam feridas emocionais que afetam a fé e os relacionamentos. Deus se importa com essas feridas. Ele pode curar memórias, restaurar a alegria e dar paz ao coração.\n\n## O papel da oração e da Palavra\n\nA oração e a Palavra de Deus são instrumentos poderosos de libertação. Ore com sinceridade, leia a Bíblia e declare as promessas de Deus sobre a sua vida. Cercar-se de uma comunidade de fé também é essencial.\n\n## Liberto para servir\n\nA libertação não é o fim; é o começo. Fomos libertos para servir a Deus e ao próximo. Uma vida liberta é uma vida de gratidão, amor e serviço.\n\n## Conclusão\n\nSe hoje você se sente preso, saiba que Jesus tem poder para libertar. Ele não apenas perdoa, mas transforma. Receba a liberdade que Ele oferece e comece a viver a vida plena para a qual foi criado.",
  },
];

const testimonies = [
  {
    name: "Maria de Fátima",
    title: "Deus curou meu filho",
    category: "cura",
    location: "Teresina, PI",
    content:
      "Meu filho estava internado com uma infecção grave e os médicos não davam esperança. A igreja se reuniu para orar conosco durante três noites. Na terceira madrugada, ele abriu os olhos e pediu água. Hoje está completamente curado e serve a Deus com alegria.",
    approved: true,
  },
  {
    name: "João Batista",
    title: "Livre das drogas",
    category: "libertacao",
    location: "Fortaleza, CE",
    content:
      "Fui dependente químico por quase dez anos e perdi minha família. Um dia, um missionário me convidou para um culto na praça. Ali ouvi que Jesus podia me libertar. Entreguei minha vida a Ele e, com o apoio da igreja, estou há quatro anos livre. Hoje ajudo outros a encontrarem o mesmo caminho.",
    approved: true,
  },
  {
    name: "Raimunda Silva",
    title: "O milagre da provisão",
    category: "provisao",
    location: "São Luís, MA",
    content:
      "Fiquei desempregada e sem como alimentar meus três filhos. Orei e pedi a Deus que nos sustentasse. No mesmo dia, uma irmã da igreja apareceu com cestas básicas e, uma semana depois, consegui um emprego. Deus cuidou de nós de forma concreta.",
    approved: true,
  },
  {
    name: "Antônio Carlos",
    title: "Restauração do meu casamento",
    category: "restauracao",
    location: "Parnaíba, PI",
    content:
      "Meu casamento estava destruído e já tínhamos decidido nos separar. Comecei a orar e a buscar aconselhamento na igreja. Deus transformou meu coração e o da minha esposa. Hoje somos uma família restaurada e testemunhamos o amor de Cristo.",
    approved: true,
  },
  {
    name: "Luciana Alves",
    title: "Cura do câncer",
    category: "cura",
    location: "Recife, PE",
    content:
      "Recebi o diagnóstico de câncer e senti muito medo. A igreja orou por mim e encontrei forças na Palavra de Deus. Durante o tratamento, os exames foram mostrando melhora até que os médicos declararam que eu estava curada. A Deus toda a glória.",
    approved: true,
  },
  {
    name: "Patrícia Gomes",
    title: "Encontrei paz em meio à depressão",
    category: "libertacao",
    location: "Natal, RN",
    content:
      "Por muito tempo vivi com depressão e pensamentos de desistência. Foi quando comecei a participar de um grupo de oração. Aos poucos, Deus foi me dando paz, e hoje consigo olhar para a vida com esperança. Ele me sustentou e me restaurou.",
    approved: true,
  },
  {
    name: "Francisco das Chagas",
    title: "Deus abriu uma porta de emprego",
    category: "provisao",
    location: "Imperatriz, MA",
    content:
      "Estava há dois anos desempregado e com dívidas. Orei e pedi a Deus uma oportunidade. Poucos dias depois, um irmão da igreja me indicou para uma vaga. Fui contratado e hoje posso sustentar minha família com dignidade.",
    approved: true,
  },
  {
    name: "Ana Paula",
    title: "Uma vida transformada pelo amor de Cristo",
    category: "restauracao",
    location: "Lisboa, Portugal",
    content:
      "Vivia longe de Deus e da minha família. Em um momento de grande solidão, entrei em uma igreja e ouvi falar do amor de Jesus. Ali minha vida começou a mudar. Hoje tenho paz, propósito e um relacionamento restaurado com minha família.",
    approved: true,
  },
  {
    name: "José Ribamar",
    title: "Deus me livrou de um acidente",
    category: "milagre",
    location: "Picos, PI",
    content:
      "Voltava para casa em uma estrada do interior quando perdi o controle do carro e saí da pista. O veículo capotou, mas saí sem nenhum ferimento grave. No hospital, os médicos ficaram surpresos. Tenho certeza de que Deus enviou os seus anjos para me guardar. Hoje testemunho que o Senhor guarda a vida dos seus servos.",
    approved: true,
  },
];

async function seedContent() {
  await prisma.testimony.deleteMany();
  await prisma.message.deleteMany();
  await prisma.ebook.deleteMany();
  await prisma.mission.deleteMany();

  await prisma.mission.createMany({ data: missions });
  await prisma.message.createMany({ data: messages });
  await prisma.ebook.createMany({ data: ebooks });
  await prisma.testimony.createMany({ data: testimonies });

  console.log(
    `Conteudo criado: ${missions.length} missoes, ${messages.length} mensagens, ${ebooks.length} ebooks, ${testimonies.length} testemunhos.`
  );
}

async function seedBible() {
  const file = path.join(__dirname, "data", "acf.json");
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const books = JSON.parse(raw);

  await prisma.bibleVerse.deleteMany();
  await prisma.bibleBook.deleteMany();

  let totalVerses = 0;

  for (let position = 0; position < books.length; position++) {
    const book = books[position];
    const created = await prisma.bibleBook.create({
      data: {
        abbrev: book.abbrev,
        name: book.name,
        position: position + 1,
        chapters: book.chapters.length,
      },
    });

    const rows = [];
    book.chapters.forEach((chapterVerses, chapterIndex) => {
      chapterVerses.forEach((text, verseIndex) => {
        rows.push({
          bookId: created.id,
          chapter: chapterIndex + 1,
          verse: verseIndex + 1,
          text: String(text).trim(),
        });
      });
    });

    for (let i = 0; i < rows.length; i += 500) {
      await prisma.bibleVerse.createMany({ data: rows.slice(i, i + 500) });
    }

    totalVerses += rows.length;
  }

  console.log(
    `Biblia importada: ${books.length} livros e ${totalVerses} versiculos (Almeida Corrigida Fiel).`
  );
}

async function main() {
  await seedContent();
  await seedBible();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
