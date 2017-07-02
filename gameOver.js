Game.gameOver = function(game){

};

Game.gameOver.prototype = {
  create:function(game){

      titlescreen = game.add.sprite(0,0,'LosingScreen');

      this.createButton(game,game.world.centerX - 340, game.world.centerY + 265,290,40,
      function(){
        this.state.start('MainMenu');
      });

  },

  update:function(game){
      game.world.setBounds(0, 0, 1000, 600);

  },

  createButton:function(game,x,y,w,h,callback){
    var button1 = game.add.button(x,y,'TerugNaarMenu',callback,this,2,1,0);

    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;
  },

}
