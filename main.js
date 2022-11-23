
status="";
objects=[];
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function gotResults(error,results)
{
if(error)
{
    console.log(error);
}
console.log(results);
objects=results;
}
function draw()
{
   image(video, 0, 0, 480, 380);
if( status !=" ")
{
objectDetector.detect(video,gotResults);
for(i=0;i<objects.length;i++)
{
    document.getElementById("status").innerHTML="status : object detected";
    fill("blue");
    percent=floor(objects[i].confidence *100);
    Text(objects[i].label+" "+percent+"%",objects[i].x+15, objects[i].y+15);
    noFill();
    stroke("blue");
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label==object_name)
    {
          video.stop();
          document.getElementById("object_found").innerHTML=object_name+" found ";
          synth = window.speechSynthesis;
           utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
          synth.speak(utterThis);
    }
    else
    {
        document.getElementById("object_found").innerHTML=object_name+" Not found ";
    }
}

}
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting object";
    object_name = document.getElementById("object_name").value;

}
function modelLoaded()
{
    console.log('modelloaded');
    status=true;
}

