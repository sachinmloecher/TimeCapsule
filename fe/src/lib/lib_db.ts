import { initializeApp } from "firebase/app";
import { getStorage, ref , uploadBytes} from "firebase/storage";
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
const storage = getStorage()

export async function runFunction() {
  transcribeAudioFile(null);
}
export async function createMessage(blob: Blob, name: string) {
  // console.log('hi')
  await saveAudioFileToStorage(blob, name);
  const transcript = await transcribeAudioFile(blob);
  // const docRef = await addDoc(collection(db, "messages"), {
  //     name,
  //     transcript,
  //     creation_date: Timestamp.fromDate(new Date())
  // });
}

//saves blob to firebase storage and returns id/link to object
async function saveAudioFileToStorage(blob: Blob, name:string) {
    const blobRef = ref(storage, '/audio/' + name)
    uploadBytes(blobRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
}

//makes api call to transcribe audio and returns transcript string
async function transcribeAudioFile(blob: Blob) {
  try {
    const res = await fetch("https://api.assemblyai.com/v2/transcript", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "257838bed8f84c9fb3f41453fc1564f6",
      },
      method: "POST",
      body: JSON.stringify({
        audio_url:
          "https://firebasestorage.googleapis.com/v0/b/sachacks4.appspot.com/o/Benedict_cumberbatch_in_front_row_b00wqfnd.flac?alt=media&token=7a82abd8-a6d1-4ff8-bb38-8bb36a20a831",
      }),
      mode: "cors",
    });

    let json = await res.json();

    let transcript_id = json["id"];

    console.log("WIAINTINGGING ")
    setTimeout(async function(){
        console.log("requesting ")
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
          console.log(res2);
          let res3 = await res2.json();
          console.log(res3);
    }, 15000);

  } catch (err) {
    console.error(err);
  }
}
