from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import smtplib, ssl, os, json
from email.message import EmailMessage

app = Flask(__name__)
app.secret_key = "83fhn!@#Hjd$gk%29das8Fjk1zZs"

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        if email and password:
            session["user"] = email
            return jsonify({"status": "success"})
        return jsonify({"status": "error", "message": "Invalid credentials"})
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/")
def home():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/contacts")
def manage_contacts():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("contacts.html")

@app.route("/get-contacts")
def get_contacts():
    if not os.path.exists("contacts.json"):
        return jsonify({})
    with open("contacts.json", "r") as f:
        return jsonify(json.load(f))

@app.route("/add-contact", methods=["POST"])
def add_contact():
    data = request.json
    name = data["name"].strip().lower()
    email = data["email"].strip()
    contacts = {}
    if os.path.exists("contacts.json"):
        with open("contacts.json", "r") as f:
            contacts = json.load(f)
    contacts[name] = email
    with open("contacts.json", "w") as f:
        json.dump(contacts, f, indent=2)
    return jsonify({"status": "success"})

@app.route("/delete-contact", methods=["POST"])
def delete_contact():
    data = request.json
    name = data["name"].strip().lower()
    if os.path.exists("contacts.json"):
        with open("contacts.json", "r") as f:
            contacts = json.load(f)
        if name in contacts:
            del contacts[name]
            with open("contacts.json", "w") as f:
                json.dump(contacts, f, indent=2)
    return jsonify({"status": "success"})

@app.route("/send-email", methods=["POST"])
def send_email():
    if "user" not in session:
        return jsonify({"status": "error", "message": "Unauthorized"}), 403

    data = request.json
    gmail_user = data["gmail"]
    gmail_pass = data["password"]
    to_email = data["recipient"]
    subject = data["subject"]
    body = data["body"]

    try:
        msg = EmailMessage()
        msg["From"] = gmail_user
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.set_content(body)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(gmail_user, gmail_pass)
            server.send_message(msg)

        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
