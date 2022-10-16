<script>
  import Entry from "./Entry.svelte";
  import { getMessages, search } from "./lib_db";
  export let docs;
	$: entries = docs
  let searchValue = "";
  setInterval(() => {
    getMessages().then((newMessages) => {
      if (newMessages.length !== docs.lnegth) {
        docs = newMessages;
      }
    });
  }, 2000);
</script>

<div>
  <div class="search-container">
    <input
      type="text"
      id="search-bar"
      bind:value={searchValue}
      on:input={() => {
        if (searchValue === "") {
          entries = docs;
        } else {
          search(searchValue, docs).then((res) => {
            entries = res;
          });
        }
      }}
    />
  </div>

  <div class="entries">
    {#if entries.length}
      {#each entries as entry}
        <Entry {entry} />
      {/each}
    {:else}
      <div type="text">nothing found</div>
    {/if}
  </div>
</div>

<style>
  .search-container {
    padding: 0.5em 0em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #search-bar {
    padding: 10px;
    height: 1em;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.146);
    border-color: none;
    box-shadow: none;
  }
</style>
