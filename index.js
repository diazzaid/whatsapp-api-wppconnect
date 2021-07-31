const express = require('express');
const app = express();
const wppconnect = require('@wppconnect-team/wppconnect');
var instance; //variable that the client will receive to be called in other lib functions


app.use(express.json()); //parser used for requests via post,
app.use(express.urlencoded({ extended : true }));


app.get('/getconnectionstatus', async function (req, res) {

    //console.log("Solicitou status de conexao");
    console.log("Requested connection status");

    var return_message =''; //request return message
    var success = false; //If the request was successful
    var return_object;

    const executa = async()=>{

            if (typeof(instance) === "object"){ //Validating if lib is started
                return_message = await instance.getConnectionState(); //whats connection status validated 
                                                                
                success = true;
            }else{
                return_message = 'The instance was not initialized';               
            }
            return_object = {
                status : success,
                message :return_message,           
            };
            res.send(return_object); 
    };
    executa();

  });

app.post('/send-message', async function (req, res) {

    console.log("Requested sending VIA POST message");

    //parameters coming in the request
    var number = req.body.number;
    var message = req.body.message;
    //***********/

    var return_message =''; //request return message
    var success = false; //If the request was successful
    var return_object;

    const executa = async()=>{

            if (typeof(instance) === "object"){ //Validating if lib is started
                status = await instance.getConnectionState(); //whats connection status validated 
                                                                
                if(status === 'CONNECTED'){
                    let numberExists = await instance.checkNumberStatus(number+'@c.us');  //Validating if the number exists
                 
					if(numberExists.canReceiveMessage===true){
                       await instance
                            .sendText(numberExists.id._serialized, message)
                            .then((result) => {
                                console.log('Result: ', result); //return object success
                                success=true;
                                return_message=result.id;
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });

                    }else{
                        return_message='Nomor tidak tersedia atau diblokir - Nomor tidak tersedia atau diblokir.';
                    }
                }else{                          
                    return_message = 'Validasi koneksi internet atau QRCODE Anda - Validasi koneksi internet atau QRCODE Anda';
                }
            }else{
                return_message = 'Instance tidak diinisialisasi - Instance tidak diinisialisasi';               
            }
            return_object = {
                status : success,
                message :return_message,           
            };
            res.send(return_object); 
    };
    executa();

  });

  
startWPP(); //call function to initialize the lib

async function startWPP (){ 
    await wppconnect.create({session: 'session',
        catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
    },  
    statusFind: (statusSession, session) => {
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
    },
        headless: false, // Headless chrome
        devtools: false, // Open devtools by default
        useChrome: false, // If false will use Chromium instance
        debug: false, // Opens a debug session
        logQR: true, // Logs QR automatically in terminal
        //browserWS: 'ws://localhost:3030', // If u want to use browserWSEndpoint
        browserArgs: [
		'--log-level=3',
                    '--no-default-browser-check',
                    '--disable-site-isolation-trials',
                    '--no-experiments',
                    '--ignore-gpu-blacklist',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-default-apps',
                    '--enable-features=NetworkService',
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    // Extras
                    '--disable-webgl',
                    '--disable-threaded-animation',
                    '--disable-threaded-scrolling',
                    '--disable-in-process-stack-traces',
                    '--disable-histogram-customizer',
                    '--disable-gl-extensions',
                    '--disable-composited-antialiasing',
                    '--disable-canvas-aa',
                    '--disable-3d-apis',
                    '--disable-accelerated-2d-canvas',
                    '--disable-accelerated-jpeg-decoding',
                    '--disable-accelerated-mjpeg-decode',
                    '--disable-app-list-dismiss-on-blur',
                    '--disable-accelerated-video-decode',
				    '--single-process', // <- this one doesn't works in Windows
		], 
		
		// Parameters to be added into the chrome browser instance
		//puppeteerOptions: {userDataDir: './tokens/session', // for multidevice beta
		//},
        disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
        updatesLog: true, // Logs info updates automatically in terminal
        autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
        tokenStore: 'file', // Define how work with tokens, that can be a custom interface
        folderNameToken: './tokens', //folder name when saving tokens
    }).then((client) => {
            start(client);
    }).catch((erro) => console.log(erro));

}

async function start(client) {
    instance = client; //It will be used in REST requests

    client.onMessage( async (message) => {

    }); 
    client.onAck(ack => {

    });
    client.onStateChange( async (state) => {

    });

}


const porta = '3000'; 
var server = app.listen(porta);
console.log('Server dimulai pada port %s', server.address().port);
