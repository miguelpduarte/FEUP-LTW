GET - Get Entertaining Topics

Angelo Teixeira - up201606516
Guilherme Silva - up201603647
Miguel Duarte   - up201606298

------------------------------------------------------

Para correr a aplicação web, é necessário descomprimir o ficheiro src.zip na pasta de destino do gnomo (em public_html/ por exemplo)

De seguida, de forma a que os endereços de alguns componentes funcionem corretamente, é necessário especificar o nome da conta onde está a ser usado o gnomo.
Para tal, providenciamos um shell script "configure.sh" que deve ser corrido da seguinte forma:

./configure.sh "/~upxxxxxxxxx" em que /~upxxxxxxxxx representa o caminho base para onde o código estará a correr.

Por exemplo, se o utilizador up201606298 quiser colocar o site na sua página pessoal da FEUP, deverá descomprimir o ficheiro src.zip na pasta da sua área pessoal "public_html/",
de seguida correndo o comando: './configure.sh "/~up201606298"' (sem os apóstrofes envolventes).

Em caso de erro, o script cria backups dos ficheiros (ficheiros .bak) que altera, pelo que, se necessário, os ficheiros .htaccess, /templates/common.php e js/components/Navbar.js
poderão ser alterados manualmente, substituindo a string BASE_DIR_PLACEHOLDER por /~upxxxxxxxxx (não esquecer a / inicial).

Para correr a aplicação localmente, o BASE_DIR_PLACEHOLDER deverá ser uma string vazia.

------------------------------------------------------

Os ficheiros de modelo e população da base de dados encontram-se em database/schema.sql e database/populate.sql, respetivamente.

A aplicação tem alguns utilizadores previamente criados, com credenciais representadas no topo do ficheiro populate.sql, em comentários antes de cada uma das contas.
Por exemplo, existem as seguintes contas com as respetivas passwords:
Username / Password:
- testuser / password123
- testuser2 / password123
- uncle_bob / password123
- arestivo / ' OR '1'='1';--

------------------------------------------------------

A aplicação utiliza as seguintes bibliotecas adicionais:
- Remarkable.js - Renderização de texto em Markdown (Utilizando no conteudo das Stories e Comments, bem como a Bio de Users)
- Moment.js - Cálculos com timestamps (Utilizado para mostrar datas de uma maneira relativa - há 5 minutos, há alguns segundos, etc...)
- Highlight.js - Highlighting de texto em forma de codigo (Utilizado para "colorir" blocos de codigo no markdown de acordo com a linguagem especificada)  
- FontAwesome - Font para adicionar ícones ao projeto, para melhorar o seu aspeto visual