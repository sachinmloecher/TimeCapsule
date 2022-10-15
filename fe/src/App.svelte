<script lang="ts">
  import Gallery from "./lib/Gallery.svelte";
  import Recorder from "./lib/Recorder.svelte";
import { runFunction  } from "./lib/lib_db";
  enum Views {
    RECORD,
    GALLERY,
  }

  let view = Views.RECORD;
</script>

<div class="container">
  <div class="header">
    <h1 on:click={ runFunction }>
      <span style="color: purple; font-weight: bold;">Time</span> Capsule
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
    <button
      on:click={() => {
        view = Views.RECORD;
      }}
    >
      <img width="50" src="/{view === Views.RECORD ? 'mic_FILL' : 'mic'}.svg" />
    </button>
    <button
      on:click={() => {
        view = Views.GALLERY;
      }}
    >
      <img
        width="50"
        src="/{view === Views.GALLERY ? 'folder_FILL' : 'folder'}.svg"
      />
    </button>
  </div>
</div>

<style>
  .container {
    background-color: var(--color1);
    margin: 0px !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    font-size: 2em;
  }

  .content {
    flex: 6;
  }
  .header {
    background-color: var(--color2);
    display: flex;
    justify-content: center;
    border-bottom: 2px solid black;
    width: 100%;
    height: 5em;
    align-items: center;
    flex: 1;
  }
  .footer {
    background-color: var(--color2);
    flex: 1;
    padding: 0;
    display: flex;
    height: 100px;
    width: auto;
    justify-content: center;
    align-items: center;
  }

</style>
