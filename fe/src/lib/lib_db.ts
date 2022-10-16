import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

import type {DocumentData} from "firebase/firestore";
import * as _ from "firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let audio = new Audio()
let prevReset: () => void = () => {};
audio.addEventListener('ended', () => { prevReset() });
export function playAudio(path:string, reset: () => void ) {
    prevReset();
    prevReset = reset;
    audio.setAttribute('src', path)
    audio.load()
    audio.play()
}

export function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    prevReset();
    prevReset = () => {}
}


// Required for side-effects
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM1qZNRK_0sg5qJSxE6t7QlDDYYply4J0",
  authDomain: "sachacks4.firebaseapp.com",
  projectId: "sachacks4",
  storageBucket: "sachacks4.appspot.com",
  messagingSenderId: "555120022585",
  appId: "1:555120022585:web:a9d9ed271c2195145269e8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, "gs://sachacks4.appspot.com");

export async function runFunction() {
  console.log('clicked title')
  let docs = await getMessages()
  docs.filter(f => true);
  console.log('in runFunction')
  search("transcript", docs);
}
export async function createMessage(blob: Blob, name: string) {
  name = name.trim();
  
  //upload
  const random_path = "audio/" + doc(collection(db, "temp")).id + ".ogg";
  const encoded = encodeURIComponent(random_path)
  await saveAudioFileToStorage(blob, random_path);
  const storage_url = 'https://firebasestorage.googleapis.com/v0/b/sachacks4.appspot.com/o/' + encoded + '?alt=media';
  const transcript = await transcribeAudioFile(storage_url);
  console.log(transcript);

  const docRef = await addDoc(collection(db, "messages"), {
      name:name,
      transcript:transcript,
      url:storage_url,
      creation_date: Timestamp.fromDate(new Date())
  });
}

// Fetch all documents in messages collection
export async function getMessages(): Promise<DocumentData[]> {
    const querySnapshot = await getDocs(collection(db, "messages"));
    let docs = querySnapshot.docs.map(e=>e.data());
    return docs;
}

export async function search(term:string, docs:DocumentData[]): Promise<DocumentData[]> {
    term = term.toLowerCase();
    // Retreive all documents to search through
    return docs.filter(doc => doc.transcript.toLowerCase().includes(term) || doc.name.toLowerCase().includes(term));
}


//saves blob to firebase storage and returns id/link to object
async function saveAudioFileToStorage(blob: Blob, name: string) {
  const blobRef = ref(storage, name);
  uploadBytes(blobRef, blob).then((snapshot) => {
    console.log("SNAPSHOT:", snapshot);
  });
}

//makes api call to transcribe audio and returns transcript string
//input - url to audio file
async function transcribeAudioFile(url: string):Promise<string> {
  try {
    const res = await fetch("https://api.assemblyai.com/v2/transcript", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "257838bed8f84c9fb3f41453fc1564f6",
      },
      method: "POST",
      body: JSON.stringify({
        audio_url: url
      }),
      mode: "cors",
    });

    let json = await res.json();

    let transcript_id = json["id"];

    console.log("starting transcript :)");
    let done_transcribing = false;
    //try fetching transcript every 2 secs for 40 secs
    for (let i = 0; i < 20; i++) {
      await delay(2000);
      console.log("requesting for completion");
      let res2 = await fetch(
        "https://api.assemblyai.com/v2/transcript/" + transcript_id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "257838bed8f84c9fb3f41453fc1564f6",
          },
        }
      );
      let res3 = await res2.json();
      console.log(res3);
      if(res3.status == 'completed') {
        done_transcribing = true;
        return res3.text; //this is the transcripted text.
      }
      else if(res3.status != 'processing') {
        done_transcribing = true;
        return res3.text; //this is the transcripted text.
      }; 
    }
    if(!done_transcribing) {
      // TODO - handle error, transcribe 
      console.error('transcribing timed out.')
    }
  } catch (err) {
    console.error(err);
  }
}
