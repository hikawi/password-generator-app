<script lang="ts">
  import IconCopy from "./icons/IconCopy.svelte";

  export let password: string;
  let passwordCopied: boolean = false; // To show a message when the password is copied, disappears after 3 seconds
  let copyMessage: string;

  function copyPassword() {
    navigator.clipboard.writeText(password);
    passwordCopied = true;
    copyMessage = password !== "" ? "Copied" : "Copied...?";

    setTimeout(() => {
      passwordCopied = false;
    }, 3000);
  }
</script>

<!-- The div that shows the generated password and handles copying -->
<div
  class="h-16 sm:h-20 p-4 gap-4 flex-row justify-between flex items-center bg-style-dark-gray"
>
  <!-- If the password is not empty, show the password, otherwise show a placeholder -->
  {#if password !== ""}
    <span class="text-2xl sm:text-[2rem] overflow-x-scroll">{password}</span>
  {:else}
    <span
      class="text-2xl sm:text-[2rem] overflow-x-scroll text-style-white opacity-25"
      >P4$5W0rD!</span
    >
  {/if}

  <div class="flex flex-row gap-4">
    <span
      class="text-style-green font-semibold uppercase text-lg"
      class:hidden={!passwordCopied}
    >
      {copyMessage}
    </span>
    <button class="outline-none" on:click={copyPassword}>
      <IconCopy />
    </button>
  </div>
</div>
