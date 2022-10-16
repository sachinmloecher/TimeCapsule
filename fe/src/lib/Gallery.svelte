<script lang="ts">
  import Entries from "./Entries.svelte";
  //   import ListCell from "./ListCell.svelte";
  import { getMessages, search } from "./lib_db";

  const promiseData = getMessages();
</script>

<main>
  <div class="gallery-content">
    <div class="gallery">
      {#await promiseData then data}
      <Entries docs={data}></Entries>
      {/await}
    </div>
  </div>
</main>

<style>
  .gallery-content {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: center;
  }

  .gallery {
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  
</style>
