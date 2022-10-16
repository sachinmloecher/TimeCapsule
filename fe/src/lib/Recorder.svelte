<script lang='ts'>
  import { createMessage } from "./lib_db";


	let paused = true;
  let listening = false;
  let mediaRecorder: MediaRecorder | undefined = undefined;
	let blob: Blob | undefined = undefined;
	let fileName = '';

  let chunks = [];
  let audioIN = { audio: true };
	let audio: HTMLAudioElement | undefined;


  function toggleListen() {
		if(mediaRecorder === undefined) {
			console.error('media recorder undefined')
			return;
		}
		if(listening) {
			mediaRecorder.stop()
		} else {
			chunks = []
			mediaRecorder.start()
		}
    listening = !listening;
  }

	function save() {
		if (blob === undefined) {
			console.error("blob undefined")
			return;
		}

		if (fileName.length === 0) {
			console.error('empty file name')
			return
		}

		createMessage(blob, fileName);
	}


	function togglePlay() {
		if(paused) {
			if(blob === undefined) {
				console.error('blob undefined')
				return
			}
			audio = new Audio(window.URL.createObjectURL(blob));
    	audio.play();
		} else {
			audio.pause()
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
				console.log(blob)
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);

      };
    })

    // If any error occurs then handles the error
    .catch((err) => {
      console.log(err.name, err.message);
    });
</script>

<main>
  <div class="record-content">
    <div>
      <p>RECORDING STUFF</p>
    <input type="text" id="name" name="name" maxlength="16" bind:value={fileName} /> 
    <button on:click={togglePlay}>
      <img width=30 src='/{paused ? 'play' : 'pause'}.svg'/>
    </button>
      <button on:click={toggleListen}>
        <img width=30 src="/record_{listening ? 'checked' : 'unchecked'}.svg" />
      </button>
      <button on:click={save}>
        save
      </button>
  
    </div>
  </div>
</main>

<style>
  .record-content {
    background-color: red;
    /* flex-grow:1; */
    height: 10vh;
    width: auto;
  }

  @media (max-width: 390) {
  }
</style>
