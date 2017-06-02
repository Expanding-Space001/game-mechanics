Game.win = function(game){

};

Game.win.prototype = {
  preload:function (){


  },

  create:function (){
    this.createButton(game,"Play Again",game.world.centerX,game.world.centerY + 32,300,100,
    function(){
      this.state.start('Level1');
    });

    this.createButton(game,"Main Menu",game.world.centerX,game.world.centerY + 192,300,100,
    function(){
      this.state.start('MainMenu');
    });

    titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192,'win');
    titlescreen.anchor.setTo(0.5,0.5);
  },


  createButton:function(game,string,x,y,w,h,callback){
    var button1 = game.add.button(x,y,'button',callback,this,2,1,0);

    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;

    var txt = game.add.text(button1.x,button1.y, string, {
      font:"40px Arial",
      fill:"#fff",
      align:"center",
      boundsAlignH: "center",
      boundsAlignV:"center"
    });
    txt.anchor.setTo(0.5,0.5);
  }

}
