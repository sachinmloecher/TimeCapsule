<script lang="ts">
  //   import ListCell from "./ListCell.svelte";
  import Entry from "./Entry.svelte";
  import { getMessages } from "./lib_db";

  let searchValue = "";
  let promiseData =  getMessages();
</script>

<main>
  <div class="gallery-content">
    <div class="gallery">
      <div class='search-container'>
        <input type="text" id="search-bar" bind:value={searchValue} />
        <button on:click={() => {
            promiseData = search(searchValue, promiseData)
        }}>Search 🔍</button>
      </div>

      {#await promiseData then data}
        {#each data as entry, index}
          <Entry {entry} />
        {/each}
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

  .search-container{
    display:grid;
    grid-template-columns: 3.7fr 1fr;
    justify-content: center;
  }

  #search-bar {
    padding: 10px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.146);
    border-color: none;
    box-shadow: none;
  }

  .gallery {
    display: flex;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
</style>
