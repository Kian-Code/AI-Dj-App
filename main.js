Song = "";
Left_Wrist_X = 0;
Left_Wrist_Y = 0;
Right_Wrist_X = 0;
Right_Wrist_Y = 0;

Score_Left_Wrist = 0;
Score_Right_Wrist = 0;

function preload() {
  Song = loadSound("music.mp3");
}

function setup() {
  Canvas = createCanvas(600, 500);
  Canvas.center();
  Webcam = createCapture(VIDEO);
  Webcam.hide();
  Posenet = ml5.poseNet(Webcam, ModelLoaded);
  Posenet.on('pose', GotPoses);
}

function draw() {
  image(Webcam, 0, 0, 600, 500);
  fill("#34252F");
  stroke("#280000");
  if (Score_Right_Wrist > 0.2) {
    circle(Right_Wrist_X, Right_Wrist_Y, 20);

    if (Right_Wrist_Y > 0 && Right_Wrist_Y <= 100) {
      document.getElementById("Speed").innerHTML = "Speed = 0.5x";
      Song.rate(0.5);
    } else if (Right_Wrist_Y > 100 && Right_Wrist_Y <= 200) {
      document.getElementById("Speed").innerHTML = "Speed = 1x";
      Song.rate(1);
    } else if (Right_Wrist_Y > 200 && Right_Wrist_Y <= 300) {
      document.getElementById("Speed").innerHTML = "Speed = 1.5x";
      Song.rate(1.5);
    } else if (Right_Wrist_Y > 300 && Right_Wrist_Y <= 400) {
      document.getElementById("Speed").innerHTML = "Speed = 2x";
      Song.rate(2);
    } else if (Right_Wrist_Y > 400) {
      document.getElementById("Speed").innerHTML = "Speed = 2.5x";
      Song.rate(2.5);
    }
  }
  if (Score_Left_Wrist > 0.2) {
    circle(Left_Wrist_X, Left_Wrist_Y, 20);
    Number_Left_Wrist_Y = Number(Left_Wrist_Y);
    Remove_Decimals = floor(Number_Left_Wrist_Y);
    Volume = Remove_Decimals / 500;
    document.getElementById("Volume").innerHTML = "Volume = " + Volume;
    Song.setVolume(Volume);
  }
}

  function Play() {
    Song.play();
    Song.setVolume(1);
    Song.rate(1);
  }

  function ModelLoaded() {
    console.log("Posenet is initialized");
  }

  function GotPoses(results) {
    if (results.length > 0) {
      console.log(results);
      Score_Left_Wrist = results[0].pose.keypoints[9].score;
      Score_Right_Wrist = results[0].pose.keypoints[10].score;
      console.log("Score Right Wrist = " + Score_Right_Wrist);
      console.log("Score Left Wrist = " + Score_Left_Wrist);

      Left_Wrist_X = results[0].pose.leftWrist.x;
      Left_Wrist_Y = results[0].pose.leftWrist.y;
      console.log("Left wrist X = " + Left_Wrist_X + " Left wrist Y = " + Left_Wrist_Y);

      Right_Wrist_X = results[0].pose.rightWrist.x;
      Right_Wrist_Y = results[0].pose.rightWrist.y;
      console.log("Right wrist X = " + Right_Wrist_X + " Right wrist Y = " + Right_Wrist_Y);
    }
  }