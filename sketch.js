
var coolbkg, sky
var trackstar, greendude
var mafia 
var buildings, buildingImg
var buildingsGroup
var gamestates = "start"
var score=0
var ahSound, jumpSound, checkpointSound

function preload () {
    coolbkg= loadImage("coolbkg.jpeg");
    buildingImg= loadImage ("phtofc.jpeg");
    greendude = loadImage ("greendude.png");
    ahSound = loadSound ("AHsound.mp3");
    jumpSound = loadSound ("JUMPIES.mp3");
    checkpointSound = loadSound ("yippeSound.mp3");
}

function setup () {
    createCanvas (1200,600);

    

    sky = createSprite (600,300); 
    sky.addImage(coolbkg);
    sky.scale=1.3
   

    trackstar = createSprite (500,-200);
    trackstar.addImage (greendude);
    trackstar.scale = 0.1;


    buildingsGroup= createGroup()

   
}

function draw () {
    background ("orange");
      drawSprites (); 

      textSize(34)
      fill("Orange");
      stroke(rgb(random(0,255),random(0,255),random(0,255)));
      strokeWeight(3)
      text ("Score : " + score, 1000, 50);


    

    if (gamestates == "start") {
        strokeWeight(0)
        fill ("yellow")
        textSize (50);
        text("Press 'R' to start",400,300);
        textSize (30);
        text("Press 'space' to make the player jump on buildings and try not to fall down",100,350);
        if (keyDown ("R")) {
            gamestates = "play"
        }
    }
    else if(gamestates == "play"){
        trackstar.velocityY = trackstar.velocityY+1.5; 
        trackstar.collide (buildingsGroup);
        if (sky.x < 370) {
            sky.x = 800;
        }

        if (keyDown ("SPACE") && trackstar.y>100) {
            trackstar.velocityY = -13; 
            jumpSound.play ();
            jumpSound.setVolume (0.1);
        }
        
        if (score % 15 == 0) {
            checkpointSound.play ();
        }

        sky.velocityX = -1;

        spawnBuildings ();
        
        if(trackstar.y>590){

            gamestates = "over"
            ahSound.play ();
        }

        if(frameCount % 20 == 0){
            score = score + 1; 
        }
    }

    
    else{
        fill ("yellow")
        textSize (180);
        text ("Game Over!", 160,300);
        sky.velocityX = 0;
        buildingsGroup.setVelocityXEach(0);

    
    }

  

}



function spawnBuildings () {
    
    if (frameCount % 40 == 0){
        buildings = createSprite (1200,480);
        buildings.shapeColor = "black";
        buildings.velocityX = - (5 + score/30);
        buildings.addImage (buildingImg);
        buildings.scale=random(1.5,4);

        buildingsGroup.add (buildings);
        console.log (buildings.velocityX);
    }
}






