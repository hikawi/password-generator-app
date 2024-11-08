<script lang="ts">
  import IconArrowRight from "./icons/IconArrowRight.svelte";

  interface Props {
    generatePassword: () => void;
  }

  let { generatePassword }: Props = $props();
</script>

<button
  class="h-[3.5rem] sm:h-16 w-full flex border-2 border-style-green items-center gap-4 sm:gap-6 justify-center hover:bg-style-dark-gray text-style-dark-gray bg-style-green hover:text-style-green duration-100 hover:gap-6 sm:hover:gap-8 group"
  onclick={generatePassword}
>
  <span class="uppercase sm:text-lg">Generate</span>
  <IconArrowRight />
</button>
