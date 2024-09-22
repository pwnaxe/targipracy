<script>
	let name = 'world';
	let locationName = { languageId: 1 };
	let languages = [
		{ name: 'polski', id: 1, flag: '/flags/poland.png' },
		{ name: 'english', id: 2, flag: '/flags/britain.png' }
	];

	function selectLanguage(id) {
		locationName.languageId = id;
	}
</script>

<nav class='hidden lg:flex bg-neutral-700 text-white items-center justify-center text-xl space-x-8'>
    <ul class='flex flex-row space-x-4 lg:space-x-6 uppercase py-4'>
        <li><a href="/">O Wydarzeniu</a></li>
        <li><a href="/">Agenda</a></li>
        <li><a href="/">Wystawcy</a></li>
        <li><a href="/">Galeria</a></li>
        <li><a href="/">Dla Pracodawcy</a></li>
        <li><a href="/">Kontakt</a></li>
    </ul>
    <div class="relative inline-block w-auto">
        <div class="selected-language flex items-center space-x-2 cursor-pointer px-2">
            {#each languages as language}
                {#if language.id === locationName.languageId}
                    <img src={language.flag} alt={language.name} width="20" />
                    <span>{language.name}</span>
                {/if}
            {/each}
        </div>

        <ul class="absolute hidden bg-neutral-700 pt-4 z-10">
            {#each languages as language}
                <button type="button" 
                    class="flex items-center space-x-2 p-2 pr-8 cursor-pointer hover:bg-gray-200" 
                    on:click={() => selectLanguage(language.id)}>
                    <img src={language.flag} alt={language.name} width="20" />
                    <span>{language.name}</span>
                 </button>
            {/each}
        </ul>
    </div>
</nav>
<nav class='flex lg:hidden '>

</nav>

<style>
    .relative:hover .absolute {
        display: block;
    }
</style>
