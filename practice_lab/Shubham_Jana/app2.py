# cd Online-Shopping-System/practice_lab/Shubham_Jana && source myenv/bin/activate venv && python3 app2.py
from flask import Flask


app = Flask(__name__)

@app.route("/",methods=["GET"])
def welcome():
    return "Welcome to our flask app 🌳"
    
if __name__ == ("__main__"):
    app.run(debug=True)

