// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionHSN = new SpeechRecognition();
recognitionHSN.lang = "en-IN";
recognitionHSN.interimResults = false;
recognitionHSN.maxAlternatives = 1;

// Get DOM elements
const talkToCiloHsn = document.getElementById("talkToCiloHsn");
const ciloImageHsn = document.getElementById("ciloImageHsn");
const ciloTextHsn = document.getElementById("ciloTextHsn");
const ciloButtonHsn = document.getElementById("ciloButtonHsn");
const hsnResultContainer = document.getElementById("hsnResultContainer");
const transcriptBox = document.getElementById("transcriptBox");

let isListeningHsn = false;

// Handle voice recognition result
recognitionHSN.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  console.log("HSN Heard:", transcript);

  // Update transcript display
  transcriptBox.innerHTML = `
    <h3 style="padding-bottom: 15px;">Live Transcript</h3>
    <p>${transcript}</p>
  `;

  let resultHTML = "";
  let spokenText = "";

  // Match HSN queries
  if (transcript.toLowerCase().includes("hsn code for horses")) {
    resultHTML = `
    <div class="container1">
<div class="hsn-table-container">
  <h2>Search Results</h2>
  <table class="hsn-table">
    <thead>
      <tr>
        <th>Chapter</th>
        <th>Code</th>
        <th>HSN</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>001</td><td>0101</td><td>Live horses and asses</td></tr>
      <tr><td>1</td><td>002</td><td>0102</td><td>Live bovine animals</td></tr>
      <tr><td>1</td><td>003</td><td>0103</td><td>LIVE SWINE, LIVE ASSES, MULES AND HINNIES - BREEDING ANIMALS - HORSES</td></tr>
      <tr><td>1</td><td>004</td><td>0104</td><td>LIVE SHEEP AND GOATS</td></tr>
      <tr><td>1</td><td>005</td><td>0105</td><td>LIVE POULTRY: FOWLS, DUCKS, GEESE, TURKEYS, GUINEA FOWLS</td></tr>
      <tr><td>1</td><td>006</td><td>0106</td><td>OTHER LIVE ANIMALS</td></tr>
      <tr><td>1</td><td>007</td><td>0101</td><td>LIVE HORSES, ASSES, MULES AND HINNIES - OTHER - HORSES</td></tr>
      <tr><td>1</td><td>008</td><td>0101</td><td>LIVE HORSES, ASSES, MULES AND HINNIES - OTHER - MULES AND HINNIES</td></tr>
      <tr><td>1</td><td>009</td><td>0101</td><td>LIVE HORSES, ASSES, MULES AND HINNIES - OTHER - ASSES</td></tr>
      <tr><td>1</td><td>010</td><td>0102</td><td>LIVE BOVINE ANIMALS - OTHER - COWS</td></tr>
      <!-- Add more rows as needed -->
    </tbody>
  </table>
</div>
</div>
    `;
    spokenText = "HSN code for horses includes 0101 for live animals, 0205 for meat, and 0206 for edible offal.";
  } else {
    resultHTML = 
    resultHTML = `
  <div class="no-match-container">
    <p>No matching HSN code found for "${transcript}".</p>
  </div>
`;

   
    spokenText = `No matching HSN code found for ${transcript}`;
  }

  hsnResultContainer.innerHTML = resultHTML;

  // Speak the result
  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);

  // Reset appearance after speaking
  utterance.onend = () => {
    isListeningHsn = false;
  ciloButtonHsn.style.border = "none"; 
    ciloTextHsn.textContent = "Click to start voice search";
    ciloTextHsn.style.color = "#333";
    ciloImageHsn.src = "images/Talk to Cilo.png";
  };
};

recognitionHSN.onend = () => {
  if (!userStoppedHsn) return; // Don't reset unless user clicked

  isListeningHsn = false;
  ciloButtonHsn.style.backgroundColor = "#F6F8FC";
  ciloButtonHsn.style.border = "none";
  ciloTextHsn.textContent = "Click to start voice search";
  ciloTextHsn.style.color = "#333";
  ciloImageHsn.src = "images/Talk to Cilo.png";
};



// Handle button click
let userStoppedHsn = false;
talkToCiloHsn.addEventListener("click", () => {
  const resultText = hsnResultContainer.innerText.trim();

  if (!isListeningHsn) {
    userStoppedHsn = false;
    recognitionHSN.start();
    isListeningHsn = true;

    ciloButtonHsn.style.backgroundColor = "#ff6600";
    ciloButtonHsn.style.border = "4px solid white";
    ciloTextHsn.textContent = "PRESS TO STOP";
    ciloTextHsn.style.color = "black";
    ciloImageHsn.src = "images/waveform.png";
  } else {
    userStoppedHsn = true;
    recognitionHSN.stop();
    speechSynthesis.cancel();
    isListeningHsn = false;

    ciloButtonHsn.style.backgroundColor = "#F6F8FC";
    ciloButtonHsn.style.border = "none";
    ciloTextHsn.textContent = "Click to start voice search";
    ciloTextHsn.style.color = "#333";
    ciloImageHsn.src = "images/Talk to Cilo.png";
  }
});

 




  



