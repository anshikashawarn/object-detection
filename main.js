img="";
status="";
object=[];
function preload(){
    img=loadImage('dog_cat.jpg');
    
}
function setup(){
    canvas=createCanvas(600, 420);
    canvas.center();
    object_detector= ml5.objectDetector('cocoSSD',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function draw(){
    console.log("modelloaded");
    image(img,0,0,600,420);
    
    /*fill("#FF0000"); text("Dog", 45, 75); noFill(); stroke("#FF0000"); rect(30, 60, 450, 350 );*/
    if (status != ""){
        object_detector.detect(img,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+ " " +percent+ "%",object[i].x+15, object[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x-10, object[i].y, object[i].width,object[i].height );
            
        }
        console.log("no.of object: "+object.length);
    }
}
function modelLoaded(){
    console.log("model is Loaded");
    status= true;
    object_detector.detect(img,gotResult);
    
}
function gotResult(error,result){
    if(error){
        console.log("error");
    }
    console.log(result);
    object=result;
} 


