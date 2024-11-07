<script lang="ts">
  export let strength: number;

  $: colors =
    strength >= 4
      ? "bg-style-green border-style-green"
      : strength == 3
        ? "bg-style-yellow border-style-yellow"
        : strength == 2
          ? "bg-style-orange border-style-orange"
          : "bg-style-red border-style-red";
</script>

<div
  class="flex flex-row h-full gap-2 items-center justify-center"
  aria-hidden="true"
  data-testid="bars"
>
  {#each Array(4) as _, i}
    {#if i + 1 <= strength}
      <div class="w-[0.625rem] h-7 border-2 {colors}"></div>
    {:else}
      <div
        class="w-[0.625rem] h-7 border-2 border-style-white bg-style-very-dark-gray"
      ></div>
    {/if}
  {/each}
</div>
