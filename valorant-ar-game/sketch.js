// create a variable to hold our world object
let world;

// global variables for first marker scene
let knife;
let chars;
let dia;
let immo;
let van;
let rad;
let rad2;
let rad3;
let rad4;
let rad5;
let rad6;
let rad7;
let speed = 0.001;
let speedImmo = 0.002;
let speedDia = 0.002;
// second marker scene variables
// art for dizzy and wingman
let dizzyPic;
let wingmanPic;
let wingman = [];
let dizzy = [];
// art for player knife
let playerKnife;
// position of player
let playerX = 0;
// amount of creature's collect
let dizzyCollected = 0;
let wingmanCollected = 0;
let won = false;

// create a variable to hold our marker
let markerStart;
let markerGame;
let markerTrophy;

// bg stuff
let textBg;
let textBg2;

// final marker varibles 
let tro;
let champ;

// load in images for dizzy and wingman
function preload() {
  playerKnife = loadImage("images/mosh.png");
  dizzyPic = loadImage("images/dizzy.png");
  wingmanPic = loadImage("images/wingman.png");
  textBg = loadImage("images/bgDetails.png");
  textBg2 = loadImage("images/bgDetails2.png");
  champ = loadImage("images/champion.png");
}

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  markerStart = world.getMarker('hiro');
  markerGame = world.getMarker('zb');
  markerTrophy = world.getMarker('k');

  // add knife to scene
  knife = new GLTF({
    asset: 'knife',
    x: 0,
    y: 0.75,
    z: 0,
    scaleX: 0.1,
    scaleY: 0.1,
    scaleZ: 0.1
  });
  markerStart.addChild(knife);

  // add jett and neon to scene
  chars = new GLTF({
    asset: 'jett_neon',
    x: 0,
    y: 0,
    z: 0,
    scaleX: 0.3,
    scaleY: 0.3,
    scaleZ: 0.3
  });
  markerStart.addChild(chars);

  // add diamond rank
  dia = new GLTF ({
    asset: 'diamond',
    x: 0.3,
    y: 0.5,
    z: -0.1,
    rotationX: 90,
    scaleX: 0.1,
    scaleY: 0.1,
    scaleZ: 0.1
  });
  markerStart.addChild(dia);

  // add diamond rank
  immo = new GLTF ({
    asset: 'immortal',
    x: 0.075,
    y: 0.6,
    z: -0.1,
    rotationX: 90,
    scaleX: 0.1,
    scaleY: 0.1,
    scaleZ: 0.1
  });
  markerStart.addChild(immo);

  // add vandal
  van = new GLTF ({
    asset: 'vandal',
    x: -0.1,
    y: 1.3,
    z: 0,
    scaleX: 0.75,
    scaleY: 0.75,
    scaleZ: 0.75
  });
  markerStart.addChild(van);

  rad = new Box({
    asset: 'radi',
    x: 0.2,
    y: 0.01,
    z: -0.3,
    width: 0.2,
    height: 0.2,
    depth: 0.2
  });
  markerStart.addChild(rad);

  rad2 = new Box({
    asset: 'radi',
    x: 0.4,
    y: 0.01,
    z: -0.3,
    width: 0.2,
    height: 0.2,
    depth: 0.2
  });
  markerStart.addChild(rad2);

  rad3 = new Box({
    asset: 'radi',
    x: 0.2,
    y: 0.21,
    z: -0.3,
    scaleX: 0.2,
    scaleY: 0.2,
    scaleZ: 0.2
  });
  markerStart.addChild(rad3);

  rad4 = new Box({
    asset: 'radi',
    x: -0.2,
    y: 0.01,
    z: 0.3,
    width: 0.2,
    height: 0.2,
    depth: 0.2,
  });
  markerStart.addChild(rad4);

  rad5 = new Box({
    asset: 'radi',
    x: -0.4,
    y: 0.01,
    z: 0.3,
    width: 0.2,
    height: 0.2,
    depth: 0.2,

  });
  markerStart.addChild(rad5);

  rad6 = new Box({
    asset: 'radi',
    x: -0.4,
    y: 0.01,
    z: 0.5,
    width: 0.2,
    height: 0.2,
    depth: 0.2,
  });
  markerStart.addChild(rad6);

  // add spike to scene
  spi = new GLTF({
    asset: 'spike',
    x: -0.5,
    y: -0.001,
    z: 0.2,
    scaleX: 0.05,
    scaleY: 0.05,
    scaleZ: 0.05
  });
  markerStart.addChild(spi);

  // add text 
  let text = new Text({
    text: "Hold up the ZB Marker to play a game with Gekko's critters!",
    red: 81, green: 59, blue: 114,
    side: 'double',
    x: 0, y: 0, z: 0.80,
    rotationX: -90,
    scaleX: 2, scaleY: 2, scaleZ: 2
    });
    markerStart.addChild(text);

  // instantiate gekko's pets 
  for (let w = 0; w < 5; w++) {
    let temp = new GekkoPet(wingmanPic);
    wingman.push(temp);
  }
  for (let d = 0; d < 5; d++) {
    let temp = new GekkoPet(dizzyPic);
    dizzy.push(temp);
  }

    // add spike to scene
    tro = new GLTF({
      asset: 'trophy',
      x: 0,
      y: 0,
      z: 0,
      scaleX: 0.2,
      scaleY: 0.2,
      scaleZ: 0.2
    });
    markerTrophy.addChild(tro);
  }
    
  function draw() {
    // rotation
    knife.spinY(1.5);
    chars.spinY(1);

    // animation for vandal
    van.nudge(0,speed,0);
    
    if (van.getY() >= 1.5) {
      speed = -0.001;
    }
    
    if (van.getY() < 1.5 && van.getY() <= 1.3) {
      speed = 0.001;
    }

    // animation for immo
    immo.nudge(0,speedImmo,0);
    
    if (immo.getY() >= 0.6) {
      speedImmo = -0.002;
    }
    
    if (immo.getY() < 0.6 && immo.getY() <= 0.5) {
      speedImmo = 0.002;
    }
    
    // animation for dia
      dia.nudge(0,speedDia,0);
    
    if (dia.getY() >= 0.5) {
      speedDia = -0.002;
    }
        
    if (dia.getY() < 0.5 && dia.getY() <= 0.4) {
      speedDia = 0.002;
    }

    // if game has not been won yet
    if (won == false && markerGame.isVisible()) {
      world.clearDrawingCanvas();
      // gekko critter game code 
      // if marker is visible, begin to play game!
      if (markerGame.isVisible() == true) {
        // get position of marker and put player at the same image 
        let markerPosition = markerGame.getScreenPosition();
        playerX = markerPosition.x;
      }
      
      // get gekko's critters on the screen
      imageMode(CENTER);
      for (let w = 0; w < wingman.length; w++) {
        wingman[w].display();
        wingman[w].moveAndCollect();
      }
      for (let d = 0; d < dizzy.length; d++) {
        dizzy[d].display();
        dizzy[d].moveAndCollect();
      }
      // draw player at position
      image(playerKnife, playerX, height - 100, 100, 100);

      imageMode(CORNER);
      image(textBg, 0, 70, width/1.5, height/1.5);

      textSize(40);
      fill(0); 
      text(dizzyCollected, 90, 120);
      text(wingmanCollected, 90, 180);

      image(textBg2, 270, 70, width/1.5, height/1.5);

      // if game objective is complete, display winning screen!
      if (wingmanCollected >= 5 && dizzyCollected >= 5) {
        won = true;
      }
    }

    // if game is won and marker is on screen
    if (won == true) {
      world.clearDrawingCanvas();
      fill(255, 154, 200);
      textSize(15);
      text("Congratulations! Now hold up the KANJI marker to see your prize!", 180, height/2);
      if (markerTrophy.isVisible()) {
        world.clearDrawingCanvas();
        tro.rotateY(1);
        imageMode(CORNER)
        image(champ, 0, 0);
      }
    }
  }
    
  // class for wingman & dizzy
  class GekkoPet {
    constructor(pet) {
      this.x = random(0 + 100, width - 100);
      this.y = -100;
      this.pet = pet;
      this.speed = random(2, 5);
      this.size = random(50, 75);
      this.rotationAngle = 0;
      this.rotationSpeed = radians(random(1, 5))
  }
  
    display() { 
      // make pet spin as they fall down
      push(); 
      translate(this.x, this.y);
      rotate(this.rotationAngle);
      image(this.pet, 0, 0, this.size, this.size);
      pop(); 
    }
    
    moveAndCollect() {
      // move down screen slowly 
      this.y += this.speed;
    
      // keep rotating pet 
      this.rotationAngle += this.rotationSpeed;

      // if pet reaches bottom of screen, reset his position
      if (this.y > height + 15) {
        // reset x
        this.x = random(0 + 100, width - 100);
        // reset y
        this.y = -this.size;
      }
    
      // if pet collides with user
      if (dist(playerX, height, this.x, this.y) < 110) {
        if (this.pet == dizzyPic) {
          dizzyCollected += 1;
          // reset x
          this.x = random(0 + 100, width - 100);
          // reset y
          this.y = -this.size;
        }
        if (this.pet == wingmanPic) {
          wingmanCollected += 1;
          // reset x
          this.x = random(0 + 100, width - 100);
          // reset y
          this.y = -this.size;
        }
      }
    }
  }