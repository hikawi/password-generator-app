<script lang="ts">
  import StrengthBar from "./StrengthBar.svelte";

  export let password: string;

  // Calculate the strength of the password.
  // Passwords can have 5 levels of strength, calculated by the following criteria:
  // 1. At least 10 characters long
  // 2. Contains at least one uppercase letter
  // 3. Contains at least one lowercase letter
  // 4. Contains at least one number
  // 5. Contains at least one symbol
  // Even though the display only shows up to level 4 as "Strong".
  $: strength =
    +(password.length >= 10) +
    +/[A-Z]/.test(password) +
    +/[a-z]/.test(password) +
    +/[0-9]/.test(password) +
    +/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  // Display the strength level of the password.
  // 4-5: Strong
  // 3: Medium
  // 2: Weak
  // 0-1: Too Weak!
  $: strengthLevel =
    strength >= 4
      ? "Strong"
      : strength == 3
        ? "Medium"
        : strength == 2
          ? "Weak"
          : strength == 1
            ? "Too Weak!"
            : "Ok lol";
</script>

<div
  class="w-full flex flex-row justify-center xs:justify-between items-center h-14 sm:h-[4.5rem] bg-style-very-dark-gray px-4 sm:px-8"
>
  <span class="uppercase sm:text-lg text-style-gray hidden xs:block"
    >Strength</span
  >
  <div class="flex flex-row items-center justify-center gap-4 h-full">
    <span class="text-lg sm:text-2xl text-style-white uppercase"
      >{strengthLevel}</span
    >
    <StrengthBar {strength} />
  </div>
</div>
