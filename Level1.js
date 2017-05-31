//stop the player from moving
function stopMoving(player){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}


//put alien positions here
createEnemies = function (){
  //1
  var enemy = enemies.create(50,50,'enemy');
  enemy.anchor.setTo(0.5,0.5);
  //2
  var enemy = enemies.create(100,50,'enemy');
  enemy.anchor.setTo(0.5,0.5);
}

//enemyfires
enemyFires = function (){
enemyBullet = enemyBullets.getFirstExists(false);
//enemyBullet.body.velocity.x = 5;
//enemyBullet.body.velocity.y = 5;
livingEnemies.length = 0;
enemies.forEachAlive(function(enemy){
  livingEnemies.push(enemy);
});

if(enemyBullet && livingEnemies.length > 0){
  var random = game.rnd.integerInRange(0,livingEnemies.length-1);
  var shooter = livingEnemies[random];
  enemyBullet.reset(shooter.body.x,shooter.body.y);

  game.physics.arcade.moveToObject(enemyBullet,player,120);
  firingTimer = game.time.now+2000;
}

},

enemyHitsPlayer = function (player,bullet){
bullet.kill();
location.reload(); //this is an error that should retart the room
},

//collision
collisionHandler = function (bullet, enemy){
bullet.kill();
enemy.kill();
},

//firebullet1
fireBullet1 = function (){
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
},

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
},

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
},

screenWrap = function (player) {

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




Game.Level1 = function (game){};

var cursors;
var player;
var enemies;

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
  create:function() {
      //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //sprite background
    for(var i=0;i<50;i++){
      game.add.sprite(game.world.randomX,game.world.randomY,'diamond');
    }
    //enemies
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
    player.anchor.set(0.5,0.5);

    //player physics
    player.body.collideWorldBounds = true;

    //input
    this.cursors = this.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    //camera
    game.camera.width=600;
    game.camera.follow(player);
  },

  update: function() {
      if(player.alive){

      //stop the player from moving when noting is pressed
      stopMoving(player);
      //move player up and down
      if (this.cursors.up.isDown)
      {
        player.body.velocity.y = -150;
      }
      if(this.cursors.down.isDown)
      {
        player.body.velocity.y = 150;
      }

      //move player left and right
      if(this.cursors.left.isDown)
      {
        player.body.velocity.x = -150;
      }
      if(this.cursors.right.isDown)
      {
        player.body.velocity.x = 150;
      }

      //shoot
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        fireBullet1();
        ///fireBullet2();
        //fireBullet3();
      }

      //enemyshoot
      if(game.time.now > firingTimer){
        //enemyFires();
      }

      //check collision
      game.physics.arcade.collide(bullets1, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets2, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(bullets3, enemies, collisionHandler, null, this);
      game.physics.arcade.collide(enemyBullets, player, enemyHitsPlayer, null, this);
    }
  }
}
