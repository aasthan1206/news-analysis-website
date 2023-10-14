from flask import Flask
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

# Initialize CORS with your Flask app
CORS(app)

# Load the sentiment analysis results
sentiment_data = pd.read_csv("sentiment_results.csv")

@app.route("/get_all_sentiments", methods=["GET"])
def get_all_sentiments():
    # Return all sentiment analysis results as JSON
    return sentiment_data.to_json(orient="records")

if __name__ == "__main__":
    app.run(debug=True)