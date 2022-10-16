<script lang="ts">
    //   import ListCell from "./ListCell.svelte";
    import Entry from './Entry.svelte';
</script>

<main>

    <div class="gallery-content">
        <div class="gallery">

            <form>
                <input type="text" id="search-bar">
            </form>

            <Entry/>

            <Entry/>

        </div>
    </div>

</main>

<style>
    .gallery-content {
        display: flex;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
    }

    form {
        margin-top: 2em;
        display: flex;
        justify-content: center;
    }

    #search-bar {
        margin: 10px 0 10px;
        padding: 10px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.146);
        border-color: none;
        box-shadow: none;
    }

    .gallery {
        display: flex;
        justify-content: center;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

</style>
