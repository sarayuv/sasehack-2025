from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

shopping_list = []

@app.route('/')
def home():
    return "Hello, this is the backend server!"

@app.route('/api/shopping-list', methods=['GET', 'POST'])
def shopping_list_api():
    global shopping_list
    if request.method == 'GET':
        return jsonify({"items": shopping_list})
    elif request.method == 'POST':
        data = request.get_json()
        shopping_list.append(data['item'])
        return jsonify({"items": shopping_list})
    return jsonify({"error": "Invalid method"}), 405

if __name__ == '__main__':
    app.run(debug=True)
