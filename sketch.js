var forceMode=false;
var nightTime
var eyeLeft
var eyeRight
var eyeDistance=110
var eyeLeft=-eyeDistance;
var eyeRight=eyeDistance;
var bg_col
var compSize = 0
var owlDay
var owlNight;
var textDay;
var textNight;
a=0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(60);
  angleMode(DEGREES);
  noStroke();
  textAlign(CENTER);
  rectMode(CENTER);
  owlDay = new Owl();
  owlNight = new Owl();
  textDay = new Text();
  textNight = new Text();
}

function draw() {
  
  translate(width/2,height/2);
  scale(compSize/500);
  if(width>height) {compSize=height;}
  else {compSize=width;}
  
  if (forceMode===false) {
  if(hour()>6 && hour()<22) {
  nightTime = 0;
  bg_col = color(215);
  background(bg_col);
  
  owlDay.body(color(239, 231, 129));
  owlDay.eyesClosed(190,50,bg_col);
  owlDay.clocks(color(120,70,80),color(244, 236, 132),200,-125);

  textDay.topText(125);
  textDay.bottomText("time to rest!",125);
  
    }
  
  else {
  nightTime = 1
  bg_col = color(45, 30, 63);
  background(bg_col);
  
  owlNight.body(color(235, 227, 125));
  owlNight.eyesOpen(195-50,150-30,color(bg_col),color(244, 236, 132));
  owlNight.clocks(color(52, 33, 89),color(153, 146, 61),color(67, 50, 87),-125);
  
  textNight.topText(195);
  textNight.bottomText("time to work!",195);
  
  //Night Filter
  scale(compSize)
  fill(68, 2, 147,30)
  rect(0,0,compSize,compSize);
  
    }
  }
  
  else {
    
    if(nightTime===0) {
      
      bg_col = color(45, 30, 63);
      background(bg_col);
  
      owlNight.body(color(235, 227, 125));
      owlNight.eyesOpen(195-50,150-30,color(bg_col),color(244, 236, 132));
      owlNight.clocks(color(52, 33, 89),color(153, 146, 61),color(67, 50, 87),-125);
  
      textNight.topText(195);
      textNight.bottomText("time to work!",195);
      
      //Night Filter
      scale(compSize)
      fill(68, 2, 147,30)
      rect(0,0,compSize,compSize);
      
    }
    
    else {
      
      bg_col = color(215);
      background(bg_col);
  
      owlDay.body(color(239, 231, 129));
      owlDay.eyesClosed(190,50,bg_col);
      owlDay.clocks(color(120,70,80),color(244, 236, 132),200,-125);

      textDay.topText(125);
      textDay.bottomText("time to rest!",125);
      
    }
    
  }
  //DEBUGGING
  //console.log("s: "+second());
  //console.log("m: "+minute());
  //console.log("h: "+hour());
  //console.log("nightTime: "+nightTime);
  
  }

function Owl() {
  
  this.body = function(beakShadowCol) {
  ears(450,350,-190,100,color(120,70,80));
  head(400,60,color(120,70,80));
  beak(150,25,0,360,color(244, 236, 132));
  beak(150,25,270,90,beakShadowCol);
  forhead(eyeLeft,color(110,60,70),280,-15);
  forhead(eyeRight,color(110,60,70),195,-100);

  }
  
  this.eyesClosed = function(size,col,col2) {
  //posX,posY,offsetY,dimX,dimY,dimX_offset,dimY_offset,socket,col,col2
  eye(eyeRight,0,10,140,110,20,10,0,col,col2);
  eye(eyeLeft,0,10,140,110,20,10,0,col,col2);
    
  }
  
  this.eyesOpen = function(size,sizePupil,col,col2) {
  //posX,posY,offsetY,dimX,dimY,dimX_offset,dimY_offset,socket,col,col2
  eye(eyeRight,0,0,size,size,-15,-20,200,col,col2);
  eye(eyeLeft,0,0,size,size,-15,-20,200,col,col2);
  eyePupil(eyeRight,0,sizePupil);
  eyePupil(eyeLeft,0,sizePupil);
  }
  
  this.clocks = function(col,col_ind,col_indRound,length) {
  
  eyeSocketSecondary(eyeRight,0.6,col,24);
  eyeSocket(eyeLeft,0.6,col,12);
  
  indicator(eyeRight,0.5,90,col_ind,minute()*360/60,length);
  indicator(eyeLeft,0.5,90,col_ind,hour()*360/12,length);
  indicatorRound(eyeRight,110,110,-90,1,col_indRound,second()*360/60);
  indicatorRound(eyeRight,-110,110,-90,1,col_indRound,minute()*360/60); 
  
  }
  

function indicator(posX,size,rot,col,time,length) {
  push();
  translate(posX,0);
  rotate(rot);
  scale(size);
  stroke(col);
  strokeWeight(12);
  rotate(time);
  line(-140,0,length,0);
  pop();
}

function indicatorRound(posX,x,y,rot,flip,col,time) {
  push();
  translate(x,y);
  scale(flip,1)
  rotate(rot);
  noFill();
  stroke(col);
  strokeWeight(7);
  arc(posX,0,197,197,0,time);
  pop();
}

function eyeSocket(posX,size,col,num) {
  push();
  translate(posX,0);
  scale(size);
  stroke(col);
  strokeWeight(5);
  rotate(a);
  for(i = 0;i<=num;i++) {
  line(-150,0,-130,0);
  rotate(360/num);
  }
  if(a!=360) {if(second()===0){a+=2}}
  if(a==360) {if(second()==59){a=0}}
  pop();
}

function eyeSocketSecondary(posX,size,col,num) {
  push();
  translate(posX,0);
  scale(size);
  stroke(col);
  strokeWeight(5);
  rotate(a);
  for(i = 0;i<=num;i++) {
  line(-150,0,-130,0);
  rotate(360/num);
  }
  if(a!=360) {if(second()===0){a+=3}}
  if(a==360) {if(second()==59){a=0}}
  pop();
}

function eye(posX,posY,offsetY,dimX,dimY,dimX_offset,dimY_offset,socket,col,col2) {
  push();
  fill(col)
  ellipse(posX,posY,dimX-dimX_offset,dimY-dimY_offset);
  fill(color(120,120,120,100));
  ellipse(posX,posY,socket,socket)
  fill(col2)
  ellipse(posX,posY-offsetY,dimX,dimY);
  pop();
}

function eyePupil(posX,posY,pupil) {
  push();
  fill(45);
  ellipse(posX,posY,pupil,pupil);
  noFill();
  stroke(250,250,250,245)
  strokeWeight(8);
  arc(posX,posY,pupil-20,pupil-20,290,330);
  pop(); 
}

function forhead(posX,col,arc1,arc2) {
  push();
  translate(0,-15);
  fill(col)
  ellipse(posX,0,225);
  fill(bg_col)
  ellipse(posX,15,225);
  fill(bg_col-5)
  ellipse(posX,15,200);
  noFill();
  stroke(110,60,70);
  strokeWeight(5);
  strokeCap(PROJECT);
  arc(posX,-26.7,200,200,arc1,arc2);
  pop();
}

function head(size,posY,col) {
  push();
  translate(0,-15);
  fill(col)
  arc(0,posY,size+80,size,180,0);
  fill(bg_col);
  ellipse(0,50,50,50);
  pop();
}

function ears(size_w,size_h,posY,posY_offset,col) {
  push();
  translate(0,-15);
  fill(col)
  
  arc(0,posY,size_w,size_h,0,180);
  fill(bg_col)
  
  arc(0,posY-posY_offset,size_w+100,size_h,0,180);
  stroke(110,60,70);
  strokeWeight(5);
  arc(0,posY-posY_offset,size_w+100,size_h,24.7,155.3);
  pop();
}

function beak(size,posY,arc1,arc2,col) {
  push();
  translate(0,30);
  fill(col)
  arc(0,posY,size-60,size,arc1,arc2);
  pop();
}
}

function Text() {
  
  this.topText = function(txt_col) {  
  
  fill(txt_col);
  textSize(18);
  textStyle(BOLD);
  text("a clock for night owls!",0,-200);
  textStyle(NORMAL);
  textSize(14);
  text("click to force wake up/sleep",0,-180);
  }
  
  this.bottomText = function(message,txt_col) {
  fill(txt_col);
  textSize(48);
  if(minute() <= 9) {text(hour()+":0"+minute(),0,190);}
  else{text(hour()+":"+minute(),0,190);}
  textSize(21);
  fill(txt_col);
  text(message,0,220);
  }
  
}
function windowResized() {resizeCanvas(windowWidth,windowHeight);}

function mousePressed() {if(forceMode===false){forceMode=true;} else {forceMode=false;}}