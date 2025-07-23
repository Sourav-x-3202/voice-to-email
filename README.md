#  Voice-to-Email — A Voice-Controlled Email Web App

> Send emails using just your voice. Fully local, private, and browser-powered.

---

##  Overview

**Voice-to-Email** is a modern, speech-driven email application built with Python (Flask) and JavaScript. It allows users to **compose and send emails entirely through voice commands** — including selecting the recipient, writing the subject, composing the message, and sending.

This project was designed to be:
-  **Lightweight** – works locally without heavy libraries or cloud APIs  
-  **Secure** – uses Gmail App Passwords; no data is stored on any server  
-  **Accessible** – hands-free interface, ideal for users with disabilities or multitasking needs  

Whether you're visually impaired, on-the-go, or just want to try futuristic interaction, this app gives you a unique, local experience with no cloud dependencies.

---

## 🔧 Key Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
|  Voice Commands     | Use your voice to fill all fields: recipient, subject, body, and send email |
| Gmail Integration  | Secure email sending using SMTP (with Gmail App Password)                   |
| Contact Manager | Add, view, and delete saved contacts by name                                 |
| Local-Only App     | All logic runs locally in your browser and server — no cloud APIs involved |
| Beautiful UI        | Modern, glass-style responsive interface built with HTML/CSS/JS             |

---

##  Screenshot


## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Backend     | Python 3.9+, Flask                |
| Frontend    | HTML5, CSS3 (Glassmorphism), JS   |
| Speech      | Web Speech API (browser-native)   |
| Email       | Gmail SMTP via SSL (port 465)     |

---

## 🚀 How It Works

1. You speak your command: e.g.  
   - “Recipient Mohit”  
   - “Subject Hello”  
   - “Body How are you doing today?”  
   - “Send email”

2. The browser’s **Web Speech API** transcribes your voice into text

3. The text is injected into the respective input fields in real time

4. When you say “Send email,” a secure POST request is made via Flask to Gmail SMTP

5. Gmail securely delivers your message using your App Password

No third-party services  
No speech API keys  
Everything stays local

---

##  Gmail Setup (App Password Required)

For security, Gmail blocks less-secure login methods.  
To use this app:

1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)  
2. Generate an **App Password**
3. Use this App Password in the app — not your real password

>  Your credentials are used only at runtime and never saved.

---

##  Folder Structure

voice-to-email/
├── app.py # Flask backend
├── contacts.json # Stores user contacts locally
├── requirements.txt # Python dependencies
├── README.md # This file
├── screenshot.png # App screenshot
│
├── templates/ # HTML files
│ ├── login.html
│ ├── index.html
│ └── contacts.html
│
└── static/ # CSS and JS files
├── style.css
└── script.js


---

## 🧑‍💻 Getting Started (Run Locally)

bash
# 1. Clone the repo
git clone https://github.com/yourid/voice-to-email.git
cd voice-to-email

# 2. Create a virtual environment (optional)
python -m venv venv
venv\Scripts\activate  # on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py

# 5. Open in browser
http://127.0.0.1:5000
Example Use Case
You're on your laptop, cooking with your hands full, and you suddenly remember to email your friend:

You open the app, press the mic, and say:

“Recipient Mohit”

“Subject Dinner plans”

“Body Let’s meet at 8pm near the old cafe”

“Send email”

 Boom. Email sent — without typing a single letter.

 Future Improvements (Ideas)
 Dark mode toggle

 ChatGPT integration for smarter responses

 Message history

 View inbox (read-only)

 Convert to mobile PWA (installable)

 Contributing
Pull requests are welcome! If you'd like to suggest new features or improve existing ones, feel free to fork and open an issue or PR.

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and share.

 Author
Made with by Sourav Sharma

 “I built this as a personal tool and project to explore voice-driven UIs — and now it's yours to use too.”


---

