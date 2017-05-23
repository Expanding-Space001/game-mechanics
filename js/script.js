var game = new Phaser.Game(800,600, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render});

function preload(){
  game.stage.backgroundColor = '#372900';

  game.load.image('diamond', 'assets/diamond.png');
  game.load.image('firstaid', 'assets/firstaid.png');
  game.load.image('bullet', 'assets/star.png');
  game.load.image('enemy','assets/firstaid.png');
}

var cursors;
var player;
var enemy;

var bullet1;
var bullets1;
var bulletTime1 = 1000;

var bullet2;
var bullets2;
var bulletTime2 = 1000;

var bullet3;
var bullets3;
var bulletTime3 = 1000;

function create(){
  //physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //sprite background
  for(var i=0;i<100;i++){
    game.add.sprite(game.world.randomX,game.world.randomY,'diamond');
  }
  //enemies
  enemy = game.add.sprite(100,100,'enemy');
  enemy.name = 'eSpaceship';
  game.physics.arcade.enable(enemy);

  //bullet1
  bullets1 = game.add.group();
  bullets1.physicsBodyType = Phaser.Physics.ARCADE;
  bullets1.enableBody = true;
  game.physics.arcade.enable(bullets1);

  bullets1.createMultiple(40,'bullet');
  bullets1.setAll('anchor.x',0.5);
  bullets1.setAll('anchor.y',0.5);
  bullets1.outOfBoundsKill = true;

  //bullet2
  bullets2 = game.add.group();
  bullets2.physicsBodyType = Phaser.Physics.ARCADE;
  bullets2.enableBody = true;
  game.physics.arcade.enable(bullets2);

  bullets2.createMultiple(40,'bullet');
  bullets2.setAll('anchor.x',0.5);
  bullets2.setAll('anchor.y',0.5);
  bullets2.outOfBoundsKill = true;

  //bullet3
  bullets3 = game.add.group();
  bullets3.physicsBodyType = Phaser.Physics.ARCADE;
  bullets3.enableBody = true;
  game.physics.arcade.enable(bullets3);

  bullets3.createMultiple(40,'bullet');
  bullets3.setAll('anchor.x',0.5);
  bullets3.setAll('anchor.y',0.5);
  bullets3.outOfBoundsKill = true;

  //player
  player = game.add.sprite(300,300,'firstaid');
  game.physics.arcade.enable(player);
  player.anchor.set(0.5);

  //player physics
  player.body.drag.set(100);
  player.body.maxVelocity.set(200);
  player.body.collideWorldBounds = true;

  //input
  cursors = game.input.keyboard.createCursorKeys();
  game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  //camera
  game.camera.width=600;
  game.camera.follow(player);
}

function update(){
  //check collision
  game.physics.arcade.overlap(bullets1, enemy, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets2, enemy, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets3, enemy, collisionHandler, null, this);

  //forward
  if(cursors.up.isDown){
    game.physics.arcade.accelerationFromRotation(player.rotation, 100, player.body.acceleration);
  }
  else{
    player.body.acceleration.set(0);
  }

  //turn
  if (cursors.left.isDown)
  {
    player.body.angularVelocity = -100;
  }
  else if (cursors.right.isDown)
  {
    player.body.angularVelocity = 100;
  }
  else{
    player.body.angularVelocity = 0;
  }

  //shoot
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    fireBullet1();
    fireBullet2();
    fireBullet3();
  }
}

function render() {
}

//collision
function collisionHandler(bullet, enemy){
  console.log("hello");
  bullet.kill();
  enemy.kill();
}

//firebullet1
function fireBullet1(){
  if(game.time.now > bulletTime1){
    bullet1 = bullets1.getFirstExists(false);
    if(bullet1){
      bullet1.reset(player.body.x + 16, player.body.y + 16);
      bullet1.lifespan = 2000;
      bullet1.rotation = player.rotation;

      game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet1.body.velocity);

      bulletTime1 = game.time.now + 1000;
    }
  }
}

//firebullet2
function fireBullet2(){
  if(game.time.now > bulletTime2){
    bullet2 = bullets2.getFirstExists(false);
    if(bullet2){
      bullet2.reset(player.body.x + 16, player.body.y + 16);
      bullet2.lifespan = 2000;
      bullet2.rotation = player.rotation;

      game.physics.arcade.velocityFromRotation(player.rotation+100, 400, bullet2.body.velocity);

      bulletTime2 = game.time.now + 1000;
    }
  }
}

//firebullet3
function fireBullet3(){
  if(game.time.now > bulletTime3){
    bullet3 = bullets3.getFirstExists(false);
    if(bullet3){
      bullet3.reset(player.body.x + 16, player.body.y + 16);
      bullet3.lifespan = 2000;
      bullet3.rotation = player.rotation;

      game.physics.arcade.velocityFromRotation(player.rotation-100, 400, bullet3.body.velocity);


      bulletTime3 = game.time.now + 1000;
    }
  }
}

function screenWrap (player) {

    if (player.x < 0)
    {
        player.x = game.width;
    }
    else if (player.x > game.width)
    {
        player.x = 0;
    }

    if (player.y < 0)
    {
        player.y = game.height;
    }
    else if (player.y > game.height)
    {
        player.y = 0;
    }
}
