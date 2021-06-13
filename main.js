    prediction_1="";
    prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RoZBn4a_p/model.json",modelloaded);
function modelloaded(){
    console.log("modelloaded");
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        if(prediction_1=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(prediction_1=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(prediction_1=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }



        if(prediction_2=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(prediction_2=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(prediction_2=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }

        speak();
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The First Prediction Is "+prediction_1;
    speak_data2="And The Second Prediction Is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterthis.rate=0.9;
    synth.speak(utterthis);
}