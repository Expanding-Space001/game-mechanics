
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

    game.physics.arcade.moveToObject(enemyBullet,player,240); //shoots towards the player
    firingTimer = game.time.now+enemyFireCooldown; //resets timer to the cooldown variable
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
createEnemies = function (){
  //random position for aliens
    var randomY = game.rnd.integerInRange(100,500);

    var enemy = enemies.create(player.body.position.x+900,randomY,'enemy');
    enemy.anchor.setTo(0.5,0.5);
    var rock = rocks.create(player.body.position.x+700,randomY-150,'rock2');
    rock.body.setSize(5,50,195,120);
    rock.body.immovable = true;
    game.world.setBounds(0, 0, 1000*2, 600);
}

Game.Level1 = function(game){};

var lives = 3;
var spawnTimer = 0;

var spawnBoundary1 = 300;     //point where spawnTimer1 changes to spawnTimer2
var spawnBoundary2 = 600;     //point where spawnTimer2 changes to spawnTimer3
var spawnTimer1 = 200;  //how fast the enemy's spawn before player hits x = spawnBoundary1
var spawnTimer2 = 100;  //1 sec respawn timer before player x = spawnBoundary2
var spawnTimer3 = 50;   //0.5 sec respawn timer after spawnBoundary

var playerSpeed = 10;   //how fast the player moves

var cursors;
var player;
var enemies;
var rocks;
var hitRock;
var albert;

var anim;

var enemyFireCooldown = 1000;  //0.5 sec
var bulletSpeed = 240;         // how fast the lasers go

var enemyBullet;
var firingTimer = 0;
var livingEnemies = [];

var bullet1;
var bullets1;
var bulletTime = 1000;        //how long the cooldown of the bullets are

var bullet2;
var bullets2;

var bullet3;
var bullets3;

var LifesImage1;
var LifesImage2;

Game.Level1.prototype = {
  create:function(){
    //Add a background
    var Background = game.add.image(0, 0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var LifesHolder = game.add.image(826,5,'LifesUI');
    LifesHolder.scale.setTo(0.16,0.16);
    LifesHolder.fixedToCamera = true;

    var LifesImage0 = game.add.image(860, 60, 'laikaLives');
    LifesImage0.scale.setTo(0.7,0.7);
    LifesImage0.anchor.setTo(0.5, 0.5);
    LifesImage0.fixedToCamera = true;

    var LifesImage1 = game.add.image(900,60, 'laikaLives');
    LifesImage1.scale.setTo(0.7,0.7);
    LifesImage1.anchor.setTo(0.5, 0.5);
    LifesImage1.fixedToCamera = true;

    var LifesImage2 = game.add.image(940,60, 'laikaLives');
    LifesImage2.scale.setTo(0.7,0.7);
    LifesImage2.anchor.setTo(0.5, 0.5);
    LifesImage2.fixedToCamera = true;

    //enemies
    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.physicsBodyType = Phaser.Physics.ARCADE;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    //enemybullets
    enemyBullets = game.add.group();
    enemyBullets.enablebody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30,'enemyBullet');
    enemyBullets.setAll('anchor.x',0.5);
    enemyBullets.setAll('anchor.y',1);
    //enemyBullets.setAll('outOfBoundsKill',true);
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
    player = game.add.sprite(100,300,'shoot',0);
    game.physics.enable(player,Phaser.Physics.ARCADE);
    player.anchor.set(0.5);
    anim = player.animations.add('fire');

    //goal
    albert = game.add.sprite(1900,300,'albert');
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
    game.camera.width=500;
    game.camera.follow(player);
  },

  update: function() {

    if(lives == 2){
      LifesImage2.kill();
    }

    if(lives == 1){
      LifesImage1.kill();
    }

    for(let i =0; i< enemies.children.length; i++){
      enemies.children[i].body.position.x -= 1;
      rocks.children[i].body.position.x -= 1;
    }

    if(spawnTimer <= 0){
      createEnemies();
      if(player.body.position.x < spawnBoundary1){
        spawnTimer = spawnTimer1;
      }
      else if(player.body.position.x < spawnBoundary2){
        spawnTimer = spawnTimer2;
      }
      else{
        spawnTimer = spawnTimer3;
      }
    }
    spawnTimer -= 1;

    /*for(let i =0; i< maxEnemies;i++){
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
    }*/

    if (lives == 0)
    {
      player.loadTexture('laika_die');
      setTimeout(function(){game.state.start('gameOver');}, 1000);
      game.world.setBounds(0, 0, 1000, 600);
    }

    player.body.drag.set(100);


    if(player.alive){

      if(game.input.keyboard.isDown(Phaser.Keyboard.W)){

        player.body.velocity.y -= playerSpeed;
      }
      else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        player.body.velocity.y += playerSpeed;
      }


      if (game.input.keyboard.isDown(Phaser.Keyboard.A))
      {

        player.body.velocity.x -= playerSpeed;
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        player.body.velocity.x += playerSpeed;
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
        player.body.acceleration.set(0,0);
        //player.body.velocity.y = 0;
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
