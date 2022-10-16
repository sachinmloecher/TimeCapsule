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
      <span style="color: #0c2142; font-weight: bold; font-family: 'IBM Plex Mono', monospace;">
        Time</span> Capsule
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

    
      <img on:click={() => {
        view = Views.RECORD;
      }} src="/{view === Views.RECORD ? 'mic_FILL' : 'mic'}.svg" />

      <img
        on:click={() => {
          view = Views.GALLERY;
        }}
        src="/{view === Views.GALLERY ? 'folder_FILL' : 'folder'}.svg"
      />
  </div>
</div>

<style>
  .container {
    margin: 0px !important;
    height: 100vh;
    display:grid;
    grid-template-rows: 4em 10fr 1.5fr;
  }

  h1 {
    font-size: 2em;
    font-family: 'IBM Plex Mono', monospace;
    color: white;
    letter-spacing: 0.02em;
    word-spacing: -0.65em;
  }

  .header {
    display: flex;
    justify-content: center;
    border-bottom: 2px solid black;
    width: 100%;
    height: 5em;
    align-items: center;
    flex: 1;
  }

  .footer {
    border-top: 3px solid white;
    display:flex;
    grid-template-columns:2;
    justify-content: space-around;
    align-items: center;

  }

</style>
