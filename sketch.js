var trex,trex_running,ground,ground_moving,invisibleGround,trex_collide;
var cloud,cloud_moving;
var obstacle,obstacle_moving,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacleGroup;
var cloudGroup;

var gameoverimg,restartimg,gameOver,restart;
var PLAY = 1;
var END = 0;
var gameState  = PLAY;
var score = 0;
var backgroundImg;
var sunAnimation;



function preload(){
  
   backgroundImg = loadImage("backgroundImg.png")
  sunAnimation = loadImage("sun.png");
  trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  ground_moving = loadImage("ground.png");
  cloud_moving = loadImage("cloud-1.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collide = loadImage("trex_collided-1.png");
  
  restartimg = loadImage("restart.png");
  gameoverimg = loadImage("gameOver.png");
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  
  sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1
  
  trex = createSprite(50,height-70,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided" ,trex_collide);
  trex.scale = 0.08;
  
  trex.setCollider("circle",0,0,350);
  
  invisibleGround = createSprite(width/2,height-10,width,125);
   invisibleGround.shapeColor = "white";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground moving",ground_moving);
  ground.x = width/2;
  ground.velocityX = -(6 + 3*score/100);
  
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameoverimg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartimg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
}

function draw() {
  
  background(backgroundImg);
  fill("yellow");
   text("Score: "+ round(score), 500,50);
  if(gameState === PLAY){
      //score = score + Math.round(getFrameRate()/60);
    score = score +0.10;
      ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
    trex.velocityY = -12;   
      touches = [];      
     }
    trex.velocityY = trex.velocityY+0.5;
  
     if (ground.x < 0){
      ground.x = width/2
    }
      trex.collide(invisibleGround);
  
    spawnCloud();
    spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
        gameState = END;
       }
  
   }
   else if(gameState === END){
     gameOver.visible = true;
     restart.visible = true;
     ground.velocityX = 0; 
     trex.velocityY = 0; 
     
     trex.changeAnimation("collided",trex_collide);
     obstacleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);
     
     
     obstacleGroup.setLifetimeEach(-1);
     cloudGroup.setLifetimeEach(-1);
     
     
      if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
      }
    }
       
 drawSprites(); 
  
}


function spawnCloud(){
  if(frameCount % 60 === 0){
    cloud = createSprite(width+20,height-300,40,10);
    cloud.addImage("cloud moving",cloud_moving);
    cloud.y = Math.round(random(100,220));
    cloud.velocityX = -2;
    cloud.scale = 0.5;
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1; 
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
     
     }
}

function spawnObstacles(){
     if(frameCount % 80 === 0){
    obstacle = createSprite(600,height-95,20,30); 
       obstacle.velocityX = -(6 + 3*score/100);
    var ran  = Math.round(random(1,6));
    switch(ran){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2:obstacle.addImage(obstacle2);
        break;
      case 3:obstacle.addImage(obstacle3);
        break;
      case 4:obstacle.addImage(obstacle4);
        break;
      case 5:obstacle.addImage(obstacle5);
        break;
      case 6:obstacle.addImage(obstacle6);
        break;
      default:break;
           }
    
    obstacle.scale = 0.5;
       obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
    
    
     
     }
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
 
  
  score = 0;
  
}