//physics engine module
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var bunny_img;
var button;
var bunny;

//load all the images
function preload(){
  bg_img = loadImage("background.png");
  food = loadImage("melon.png");
  bunny_img = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //creating ground
  ground = new Ground(200,680,600,20);

  //creating rope with 7 links
  rope = new Rope(7,{x:245,y:30});

  //button for dropping the watermelon onto sprite
  button = createImg("cut_btn.png");
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //sprite object(bunny)
  bunny = createSprite(200,620,100,100);
  bunny.addImage(bunny_img);
  bunny.scale = 0.2;

  //fruit body to feed the bunny
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  //constraint between rope and the fruit
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);
//push to not confuse computer
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
// to show rope and ground
  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
   
}

//drop for the bunny 
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}