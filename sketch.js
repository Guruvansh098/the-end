var trex,ground,invisibleGround,gameover,restart,drinks,hurdles,d,h,baddrink;

var drink,groundimage,hurdle,trexrunning,trexcolliding,gameoverimage,restartimage;
var badimg
var play=1;
var gamestate=play
var end=0;
var score=0;
function preload(){
  drink=loadImage("0431e2a39b7941b6ad702896f67814b9.jpg")
badimg=loadImage("unnamed.png")
  groundimage=loadImage("ground2.png")
  
  hurdle=loadImage("0.png")
  
  trexrunning=loadAnimation("flat-running-man-athletic-boy-run-animation-vector-21451065.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg")
  trexcolliding=loadAnimation("flat-running-man-athletic-boy-run-animation-vector-21451065.jpg")

  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
}
function setup(){
createCanvas(400,400);
  //create a trex sprite
 trex = createSprite(200,380,20,50);
trex.addAnimation("trex",trexrunning);
  trex.addAnimation("colliding",trexcolliding);
//trex.debug=true
//trex.setCollider("rectangle",0,0,trex.width,trex.height)
//trex.setCollider("circle",0,0,40)
//scale and position the trex
trex.scale = 0.2;
trex.x = 50;

//create a ground sprite
 ground = createSprite(200,380,400,20);
ground.addImage(groundimage);
ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
 
  gameover=createSprite(200,200)
gameover.addImage(gameoverimage)
gameover.scale=0.5
  
gameover.visible=false

 restart=createSprite(200,250)
restart.addImage(restartimage)
restart.scale=1
restart.visible=false


 drinks= createGroup();
 hurdles=createGroup();
 baddrink=createGroup();
}
 function draw() {
  //set background to white
  background("white");
 if (gamestate==play) {
 ground.velocityX = -(2+score/100);  
  score=score+Math.round(getFrameRate()/60);
   
   if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
     if(keyDown("space") && trex.y >= 300){
    trex.velocityY = -16 ;
    //playSound("sound://category_hits/vibrant_game_dirty_desolve_2.mp3")
  }
 
    trex.velocityY = trex.velocityY + 0.6;
  
 if(score%100==0&&score>0){
  // playSound("sound://category_alerts/airy_bell_notification.mp3")
 }
   drinkboost();
  hurdleob();
  bad();
  if(trex.isTouching(baddrink)){
    ground.velocityX = -(2-score/100); 
    baddrink.destroyEach()
  }
  if(trex.isTouching(drinks)){
    drinks.destroyEach()
  }
  if(trex.isTouching(hurdles)){
//trex.velocityY=-12
hurdles.destroyEach();
    trex.changeAnimation("colliding",trexcolliding)
 gamestate=end
  hurdles.setVelocityXEach(0)
  // playSound("sound://category_alerts/comedy_game_over_1.mp3")
  }
 } else  if(gamestate==end){
    ground.velocityX = 0;
trex.velocityY=0 

   gameover.visible=true
 
   restart.visible=true
 }
 if(mousePressedOver(restart)){
   score=0;
   gamestate=play
   gameover.visible=false;
   restart.visible =false;
   trex.changeAnimation("trex",trexrunning)
 }
 
  fill("black")
  text("score= "+ score,325,179);
 
  
 // console.log("hello"+randomNumber(10,100));
  
  
  //jump when the space key is pressed
 
  
  //add gravity
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function drinkboost() {



if( frameCount%60==0){
 d= createSprite(400, Math.round(random(50,200)));
 d.addImage(drink);
   d.scale =0.05  
   d.velocityX=-(3+score/100)
// life time =diatance/speed
d .lifetime=134;
 drinks.add(d);
}  
}
function bad() {



  if( frameCount%100==0){
   d= createSprite(400, Math.round(random(50,200)));
   d.addImage(badimg);
     d.scale =0.1  
     d.velocityX=-(3+score/100)
  // life time =diatance/speed
  d .lifetime=134;
   baddrink.add(d);
     
  }
}
function hurdleob() {


if(frameCount%120==0){
 h = createSprite(400,370);

    h.addImage(hurdle);
   
    h.scale =0.5  
   h.velocityX=-(3+score/100)
h.lifetime=134
hurdles.add(h)
//console .log(trex.depth)  
h .depth=trex.depth
 trex.depth=trex.depth+5 
}
}

