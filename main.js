prev1 = "";
prev2 = "";

Webcam.set({
    width: 350,
    height: 350,
    imageFormat: "png",
    pngQuality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capturar(){
    Webcam.snap(function (data_uri){
        document.getElementById("foto").innerHTML = "<img id='imagem' src=" + data_uri + "/>";
    });
}

console.log("ml5 versão: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Qf66zB8hH/model.json", modelLoaded);

function modelLoaded(){
    console.log("O modelo foi carregado");
}

function speak(){
    apivar = window.speechSynthesis;

    fala1 = "A primeira previsão é " + prev1;
    fala2 = "A segunda previsão é " + prev2;
    fala3 = new SpeechSynthesisUtterance(fala1 + fala2);

    apivar.speak(fala3);
}

function identificar(){
    foto = document.getElementById("img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("resultado").innerHTML = results[0].label;
        document.getElementById("resultado2").innerHTML = results[0].label;

        prev1 = results[0].label;
        prev2 = results[1].label;

        speak();

        if(results[0].label == "Ok"){
            document.getElementById("emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Tranquilo"){
            document.getElementById("emoji").innerHTML = "&#129305;";
        }
        if(results[0].label == "Paz"){
            document.getElementById("emoji").innerHTML = "&#9996;";
        }

        if(results[1].label == "Ok"){
            document.getElementById("emoji").innerHTML = "&#128077;";
        }
        if(results[1].label == "Tranquilo"){
            document.getElementById("emoji").innerHTML = "&#129305;";
        }
        if(results[1].label == "Paz"){
            document.getElementById("emoji").innerHTML = "&#9996;";
        }
    }
}