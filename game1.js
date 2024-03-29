window.addEventListener('load', function(){
//canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//inputhandler is for spesified user inputs
class InputHandler {
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', e => {
            if(((e.key === 'ArrowUp') ||
               (e.key === 'ArrowDown') ||
               (e.key === 'w') ||
               (e.key === 's') 
         ) && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key);
            } else if (e.key === ' '){
                this.game.player.shootTop(); 
            }
        });
        window.addEventListener('keyup', e=>{
            if (this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
       
        });
    }
}
//player lasers
class Projectile {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.markedForDeletion = false;
            this.speed = 3;
        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width *0.8) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
}

//to control the main character
class Player{
        constructor(game){
            this.game = game;
            this.width = 200;
            this.height = 300;
            //horizontal x coordinates and vertical y cordinates below
            this.x = 20; 
            this.y = 100;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 1;
            this.projectiles = [];
            this.image = document.getElementById('player');

        }
        update() {
            if (this.game.keys.includes('ArrowUp')) this.speedY = -1;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = 1;
            else this.speedY = 0;
        
            // handle projectile
            this.projectiles.forEach(Projectile => {
                Projectile.update();
            });
            this.projectiles = this.projectiles.filter(Projectile => !Projectile.markedForDeletion);
        
            // increase vertical y position on the player by speedY
            // sprite animation with a slower frame change rate
            if (this.frameX % 3 === 0) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        
            this.y += this.speedY;
        }
        draw(context) {
           
            context.drawImage(
                this.image,
                this.frameX * this.width, this.frameY * this.height, this.width, this.height,
                this.x, this.y, this.width, this.height
            );
        
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            if (this.game.ammo > 0 ){
            this.projectiles.push(new Projectile (this.game, this.x, this.y));
            this.game.ammo--;
        }
    }
}
class Player2{
    constructor(game){
        this.game = game;
        this.width = 200;
        this.height = 300;
        //horizontal x coordinates and vertical y cordinates below
        this.x = this.game.width - this.width - 20;
        this.y = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 1;
        this.projectiles = [];
        this.image = document.getElementById('player2'); 

    }
    update() {
        if (this.game.keys.includes('w')) this.speedY = -1;
        else if (this.game.keys.includes('s')) this.speedY = 1;
        else this.speedY = 0;
    
        // handle projectile
        this.projectiles.forEach(Projectile => {
            Projectile.update();
        });
        this.projectiles = this.projectiles.filter(Projectile => !Projectile.markedForDeletion);
    
        // increase vertical y position on the player by speedY
        // sprite animation with a slower frame change rate
        if (this.frameX % 3 === 0) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    
        this.y += this.speedY;
    }
    draw(context) {
       
        context.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height
        );
    
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
    }
    shootTop(){
        if (this.game.ammo > 0 ){
        this.projectiles.push(new Projectile (this.game, this.x, this.y));
        this.game.ammo--;
    }
}
}
// for enemy types
class Enemy{
constructor(game){
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    this.lives = 5;
    this.score = this.lives;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
        
}
update(){
 this.x += this.speedX - this.game.speed;
if (this.x + this.width < 0) this.markedForDeletion = true;
// sprite animation
if (this.frameX < this.maxFrame){
    this.frameX++;
}
else this.frameX = 0;
}
draw (context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.font = '20px Helvetica';
    context.fillText(this.lives, this.x, this.y);

}
}
class BallEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.width = 50;
        this.height = 50;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById('Angler1'); // Make sure to set the correct ID for your ball PNG
        this.speedX = Math.random() * 1.5 + 0.5; // Change speed and direction
    }
}
class Angler1 extends Enemy {
    constructor(game){
        super(game);
        this.width = 228 ;
        this.height = 169 ;
        this.y = Math.random() * (this.game.height * 0.9 - this.height); 
        this.image = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
            
      }
}

//individual background layers
class Layer {
constructor (game,image,speedModifier){
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;

}

update(){
    if(this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
}

draw(context){ 
context.drawImage(this.image, this.x, this.y);
}

}
// pull all layers objects to animate the entire world
class Background{
constructor(game){
    this.game = game;
    this.image1 = document.getElementById('layer1');
    this.layer1 = new Layer (this.game, this.image1, 1);
    this.layers = [this.layer1];

}
update(){
    this.layers.forEach(layer => layer.update());
}
draw(context){
    this.layers.forEach(layer => layer.draw(context));
}
}
//score, timer, other info for the user
class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Helveltica';
        this.color = 'white';
    }
    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px' + this.fontFamily;
          //score
        context.fillText('Score: ' + this.game.score, 20, 40);
        //ammo
        context.fillStyle = this.color;
        for (let i = 0; i < this.game.ammo; i++){
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }
        //timer
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        context.fillText('Timer: ' + formattedTime, 20, 100);
        //game over messages
        if (this.game.gameOver){
            context.textAlign = 'center';
            let message1;
            let message2;
        if  (this.game.score > this.game.winningScore){
            message1 = 'You Win';
            message2 = 'Well done';
        }  else {
            message1 = 'You lose';
            message2 = 'Try again next time!';
        } 
            context.font = '50px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
            context.font = '25px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
    }       
        context.restore();
    }
}
class Game{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this)
        this.background = new Background(this);
        this.player2 = new Player2(this);
        this.keys = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 10;
        this.gameTime = 0;
        this.timeLimit = 15000;
        this.speed = 1;
    }
    addEnemy() {
        this.enemies.push(new BallEnemy(this));
    }
    update(deltaTime){
        if(!this.gameOver) this.gameTime += deltaTime;
        if(this.gameTime > this.timeLimit) this.gameOver = true;
        this.background.update();
        this.player.update();
        this.player2.update();
        if (this.ammoTimer > this.ammoInterval){
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        }
        else {
            this.ammoTimer += deltaTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update();  
            if(this.checkCollision(this.player, enemy)){
                enemy.markedForDeletion = true;
            }     
            this.player.projectiles.forEach(projectile => {
                if(this.checkCollision(projectile, enemy)){
                   enemy.lives--;
                   projectile.markedForDeletion = true;
                   if (enemy.lives <= 0 ){
                    enemy.markedForDeletion = true;
                    if (!this.gameOver) this.score += enemy.score;
                    if (this.score > this.winningScore) this.gameOver = true;
                   }
                }
            })
         });
         this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
         if(this.enemyTimer > this.enemyInterval && !this.gameOver){
            this.addEnemy();
            this.enemyTimer = 0;
         } else {
            this.enemyTimer += deltaTime;
         }
    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
        this.player2.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(enemy => { enemy.draw(context); 
        }); 
    }
    addEnemy(){
        this.enemies.push(new Angler1(this));
        //add console here maybe?
    }
    checkCollision(rect1, rect2){
        return(
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y);
    }
}

const game = new Game(canvas.width, canvas.height);
let lastTime = 0;
//ANIMATION LOOP
function  animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    console.log(deltaTime);
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}
animate(0);
}) ;

