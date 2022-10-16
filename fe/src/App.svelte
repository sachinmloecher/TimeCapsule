<script lang="ts">
  import Gallery from "./lib/Gallery.svelte";
  import Recorder from "./lib/Recorder.svelte";
  import { runFunction } from "./lib/lib_db";
  enum Views {
    RECORD,
    GALLERY,
  }

  let view = Views.RECORD;
</script>

<div class="container">
  <div class="header">
    <h1 on:click={runFunction}>
      <span
        style="color: #0c2142; font-weight: bold; font-family: 'IBM Plex Mono', monospace;"
      >
        Time</span
      > Capsule
      <span class="material-symbols-outlined">
        hourglass_empty
        </span>
    </h1>
  </div>
  <div class="content">
    {#if view === Views.GALLERY}
      <Gallery />
    {:else}
      <Recorder />
    {/if}
  </div>

  <div class="footer">
    <div
      on:click={() => {
        view = Views.RECORD;
      }}
    >
      {#if view === Views.RECORD}
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
          ><path
            d="M24 26.85q-2.15 0-3.6-1.55-1.45-1.55-1.45-3.75V9q0-2.1 1.475-3.55Q21.9 4 24 4t3.575 1.45Q29.05 6.9 29.05 9v12.55q0 2.2-1.45 3.75-1.45 1.55-3.6 1.55ZM22.5 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65Q19.45 32.3 24 32.3q4.55 0 7.775-3.1Q35 26.1 35 21.55h3q0 5.3-3.6 9.2-3.6 3.9-8.9 4.45V42Z"
          /></svg
        >
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
          ><path
            d="M24 26.85q-2.15 0-3.6-1.55-1.45-1.55-1.45-3.75V9q0-2.1 1.475-3.55Q21.9 4 24 4t3.575 1.45Q29.05 6.9 29.05 9v12.55q0 2.2-1.45 3.75-1.45 1.55-3.6 1.55Zm0-11.4ZM22.5 42v-6.8q-5.3-.55-8.9-4.45-3.6-3.9-3.6-9.2h3q0 4.55 3.225 7.65Q19.45 32.3 24 32.3q4.55 0 7.775-3.1Q35 26.1 35 21.55h3q0 5.3-3.6 9.2-3.6 3.9-8.9 4.45V42ZM24 23.85q.9 0 1.475-.675.575-.675.575-1.625V9q0-.85-.6-1.425Q24.85 7 24 7t-1.45.575q-.6.575-.6 1.425v12.55q0 .95.575 1.625T24 23.85Z"
          /></svg
        >
      {/if}
    </div>

    <div
      on:click={() => {
        view = Views.GALLERY;
      }}
    >
      {#if view === Views.GALLERY}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          ><path
            d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Z"
          /></svg
        >
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          ><path
            d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"
          /></svg
        >
      {/if}
    </div>
  </div>
</div>

<style>
  svg {
    fill: white;
  }
  .container {
    margin: 0px !important;
    height: 100vh;
    display: grid;
    grid-template-rows: 4em 10fr 1.5fr;
  }

  h1 {
    border: none;
    border-radius: 15px;
    padding: 7.5px;
    background-color: rgba(255, 255, 255, 0.321);
    font-size: 2em;
    font-family: "IBM Plex Mono", monospace;
    color: white;
    letter-spacing: 0.02em;
    word-spacing: -0.60em;
  }

  .header {
    display: flex;
    justify-content: center;
    border-bottom: 2px solid white;
    width: 100%;
    height: 5em;
    align-items: center;
    flex: 1;
  }

  .footer {
    border-top: 3px solid white;
    display: flex;
    grid-template-columns: 2;
    justify-content: space-around;
    align-items: center;
  }


  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
  }

</style>
