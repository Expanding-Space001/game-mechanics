var game = new Phaser.Game(1000,700, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render});

function preload(){
  game.stage.backgroundColor = '#372900';

  game.load.image('diamond', 'images/diamond.png');
  game.load.image('firstaid', 'images/firstaid.png');
  game.load.image('bullet', 'images/star.png');
  game.load.image('enemyBullet', 'images/star.png');
  game.load.image('enemy','images/firstaid.png');
  game.load.image('rock2','images/rock2.png');
}

var cursors;
var player;
var enemies;
var rocks;
var rHitbox;

var enemyBullet;
var firingTimer = 0;
var livingEnemies = [];

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

  //enemies
  rocks = game.add.group();
  rocks.enableBody = true;
  rocks.physicsBodyType = Phaser.Physics.ARCADE;

  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  createEnemies();

  //enemybullets
  enemyBullets = game.add.group();
  enemyBullets.enablebody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  enemyBullets.createMultiple(30,'enemyBullet');
  enemyBullets.setAll('anchor.x',0.5);
  enemyBullets.setAll('anchor.y',1);
  enemyBullets.setAll('outOfBoundsKill',true);
  enemyBullets.setAll('checkWorldBounds',true);
  game.physics.arcade.enable(enemyBullets);

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
  game.physics.enable(player,Phaser.Physics.ARCADE);
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

//put alien positions here
function createEnemies(){
  //1
  var rock = rocks.create(-150,-100,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;
  var enemy = enemies.create(50,50,'enemy');
  enemy.anchor.setTo(0.5,0.5);

  //2
  var enemy = enemies.create(100,50,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(-100,-100,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //3
  var enemy = enemies.create(492,152,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(292,2,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //4
  var enemy = enemies.create(162,254,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(-38,104,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //5
  var enemy = enemies.create(352,362,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(152,212,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;


  //random enemy generator
  /*for(let i =0; i<5;i++){
  var randomX = game.world.randomX;
  var randomY = game.world.randomY;
    //if the random number are not too close
    //if((randomX < player.body.x - 100 || randomX > player.body.x + 100) && (randomY < player.body.y - 100 || randomY > player.body.y + 100)){
    //  if((randomX < enemy.body.x - 100 || randomX > enemy.body.x + 100) && (randomY < enemy.body.y - 100 || randomY > enemy.body.y + 100)){
        var enemy = enemies.create(randomX+1,randomY-1,'enemy');
        enemy.anchor.setTo(0.5,0.5);
        var rock = rocks.create(randomX,randomY,'rock2');
        rock.body.immovable = true;
    //  }
  //  }
  //  else{
  //  }
}*/

}

function update(){
  var hitRock = game.physics.arcade.collide(rocks, player);

  if(player.alive){
    //forward
    if(cursors.up.isDown){
      game.physics.arcade.accelerationFromRotation(player.rotation, 100, player.body.acceleration);
    }
    else{
      player.body.acceleration.set(0,0);
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

    //enemyshoot
    if(game.time.now > firingTimer){
      enemyFires();
    }

    //if the player hits the rock
    if(hitRock){
      //player.body.acceleration.set(0,0);
      player.body.velocity.y = 1;
      player.body.velocity.x = 1;
      //player.body.angularVelocity = 0;
    }

    //check collision
    game.physics.arcade.overlap(bullets1, enemies, collisionHandler, null, this);
    game.physics.arcade.overlap(bullets2, enemies, collisionHandler, null, this);
    game.physics.arcade.overlap(bullets3, enemies, collisionHandler, null, this);
    game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
  }
}

function render() {
}
//enemyfires
function enemyFires(){                          //when the enmy fires
  enemyBullet = enemyBullets.getFirstExists(false); //first bullet in the list
  //enemyBullet.body.velocity.x = 5;
  //enemyBullet.body.velocity.y = 5;
  livingEnemies.length = 0; //empties the array???
  enemies.forEachAlive(function(enemy){ //loops through all alive enemies
    livingEnemies.push(enemy);  //puts them in the array
  });

  if(enemyBullet && livingEnemies.length > 0){  //if the array is not empty and the is an bullet
    var random = game.rnd.integerInRange(0,livingEnemies.length-1); //random integer that is in the array
    var shooter = livingEnemies[random];  //makes a random enemy the shooter
    enemyBullet.reset(shooter.body.x,shooter.body.y); //places the bullet at the shooter

    game.physics.arcade.moveToObject(enemyBullet,player,120); //shoots towards the player
    firingTimer = game.time.now+4000; //resets timer to 2 sec
  }

}

function enemyHitsPlayer(player,bullet){        //when the bullet hits the player
  bullet.kill();  //destroy the bullet
  location.reload(); //this will reload the site
}

//collision
function collisionHandler(bullet, enemy){       //when the bullet hits the enemy
  bullet.kill();
  enemy.kill();
}

//firebullet1
function fireBullet1(){                         //fire the bullet straight forwards
  if(game.time.now > bulletTime1){  //if the countdown is done
    bullet1 = bullets1.getFirstExists(false); //make the first bullet in the list a object
    if(bullet1){  //if it exists
      bullet1.reset(player.body.x + 16, player.body.y + 16);  //places the bullet at the player
      bullet1.lifespan = 2000;  //how long the bullet will live, 2 sec
      bullet1.rotation = player.rotation; //gives the bullet the same angle as the player

      game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet1.body.velocity); //don't know

      bulletTime1 = game.time.now + 1000; //restarts counter
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

function screenWrap (player) {  //makes sure the player can't go out of bounds

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
