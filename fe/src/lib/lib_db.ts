import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    getDoc,
    where,
    query,
} from "firebase/firestore";
import * as _ from "firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";

// Required for side-effects
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function runFunction(){
    transcribeAudioFile
}
export async function createMessage() {
    // console.log('hi')
    saveAudioFileToStorage()
    transcribeAudioFile()
    const docRef = await addDoc(collection(db, "messages"), {
        name: "message name",
        transcript: "this is a transcript of the message that was recorded",
        creation_date: Timestamp.fromDate(new Date())
    });
}

//saves blob to firebase storage and returns id/link to object
async function saveAudioFileToStorage() {
    
}

const sdk = require("microsoft-cognitiveservices-speech-sdk")

//makes api call to transcribe audio and returns transcript string
async function transcribeAudioFile() {
    
    const speechConfig = sdk.SpeechConfig.fromSubscription('1cf2d9e4892644eea672b9808a3f7439', 'eastus');
        speechConfig.speechRecognitionLanguage = "en-US";
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("speechsample.wav"));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}
// get message
// upload blob
// get blob
