var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var vivo,vivoImg;
var shots = 70

var gameState = "fight"

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpg")
  vivoImg = loadImage("assets/vivo.png")
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //criando sprites para representar vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //criando grupo de zumbis 
    zombieGroup = new Group();
    shotGroup = new Group();
    vivoGroup = new Group();
    
    
}

function draw() {
  background(0); 
  if(gameState === "fight"){
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  shot = createSprite(displayWidth-1150, player.y-30, 20, 10);
  shot.velocityX = 20
  shotGroup.add(shot)
  player.depth = shot.depth
   player.depth = player.depth+2
  player.addImage(shooter_shooting)
  shots = shots-5
  
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(shots==0){
  gameState = "shot"
}
//destrua o zumbi quando a bala atingir
if(zombieGroup.isTouching(shotGroup)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(shotGroup)){
        zombieGroup[i].destroy()
        shotGroup.destroyEach()
        } 
  }
 }

//destrua o zumbi qunado o jogador tocar
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }
}
//salvando vivo
if(vivoGroup.isTouching(player)){
 

  for(var i=0;i<vivoGroup.length;i++){     
       
   if(vivoGroup[i].isTouching(player)){
        vivoGroup[i].destroy()
        shots = shots+1
        } 
  }
 }
//chame a função para gerar zumbis
enemy();
  
sobreviventes();
}
drawSprites();
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("Você Perdeu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Venceu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "shot"){
 
  textSize(50)
  fill("yellow")
  text("Você não tem mais balas!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  shotGroup.destroyEach();

}

}



//criando função para gerar zumbis
function enemy(){
  if(frameCount%50===0){

    //dando posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
function sobreviventes(){
  if(frameCount%50===0){

    //dando posições x e y aleatórias para o zumbi aparecer
    vivo = createSprite(random(500,1100),random(100,500),40,40)

    vivo.addImage(vivoImg)
    vivo.scale = 0.15
    vivo.velocityX = -3
    
   
    vivo.lifetime = 400
   vivoGroup.add(vivo);
  }

}
