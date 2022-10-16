<main>
  <hr />
  <div class="entry-cell-container">
    <div class="entry-cell">
      <div class="banner" />

      <div class="content">
        <div class="name-container">
          <p class="name">Haskell • Sept 6, 2005</p>
        </div>

        <div class="transcription-container">
          <p class="transcription">
            "Hey there my name is hask money. I come from the land down under.
            There is nothing else to say except this is my last message. Goodbye
            world."
          </p>
        </div>

        <div class="details">
          <div>
            <img class='play-svg' src="./public/play.svg" alt="play button">
          </div>

          <div>
            <p>[ Last played: 12/25/2021 ]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  hr {
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
    background-color: #0c2142;
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
    color:white;
    width: 3em;
    height: 3em;
  }

  .details > div {
    width: 13em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
