// elementos
var btnIniciar;
var bola;
var cpu;
var player;
var lblPontosPlayer;
var lblPontosCpu;

// controle de animação
var game, frames;

// posicoes
var posBolaX, posBolaY;
var posPlayerX, posPlayerY, posCpuX, posCpuY;

// direção de acordo com a tecla
var dirJy;

// posicoes iniciais
var posPlayerInicialY = 180;
var posPlayerInicialX = 0;
var posCpuInicialY = 180;
var posCpuInicialX = 930;
var posBolaInicialX = 475;
var posBolaInicialY = 240;

// tamanhos
var campoX = 0, campoY = 0, campoWidth = 960, campoHeight = 500;
var barraWidth = 20, barraHeight = 140, bolaWidth = 20, bolaHeight = 20;

// direção 
var bolaX, bolaY;
var playerY=0, cpuY = 0;

// velocidade
var velocidadeBola, velocidadeCpu, velocidadePlayer;

// controle
var pontosPlayer = 0;
var pontosCpu = 0;
var tecla;
var jogando = false;

function inicializar(){
    velocidadeBola = velocidadeCpu = velocidadePlayer = 8;
    btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click", iniciarGame);

    player = document.getElementById("dvJogador");
    cpu = document.getElementById("dvCPU");
    bola = document.getElementById("dvBola");
    lblPontosPlayer = document.getElementById("lblPontosPlayer");
    lblPontosCpu = document.getElementById("lblPontosCpu");

    lblPontosPlayer.innerHTML = pontosPlayer;
    lblPontosCpu.innerHTML = pontosCpu;

    document.addEventListener("keydown", event => teclaDown(event));
    document.addEventListener("keyup", event => teclaUp(event));
}

function iniciarGame(){
    if(!jogando){
        velocidadeBola = velocidadeCpu = velocidadePlayer = 8;
        cancelAnimationFrame(frames);
        jogando = true;
        dirJy = 0;
        bolaY = 0;
        if(Math.random() * 10 < 5){
            bolaX = -1;
        }else{
            bolaX = 1;
        }
        posBolaX = posBolaInicialX;
        posBolaY = posBolaInicialY;
        posPlayerX = posPlayerInicialX;
        posPlayerY = posPlayerInicialY;
        posCpuY = posCpuInicialY;
        posCpuX = posCpuInicialX;
        game();
    }
}

function game(){
    if(jogando){
        controlaJogador();
        controlaBola();
        controlaCpu();
    }
    frames = requestAnimationFrame(game);
}

function teclaDown(event){
    tecla = event.key;
    if(tecla == 'ArrowUp'){
        dirJy = -1;
    }else if(tecla == 'ArrowDown'){
        dirJy = 1;
    }else{
        console.log("erro");
    }
}

function teclaUp(event){
    tecla = event.key;
    if(tecla == 'ArrowUp'){
        dirJy = 0;
    }else if(tecla == 'ArrowDown'){
        dirJy = 0;
    }else{
        console.log("erro tecla up");
    }
}

function controlaCpu(){
    if(jogando){ // verifica se o jogo esta rolando
        if(posBolaX > campoWidth / 2 && bolaX > 0){ // verifica se a bola esta indo em direção a cpu
            // movimentar a cpu
            if(posBolaY + bolaHeight / 2 > (posCpuY + barraHeight / 2) + velocidadeCpu){
                // mover para baixo
                if(posCpuY + barraHeight <= campoHeight){ // verifica se pode descer
                    posCpuY += velocidadeCpu;
                }
            }else if(posBolaY + bolaHeight / 2 < (posCpuY + barraHeight / 2) - velocidadeCpu){
                // mover para cima 
                if(posCpuY >= 0){ // verifica se pode subir
                    posCpuY -= velocidadeCpu;
                }
            }

        }else{
            // posicionar a cpu no centro
            if(posCpuY + barraHeight / 2 < campoHeight / 2){ // verifica se esta acima do centro
                posCpuY += velocidadeCpu; // move para o centro
            }else if(posCpuY + barraHeight / 2 > campoHeight / 2){ // verifica se esta abaixo do centro
                posCpuY -= velocidadeCpu; // move para o centro
            }
        }

        cpu.style.top = posCpuY + "px";
    }
}

function controlaJogador(){
    if(jogando){
        posPlayerY += velocidadePlayer * dirJy;
        if(posPlayerY + barraHeight >= campoHeight || posPlayerY <= 0){
            posPlayerY += (velocidadePlayer * dirJy) * (-1);
        }
        player.style.top = posPlayerY + "px";
    }
}

function controlaBola(){
    // movimentação da bola
    posBolaX += velocidadeBola * bolaX;
    posBolaY += velocidadeBola * bolaY;

    // colisão com jogador
    if(posBolaX <= posPlayerX + barraWidth && 
        posBolaY + bolaHeight >= posPlayerY 
        && posBolaY <= posPlayerY + barraHeight){
            bolaY = (((posBolaY + bolaHeight / 2) - (posPlayerY + bolaHeight / 2)) / 16);
            bolaX *= -1;
    }

    // colisão com cpu
    if(posBolaX >= posCpuX - barraWidth && 
        posBolaY + bolaHeight >= posCpuY 
        && posBolaY <= posCpuY + barraHeight){
            bolaY = (((posBolaY + bolaHeight / 2) - (posCpuY + bolaHeight / 2)) / 16);
            bolaX *= -1;
    }

    // limites superior e inferior
    if(posBolaY >= 480 || posBolaY <= 0){
        bolaY *= -1;
    }

    // saiu da tela pela direita ou pela esquerda
    if(posBolaX >= campoWidth - bolaWidth){
        velocidadeBola = 0;
        posBolaX = posBolaInicialX;
        posBolaY = posCpuInicialY;
        posPlayerY = posPlayerInicialY;
        posCpuY = posCpuInicialY;
        pontosPlayer++;
        lblPontosPlayer.innerHTML = pontosPlayer;
        jogando = false; 
        player.style.top = posPlayerY + "px";
    }else if(posBolaX <= 0){
        velocidadeBola = 0;
        posBolaX = posBolaInicialX;
        posBolaY = posCpuInicialY;
        posPlayerY = posPlayerInicialY;
        posCpuY = posCpuInicialY;
        pontosCpu++;
        lblPontosCpu.innerHTML = pontosCpu;
        jogando = false; 
        cpu.style.top = posCpuY + "px";
    }

    bola.style.top = posBolaY + "px";
    bola.style.left = posBolaX + "px";
}

window.addEventListener("load", inicializar);
