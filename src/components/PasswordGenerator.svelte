<script lang="ts">
  import CharacterLengthSlider from "./CharacterLengthSlider.svelte";
  import PasswordDisplay from "./PasswordDisplay.svelte";
  import PasswordGenerateButton from "./PasswordGenerateButton.svelte";
  import PasswordOptions from "./PasswordOptions.svelte";
  import PasswordStrength from "./PasswordStrength.svelte";

  let password = "";

  let length = 10;
  let allowUppercase = true;
  let allowLowercase = true;
  let allowNumbers = true;
  let allowSymbols = false;

  function generatePassword() {
    let charset = "";
    if (allowUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (allowLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (allowNumbers) charset += "0123456789";
    if (allowSymbols) charset += "!@#$%^&*()_+-=[]{};':|,.<>?";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length),
      );
    }

    password = generatedPassword;
  }
</script>

<div class="flex flex-col gap-4 sm:gap-6 w-full text-style-white">
  <PasswordDisplay {password} />

  <div
    class="max-h-[33rem] bg-style-dark-gray p-4 sm:px-8 sm:pt-6 sm:pb-8 flex flex-col gap-8"
  >
    <CharacterLengthSlider bind:value={length} />
    <PasswordOptions
      bind:allowUppercase
      bind:allowLowercase
      bind:allowNumbers
      bind:allowSymbols
    />
    <PasswordStrength {password} />
    <PasswordGenerateButton {generatePassword} />
  </div>
</div>
