<script lang="ts">
  export let allowUppercase = false;
  export let allowLowercase = false;
  export let allowNumbers = false;
  export let allowSymbols = false;
</script>

<div class="flex flex-col w-full items-start justify-center gap-4 text-left">
  <label>
    <input type="checkbox" bind:checked={allowUppercase} />
    Include Uppercase Letters
  </label>
  <label>
    <input type="checkbox" bind:checked={allowLowercase} />
    Include Lowercase Letters
  </label>
  <label>
    <input type="checkbox" bind:checked={allowNumbers} />
    Include Numbers
  </label>
  <label>
    <input type="checkbox" bind:checked={allowSymbols} />
    Include Symbols
  </label>
</div>

<style lang="scss">
  label {
    @apply flex select-none flex-row items-center gap-5;
  }

  input[type="checkbox"] {
    @apply border-style-white bg-style-very-dark-gray hover:border-style-green checked:bg-style-green checked:border-style-green relative size-5 appearance-none border-2 border-solid hover:cursor-pointer;

    &:checked::after {
      @apply block;
    }

    &::after {
      content: "";
      background-image: url("../assets/icon-check.svg");
      @apply absolute left-1/2 top-1/2 hidden size-5 -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat;
    }
  }
</style>
