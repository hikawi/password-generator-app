<script lang="ts">
  interface Props {
    strength: number;
  }

  const { strength }: Props = $props();
  const colors = $derived(
    strength <= 1
      ? "bg-style-red border-style-red"
      : strength === 2
        ? "bg-style-orange border-style-orange"
        : strength === 3
          ? "bg-style-yellow border-style-yellow"
          : "bg-style-green border-style-green",
  );
</script>

<div
  class="flex flex-row h-full gap-2 items-center justify-center"
  aria-hidden="true"
  data-testid="bars"
>
  {#each Array(4) as _, i}
    {#if i + 1 <= strength}
      <div
        class="w-[0.625rem] h-7 border-2 {colors}"
        data-testid="filled"
      ></div>
    {:else}
      <div
        class="w-[0.625rem] h-7 border-2 border-style-white bg-style-very-dark-gray"
        data-testid="empty"
      ></div>
    {/if}
  {/each}
</div>
