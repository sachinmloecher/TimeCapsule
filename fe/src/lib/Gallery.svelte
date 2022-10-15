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

        </div>
    </div>

</main>

<style>
    .gallery-content {
        display: flex;
        padding: 0;
        margin: 0;
        display: flex;
        background-color: blue;
        justify-content: center;
    }

    form {
        display: flex;
        justify-content: center;
    }

    #search-bar {
        margin: 10px 0 10px;
        padding: 10px;
        border-radius: 12px;
    }

    .gallery {
        display: flex;
        justify-content: center;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
