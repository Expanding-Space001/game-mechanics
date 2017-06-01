//var game = new Phaser.Game(1000,700, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render});
//stop the player from moving
function stopMoving(player){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}

//put alien positions here
createEnemies = function (){
  //1 top left
  var rock = rocks.create(0,-100,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;
  var enemy = enemies.create(200,50,'enemy');
  enemy.anchor.setTo(0.5,0.5);

  //2 down left
  var enemy = enemies.create(150,500,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(-50,350,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //3 middle top
  var enemy = enemies.create(492,152,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(292,2,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //4 middle left
  var enemy = enemies.create(550,450,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(350,300,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //5 middle left
  var enemy = enemies.create(352,362,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(152,212,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //6 top right
  var enemy = enemies.create(700,125,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(500,-25,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //7 down right
  var enemy = enemies.create(800,550,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(600,400,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;

  //8 middle right
  var enemy = enemies.create(750,350,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  var rock = rocks.create(550,200,'rock2');
  rock.body.setSize(55,50,175,120);
  rock.body.immovable = true;
}

//enemyfires
enemyFires = function (){              //when the enemy fires
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
    firingTimer = game.time.now+3000; //resets timer to 2 sec
  }
}

enemyHitsPlayer = function (player,bullet){        //when the bullet hits the player
  bullet.kill();  //destroy the bullet
  player.loadTexture('dead',0);
  setTimeout(function(){game.state.start('Level1');}, 1000);
  //game.state.start('Level1');   //CHANGE THIS LATER!!!!1
}

//collision
function collisionHandler(bullet, enemy){       //when the bullet hits the enemy
  bullet.kill();
  enemy.kill();
}

//firebullet1
fireBullet1 = function (){                         //fire the bullet straight forwards
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
fireBullet2 = function (){
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
fireBullet3 = function (){
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

screenWrap = function (player) {  //makes sure the player can't go out of bounds

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

//when albert is saved
savedAlbert = function (){
  console.log("You saved Albert, Congratulations!");
  game.state.start('MainMenu');   //CHANGE THIS LATER!!!!1
}

Game.Level1 = function(game){};

var cursors;
var player;
var enemies;
var rocks;
var hitRock;
var albert;

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

Game.Level1.prototype = {
  create:function(){
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
    player = game.add.sprite(100,300,'laika_idle');
    game.physics.enable(player,Phaser.Physics.ARCADE);
    player.anchor.set(0.5);

    //goal
    albert = game.add.sprite(900,300,'albert');
    game.physics.enable(albert,Phaser.Physics.ARCADE);
    albert.anchor.set(0.5);
    albert.body.immovable = true;

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
  },

  update: function() {
    hitRock = game.physics.arcade.collide(rocks, player);

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
        player.loadTexture('laikaAttack',0);
        fireBullet1();
        fireBullet2();
        fireBullet3();
        setTimeout(function(){
          player.loadTexture('laika_idle',0);}, 500);
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
      game.physics.arcade.collide(player,albert, savedAlbert,null,this);
      game.physics.arcade.collide(bullets1, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets2, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets3, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(enemyBullets, player, enemyHitsPlayer, null, this);
    }
  }

}
