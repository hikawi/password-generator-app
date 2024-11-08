<script lang="ts">
  import CharacterLengthSlider from "./CharacterLengthSlider.svelte";
  import PasswordDisplay from "./PasswordDisplay.svelte";
  import PasswordGenerateButton from "./PasswordGenerateButton.svelte";
  import PasswordOptions from "./PasswordOptions.svelte";
  import PasswordStrength from "./PasswordStrength.svelte";

  let password = $state("");

  let length = $state(10);
  let allowUppercase = $state(true);
  let allowLowercase = $state(true);
  let allowNumbers = $state(true);
  let allowSymbols = $state(false);

  function generatePassword() {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    // Create an array of character sets based on allowed types
    const charSets = [];
    if (allowUppercase) charSets.push(uppercaseChars);
    if (allowLowercase) charSets.push(lowercaseChars);
    if (allowNumbers) charSets.push(numberChars);
    if (allowSymbols) charSets.push(symbolChars);

    if (charSets.length === 0) {
      return "";
    }

    let pw = "";
    let usedSets = 0;

    // Add at least one character from each allowed character set, up to the length limit
    for (let i = 0; i < Math.min(length, charSets.length); i++) {
      const charSet = charSets[i];
      const randomIndex = Math.floor(Math.random() * charSet.length);
      pw += charSet[randomIndex];
      usedSets++;
    }

    // Fill the remaining length with random characters from all allowed character sets
    const combinedPool = charSets.join("");
    for (let i = usedSets; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * combinedPool.length);
      pw += combinedPool[randomIndex];
    }

    // Shuffle the password to distribute the initial characters randomly
    password = pw
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
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
