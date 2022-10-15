<script> 
	let listenState = false;

	function toggleListen() {
		listenState = !listenState
	}

</script>

<main>
	<div class="record-content">
		<ul>
		<li>
		</li>
		</ul>
	</div>

	<div>
		<p>RECORDING STUFF</p>
		<button on:click={toggleListen}>
			<img width='100' src='/{listenState? 'play' : 'pause'}.svg' />
		</button>
	</div>

</main>

<style>
.record-content {
    background-color: red;
	/* flex-grow:1; */
	height: 10vh;
	width: auto;
}

@media (max-width: 390){

}
</style>
