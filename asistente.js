if (annyang) {
    
    var voices;

    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.lang = 'es-AR';

    ///////////////
    //Cargamos las voce que tenemos en el sistema
    ///////////////
    window.speechSynthesis.onvoiceschanged = function(){
        voices = window.speechSynthesis.getVoices();
        console.log(voices);
    };

    var commands = {
        
        
        'Hola': function(){
            utter.text = 'Hola ¿Cual es tu nombre?';
            utter.voice = voices[2];
            window.speechSynthesis.speak(utter);
            
            
            ///////////////
            //Guarda el nombre que le decimos por voz.
            ///////////////
            annyang.addCallback('result', function (phrases) { 
                ///////////////
                //Imprime el nombre por consola.
                ///////////////
                console.log("Nombre: ", phrases[0]);
                ///////////////
                //El nuevo evento result.
                ///////////////
                annyang.removeCallback('result');
                ///////////////
                //Nos dice nuestro nombre.
                ///////////////
                utter.text = 'Hola, ' + phrases[0];
                window.speechSynthesis.speak(utter);
            });
        },
        'Quien eres' : function(){
            /* alert('Hola señor Rosero'); */
            utter.text = 'Hola soy Lis soy tu asistente personal, ¿en que puedo ayudarte?';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
        }
    
    };


    ///////////////
    //Esto es para ver lo que se dijo o lo que se podria haber dicho.
    ///////////////
     annyang.addCallback('result', function(phrases){
        console.log("Creo que el usuario dijo: ", phrases[0]);
        console.log("Pero, de nuevo, podría ser cualquiera de los siguientes : ", phrases);
    })
    


    ///////////////
    //Añadimos nuestros comandos
    ///////////////
    annyang.addCommands(commands);

    ///////////////
    //Espieza a escuchar
    ///////////////
    annyang.start({autoRestart: false, continuous: true});

} 