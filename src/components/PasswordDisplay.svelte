<script lang="ts">
  import IconCopy from "./icons/IconCopy.svelte";

  interface Props {
    password: string;
  }

  let { password }: Props = $props();
  let passwordCopied = $state(false); // To show a message when the password is copied, disappears after 3 seconds
  let copyMessage = $state("Copied");

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
    <span
      class="text-2xl sm:text-[2rem] overflow-x-scroll"
      data-testid="password"
    >
      {password}
    </span>
  {:else}
    <span
      class="text-2xl sm:text-[2rem] overflow-x-scroll text-style-white opacity-25 select-none"
    >
      P4$5W0rD!
    </span>
  {/if}

  <div class="flex flex-row gap-4">
    <span
      class="text-style-green font-semibold uppercase text-lg"
      class:hidden={!passwordCopied}
    >
      {copyMessage}
    </span>
    <button class="outline-none" onclick={copyPassword}>
      <IconCopy />
    </button>
  </div>
</div>
