var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameState = "play"
  cloudimg = loadImage ("cloud.png")
  go = loadImage("gameOver.png")
  rimg = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
 
  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;

  cloudsGroup = createGroup()
  obstacleGroup = createGroup()
  
  score = 0
  gameover = createSprite(300,100)
  gameover.addImage(go)
  restart = createSprite(300,130)
  restart.addImage(rimg)
  restart.scale = 0.5 
  gameover.scale = 0.5 
}

function draw() {
  background(255);
  if (gameState === "play"){
    console.log(trex.y)
    gameover.visible = false;
    restart.visible = false;
    score = score+Math.round(getFrameRate()/60)
    text("Score: "+score,500,30)
    
    ground.velocityX = -(4+ Math.round(score/100));
    
    if (keyDown("space")&&trex.y>161) {
      trex.velocityY = -13;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnObstacles()
    spawnClouds()
    
    if(obstacleGroup.isTouching(trex)){
      gameState = "end"
    }}
    if(gameState==="end"){
      ground.velocityX=0;
      cloudsGroup.setVelocityXEach(0)
      obstacleGroup.setVelocityXEach(0)
      cloudsGroup.setLifetimeEach(-1)
      obstacleGroup.setLifetimeEach(-1)
      trex.changeAnimation("collided")
      gameover.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)){
        reset()
    
    }
    }
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(600, 170);
    obstacle.velocityX = -(4+ Math.round(score/100));
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1)
        break;
      case 2:
        obstacle.addImage(obstacle2)
        break;
      case 3:
        obstacle.addImage(obstacle3)
        break;
      case 4:
        obstacle.addImage(obstacle4)
        break;
      case 5:
        obstacle.addImage(obstacle5)
        break;
      case 6:
        obstacle.addImage(obstacle6)
        break; 
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 150
    obstacleGroup.add(obstacle)
  }
}

function spawnClouds() {
  if (frameCount %60 === 0) {
    var clouds = createSprite (600,random(50,100))
  clouds.addImage(cloudimg)
  clouds.velocityX = -4
  clouds.scale = 0.5
  clouds.lifetime = 150
  cloudsGroup.add(clouds)
  }
    
}
function reset(){ gameState = "play"; obstacleGroup.destroyEach(); cloudsGroup.destroyEach(); trex.changeAnimation("running"); score = 0; }