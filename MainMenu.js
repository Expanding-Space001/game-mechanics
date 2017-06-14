Game.MainMenu = function(){

};

var titlescreen;

Game.MainMenu.prototype = {
  create:function(game){

      titlescreen = game.add.sprite(0,0,'titlescreen');

      this.createButton(game,game.world.centerX - 100, game.world.centerY,300,100,
      function(){
        this.state.start('Level1');
      });

      this.createButton2(game,game.world.centerX - 100, game.world.centerY + 160,300,100,
      function(){
        this.state.start('HowTo');
      });

  },

  update:function(game){

  },

  createButton:function(game,x,y,w,h,callback){
    var button1 = game.add.button(x,y,'Play',callback,this,2,1,0);

    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;
  },

    createButton2:function(game,x,y,w,h,callback){
      var button2 = game.add.button(x,y,'HowTo',callback,this,2,1,0);

      button2.anchor.setTo(0.5,0.5);
      button2.width = w;
      button2.height = h;


  }


};
