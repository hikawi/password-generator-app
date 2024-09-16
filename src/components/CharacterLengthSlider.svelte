<script lang="ts">
  import { onMount } from "svelte";

  export let value: number;

  function changeValueProperty(event: Event) {
    const target = event.target as HTMLInputElement;
    const [cur, max] = [parseInt(target.value), parseInt(target.max)];
    target.style.setProperty("--value", `${Math.round((cur / max) * 100)}%`);
  }

  onMount(() => {
    const input = document.getElementById("char-length") as HTMLInputElement;
    input.style.setProperty("--value", `${Math.round((value / 20) * 100)}%`);
  });
</script>

<div class="flex flex-col w-full items-center justify-center gap-4">
  <div class="flex flex-row justify-between items-center w-full">
    <label for="char-length" class="text-base sm:text-lg"
      >Character length</label
    >
    <span class="text-2xl sm:text-[2rem] text-style-green">{value}</span>
  </div>
  <input
    type="range"
    bind:value
    min={0}
    max={20}
    id="char-length"
    on:input={changeValueProperty}
  />
</div>

<!-- Nightmare incoming!!! -->
<style lang="scss">
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent; // In chrome, default is white
    width: 100%; // Full width (Firefox)

    //
    // Styling for Chrome and Safari (fuck me)
    //
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      margin-top: -0.625rem; // Shift the thumb up, or it stays below the track. This value is (trackheight / 2) - (thumbheight / 2) = (0.5 / 2 - 1.75 / 2)
      @apply bg-style-white border-style-white hover:border-style-green hover:bg-style-very-dark-gray size-7 cursor-pointer rounded-full border-2 border-solid;
    }
    &::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        #a4ffaf 0%,
        #a4ffaf var(--value),
        #18171f var(--value),
        #18171f 100%
      );
      height: 0.5rem;
    }

    //
    // Styling for IE
    //
    // The thumb
    &::-ms-thumb {
      @apply bg-style-white border-style-white hover:border-style-green hover:bg-style-very-dark-gray size-7 cursor-pointer rounded-full border-2;
    }
    // The track
    &::-ms-track {
      @apply bg-style-very-dark-gray h-2;
    }
    // The progress bar
    &::-ms-fill-lower {
      @apply bg-style-green h-2;
    }

    //
    // Styling for Firefox
    //
    // The thumb
    &::-moz-range-thumb {
      -moz-appearance: none; // Clear the default gray border on the thumb.
      appearance: none;
      @apply bg-style-white border-style-white hover:border-style-green hover:bg-style-very-dark-gray size-7 cursor-pointer rounded-full border-2;
    }
    // The track
    &::-moz-range-track {
      -moz-appearance: none; // Idk what this clears, but just in case.
      appearance: none;
      @apply bg-style-very-dark-gray h-2;
    }
    // The progress bar
    &::-moz-range-progress {
      -moz-appearance: none; // Idk what this clears, but just in case.
      appearance: none;
      @apply bg-style-green h-2;
    }
  }
</style>
