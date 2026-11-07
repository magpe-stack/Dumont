# Dumont — Manual do Usuário

## 1. Apresentação

O Dumont é um aplicativo web que reúne relógio digital, cronômetro, cartão de ponto e histórico diário de jornada em uma única tela, e funciona inclusive sem internet. Ele roda direto no navegador, pode ser instalado como aplicativo e guarda todos os seus registros somente no seu próprio dispositivo.

Este manual explica como usar cada recurso, como proteger seus dados com backup e como publicar e manter o projeto no GitHub. Ele foi escrito para dois públicos: quem apenas usa o aplicativo (seções 2 a 14) e quem o implanta ou personaliza (seção 15). As seções 16 a 19 servem a ambos.

### Para quem o Dumont foi feito

O aplicativo atende quem precisa marcar horários de trabalho sem depender de um sistema corporativo: profissionais autônomos, estudantes, pessoas em regime de banco de horas, equipes pequenas e qualquer um que queira saber, ao fim do dia, quanto tempo realmente trabalhou. Como não há cadastro, login nem servidor, não existe nada para configurar antes de começar.

### Principais recursos

- **Relógio digital** com hora, data completa e dia da semana, em formato de 24 horas ou 12 horas (AM/PM), com ou sem segundos.
- **Cronômetro** com iniciar, pausar, continuar, voltas (laps) e redefinição, com precisão de centésimos de segundo.
- **Ponto em tempo real**: registra um início ou um término de atividade no instante exato, com observação opcional de até 50 caracteres.
- **Entrada manual retroativa**: lança um registro esquecido, escolhendo dia, mês, ano, hora e minuto.
- **Meu Dia**: página que organiza automaticamente os registros por data, com título como "Meu Dia 14-02-2026" e total trabalhado em cada dia.
- **Backup unificado, importação e impressão** do histórico, incluindo geração de PDF pelo navegador.
- **Temas claro e escuro**, navegação por teclado, foco visível e cores com contraste adequado.
- **Instalação como aplicativo (PWA)** e uso 100% offline.

### Como este manual está organizado

As seções seguem a ordem natural de uso: primeiro abrir e conhecer a tela, depois os recursos de tempo (relógio e cronômetro), depois o cartão de ponto e o histórico, e por fim backup, privacidade, implantação e solução de problemas. Na seção 18 há uma tabela de referência rápida que resume onde fica cada função.

## 2. Requisitos e compatibilidade

O Dumont foi projetado para o Google Chrome, no Windows e no Android, e usa apenas recursos nativos do navegador, sem bibliotecas externas. Qualquer navegador moderno costuma abrir o aplicativo, mas a instalação como aplicativo e a tela cheia dependem de recursos que variam de um navegador para outro.

### O que você precisa

- Um navegador atualizado, de preferência o Google Chrome em computador (Windows) ou celular (Android, por exemplo um Samsung Galaxy A52 5G).
- JavaScript ativado e armazenamento local do site permitido. Sem ele, os registros não podem ser salvos.
- Conexão com a internet apenas na primeira visita, para o navegador baixar os arquivos. Depois disso, o aplicativo abre sem conexão.
- O endereço do aplicativo precisa começar com HTTPS (como no GitHub Pages) ou ser localhost. Abrir o arquivo direto do disco (endereço começando com file://) mostra a interface, mas não ativa o uso offline nem a instalação.

### Recursos que dependem do navegador

| Recurso | Chrome (Windows e Android) | Observação |
| --- | --- | --- |
| Relógio, cronômetro, ponto, Meu Dia | Sim | Funcionam em qualquer navegador moderno |
| Botão Instalar | Sim | Depende do navegador oferecer o aviso de instalação |
| Uso offline | Sim | Requer HTTPS ou localhost |
| Tela cheia | Sim | Alguns navegadores de celular não permitem |
| Impressão e PDF | Sim | Usa o diálogo de impressão do navegador |

### Limites a conhecer

O espaço de armazenamento local do navegador costuma ser de alguns megabytes por site. Cada registro ocupa poucas dezenas de bytes, então milhares de registros cabem com folga, mas o histórico não deve ser tratado como arquivo permanente. A seção 11 explica como fazer backup e a seção 14 detalha onde os dados ficam.

O Dumont usa o relógio e o fuso horário do próprio dispositivo. Se a hora do aparelho estiver errada, os registros também ficarão errados. Confira a data e a hora do sistema antes de usar o aplicativo para fins de controle de jornada.

## 3. Primeiros passos

Para começar, basta abrir o endereço do aplicativo no navegador: https://magpe-stack.github.io/Dumont/. Em poucos segundos você vê a abertura animada e, em seguida, o relógio principal. Não há cadastro nem configuração obrigatória.

### A abertura (splash screen)

A cada carregamento da página, o Dumont exibe uma abertura de exatamente 3 segundos. Sobre um fundo azul-noite, o logotipo surge no centro de um instrumento de precisão, com anéis graduados que giram e uma agulha laranja que varre o mostrador. Logo abaixo, o nome Dumont aparece com um efeito de foco e espaçamento entre letras, seguido pelo lema "Precisão no ar, precisão no tempo". Uma linha de horizonte atravessa a tela e, no fim, tudo se dissolve para revelar o aplicativo.

Durante esses 3 segundos a interface fica inativa. Não é preciso clicar em nada: aguarde a abertura terminar. Se o seu sistema estiver configurado para reduzir animações, a abertura continua durando 3 segundos, mas com movimentos mais suaves.

### Sua primeira sessão em cinco passos

1. Confira a hora e a data no relógio da tela inicial. Elas vêm do relógio do seu dispositivo.
2. Abra o menu (botão de três linhas, no canto superior direito) e escolha o formato de hora que prefere: 24 horas ou 12 horas (AM/PM).
3. Ainda no menu, ative ou desative o modo escuro conforme o ambiente.
4. Toque em Ponto para registrar o início da sua atividade. Escreva uma observação curta, se quiser, e confirme.
5. Ao terminar a atividade, repita o passo 4 escolhendo Término. Depois abra Meu Dia para ver o registro e o total trabalhado.

### Instalar como aplicativo

O Dumont pode ser instalado para abrir em sua própria janela, sem barra de endereços, e com ícone na área de trabalho ou na tela inicial do celular. No menu, toque em Instalar. Se o Chrome oferecer a instalação, aparece uma janela de confirmação do próprio navegador. A seção 13 explica o processo e o que fazer quando o botão informa que a instalação não está disponível.

### Voltar ao início

Em qualquer página do aplicativo, clicar no logotipo ou no nome Dumont no topo leva você imediatamente de volta ao relógio principal.

## 4. Visão geral da interface

A tela do Dumont tem três áreas fixas, de cima para baixo: a barra superior, o conteúdo da página atual e o rodapé. O conteúdo troca entre duas páginas, o Relógio (página inicial) e o Meu Dia, sem recarregar o aplicativo.

### Barra superior

A barra superior permanece visível enquanto você rola a página. À esquerda ficam o logotipo e o nome Dumont, que funcionam como um botão: um clique leva ao relógio principal. À direita fica o botão do menu, com três linhas horizontais. Ao abri-lo, as linhas viram um X, e o botão passa a se chamar "Fechar menu" para leitores de tela.

### Página Relógio

A página inicial tem dois cartões. O primeiro mostra a hora em tamanho grande, com a data por extenso logo abaixo. O segundo é o cronômetro, com o visor, três botões e a lista de voltas. As seções 5 e 6 descrevem cada um.

### Página Meu Dia

A segunda página lista o histórico do cartão de ponto, agrupado por data. No alto há uma barra de ferramentas com os botões Ponto, Entrada, Backup unificado, Importar / Restaurar, Imprimir e um seletor de ordem. A seção 10 explica todos.

### Menu em gaveta

O menu abre como uma gaveta suspensa no canto superior direito, dividida em três grupos: Registros, Aplicativo e Preferências. Ele fecha sozinho quando você escolhe uma ação, clica fora dele, pressiona Esc ou move o foco do teclado para fora. Os interruptores de preferência são exceção: ao ligar ou desligar um deles, o menu permanece aberto para você ajustar vários de uma vez. A seção 7 detalha cada item.

### Rodapé fixo

O rodapé fica sempre visível na parte inferior da janela e mostra os três endereços oficiais do projeto, todos abertos em nova aba:

- **App**: magpe-stack.github.io/Dumont, o endereço do aplicativo publicado.
- **GitHub**: magpe-stack/Dumont, o repositório com o código.
- **README / Manual**: o manual do usuário no repositório.

### Janelas de diálogo e avisos

Ponto, Entrada e Sobre abrem em janelas modais, que escurecem o fundo e capturam o foco do teclado até serem fechadas. Para fechar uma janela, use o botão Cancelar ou Fechar, a tecla Esc ou um clique na área escurecida ao redor. Confirmações e erros leves aparecem em um aviso temporário (toast) próximo ao rodapé, que desaparece sozinho em cerca de quatro segundos e também é lido por leitores de tela.

## 5. Relógio digital

O relógio da página inicial mostra a hora atual do seu dispositivo em tamanho grande e a data completa com o dia da semana logo abaixo, por exemplo "Sábado, 7 de novembro de 2026". Ele se atualiza a cada segundo, sincronizado com a virada do segundo do sistema, e não exige nenhuma ação sua.

### Formato de 24 horas e de 12 horas

No formato de 24 horas, a hora aparece como 18:42:07. No formato de 12 horas, aparece como 06:42:07 acompanhada do indicador AM ou PM, mostrado ao lado do relógio em cor de destaque. Para trocar, abra o menu e use o interruptor "Hora em 24h": ligado significa 24 horas, desligado significa 12 horas com AM/PM.

A escolha vale para todo o aplicativo, não só para o relógio. Os horários dos registros em Meu Dia, a janela de Ponto e o relatório impresso também passam a seguir o formato escolhido. Os dados guardados não mudam: o que muda é apenas a forma de exibição, então você pode alternar à vontade sem perder nem alterar registros.

### Exibir ou ocultar os segundos

O interruptor "Exibir segundos" do menu liga e desliga o contador de segundos no mostrador principal. Com os segundos ocultos, o relógio mostra apenas horas e minutos, o que deixa a tela mais discreta. Essa preferência afeta somente o relógio principal: os registros de ponto sempre guardam e exibem os segundos exatos.

### Data e dia da semana

A data é escrita por extenso, em português do Brasil, com a primeira letra maiúscula: dia da semana, dia, mês e ano. Ao passar da meia-noite, ela se atualiza sozinha, sem precisar recarregar a página.

### Precisão e fuso horário

O Dumont lê a hora do sistema operacional e usa o fuso horário configurado nele. O aplicativo não consulta servidores de horário. Se o relógio do aparelho estiver adiantado, atrasado ou com o fuso errado, o Dumont mostrará e registrará essa mesma hora. Mantenha a sincronização automática de data e hora ativada no Windows ou no Android para garantir a precisão.

### Usando o relógio como mostrador

Com o botão Tela cheia (seção 7), o relógio ocupa toda a tela, o que o torna útil como relógio de mesa ou de parede em um tablet ou monitor. Combine com o modo escuro para um mostrador de baixo brilho.

## 6. Cronômetro

O cronômetro mede intervalos com precisão de centésimos de segundo e fica no segundo cartão da página inicial, abaixo do relógio. O visor mostra horas, minutos, segundos e centésimos no formato 00:00:00.00.

### Os três botões

- **Iniciar / Pausar / Continuar**: é um único botão que muda de nome conforme o estado. Parado e zerado, chama-se Iniciar. Em contagem, chama-se Pausar. Pausado com tempo acumulado, chama-se Continuar.
- **Volta**: marca uma volta (lap) enquanto o cronômetro está contando. Fica desativado quando o cronômetro está parado ou pausado.
- **Redefinir**: zera o tempo e apaga todas as voltas. Fica desativado quando não há nada para zerar.

### Medir um tempo simples

1. Toque em Iniciar para começar a contagem.
2. Toque em Pausar para interromper. O tempo fica congelado no visor.
3. Toque em Continuar para retomar de onde parou, sem perder o que já foi contado.
4. Toque em Redefinir para voltar a 00:00:00.00.

### Usar voltas

Cada toque em Volta registra um item na lista abaixo do visor. A lista mostra a volta mais recente no topo e, em cada linha, três informações:

- o número da volta, por exemplo "Volta 3";
- o tempo daquela volta isolada, precedido de um sinal de mais, por exemplo +00:01:12.45;
- o tempo total acumulado desde o início, na cor secundária.

Por exemplo, se você marcar a primeira volta em 1 minuto e 12 segundos e a segunda em 2 minutos e 30 segundos, a segunda linha mostrará o parcial de 1 minuto e 18 segundos e o total de 2 minutos e 30 segundos. Isso permite comparar o ritmo de cada trecho, como as voltas de uma corrida ou as etapas de uma tarefa. A lista tem rolagem própria quando fica longa.

### Precisão e comportamento em segundo plano

O cronômetro calcula o tempo a partir de um relógio interno de alta resolução do navegador, e não contando quadros de tela. Por isso, se você trocar de aba ou bloquear a tela por um tempo, o valor exibido ao voltar continua correto: a tela só é redesenhada quando fica visível, mas o tempo decorrido nunca é perdido.

O cronômetro continua contando mesmo se você abrir a página Meu Dia e voltar ao relógio, pois as duas páginas fazem parte da mesma tela.

### O que o cronômetro não faz

O estado do cronômetro e as voltas ficam apenas na memória da página. Se você recarregar a página, fechar a aba ou o aplicativo, a contagem é zerada. Use o cronômetro para medições de curta duração. Para registrar atividades que precisam ficar guardadas, como o horário de início e de término do trabalho, use o Ponto (seção 8).

## 7. O menu

O menu reúne todas as ações do Dumont em três grupos e se abre pelo botão de três linhas, no canto superior direito. Esta seção descreve cada item na ordem em que aparece.

### Abrir e fechar

Clique ou toque no botão do menu para abrir a gaveta. Para fechá-la, use o mesmo botão, pressione Esc, clique fora do menu ou escolha qualquer ação. Pelo teclado, Tab percorre os itens na ordem da tela e Enter ou Espaço ativa o item em foco. Ao fechar com Esc, o foco volta para o botão do menu.

### Grupo Registros

- **Ponto**: abre a janela para registrar um início ou término agora, em tempo real (seção 8).
- **Entrada**: abre a janela de lançamento manual retroativo, para registrar um horário passado (seção 9).
- **Meu Dia**: leva à página de histórico, com os registros organizados por data (seção 10).
- **Backup**: gera e baixa imediatamente um arquivo .json com todos os seus registros (seção 11).

### Grupo Aplicativo

- **Instalar**: aciona o aviso de instalação do navegador para instalar o Dumont como aplicativo (seção 13).
- **Sobre**: abre uma janela com a história do aplicativo e a homenagem a Alberto Santos Dumont (seção 19).
- **GitHub**: abre o repositório do projeto, https://github.com/magpe-stack/Dumont, em nova aba.
- **Ajuda**: abre o manual no repositório, https://github.com/magpe-stack/Dumont/blob/main/README.md, em nova aba.

### Grupo Preferências

Os três primeiros itens deste grupo são interruptores. Cada um mostra se está ligado ou desligado e também informa isso a leitores de tela. Suas escolhas ficam salvas no dispositivo e permanecem na próxima visita.

- **Hora em 24h (desligado: 12h AM/PM)**: troca o formato de hora de todo o aplicativo.
- **Exibir segundos**: mostra ou oculta os segundos no mostrador principal.
- **Modo escuro**: alterna entre o tema claro, que é o padrão, e o tema escuro.
- **Tela cheia**: ativa a tela cheia do navegador. Com ela ativa, o rótulo muda para "Sair da tela cheia".

### Tela cheia

O botão usa o recurso nativo de tela cheia do Chrome para esconder a barra de endereços, as abas e a barra de tarefas, deixando só o aplicativo. Para sair, use o mesmo botão ou pressione Esc. Alguns navegadores de celular não permitem esse recurso; nesse caso o Dumont avisa que a tela cheia está indisponível. Uma alternativa é instalar o aplicativo (seção 13), que já abre sem barras do navegador.

### Atalho: o logotipo

Fora do menu, o logotipo na barra superior também é um comando: leva sempre ao relógio principal, mesmo que você esteja em Meu Dia. Se o menu estiver aberto, ele é fechado no mesmo clique.

## 8. Registrar ponto

O Ponto grava, no instante em que você confirma, um registro de início ou de término de atividade, com data, hora, minuto e segundo exatos. É o recurso principal do cartão de ponto e pode ser aberto pelo menu ou pelo botão Ponto da página Meu Dia.

### A janela de Ponto

Ao abrir, a janela "Registrar ponto" mostra:

- **Data e hora ao vivo**, no alto, no formato DD-MM-AAAA e na hora escolhida nas preferências. O relógio da janela continua correndo enquanto ela está aberta.
- **Tipo do registro**, com duas opções: Início e Término.
- **Observação (opcional)**, um campo de texto de até 50 caracteres, com contador no formato 0/50 abaixo dele.
- Os botões **Cancelar** e **Registrar agora**.

### Como registrar

1. Abra o menu e escolha Ponto.
2. Confira o tipo sugerido e troque, se necessário.
3. Escreva uma observação curta, se quiser, como "reunião com cliente" ou "volta do almoço".
4. Toque em Registrar agora.

A janela fecha e um aviso confirma, por exemplo "Início registrado às 08:02:15.". O horário gravado é o do momento do clique, não o que aparecia quando a janela foi aberta.

### Tipo sugerido automaticamente

Para economizar toques, o Dumont sugere o tipo mais provável. Se o último registro de hoje foi um início, a janela abre com Término marcado. Se ainda não há registros hoje, ou o último foi um término, ela abre com Início marcado. Você pode mudar a sugestão antes de confirmar. A sugestão considera os registros pela ordem de horário, inclusive os lançados manualmente.

### Observações de até 50 caracteres

O limite de 50 caracteres é aplicado pelo próprio campo: ao chegar a 50, o campo não aceita mais texto. O contador acompanha o que você digita. Espaços nas pontas são removidos ao salvar. Use observações curtas, como projeto, local ou motivo da pausa. Ao imprimir o relatório, elas aparecem na coluna Observação.

### Um exemplo de dia de trabalho

| Momento | Ação no Ponto | Resultado em Meu Dia |
| --- | --- | --- |
| Chegada, 08:00 | Início, observação "abertura" | Início às 08:00:xx |
| Saída para o almoço, 12:00 | Término | Término às 12:00:xx |
| Retorno, 13:00 | Início, observação "pós-almoço" | Início às 13:00:xx |
| Fim do expediente, 17:30 | Término | Término às 17:30:xx |

Com esses quatro registros, Meu Dia mostra um total trabalhado de 8 horas e 30 minutos, a soma dos dois períodos (4 horas e 4 horas e 30 minutos).

### Fechar sem registrar

Cancelar, Esc ou um clique na área escurecida fecham a janela sem gravar nada. Nada é registrado até você tocar em Registrar agora.

## 9. Entrada manual retroativa

A Entrada permite lançar um registro de início ou término num dia e horário que já passaram, para corrigir um esquecimento ou completar o histórico. Ela se abre pelo menu ou pelo botão Entrada da página Meu Dia.

### Os campos da janela

A janela "Entrada manual (retroativa)" já abre preenchida com a data e a hora atuais, para você só alterar o que for diferente. Os campos são:

- **Dia**: número de 1 a 31.
- **Mês**: lista com os nomes dos meses, de Janeiro a Dezembro.
- **Ano**: número de 1900 a 2100.
- **Hora**: número de 0 a 23, sempre no formato de 24 horas, independentemente da preferência do relógio.
- **Minuto**: número de 0 a 59.
- **Tipo**: Início ou Término.
- **Observação (opcional)**: texto de até 50 caracteres, com contador.

O horário lançado manualmente é gravado com segundos zerados. Uma entrada às 08:30, por exemplo, fica registrada como 08:30:00.

### Como lançar uma entrada

1. Abra o menu e escolha Entrada.
2. Informe dia, mês e ano da data esquecida.
3. Informe hora e minuto.
4. Escolha o tipo e, se quiser, escreva uma observação.
5. Toque em Lançar entrada.

A janela fecha e um aviso confirma o lançamento, com a data e o horário. O registro entra imediatamente no dia correspondente de Meu Dia, na posição certa pela ordem de horário, mesmo que tenha sido lançado depois de outros registros do mesmo dia.

### Validações e mensagens de erro

Antes de gravar, o Dumont confere os dados e, se algo estiver errado, mostra uma mensagem em vermelho na própria janela e leva o cursor ao campo com problema. Nada é gravado até que tudo esteja correto.

- **Campo vazio ou fora do intervalo**: a mensagem informa o campo e o intervalo aceito, por exemplo "Minuto: informe um número entre 0 e 59."
- **Data inexistente**: datas como 31 de fevereiro ou 31 de abril são recusadas com a mensagem "Essa data não existe no calendário." O Dumont reconhece anos bissextos: 29 de fevereiro só é aceito em anos bissextos.
- **Data e hora no futuro**: como a entrada é retroativa, o Dumont recusa horários posteriores ao momento atual, com a mensagem "Lançamentos retroativos não podem estar no futuro." Há uma tolerância de cerca de um minuto, para evitar recusas por diferenças mínimas de relógio.

### Quando usar a entrada manual

- Você esqueceu de marcar a chegada ou a saída e quer registrar o horário real.
- Você precisa registrar uma jornada que passou da meia-noite. Veja a dica a seguir.
- Você trabalhou fora do aparelho, por exemplo em campo, e vai lançar os horários depois.

### Dica: jornadas que atravessam a meia-noite

O Dumont calcula o total de cada dia separadamente. Se você começar às 22:00 e terminar às 02:00 do dia seguinte, o início ficará no primeiro dia como jornada em aberto e o término ficará sozinho no segundo dia, sem formar um período. Para que os totais saiam corretos, divida a jornada em dois períodos usando a Entrada: um término às 23:59 no primeiro dia e um início às 00:00 no segundo dia.

## 10. Meu Dia

Meu Dia é a página que organiza automaticamente todos os seus registros por data, mostrando, em cada dia, os pontos batidos, o horário exato, a observação e o total trabalhado. Você chega a ela pelo item Meu Dia do menu e volta ao relógio clicando no logotipo.

### Como os dias são formados

Você nunca cria um dia manualmente. Cada data que tem pelo menos um registro vira, sozinha, uma seção própria, com título no formato Meu Dia DD-MM-AAAA, por exemplo Meu Dia 14-02-2026 ou Meu Dia 15-02-2026. Registros feitos pelo Ponto entram no dia de hoje, e os lançados pela Entrada entram no dia informado. Se um dia fica sem registros, por exemplo porque você os excluiu, a seção desaparece.

No alto da página, abaixo do título, aparece um resumo como "3 dias · 11 registros".

### O conteúdo de cada dia

Cada seção é um cartão com o título do dia, o total trabalhado à direita e uma tabela com os registros em ordem de horário. As colunas são:

- **Tipo**: uma etiqueta Início (com o símbolo ▶) ou Término (com o símbolo ■). O símbolo garante que a diferença não dependa só da cor.
- **Horário**: hora, minuto e segundo exatos, no formato escolhido nas preferências.
- **Observação**: o texto de até 50 caracteres, ou um traço quando não houve observação.
- **Ação**: um botão com ícone de lixeira, para excluir o registro.

### Total trabalhado e jornada em aberto

O Dumont soma os períodos do dia automaticamente. Cada Início é pareado com o Término seguinte, e a diferença entre eles entra na soma. O total aparece como "Total trabalhado: 8h 30min". As regras são:

- Dois Inícios seguidos, sem Término entre eles, contam como um só: vale o primeiro.
- Um Término sem Início anterior no mesmo dia é ignorado no cálculo, embora continue listado.
- Se o dia termina com um Início sem Término, aparece o aviso "jornada em aberto (sem término)". O período aberto não entra na soma.
- Um dia com um único Início mostra apenas o aviso de jornada em aberto, sem total.

### Excluir um registro

Toque na lixeira da linha. O Dumont pede confirmação, mostrando o horário e a data do registro. Ao confirmar, o registro é removido definitivamente e um aviso informa a exclusão. Não há lixeira de recuperação: se precisar do registro de volta, restaure um backup anterior (seção 11) ou lance-o de novo pela Entrada.

### Ordem dos dias

O seletor Ordem, na barra de ferramentas, define como os dias são listados:

- **Mais antigos primeiro**: ordem cronológica, do dia mais antigo ao mais recente. É o padrão.
- **Mais recentes primeiro**: o dia de hoje fica no topo, o que é prático quando o histórico é longo.

O Dumont lembra a sua escolha na próxima visita. A ordem dos registros dentro de cada dia é sempre cronológica, do mais cedo ao mais tarde.

### A barra de ferramentas

Além do seletor de ordem, a barra reúne atalhos para as principais ações: Ponto, Entrada, Backup unificado, Importar / Restaurar e Imprimir. Backup, importação e impressão são descritos na seção 11.

### Quando ainda não há registros

No primeiro uso, a página mostra a mensagem "Nenhum registro ainda." com a orientação de usar Ponto para registrar agora ou Entrada para lançar um horário passado.

## 11. Backup, importação e impressão

Como os registros ficam apenas no seu dispositivo, o backup é a única proteção contra perda de dados. Esta seção ensina a gerar o arquivo de backup, a restaurá-lo em outro aparelho e a imprimir o histórico como relatório ou PDF.

### Backup unificado

O backup reúne todos os registros de todas as datas em um único arquivo .json. Há dois botões equivalentes: Backup, no menu, e Backup unificado, na barra de ferramentas de Meu Dia.

1. Toque em Backup.
2. O navegador baixa um arquivo chamado dumont-backup-AAAA-MM-DD.json, com a data de hoje, por exemplo dumont-backup-2026-11-07.json.
3. Um aviso informa quantos registros foram salvos.
4. Guarde o arquivo em um local seguro, como um serviço de nuvem, um pendrive ou o seu e-mail.

O arquivo é salvo na pasta de downloads configurada no seu navegador. Se não houver nenhum registro, o Dumont avisa que não há o que salvar e não gera arquivo. O backup apenas lê os dados: ele não altera nem apaga nada do aplicativo.

### O que há dentro do arquivo

O arquivo é um texto legível, organizado por data. Ele guarda o nome do aplicativo, a versão do formato, o momento em que foi gerado, os totais e, em seguida, os registros agrupados por dia:

```json
{
  "app": "Dumont",
  "versao": 1,
  "geradoEm": "2026-11-07T21:50:00.000Z",
  "totalDias": 1,
  "totalRegistros": 2,
  "dias": {
    "2026-11-07": [
      { "id": "…", "hora": "08:00:12", "tipo": "inicio", "obs": "abertura" },
      { "id": "…", "hora": "12:01:40", "tipo": "termino", "obs": "" }
    ]
  }
}
```

As datas dentro do arquivo seguem o formato AAAA-MM-DD, próprio para ordenação, e o tipo é sempre inicio ou termino. Nas telas do aplicativo, as datas são mostradas como DD-MM-AAAA.

### Importar / Restaurar

O botão Importar / Restaurar, na barra de ferramentas de Meu Dia, carrega um arquivo de backup para o aplicativo. Serve para recuperar o histórico depois de limpar os dados do navegador, para trocar de aparelho ou para juntar históricos de dois aparelhos.

1. Abra Meu Dia e toque em Importar / Restaurar.
2. Escolha o arquivo .json de backup no seu dispositivo.
3. Aguarde o aviso de conclusão, por exemplo "Importação concluída: 11 novo(s), 0 já existente(s), 0 ignorado(s)."

A importação mescla os registros do arquivo com os que já estão no aplicativo. Ela nunca apaga o que existe. Um registro é considerado repetido quando tem a mesma data, o mesmo horário, o mesmo tipo e a mesma observação de outro já guardado, e nesse caso não é duplicado. Por isso você pode importar o mesmo arquivo duas vezes sem criar cópias.

O Dumont aceita arquivos gerados por ele mesmo e também listas simples de registros. Registros com data, hora ou tipo inválidos são ignorados e contados no aviso final. Arquivos que não sejam JSON válido, ou que tenham outro formato, são recusados com uma mensagem. O tamanho máximo aceito é de 10 megabytes.

Para substituir completamente o histórico por um backup, em vez de mesclar, exclua antes os registros atuais ou limpe os dados do site no navegador (seção 14) e só depois importe.

### Imprimir

O botão Imprimir abre o diálogo de impressão do navegador com um relatório próprio do cartão de ponto. Se não houver registros, o Dumont avisa que não há o que imprimir.

Na impressão, o Dumont esconde tudo o que não faz parte do relatório: barra superior, menu, rodapé, botões, janelas e a coluna de exclusão. O relatório começa com o título "Dumont — Cartão de Ponto" e a data e a hora da emissão, e em seguida lista cada dia com sua tabela. As cores são trocadas por preto sobre branco, para economizar tinta e manter a legibilidade, e cada dia é mantido inteiro, sem ser cortado entre duas páginas.

### Gerar um PDF

No diálogo de impressão do Chrome, escolha "Salvar como PDF" no campo de destino e confirme. O resultado é um PDF limpo, sem elementos de menu, pronto para enviar a um gestor ou arquivar. Em computador, vale conferir se a opção "Gráficos de plano de fundo" está desativada para um resultado mais limpo.

Imprima a partir da página Meu Dia. Se o comando de impressão do navegador for usado com o relógio na tela, será impresso o relógio e não o relatório.

## 12. Preferências e acessibilidade

O Dumont lembra suas preferências de exibição e foi construído para ser usado por teclado, por leitores de tela e em condições de pouca luz. Esta seção reúne o que você pode ajustar e os recursos de acessibilidade disponíveis.

### Preferências que o aplicativo memoriza

Quatro escolhas ficam salvas no dispositivo e voltam do jeito que você deixou:

- formato de hora, 24 horas ou 12 horas com AM/PM;
- exibição ou ocultação dos segundos no relógio principal;
- tema claro ou escuro;
- ordem dos dias em Meu Dia, do mais antigo ou do mais recente.

Cada pessoa que usa o mesmo navegador no mesmo aparelho compartilha essas escolhas. Já em outro navegador ou dispositivo, as preferências começam do padrão.

### Tema claro e tema escuro

O tema claro é o padrão em qualquer aparelho, independentemente da configuração do sistema. Ele usa fundo off-white mineral, cartões brancos, texto grafite e destaques em azul aviador e laranja aeronáutico. O tema escuro, ativado pelo interruptor Modo escuro do menu, usa fundo azul quase preto, cartões azul-ardósia e texto claro, com versões mais luminosas dos destaques. O tema escolhido é aplicado logo na abertura, antes da primeira tela, para evitar um clarão branco ao abrir no modo escuro.

### Navegação pelo teclado

Todo o aplicativo pode ser usado sem mouse:

- **Tab** e **Shift + Tab** percorrem os controles na ordem da tela.
- **Enter** e **Espaço** ativam botões e interruptores.
- **Esc** fecha o menu e as janelas de diálogo.
- Nas janelas de Ponto, Entrada e Sobre, o foco fica preso dentro da janela enquanto ela está aberta e retorna ao botão de origem quando ela fecha.
- Logo no início da página existe o link "Pular para o conteúdo", que aparece quando recebe foco e leva direto ao conteúdo principal.

### Foco visível

O controle que está recebendo o foco do teclado é sempre destacado por um contorno grosso em azul, com contraste adequado nos dois temas. Se você perder a posição durante a navegação, procure esse contorno.

### Leitores de tela

Os controles têm nomes claros: o botão do menu informa se está aberto ou fechado, os interruptores informam se estão ligados, e cada lixeira em Meu Dia descreve o registro que vai excluir (por exemplo, "Excluir início das 08:02:15 em 07-11-2026"). Os avisos de confirmação e de erro são anunciados automaticamente. O relógio e o cronômetro não são anunciados a cada segundo, para não interromper a leitura; para ouvir a hora, vá até o relógio com o leitor de tela.

### Contraste e cores

Os textos e botões usam tons escolhidos para atingir contraste mínimo de 4,5 para 1, nível AA das diretrizes de acessibilidade WCAG, nos dois temas. Os tons exatos de azul e laranja da identidade visual aparecem em elementos grandes, como os números do relógio, e versões um pouco mais escuras são usadas em botões e links de texto pequeno. A diferença entre Início e Término em Meu Dia nunca depende só da cor: cada etiqueta traz também um símbolo e uma palavra.

### Movimento reduzido

Se o seu sistema estiver configurado para reduzir animações, a abertura e as transições usam movimentos mais simples, mantendo a duração da abertura em 3 segundos. Em computadores Windows, isso se configura em Acessibilidade, Efeitos visuais, "Efeitos de animação". No Android, em Acessibilidade, "Remover animações".

### Tamanho dos controles

Botões e itens do menu têm altura mínima de cerca de 44 a 48 pixels, um tamanho confortável para toque no celular. O texto acompanha o tamanho de fonte do navegador, e a interface se adapta a telas estreitas, reorganizando as ferramentas de Meu Dia em duas colunas.

## 13. Uso offline e instalação PWA

Depois da primeira visita, o Dumont funciona sem internet, e pode ser instalado como um aplicativo comum no computador ou no celular. Isso é possível porque ele é um PWA (aplicativo web progressivo), que guarda os próprios arquivos no navegador por meio de um service worker.

### Como o uso offline funciona

Na primeira vez que você abre o aplicativo com internet, o navegador baixa e guarda no cache os arquivos necessários: a página, os estilos, o código, o manifesto e os ícones. Nas visitas seguintes, o aplicativo abre direto desse cache, mesmo em modo avião, e os registros continuam sendo gravados normalmente, pois dependem apenas do armazenamento local.

Se você abrir o aplicativo com internet, ele ainda confere em segundo plano se existem versões mais novas dos arquivos e as guarda para a próxima abertura. Isso significa que uma atualização publicada aparece na segunda vez que você abre o aplicativo, e não na primeira. Para ver a novidade, feche todas as abas ou janelas do Dumont e abra de novo.

### Instalar pelo botão do menu

1. Abra o Dumont no Chrome, em um endereço HTTPS.
2. Abra o menu e toque em Instalar.
3. Confirme na janela de instalação que o próprio Chrome exibe.
4. O Dumont passa a ter um ícone na área de trabalho, no menu Iniciar ou na tela inicial do celular, e abre em janela própria, sem barra de endereços.

Ao concluir, o Dumont mostra o aviso "Dumont instalado com sucesso!".

### Quando o botão Instalar avisa que não está disponível

O Chrome só oferece a instalação quando considera o aplicativo instalável e quando ele ainda não foi instalado. Se o aviso nativo não estiver disponível, o Dumont mostra uma mensagem orientando a usar o menu de três pontos do Chrome e a opção "Instalar Dumont". As causas mais comuns são:

- o aplicativo já está instalado (nesse caso, o Dumont avisa que já está em execução como aplicativo);
- o endereço não usa HTTPS;
- os ícones icon-192.png e icon-512.png não foram publicados no repositório;
- o Chrome ainda não terminou de preparar o aplicativo, o que costuma se resolver recarregando a página após alguns segundos;
- você recusou a instalação recentemente e o navegador decidiu não oferecê-la de novo por algum tempo.

### Instalado ou no navegador: qual a diferença?

Os dois são o mesmo aplicativo, com os mesmos dados. A versão instalada abre em janela própria e aparece junto aos demais programas. Para desinstalar, use o menu de três pontos da janela do aplicativo no Chrome ou a opção de aplicativos do seu sistema. Desinstalar o aplicativo não é o mesmo que limpar os dados do site, mas em alguns casos o Chrome oferece as duas opções juntas: leia a pergunta antes de confirmar.

### Atualizações

Quando o projeto recebe uma nova versão, o navegador baixa os arquivos novos em segundo plano e passa a usá-los na abertura seguinte. Seus registros e preferências não são afetados por atualizações, pois ficam em um armazenamento separado dos arquivos do aplicativo.

### O que exige internet

Apenas quatro coisas dependem de conexão: a primeira visita, as atualizações do aplicativo, os links do rodapé e do menu (App, GitHub, Ajuda) e o carregamento do manual no repositório.

## 14. Privacidade e armazenamento

Seus registros nunca saem do seu dispositivo: o Dumont não tem servidor, conta de usuário, anúncios nem sistema de análise de uso. Tudo o que você registra fica guardado no armazenamento local do navegador, no seu próprio aparelho.

### O que é guardado e onde

O aplicativo grava duas informações no armazenamento local (localStorage) do navegador, associadas ao endereço do site:

- **dumont.registros**: a lista de todos os registros de ponto, cada um com identificador, data, hora, tipo e observação.
- **dumont.config**: suas preferências de exibição (formato de hora, segundos, tema e ordem dos dias).

Os arquivos do aplicativo ficam em um espaço separado, o cache do service worker, que só contém o código e os ícones, nunca os seus dados.

### Quem pode ver seus dados

Quem usar o mesmo navegador, no mesmo perfil e no mesmo aparelho, vê os mesmos registros. O Dumont não pede senha. Se o aparelho é compartilhado, crie perfis separados no navegador ou no sistema, ou mantenha o aparelho bloqueado. Os dados não são enviados a nenhum servidor, nem mesmo aos mantenedores do projeto.

Os links do menu e do rodapé abrem sites externos, como o GitHub. Ao abri-los, valem as regras de privacidade desses sites, e não as do Dumont.

### Quando os dados podem ser perdidos

Por ficarem no navegador, os registros somem nas situações abaixo. Em todas elas, um backup recente resolve.

- Você limpa os dados de navegação do site, ou escolhe a opção que apaga "cookies e dados de sites".
- Você usa uma janela anônima ou privativa, que descarta os dados ao ser fechada.
- O navegador apaga dados de sites que você não visita há muito tempo, quando o aparelho está com pouco espaço.
- Você troca de navegador, de perfil ou de aparelho: cada um tem seu próprio armazenamento.
- Você desinstala o navegador ou restaura o aparelho.

### Dados separados por endereço

O armazenamento local é separado por endereço de site. Se você usar o Dumont em dois endereços diferentes, por exemplo a versão publicada no GitHub Pages e uma cópia em localhost durante testes, cada um terá o seu próprio histórico. Para levar os dados de um para o outro, use backup e importação.

### Várias abas abertas

Se o Dumont estiver aberto em mais de uma aba do mesmo navegador, as alterações nos registros feitas em uma aba aparecem automaticamente na página Meu Dia das outras. Mesmo assim, evite registrar o mesmo ponto em duas abas ao mesmo tempo.

### Boas práticas de proteção

- Faça um backup ao fim de cada semana ou de cada mês, conforme a sua rotina.
- Guarde o arquivo em outro lugar que não só o aparelho, como a nuvem ou o e-mail.
- Antes de limpar dados do navegador, de trocar de aparelho ou de reinstalar o sistema, faça um backup.
- Teste a restauração de tempos em tempos, importando o arquivo em outro navegador, para ter certeza de que ele está íntegro.

### Observações sobre uso profissional

O cartão de ponto do Dumont é um registro pessoal de apoio. Os horários dependem do relógio do aparelho e podem ser editados por quem tem acesso a ele. O aplicativo não é um sistema de registro eletrônico de ponto homologado e não substitui o controle oficial exigido por um empregador ou pela legislação trabalhista. Use-o como registro pessoal e complementar.

## 15. Guia do desenvolvedor

O Dumont é composto por apenas cinco arquivos mais dois ícones, sem frameworks, sem etapa de compilação e sem dependências externas, e por isso pode ser publicado no GitHub Pages simplesmente enviando os arquivos ao repositório. Esta seção é para quem publica, atualiza ou personaliza o projeto.

### Estrutura do repositório

| Arquivo | Função |
| --- | --- |
| index.html | Estrutura da página: abertura, cabeçalho, menu, páginas Relógio e Meu Dia, rodapé e janelas de diálogo |
| styles.css | Estilos, variáveis de cores dos dois temas, animações da abertura, layout responsivo e regras de impressão |
| app.js | Toda a lógica: relógio, cronômetro, registros, Meu Dia, backup, importação, impressão, instalação e registro do service worker |
| manifest.json | Identidade do PWA: nome Dumont, modo standalone, cores e ícones |
| sw.js | Service worker que mantém os arquivos em cache para uso offline |
| icon-192.png | Ícone de 192 por 192 pixels, usado no manifesto, no favicon, no topo e na abertura |
| icon-512.png | Ícone de 512 por 512 pixels, usado pelo manifesto |

Os dois ícones são a arte oficial do logotipo e devem estar na raiz do repositório, ao lado dos demais arquivos. O código apenas os referencia e não gera nenhuma imagem.

### Testar no computador

O service worker e a instalação exigem HTTPS ou localhost, então não abra o index.html com duplo clique. Em vez disso, rode um servidor local na pasta do projeto. Com Python instalado:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000 no Chrome. Para inspecionar o service worker, o cache e os dados guardados, abra as Ferramentas do Desenvolvedor (F12) e vá até a aba Application.

### Publicar no GitHub Pages

1. Envie os sete arquivos para a raiz da branch main do repositório magpe-stack/Dumont.
2. No GitHub, abra Settings e depois Pages.
3. Em Source, escolha "Deploy from a branch".
4. Selecione a branch main e a pasta / (root), e salve.
5. Aguarde alguns minutos. O endereço publicado será https://magpe-stack.github.io/Dumont/.
6. Abra o endereço no Chrome e confirme que a abertura aparece, que o logotipo carrega e que o botão Instalar funciona.

Os caminhos usados no projeto são relativos, o que permite que ele funcione dentro do subcaminho /Dumont/ do GitHub Pages sem ajustes.

### Publicar uma atualização

O service worker guarda os arquivos em um cache identificado por um nome de versão. Para que os usuários recebam suas alterações, siga esta regra: toda vez que alterar qualquer arquivo do aplicativo, aumente o número da versão no começo do arquivo sw.js.

```js
const VERSAO = 'dumont-v1';   // mude para 'dumont-v2', 'dumont-v3'...
```

Ao detectar um sw.js diferente, o navegador instala o novo service worker, remove os caches antigos que começam com "dumont-" e passa a servir os arquivos novos. Se você esquecer de mudar a versão, alguns usuários podem continuar vendo arquivos antigos por mais tempo. Se também incluir novos arquivos no aplicativo, acrescente-os à lista ARQUIVOS no mesmo arquivo.

### Como os dados são organizados

Cada registro de ponto é um objeto com cinco campos, guardado em uma lista no armazenamento local:

```json
{
  "id": "identificador-único",
  "data": "2026-11-07",
  "hora": "08:02:15",
  "tipo": "inicio",
  "obs": "abertura"
}
```

O campo tipo aceita apenas inicio ou termino, e obs tem no máximo 50 caracteres. Ao ler os dados salvos ou um arquivo importado, o aplicativo valida cada registro e descarta os inválidos. A chave dos registros é dumont.registros e a das preferências é dumont.config.

### Personalizar

- **Cores**: todas as cores ficam como variáveis no início de styles.css, em um bloco para o tema claro e outro para o tema escuro. Alterar uma variável muda o aplicativo inteiro.
- **Textos**: os textos da interface estão em português no index.html e no app.js.
- **Limite de observação**: o valor 50 está no atributo maxlength dos dois campos de observação, no index.html, e na constante MAX\_OBS, no começo do app.js. Mude os três para manter a coerência.
- **Tempo da abertura**: a duração de 3 segundos é definida pela animação splashVida em styles.css. Se mudar, ajuste também os tempos internos da animação e o tempo de segurança de 3200 milissegundos no app.js.

### Usar este manual como README

O link Ajuda do menu aponta para o arquivo README.md do repositório. Para usar este manual nesse papel, exporte-o em formato Markdown e salve o resultado como README.md na raiz do projeto.

## 16. Solução de problemas

A maior parte dos problemas tem causa simples e solução rápida. Procure abaixo o sintoma que você observa.

### O logotipo aparece quebrado

Os arquivos icon-192.png e icon-512.png não estão na raiz do repositório, ou estão com outro nome. Envie-os com exatamente esses nomes, ao lado do index.html, e atualize o aplicativo (veja "Não vejo as novidades", adiante).

### A página fica em branco ou não responde depois da abertura

Se o aplicativo abrir mas nenhum botão responder, o arquivo app.js provavelmente não carregou. Abra as Ferramentas do Desenvolvedor (F12), vá em Console e procure mensagens de erro. Verifique se os sete arquivos foram publicados e se o nome app.js está escrito corretamente. Recarregue com Ctrl + Shift + R para ignorar o cache.

### Não vejo as novidades depois de uma atualização

O navegador pode estar servindo a versão em cache. Faça, nesta ordem:

1. Feche todas as abas e janelas do Dumont e abra de novo.
2. Confirme que o nome da versão em sw.js foi aumentado.
3. Nas Ferramentas do Desenvolvedor, abra Application, depois Service Workers, e use "Unregister"; em seguida recarregue.
4. Como último recurso, em Application, depois Storage, use "Clear site data". Atenção: isso apaga os registros. Faça um backup antes.

### O botão Instalar diz que a instalação não está disponível

Veja a lista de causas na seção 13. Em resumo: confira o HTTPS, a presença dos dois ícones, se o aplicativo já está instalado e tente de novo depois de recarregar a página. Como alternativa, use o menu de três pontos do Chrome e a opção "Instalar Dumont".

### O aplicativo não abre sem internet

O uso offline só funciona depois de uma primeira visita completa com internet, em endereço HTTPS ou localhost. Abra o aplicativo uma vez online, espere alguns segundos e teste de novo. Em um arquivo aberto direto do disco (file://), o uso offline não é ativado.

### Meus registros sumiram

Verifique primeiro se você está no mesmo navegador, perfil e endereço em que fez os registros: cada combinação tem um histórico próprio. Verifique também se não está em uma janela anônima. Se os dados realmente foram apagados, restaure o último backup pelo botão Importar / Restaurar. Veja as situações de perda na seção 14.

### A hora está errada

O Dumont usa o relógio e o fuso horário do sistema. Corrija a data, a hora e o fuso do Windows ou do Android e ative a sincronização automática. O relógio do aplicativo se corrige sozinho no segundo seguinte; os registros já gravados, porém, mantêm a hora que foi usada na ocasião. Se necessário, exclua e relance os registros errados pela Entrada.

### A Entrada recusa o meu lançamento

Leia a mensagem em vermelho: ela indica o campo e o motivo. Os casos mais comuns são data inexistente (como 31 de abril), minuto acima de 59 e horário no futuro, que não é aceito por ser uma entrada retroativa.

### O total de um dia parece errado

Confira em Meu Dia se os registros se alternam em pares de Início e Término. Dois inícios seguidos contam como um, um término sem início é ignorado e um início sem término deixa a jornada em aberto. Para jornadas que passam da meia-noite, divida em dois dias, como descrito na seção 9.

### O backup não baixa

O Chrome pode ter bloqueado o download. Verifique se há um aviso na barra de endereços pedindo permissão para baixar vários arquivos e permita. Confira também a pasta de downloads configurada e o espaço livre no aparelho. Lembre-se de que sem registros nenhum arquivo é gerado.

### A importação diz que o arquivo é inválido

O arquivo precisa ser um JSON válido, como o gerado pelo botão de backup. Arquivos abertos e salvos novamente em editores que mudam a codificação, ou que ficaram cortados no meio, são recusados. Gere um novo backup na origem e tente de novo.

### A tela cheia não funciona

Alguns navegadores de celular não oferecem a tela cheia para páginas. Nesse caso, instale o aplicativo, que já abre sem barras do navegador, ou use o modo de tela cheia do próprio navegador.

### A impressão sai com o relógio em vez do relatório

Imprima sempre a partir da página Meu Dia, usando o botão Imprimir. Se a impressão for pedida com o relógio na tela, é essa tela que será impressa.

### O cronômetro zerou sozinho

O cronômetro vive apenas na memória da página. Recarregar a página, fechar o aplicativo ou o navegador o zera. Para tempos que não podem se perder, use o Ponto.

### Não encontrei a solução

Você pode relatar o problema no repositório, em https://github.com/magpe-stack/Dumont. Informe o navegador e a versão, o sistema operacional, o que você fez e o que apareceu na tela, e, se possível, as mensagens do Console.

## 17. Perguntas frequentes

### O Dumont é gratuito e precisa de cadastro?

Não há cadastro, login nem cobrança dentro do aplicativo. Basta abrir o endereço e usar. O código está publicado no repositório do projeto, no GitHub.

### Meus dados estão seguros?

Eles ficam somente no seu dispositivo, no armazenamento local do navegador, e não são enviados a nenhum servidor. Isso protege a privacidade, mas também significa que a segurança contra perda depende de você fazer backups regulares. Veja a seção 14.

### Posso usar o Dumont em mais de um aparelho?

Pode, mas cada aparelho e cada navegador guarda o próprio histórico, e não há sincronização automática. Para juntar os dados, gere um backup em um aparelho e importe no outro. A importação mescla os registros e evita duplicatas.

### Posso editar um registro já feito?

Não há um botão de edição. Para corrigir um registro, exclua-o em Meu Dia, pela lixeira, e lance o correto pela Entrada. Antes de excluir, anote o horário e a observação originais.

### Posso registrar vários inícios e términos no mesmo dia?

Sim. Não há limite de períodos por dia. Meu Dia lista todos os registros em ordem de horário e soma cada par de início e término.

### Por que a Entrada não aceita datas futuras?

Porque ela foi feita para lançamentos retroativos, isto é, de horários que já passaram. Para o horário atual, use o Ponto.

### O que acontece se eu esquecer de marcar o término?

O dia aparece com o aviso "jornada em aberto (sem término)" e o período aberto não entra no total. Para corrigir, lance o término esquecido pela Entrada, informando o horário real.

### O cronômetro e o Ponto são a mesma coisa?

Não. O cronômetro mede intervalos curtos e não guarda nada: ao recarregar a página ele zera. O Ponto grava registros permanentes de início e término, que aparecem em Meu Dia e entram nos backups.

### Posso mudar o limite de 50 caracteres da observação?

Para usuários do aplicativo, não. O limite faz parte do funcionamento do Dumont. Quem publica o projeto pode alterá-lo no código, como explicado na seção 15.

### Por que as datas aparecem como DD-MM-AAAA?

É o formato definido para os títulos do histórico, por exemplo Meu Dia 14-02-2026. Dentro dos arquivos de backup, as datas usam AAAA-MM-DD para facilitar a ordenação.

### O backup guarda minhas preferências?

Não. O backup contém apenas os registros de ponto. Tema, formato de hora e ordem dos dias precisam ser escolhidos de novo em um aparelho novo, o que leva poucos segundos pelo menu.

### Posso importar o mesmo backup várias vezes?

Pode. Registros que já existem são reconhecidos e não duplicados, e o aviso final informa quantos eram novos e quantos já existiam.

### Como apagar todo o histórico?

O aplicativo não tem um botão de apagar tudo, para evitar perdas acidentais. Você pode excluir os registros um a um em Meu Dia ou limpar os dados do site nas configurações do navegador. Faça um backup antes, caso queira guardar uma cópia.

### Funciona no iPhone ou no Mac?

O projeto foi desenvolvido e testado para o Chrome, no Windows e no Android. Em outros navegadores e sistemas, as funções principais costumam funcionar, mas a instalação, a tela cheia e o uso offline podem se comportar de outra forma.

### Como desinstalar?

Se instalou o aplicativo, remova-o pelo menu de três pontos da janela do aplicativo ou pelas configurações de aplicativos do sistema. Se quiser apagar também os registros, limpe os dados do site no navegador, depois de fazer um backup.

### Posso imprimir ou enviar o relatório?

Pode. Use Imprimir em Meu Dia e, no diálogo do navegador, escolha uma impressora ou "Salvar como PDF". O PDF gerado pode ser enviado por e-mail ou aplicativo de mensagens.

## 18. Referência rápida e glossário

Esta seção resume onde fica cada função, quais limites o aplicativo impõe e o significado dos termos usados neste manual.

### Onde fica cada função

| Quero... | Onde | Seção |
| --- | --- | --- |
| Ver a hora e a data | Página inicial, cartão do relógio | 5 |
| Trocar entre 24h e 12h AM/PM | Menu, Preferências, Hora em 24h | 5 |
| Ocultar os segundos | Menu, Preferências, Exibir segundos | 5 |
| Medir um tempo | Página inicial, cartão do cronômetro | 6 |
| Marcar uma volta | Botão Volta, com o cronômetro em contagem | 6 |
| Registrar início ou término agora | Menu, Registros, Ponto | 8 |
| Lançar um horário esquecido | Menu, Registros, Entrada | 9 |
| Ver o histórico por dia | Menu, Registros, Meu Dia | 10 |
| Excluir um registro | Lixeira na linha, em Meu Dia | 10 |
| Ordenar os dias | Seletor Ordem, em Meu Dia | 10 |
| Baixar o backup | Menu, Backup, ou Backup unificado em Meu Dia | 11 |
| Restaurar um backup | Importar / Restaurar, em Meu Dia | 11 |
| Imprimir ou gerar PDF | Imprimir, em Meu Dia | 11 |
| Trocar o tema | Menu, Preferências, Modo escuro | 12 |
| Usar a tela cheia | Menu, Preferências, Tela cheia | 7 |
| Instalar como aplicativo | Menu, Aplicativo, Instalar | 13 |
| Ler a história do aplicativo | Menu, Aplicativo, Sobre | 19 |
| Abrir o repositório ou este manual | Menu, Aplicativo, GitHub ou Ajuda; links do rodapé | 4 |
| Voltar ao relógio | Clique no logotipo ou no nome Dumont | 3 |

### Limites e valores fixos

| Item | Valor |
| --- | --- |
| Duração da abertura | 3 segundos |
| Tamanho da observação | até 50 caracteres |
| Anos aceitos na Entrada | 1900 a 2100 |
| Horas e minutos na Entrada | 0 a 23 e 0 a 59, em 24 horas |
| Segundos de uma entrada manual | sempre 00 |
| Tamanho máximo do arquivo de importação | 10 megabytes |
| Formato das datas nas telas | DD-MM-AAAA |
| Formato das datas nos backups | AAAA-MM-DD |
| Nome do arquivo de backup | dumont-backup-AAAA-MM-DD.json |
| Chaves de armazenamento | dumont.registros e dumont.config |

### Teclas úteis

| Tecla | Ação |
| --- | --- |
| Tab / Shift + Tab | Avançar / voltar entre os controles |
| Enter ou Espaço | Ativar o botão ou interruptor em foco |
| Esc | Fechar o menu ou a janela aberta; sair da tela cheia |
| F12 | Abrir as Ferramentas do Desenvolvedor no Chrome |
| Ctrl + P | Abrir a impressão do navegador |

### Glossário

- **Aplicativo web progressivo (PWA)**: site que pode ser instalado como aplicativo e funcionar sem internet.
- **Armazenamento local (localStorage)**: espaço do navegador onde o Dumont guarda registros e preferências, separado por endereço de site.
- **Backup**: cópia dos registros em um arquivo, usada para restaurar os dados em caso de perda.
- **Cache**: cópia local dos arquivos do aplicativo, que permite abri-lo sem internet.
- **Cartão de ponto**: conjunto de registros de início e término de atividade, por dia.
- **Centésimos**: duas casas decimais de segundo, mostradas no cronômetro.
- **Entrada**: lançamento manual de um registro com data e hora passadas.
- **Jornada em aberto**: dia que termina com um início sem o término correspondente.
- **JSON**: formato de texto estruturado usado nos arquivos de backup.
- **Meu Dia**: página que agrupa os registros por data e calcula o total trabalhado.
- **Modal ou janela de diálogo**: janela que se abre sobre a tela e exige ser fechada antes de continuar.
- **Ponto**: registro de início ou término feito no instante atual.
- **Service worker**: programa do navegador que guarda os arquivos em cache e permite o uso offline.
- **Splash screen**: tela de abertura animada, exibida por 3 segundos ao carregar.
- **Toast**: aviso temporário que aparece e some sozinho.
- **Volta (lap)**: marcação parcial feita durante a contagem do cronômetro.

## 19. Sobre o nome Dumont

O aplicativo se chama Dumont em homenagem a Alberto Santos Dumont (1873–1932), brasileiro pioneiro da aviação e inventor, que ajudou a popularizar o relógio de pulso por uma razão ligada à precisão em voo. O texto desta seção é o mesmo conteúdo da janela Sobre do aplicativo, com um pouco mais de contexto.

### O inventor

Santos Dumont nasceu em Minas Gerais e fez da aviação o centro de sua vida. Em 1906, em Paris, realizou o voo do 14-bis, reconhecido no Brasil como o primeiro voo de um aparelho mais pesado que o ar a decolar por meios próprios. Seus aviões e balões dirigíveis, e a maneira aberta com que compartilhava seus projetos, o tornaram uma das figuras mais admiradas da aviação do início do século XX.

### O relógio de pulso

Por volta de 1904, ao perceber que consultar um relógio de bolso era impraticável quando as mãos estavam ocupadas nos comandos de uma aeronave, Santos Dumont pediu ao joalheiro francês Louis Cartier um relógio que pudesse ser lido no próprio punho, durante o voo. A ideia levou à criação do célebre modelo Santos, que ajudou a difundir o hábito de usar relógios de pulso.

### Por que o nome combina com o aplicativo

O piloto precisa saber a hora com exatidão e sem tirar as mãos do que está fazendo. O Dumont procura oferecer o mesmo: a hora sempre à vista, grande e legível, e registros feitos com poucos toques. A abertura animada, com anéis graduados e uma agulha de instrumento, e o lema "Precisão no ar, precisão no tempo" fazem referência a essa origem.

### Créditos e links

- Aplicativo: https://magpe-stack.github.io/Dumont/
- Código e documentação: https://github.com/magpe-stack/Dumont
- Manual (README): https://github.com/magpe-stack/Dumont/blob/main/README.md

O Dumont é um projeto aberto e simples por escolha: poucos arquivos, nenhuma dependência e funcionamento garantido sem internet. Sugestões e relatos de problemas são bem-vindos no repositório.
