# backend/app/__init__.py

from flask import Flask
from flask_cors import CORS
from config import Config # Import the Config class

def create_app():
    app = Flask(__name__)
    
    # Load configuration from the Config class
    app.config.from_object(Config)

    # Allow requests from your frontend (React app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Import and register the API routes
    from .api import routes
    app.register_blueprint(routes.api_bp, url_prefix='/api')

    return app