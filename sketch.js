//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,bomb,fruitGroup,monsterGroup, score,r,randomFruit, position,reload;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, fruit5, bombImage,blastImage, gameOverImage, reloadImg;

var bg, bgImg,end,endImg;
var dragonF;

//Lives left variable.
var left=3;

function preload()
{

    knifeImage = loadImage("knife.png");
    bombImage = loadImage("bomb.png");
    blastImage= loadImage("blast.png");

    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    fruit5 = loadImage("fruit5.png");

    endImg = loadImage("gameover.png");
    bgImg= loadImage("bg.png");
    reloadImg=loadImage("reload icon.png");


    //load sound here
    swordSound=loadSound("Woosh-E9-outside-www.fesliyanstudios.com.mp3");
    gameoverSound=loadSound("TextTo.mp3");
    bombSound=loadSound("Small-Grenade-Explosion-www.fesliyanstudios.com.mp3");
    
}



function setup() 
{
    createCanvas(600, 600);

    //created a background
    bg=createSprite(300,300);
    bg.addImage(bgImg);

    //creating sword
    knife=createSprite(40,200,20,20);
    knife.addImage(knifeImage);
    knife.scale=0.7

    //set collider for sword
    knife.setCollider("rectangle",0,0,40,40);
    knife.debug=false;

    dragonF=createSprite(600,50,10,10);

    // Score variables and Groups
    score=0;
    fruitGroup=createGroup();
    bombGroup=createGroup();
    gameOverGroup= new Group();
    bonusGroup= new Group();
  
}

function draw() 
{
  background("lightblue");
  
  if(gameState===PLAY)
  {
      knife.addImage(knifeImage);
      knife.scale=0.7;
    
      //Call fruits and Monster function
      fruits();
      Bomb();

      // Move sword with mouse
      knife.y=mouseY;
      knife.x=mouseX;

      // Increase score if sword touching fruit
      if(fruitGroup.isTouching(knife))
      {
        fruitGroup.destroyEach();
        swordSound.play();
        
        //adding score.
        score += 10;
      }
    
      if(frameCount%1000===0)
      {
        dragonF=createSprite(600,50,10,10);
        dragonF.velocityX=-(10+score/100);
        dragonF.y=Math.round(random(50,550));
        dragonF.addImage("bonus",fruit5);
        dragonF.scale=1.3;

        dragonF.depth=knife.depth;
        bonusGroup.add(dragonF);

      }
       
       //commands for bonus fruit.
        if(bonusGroup.isTouching(knife))
          {
            score +=30;
            left += 1;
            swordSound.play();
            bonusGroup.destroyEach();
          }
      
      if(bombGroup.isTouching(knife)) 
        {
            // reduce left by 1 and proceed to end gradually

            //left should decrease by 1.
            left = left- 1;

            //gameState=END;

            bomb.changeAnimation("blast",blastImage);
            bomb.scale=1;
            bomb.lifetime=1;
            bomb.velocityX=0
          
            bombSound.play();

        }
        
        //Setting gameState end when all lives are exhausted.

        if(left===0)
          {
            gameState=END;
            
            //added gameover sound here.
            gameoverSound.play();
          }
  }
  
  
  
   //Conditions of end state
  if(gameState===END)
    {
        // Change the animation of sword to gameover and reset its position
        end=createSprite(300,300,1,1);
        end.addImage(endImg);
        end.scale=2;
        end.x=300;
        end.y=300;
        gameOverGroup.add(end);
      
        fruitGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        bombGroup.setVelocityXEach(0);
        dragonF.destroy();
      
        //Adding reload Icon
        reload=createSprite(300,400,10,10);
        reload.addImage("restart", reloadImg);
        reload.scale=0.05;
        gameOverGroup.add(reload);
    }
  
  //Coming back to play state by clicking on reload.
  if(mousePressedOver(reload)&&gameState===END)
    {
      gameState=PLAY;
      score=0;
      left=3;
      gameOverGroup.destroyEach();
      frameCount=0;
    }
 
  
  drawSprites();
  
  //Display score
  textSize(25);
  fill("yellow");
  text("Score: "+ score,50,50);
  text("Lives left: "+left,450,50);
}


function Bomb()
{
    if(World.frameCount%200===0)
    {
       bomb=createSprite(600,200,20,20);
       bomb.addAnimation("moving", bombImage);
       bomb.addAnimation("blast", blastImage);
       bomb.scale=0.3;
       bomb.y=Math.round(random(100,550));
     
       //update below give line of code for increase monsterGroup speed by 10
       bomb.velocityX = -(8+score/50);
       bomb.setLifetime=50;

       bombGroup.add(bomb);
    }
}

function fruits()
{
  if(frameCount%80===0)
  {
      position = Math.round(random(1,2));
      fruit=createSprite(400,200,20,20);

       //using random variable change the position of fruit, to make it more challenging

      if(position==1)
      {
        fruit.x=600;
        //update below give line of code for increase fruitGroup speed by 4
        fruit.velocityX=-(7+score/100)
      }
      else
      {
        if(position==2)
        {
        fruit.x=0;

       //update below give line of code for increase fruitGroup speed by 4
        fruit.velocityX= (7+score/100);
        }
      }

       fruit.scale=0.2;
       
       //fruit.debug=true;
       r=Math.round(random(1,4));
    
      if (r === 1) 
      {
        fruit.addImage(fruit1);
      } 
      else if (r === 2) 
      {
        fruit.addImage(fruit2);
        
      } 
      else if (r ===3) 
      {
        fruit.addImage(fruit3);
      } 
      else if (r===4)
      {
        fruit.addImage(fruit4);
      }
      
            

      fruit.y=Math.round(random(80,550));


      fruit.setLifetime=100;

      fruitGroup.add(fruit);
  }
}


