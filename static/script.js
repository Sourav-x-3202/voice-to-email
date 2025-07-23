let contacts = {};
let recognition;
let listening = false;

const synth = window.speechSynthesis;
const micIcon = document.getElementById('mic-toggle');
const statusMsg = document.getElementById('status');

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

function loadContacts() {
  fetch('/get-contacts')
    .then(response => response.json())
    .then(data => contacts = data)
    .catch(err => console.error("Contacts load error", err));
}

function handleCommand(command) {
  command = command.toLowerCase().trim();

  if (command.startsWith("recipient ")) {
    const name = command.replace("recipient ", "").trim().toLowerCase();
    const email = contacts[name];
    if (email) {
      document.getElementById("recipient").value = email;
      speak(`Recipient set to ${name}`);
    } else {
      speak(`No contact found for ${name}`);
    }
  } else if (command.startsWith("subject ")) {
    document.getElementById("subject").value = command.replace("subject ", "").trim();
    speak("Subject set");
  } else if (command.startsWith("body ")) {
    document.getElementById("body").value = command.replace("body ", "").trim();
    speak("Body set");
  } else if (command === "send email") {
    sendEmail();
  }
}

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    handleCommand(transcript);
  };

  recognition.onerror = (e) => console.error("Speech error:", e);
  recognition.onend = () => {
    if (listening) recognition.start();
  };
}

function toggleMic() {
  if (!recognition) startRecognition();

  if (!listening) {
    recognition.start();
    micIcon.classList.add("listening");
    speak("Voice control activated");
  } else {
    recognition.stop();
    micIcon.classList.remove("listening");
    speak("Voice control paused");
  }
  listening = !listening;
}

function sendEmail() {
  const gmail = document.getElementById("gmail").value.trim();
  const password = document.getElementById("password").value.trim();
  const recipient = document.getElementById("recipient").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const body = document.getElementById("body").value.trim();

  if (!gmail || !password || !recipient || !subject || !body) {
    speak("Please fill all fields");
    return;
  }

  fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gmail, password, recipient, subject, body })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      speak("Email sent successfully");
      statusMsg.textContent = "✅ Email sent";
    } else {
      throw new Error(data.message);
    }
  })
  .catch(err => {
    speak("Error sending email");
    statusMsg.textContent = `❌ ${err.message}`;
  });
}

window.onload = () => {
  loadContacts();
  micIcon.addEventListener("click", toggleMic);
  document.getElementById("sendBtn").addEventListener("click", sendEmail);
};
