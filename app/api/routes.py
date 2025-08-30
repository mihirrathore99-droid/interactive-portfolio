# backend/app/api/routes.py

from flask import Blueprint, jsonify, current_app, request, render_template, send_file
import json
import os
import io
from weasyprint import HTML
from app.services.letter_generator import generate_letter_content # <-- NEW IMPORT

# Create a "Blueprint" for our API routes
api_bp = Blueprint('api_bp', __name__)

@api_bp.route('/profile', methods=['GET'])
def get_profile():
    # ... (this function remains the same)
    try:
        data_path = os.path.join(current_app.root_path, 'data', 'profile_data.json')
        with open(data_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Profile data file not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/generate-cv', methods=['POST'])
def generate_cv():
    # ... (this function remains the same)
    try:
        payload = request.get_json()
        selected_ids = payload.get('selected_ids', [])
        data_path = os.path.join(current_app.root_path, 'data', 'profile_data.json')
        with open(data_path, 'r') as f:
            full_data = json.load(f)
        data_for_pdf = full_data.copy()
        all_experiences = full_data.get('experience', [])
        selected_experiences = [job for job in all_experiences if job['id'] in selected_ids]
        data_for_pdf['experience'] = selected_experiences
        css_path = os.path.join(current_app.root_path, 'static', 'pdf_styles.css')
        html_string = render_template('cv_template.html', data=data_for_pdf, css_path=css_path)
        pdf_bytes = HTML(string=html_string, base_url=current_app.root_path).write_pdf()
        return send_file(io.BytesIO(pdf_bytes), mimetype='application/pdf', as_attachment=True, download_name='Mihir_Rathore_CV.pdf')
    except Exception as e:
        print(f"Error generating PDF: {e}")
        return jsonify({"error": str(e)}), 500

# --- NEW COVER LETTER GENERATION ROUTE ---
@api_bp.route('/generate-cover-letter', methods=['POST'])
def generate_cover_letter():
    """
    Receives a job description and generates a cover letter.
    """
    try:
        # 1. Get the job description from the frontend
        payload = request.get_json()
        job_description = payload.get('job_description')
        if not job_description:
            return jsonify({"error": "Job description is missing."}), 400

        # 2. Load the full CV data to provide context to the AI
        data_path = os.path.join(current_app.root_path, 'data', 'profile_data.json')
        with open(data_path, 'r') as f:
            cv_data = json.load(f)

        # 3. Call our service to get the AI-generated content
        generated_content = generate_letter_content(cv_data, job_description)

        # 4. Return the generated content to the frontend
        return jsonify({"cover_letter": generated_content})

    except Exception as e:
        print(f"Error in cover letter route: {e}")
        return jsonify({"error": str(e)}), 500