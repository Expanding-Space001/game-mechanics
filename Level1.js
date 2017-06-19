//enemyMovement
enemyMovement = function (i){
  if(enemies.children[i].body.y > listY[i]+100){
    direction[i] = false;
  }
  if(enemies.children[i].body.y < listY[i]-100){
    direction[i] = true;
  }
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
    firingTimer = game.time.now+2000; //resets timer to 1 sec
  }
}

enemyHitsPlayer = function (player,bullet){        //when the bullet hits the player
  bullet.kill();  //destroy the bullet
  lives = lives-1;
  player.loadTexture('LaikaHit');
  game.time.events.add(Phaser.Timer.SECOND * 1, changeToIdle , this);
}

changeToIdle = function(){
  player.loadTexture('laika_idle');
}

//collision
function collisionHandler(bullet, enemy){       //when the bullet hits the enemy
  bullet.kill();
  enemy.kill();
}

//firebullet1
fireBullet1 = function (){                         //fire the bullet straight forwards
  bullet1 = bullets1.getFirstExists(false); //make the first bullet in the list a object
  if(bullet1){  //if it exists
    bullet1.reset(player.body.x + 16, player.body.y + 16);  //places the bullet at the player
    bullet1.lifespan = 2000;  //how long the bullet will live, 2 sec
    bullet1.rotation = player.rotation; //gives the bullet the same angle as the player

    game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet1.body.velocity); //don't know
  }
}


//firebullet2
fireBullet2 = function (){
  bullet2 = bullets2.getFirstExists(false);
  if(bullet2){
    bullet2.reset(player.body.x + 16, player.body.y + 16);
    bullet2.lifespan = 2000;
    bullet2.rotation = player.rotation;

    game.physics.arcade.velocityFromRotation(player.rotation+100, 400, bullet2.body.velocity);
  }
}

//firebullet3
fireBullet3 = function (){
    bullet3 = bullets3.getFirstExists(false);
    if(bullet3){
      bullet3.reset(player.body.x + 16, player.body.y + 16);
      bullet3.lifespan = 2000;
      bullet3.rotation = player.rotation;

      game.physics.arcade.velocityFromRotation(player.rotation-100, 400, bullet3.body.velocity);
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
  game.state.start('win');   //CHANGE THIS LATER!!!!1
}

//put alien positions here
createEnemies = function (maxEnemies){
  //random position for aliens
  for(let i = 0;i<maxEnemies;i++){
    var randomX = game.rnd.integerInRange(450,1350);
    var randomY = game.rnd.integerInRange(100,500);

    listX[i] = randomX;
    listY[i] = randomY;

    var enemy = enemies.create(randomX,randomY,'enemy');
    enemy.anchor.setTo(0.5,0.5);
    var rock = rocks.create(randomX-200,randomY-150,'rock2');
    rock.body.setSize(5,50,195,120);
    rock.body.immovable = true;
  }


  player = game.add.sprite(100,300,'shoot',0);
  albert = game.add.sprite(900,300,'albert');


  //check if the rocks are too close together
  for(let i =0;i<maxEnemies-1;i++){
    for(let j = i+1;j<maxEnemies;j++){
      //if the other enemy is withing the x +- 100 of the first
      if((enemies.children[i].body.x+100 > enemies.children[j].body.x && enemies.children[i].body.x-100 < enemies.children[j].body.x) ||
      (enemies.children[i].body.x+100 > player.position.x && enemies.children[i].body.x-100 < player.position.x)){
        //if the other enemy is withing the y +- 100 of the first
        if((enemies.children[i].body.y+100 > enemies.children[j].body.y && enemies.children[i].body.y-100 < enemies.children[j].body.y) ||
        (enemies.children[j].body.x+100 > player.position.x && enemies.children[j].body.x-100 < player.position.x)){
          //if the enemy is too close

          game.state.start('Level1');
          lives = 3;
          //enemies.children[j].kill();
          //rocks.children[j].kill();
          var loading = game.add.image(0, 0, 'loading');
          game.world.setBounds(0, 0, 1000*2, 600);
        }
      }
    }
  }
  game.world.setBounds(0, 0, 1000, 600);
}

Game.Level1 = function(game){};

var lives = 3;

var listY = [];
var listX = [];

var cursors;
var player;
var enemies;
var rocks;
var hitRock;
var albert;

var anim;

var direction = [];
var maxEnemies = 9;

var enemyBullet;
var firingTimer = 0;
var livingEnemies = [];

var bullet1;
var bullets1;
var bulletTime = 1000;

var bullet2;
var bullets2;

var bullet3;
var bullets3;

Game.Level1.prototype = {
  create:function(){

    //Add a background
    var Background = game.add.image(0, 0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //enemies
    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    createEnemies(maxEnemies);

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
    game.physics.enable(player,Phaser.Physics.ARCADE);
    player.anchor.set(0.5);
    anim = player.animations.add('fire');

    //goal
    game.physics.enable(albert,Phaser.Physics.ARCADE);
    albert.anchor.set(0.5);
    albert.body.immovable = true;

    //player physics
    player.body.maxVelocity.set(100);
    player.body.collideWorldBounds = true;

    //input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    game.input.keyboard.addKey(Phaser.Keyboard.W);
    game.input.keyboard.addKey(Phaser.Keyboard.S);
    game.input.keyboard.addKey(Phaser.Keyboard.A);
    game.input.keyboard.addKey(Phaser.Keyboard.D);

    //camera
    game.camera.width=600;
    game.camera.follow(player);
  },

  update: function() {
    enemies.position.x -= 1;
    rocks.position.x -= 1;

    for(let i =0; i< maxEnemies;i++){
      var r = game.rnd.integerInRange(0,1);
      if(r ==0){
        direction[i] = false;
      }
      else {
        direction[i] = true;
      }

      enemyMovement(i);

      if(direction[i] == true){                 //true = down false = up
        enemies.children[i].body.y += 1;
        rocks.children[i].body.y += 1;
      }
      if(direction[i] == false){
        enemies.children[i].body.y -= 1;
        rocks.children[i].body.y -= 1;
      }
    }

    if (lives == 0)
    {
      player.loadTexture('laika_die');
      setTimeout(function(){game.state.start('gameOver');}, 1000);
    }

    player.body.drag.set(100);


    if(player.alive){

      if(game.input.keyboard.isDown(Phaser.Keyboard.W)){

        player.body.velocity.y -= 5;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        player.body.velocity.y += 5;
      }


      if (game.input.keyboard.isDown(Phaser.Keyboard.A))
      {

        player.body.velocity.x -= 5;
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        player.body.velocity.x += 5;
      }

      hitRock = game.physics.arcade.collide(rocks, player);

      //shoot
      if(game.input.activePointer.leftButton.isDown){
        if(game.time.now > bulletTime){
          anim.play(20);
          setTimeout(function(){
            fireBullet1();
            fireBullet2();
            fireBullet3();},400);
          bulletTime = game.time.now + 1000;
          anim.onComplete.add(function finished(){
            player.loadTexture('shoot',0);
          },this);
        }
      }

      //enemyshoot
      if(game.time.now > firingTimer){
        enemyFires();
      }

      //if the player hits the rock
      if(hitRock){
        //player.body.acceleration.set(0,0);
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
        //player.body.angularVelocity = 0;
      }
      //rotate to the mouse
      player.rotation = game.physics.arcade.angleToPointer(player);

      //check collision
      game.physics.arcade.collide(player,albert, savedAlbert,null,this);
      game.physics.arcade.collide(bullets1, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets2, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets3, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(enemyBullets, player, enemyHitsPlayer, null, this);
    }
  }

}
