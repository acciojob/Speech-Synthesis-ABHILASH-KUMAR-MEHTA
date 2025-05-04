// Your script here.
<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Populate voices dropdown
  function populateVoices() {
    voices = speechSynthesis.getVoices();

    if (voices.length === 0) {
      voicesDropdown.innerHTML = '<option disabled>No voices available</option>';
      return;
    }

    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    msg.voice = selectedVoice;
    restartSpeech();
  }

  function updateOption() {
    msg[this.name] = this.value;
    restartSpeech();
  }

  function speak() {
    if (!msg.text.trim()) {
      alert('Please enter some text to speak.');
      return;
    }
    speechSynthesis.speak(msg);
  }

  function stop() {
    speechSynthesis.cancel();
  }

  function restartSpeech() {
    stop();
    speak();
  }

  msg.text = document.querySelector('[name="text"]').value;

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', updateOption));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);
</script>
