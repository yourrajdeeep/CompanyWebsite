from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS for development
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://127.0.0.1:5000",
            "http://localhost:5000",
            "http://127.0.0.1:8080",
            "http://localhost:8080",
            "null"  # Allow requests from files opened directly in browser
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"],
        "max_age": 3600
    }
})

# Log all requests
@app.before_request
def log_request_info():
    logger.info('Headers: %s', dict(request.headers))
    logger.info('Body: %s', request.get_data())

# Error handling for malformed requests
@app.errorhandler(400)
def bad_request(e):
    logger.error(f"Bad request: {str(e)}")
    return jsonify({
        'status': 'error',
        'message': 'Bad request. Please check your request format.'
    }), 400

@app.errorhandler(404)
def not_found(e):
    logger.error(f"Route not found: {request.url}")
    return jsonify({
        'status': 'error',
        'message': 'Route not found'
    }), 404

# Database connection setup using environment variables
def get_db_connection():
    try:
        return psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD')
        )
    except psycopg2.Error as e:
        logger.error(f"Database connection error: {str(e)}")
        raise

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        logger.info("Received contact form submission")
        logger.info(f"Request Method: {request.method}")
        logger.info(f"Request Headers: {dict(request.headers)}")
        
        if request.method == 'OPTIONS':
            logger.info("Handling OPTIONS request")
            return '', 204
            
        data = request.json
        logger.info(f"Received data: {data}")
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        message = data.get('message', '').strip()

        # Validate required fields
        if not all([name, email, phone, message]):
            missing_fields = [field for field, value in 
                            {'name': name, 'email': email, 'phone': phone, 'message': message}.items() 
                            if not value.strip()]
            error_msg = f'Missing required fields: {", ".join(missing_fields)}'
            logger.warning(error_msg)
            return jsonify({
                'status': 'error',
                'message': 'All fields are required'
            }), 400

        # Simple email validation
        if '@' not in email or '.' not in email:
            logger.warning(f'Invalid email format: {email}')
            return jsonify({
                'status': 'error',
                'message': 'Please enter a valid email address'
            }), 400

        conn = None
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            logger.info(f"Processing contact form submission for {email}")
            
            cursor.execute(
                """
                INSERT INTO get_in_touch_messages 
                (name, email, phone, message, created_at) 
                VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                """,
                (name, email, phone, message)
            )
            
            conn.commit()
            cursor.close()
            
            logger.info(f"Successfully stored contact message from {email}")
            
            return jsonify({
                'status': 'success',
                'message': 'Thank you for your message! We will get back to you soon.'
            }), 201
            
        except psycopg2.Error as e:
            if conn:
                conn.rollback()
            logger.error(f"Database error while processing contact form: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': 'An error occurred while processing your request. Please try again later.'
            }), 500
            
        finally:
            if conn:
                conn.close()
                
    except Exception as e:
        logger.error(f"Unexpected error in contact endpoint: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500

if __name__ == '__main__':
    # Enable debug mode for development
    app.debug = True
    app.run(host='0.0.0.0', port=5000, debug=True)
