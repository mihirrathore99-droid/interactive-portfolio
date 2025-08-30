# backend/run.py

from app import create_app

app = create_app()

if __name__ == '__main__':
    # The server will automatically reload when you make changes
    app.run(debug=True, port=5001)