from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Helper function to extract numbers and alphabets
def process_data(data):
    numbers = []
    alphabets = []
    highest_lowercase = None

    for item in data:
        if item.isdigit():
            numbers.append(item)
        elif item.isalpha():
            alphabets.append(item)
            if item.islower():
                if highest_lowercase is None or item > highest_lowercase:
                    highest_lowercase = item
    return numbers, alphabets, highest_lowercase

# Helper function for file validation
def validate_file(file_b64):
    if not file_b64:
        return False, None, 0
    try:
        file_data = base64.b64decode(file_b64)
        file_size_kb = len(file_data) / 1024  # Convert bytes to KB
        mime_type = "application/octet-stream"  # Default MIME type
        return True, mime_type, file_size_kb
    except Exception:
        return False, None, 0

@app.route('/bfhl', methods=['POST'])
def handle_post():
    data = request.json.get('data', [])
    file_b64 = request.json.get('file_b64', '')

    # Process the data to get numbers, alphabets, and the highest lowercase letter
    numbers, alphabets, highest_lowercase = process_data(data)
    
    # Validate file if present
    file_valid, file_mime_type, file_size_kb = validate_file(file_b64)

    # Generate the response based on the processed data and file validation
    response = {
        "is_success": True,
        "user_id": "john_doe_17091999",  
        "email": "john@xyz.com", 
        "roll_number": "ABCD123", 
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else [],
        "file_valid": file_valid,
        "file_mime_type": file_mime_type if file_valid else "",
        "file_size_kb": round(file_size_kb, 2) if file_valid else ""
    }

    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({
        "operation_code": 1  # Hardcoded operation code
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
