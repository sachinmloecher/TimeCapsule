<script lang="ts">
  import { createMessage } from "./lib_db";
  import { onMount } from "svelte";

  let paused = true;
  let listening = false;
  let mediaRecorder: MediaRecorder | undefined = undefined;
  let blob: Blob | undefined = undefined;
  let fileName = "";

  let chunks = [];
  let audioIN = { audio: true };
  let audio: HTMLAudioElement | undefined;

  let hourglass_svg;
  let animationThing = null;

  const grammar = "#JSGF V1.0; grammar colors; public <color> = timecapsule;";
  const speechreg = window.webkitSpeechRecognition;
  const recognition = new speechreg();
  // const grammerlist = ;
  const speechRecognitionList = new window.webkitSpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const color = event.results[0][0].transcript.toLowerCase();
    console.log(color);
    if(!(color.includes('time') && color.includes('capsule')))
    return;
    recognition.stop();
    {
      const grammar =
        "#JSGF V1.0; grammar colors; public <color> = stop recording;";
      const speechreg = window.webkitSpeechRecognition;
      const rec2 = new speechreg();
      // const grammerlist = ;
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      rec2.grammars = speechRecognitionList;
      rec2.continuous = true;
      rec2.lang = "en-US";
      rec2.interimResults = false;
      rec2.maxAlternatives = 1;

      rec2.onresult = function (e) {
        let ii = e.results[0][0].transcript.toLowerCase()
        if(ii.includes('stop') && ii.includes('recording')){
        toggleListen();
        recognition.start()
        rec2.end()
        }
      };
      rec2.start();
    }
    toggleListen();
  };

  function toggleListen() {
    if (!listening) {
      console.log("is listening");
      if (animationThing) {
        animationThing.play();
      } else {
        const aliceTumbling = [
          { transform: "rotate(0)", color: "#000" },
          { color: "#431236" },
          {
            transform: "rotate(360deg)",
            color: "#000",
            fill: "both",
          },
        ];
        animationThing = (hourglass_svg as HTMLElement).animate(aliceTumbling, {
          duration: 3000,
          iterations: Infinity,
        });
      }
    } else {
      if (animationThing) animationThing.pause();
    }

    if (mediaRecorder === undefined) {
      console.error("media recorder undefined");
      return;
    }
    if (listening) {
      mediaRecorder.stop();
    } else {
      chunks = [];
      mediaRecorder.start();
    }
    listening = !listening;
  }

  function save() {
    if (blob === undefined) {
      console.error("blob undefined");
      return;
    }

    if (fileName.length === 0) {
			fileName = 'untitled'
    }

    createMessage(blob, fileName);
  }

  function togglePlay() {
    if (paused) {
      if (blob === undefined) {
        console.error("blob undefined");
        return;
      }
      audio = new Audio(window.URL.createObjectURL(blob));
      audio.addEventListener("ended", () => {
        paused = true;
      });
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    paused = !paused;
  }
  //  audio is true, for recording

  // Access the permission for use
  // the microphone
  navigator.mediaDevices
    .getUserMedia(audioIN)

    // 'then()' method returns a Promise
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = (e) => {
        blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        console.log(blob);
        chunks = [];
      };
    })

    // If any error occurs then handles the error
    .catch((err) => {
      console.log(err.name, err.message);
    });
</script>

<main>
  <div class="record-content">
    <div class="hourglass-container">
      <svg
        bind:this={hourglass_svg}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        viewBox="0 0 48 48"
        class="hourglass-svg"
      >
        <path
          d="M15.8 41h16.4v-6.35q0-3.5-2.375-6.025Q27.45 26.1 24 26.1t-5.825 2.525Q15.8 31.15 15.8 34.65ZM24 21.9q3.45 0 5.825-2.525T32.2 13.3V7H15.8v6.3q0 3.55 2.375 6.075Q20.55 21.9 24 21.9ZM8 44v-3h4.8v-6.35q0-3.5 1.825-6.425T19.7 24q-3.25-1.3-5.075-4.25Q12.8 16.8 12.8 13.3V7H8V4h32v3h-4.8v6.3q0 3.5-1.825 6.45T28.3 24q3.25 1.3 5.075 4.225Q35.2 31.15 35.2 34.65V41H40v3Z"
        />
      </svg>
    </div>

    <div class="recording">
      <div class="text-box">
        <p>Title of Recording</p>
        <input
          type="text"
          id="name"
          name="name"
          maxlength="64"
          bind:value={fileName}
        />
      </div>
    </div>

    <div class="btns-container">
      <button on:click={toggleListen}>
        {#if listening}
          Stop

          <!-- <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"
            ><path
              d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
            /></svg
          > -->
        {:else}
          Record
          <!-- <svg  xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"
            ><path
              d="M24 33.3q3.9 0 6.6-2.7 2.7-2.7 2.7-6.6 0-3.9-2.7-6.6-2.7-2.7-6.6-2.7-3.9 0-6.6 2.7-2.7 2.7-2.7 6.6 0 3.9 2.7 6.6 2.7 2.7 6.6 2.7ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
            /></svg
          > -->
        {/if}
      </button>
      <button on:click={save} class="save-btn"> Save </button>

      {#if blob !== undefined}
        <button on:click={togglePlay}>
          {#if paused}
            Playback
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M19.15 32.5 32.5 24l-13.35-8.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg> -->
          {:else}
            Pause
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M16.5 31.5h15v-15h-15ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"/></svg> -->
          {/if}
        </button>
      {/if}
    </div>
  </div>
</main>

<style>
  p {
    display: flex;
    justify-content: center;
    color: white;
    font-family: "IBM Plex Mono", monospace;
    font-weight: bold;
  }

  .btns-container {
    display: grid;
    /* flex-direction: grid; */
    width: 27em;
    grid-template-columns: auto auto auto;
    justify-content: center;
  }
  button {
    font-weight: bold;
    padding: 10px 35px 10px 35px;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.487);
    color: rgba(0, 0, 0, 0.534);
  }
  button:hover {
    transform: scale(1.12);
    transition: transform 0.01s ease-in-out;
  }
  .hourglass-container {
    display: grid;
    place-content: center;
  }

  .hourglass-svg {
    height: 350px;
    width: 350px;
    display: flex;
    fill: rgba(255, 255, 255, 0.559);
    transition-timing-function: ease-in-out;
    transform-origin: center;
  }

  svg {
    fill: white;
    height: 100px;
    width: 100px;
  }
  main {
    height: 100%;
    display: grid;

    /* align-items: stretch; */
  }
  .record-content {
    display: grid;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    place-items: center;
    grid-template-rows: 5fr 1fr 1fr;
    background-color: rgba(255, 255, 255, 0.298);
    width: auto;
  }

  @keyframes rotateGlass {
    50% {
      transform: rotate(180deg);
    }
  }

  .recording {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
</style>
