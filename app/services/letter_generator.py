# backend/app/services/letter_generator.py

import google.generativeai as genai
from flask import current_app

def generate_letter_content(cv_data, job_description):
    """
    Uses the Google Gemini API to generate a cover letter draft.
    """
    try:
        # Get the API key from the Flask app's configuration
        api_key = current_app.config['GOOGLE_API_KEY']
        
        if not api_key:
            raise ValueError("Google API key is not configured.")

        # Configure the generative AI client
        genai.configure(api_key=api_key)

        # --- The Prompt Engineering is the same ---
        prompt = f"""
        As an expert career coach, your task is to write a professional and compelling cover letter for a mechanical engineer named {cv_data['personal_data']['name']}.

        **Candidate's Profile (My CV):**
        - **Name:** {cv_data['personal_data']['name']}
        - **Experience:**
        {''.join([f"  - {exp['role']} at {exp['company']}: {' '.join(exp['points'])}\\n" for exp in cv_data.get('experience', [])])}
        - **Education:**
        {''.join([f"  - {edu['degree']} from {edu['institution']}\\n" for edu in cv_data.get('education', [])])}
        - **Key Skills:** {', '.join(cv_data['skills']['it_knowledge'].values())}, {cv_data['skills']['other_skills']}

        **Target Job Description:**
        ---
        {job_description}
        ---

        **Instructions:**
        1.  Start with a strong opening that grabs the reader's attention.
        2.  Analyze the job description and identify the top 2-3 key requirements.
        3.  In the body of the letter, highlight specific experiences and skills from the candidate's CV that directly match these key requirements. Use concrete examples. For instance, if the job requires "collision analysis", mention the experience at BMW using CATIA.
        4.  Maintain a professional and confident tone, suitable for the German job market.
        5.  Keep the letter concise, ideally around 3-4 paragraphs.
        6.  Conclude with a strong closing statement and a call to action.
        7.  Do not invent any skills or experiences not present in the CV data.
        8.  The final output should be only the cover letter text itself, without any introductory phrases like "Here is the cover letter:".
        """

        # --- Make the API Call to Google Gemini ---
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        # Extract the generated text from the response (it's simpler than OpenAI's)
        generated_text = response.text
        return generated_text

    except Exception as e:
        # Log the error and return a user-friendly message
        print(f"An error occurred with the Google API call: {e}")
        return f"Error: Could not generate the cover letter. The issue is: {e}"