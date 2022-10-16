<script lang="ts">
  import { playAudio, stopAudio } from "./lib_db";

  export let entry;
  $: paused = true;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(Date.UTC(1970, 0, 1)); // Epoch
  date.setSeconds(entry.creation_date.seconds);
  const dateString = `${
    month[date.getMonth()]
  } ${date.getDate()} ,${date.getFullYear()}`;
  function toggleAudio() {
    if (paused) {
      paused = false;
      playAudio(entry.url, () => {
        paused = true;
      });
    } else {
      paused = true;
      stopAudio();
    }
  }
</script>

<main>
  <hr />
  <div class="entry-cell-container">
    <div class="entry-cell">
      <div class="banner" />

      <div class="content">
        <div class="name-container">
          <p class="name">{entry.name}</p>
        </div>

        <div class="transcription-container">
          <p class="transcription">
            {entry.transcript}
          </p>
        </div>

        <div class="details">
          <div>
            <button on:click={toggleAudio}>
              {#if paused}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  width="48"
                  viewBox="0 0 48 48"
                  ><path
                    d="M19.15 32.5 32.5 24l-13.35-8.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
                  /></svg
                >
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  width="48"
                  viewBox="0 0 48 48"
                  ><path d="M16.5 31.5h15v-15h-15ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z" /></svg
                >
              {/if}
            </button>
          </div>

          <div>
            <p>[{dateString}]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
    svg {
        fill: white;
    }
 hr  {
    width: 40em;
  }

  .material-symbols-outlined {
    color: white;
    width: 3em;
    height: 3em;
  }

  .entry-cell {
    margin: 1em 0 1em 0;
    height: 10em;
    width: 30em;
    display: flex;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.34);
  }

  .banner {
    height: auto;
    width: 2em;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.254);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
    display: flex;
    height: 100%;
    width: 100%;
    margin-left: -13px;
    background-color: #ffffff42;
  }

  .entry-cell-container {
    display: flex;
    justify-content: center;
  }

  p {
    font-family: "Montserrat", sans-serif;
    color: white;
    font-weight: bold;
  }

  p.name {
    display: flex;
    height: 0.05em;
  }

  .name-container {
    display: flex;
    justify-content: center;
  }

  .transcription-container {
    display: flex;
    justify-content: center;
    height: 50em;
    overflow: hidden;
  }

  .details {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .play-svg {
    fill: white;
    width: 3em;
    height: 3em;
  }

  .details > div {
    width: 13em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    border: none;
  }
</style>
