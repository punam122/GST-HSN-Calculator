
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const talkToCilo = document.getElementById("talkToCilo");

// Initialize Speech Recognition

const recognition = new SpeechRecognition();
recognition.lang = 'en-IN'; // Indian English
recognition.interimResults = false;







recognition.onresult = function (event) {
  
   const transcript = event.results[0][0].transcript;
  console.log("Heard:", transcript);

   const gstMatch = transcript.match(/(\d+)%\s*gst/i);
  const amountMatch = transcript.match(/₹?([\d,]+(?:\+\₹?[\d,]+)*)/i);

  let gstRate = gstMatch ? parseFloat(gstMatch[1]) : 18;
  let baseAmount = 0;

  if (amountMatch) {
    const raw = amountMatch[1].replace(/₹/g, '').replace(/,/g, '');
    const parts = raw.split('+');
    baseAmount = parts.reduce((sum, val) => sum + parseFloat(val), 0);
  }

  const gstAmount = (baseAmount * gstRate) / 100;
  const total = baseAmount + gstAmount;

  const result = `GST on ₹${baseAmount.toLocaleString()} at ${gstRate}% is ₹${gstAmount.toFixed(2)}. Total is ₹${total.toFixed(2)}.`;

 


  // Optional: update UI
  document.querySelector(".Talk-to-cilo p").textContent = result;


    // Speak the result
  const utterance = new SpeechSynthesisUtterance(result);
 
  utterance.lang = "en-IN";

  utterance.onend = () => {
    // Reset appearance after speaking
    isListening = false;
    ciloButton.style.backgroundColor = "#F6F8FC";
    ciloText.textContent = "Click to start recording";
    ciloText.style.color = "#333";
    ciloImage.src = "images/Cilo.png";
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};



// GST Calculator
const inputField = document.getElementById("amountInput");
const totalAmount = document.getElementById("totalAmount");
const baseAmount = document.getElementById("baseAmount");
const taxAmount = document.getElementById("taxAmount");

inputField.addEventListener("input", () => {
  const amount = parseFloat(inputField.value);
  if (isNaN(amount)) {
    totalAmount.textContent = "₹0.00";
    baseAmount.textContent = "₹0.00";
    taxAmount.textContent = "₹0.00";
    return;
  }

  const gstRate = 0.18;
  const tax = amount * gstRate;
  const base = amount - tax;

  totalAmount.textContent = `₹${amount.toFixed(2)}`;
  baseAmount.textContent = `₹${base.toFixed(2)}`;
  taxAmount.textContent = `₹${tax.toFixed(2)}`;
});

function speakResults() {
  const message = `Your total amount is ${totalAmount.textContent.replace("₹", "")} rupees. 
  Base amount is ${baseAmount.textContent.replace("₹", "")} rupees. 
  Tax amount is ${taxAmount.textContent.replace("₹", "")} rupees.`;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function clearResults() {
  inputField.value = "";
  totalAmount.textContent = "₹0.00";
  baseAmount.textContent = "₹0.00";
  taxAmount.textContent = "₹0.00";
  speechSynthesis.cancel();
}



const ciloImage = document.getElementById("ciloImage");
const ciloText = document.getElementById("ciloText");
const ciloButton = document.getElementById("ciloButton");

let isListening = false;

talkToCilo.addEventListener("click", () => {
  if (!isListening) {
    recognition.start();
    isListening = true;

    // Update appearance
    ciloButton.style.backgroundColor = "#ff6600";
    ciloButton.style.border = "4px solid white";
    ciloText.textContent = "PRESS TO STOP";
    ciloText.style.color = "black";
    ciloImage.src = "images/waveform.png";
  } else {
    recognition.stop();
    speechSynthesis.cancel(); // Stop speaking immediately
    isListening = false;

    // Reset appearance
    ciloButton.style.backgroundColor = "#F6F8FC";
    ciloText.textContent = "Click to start recording";
    ciloText.style.color = "#333";
    ciloImage.src = "images/Cilo.png";
  }
});





















 























