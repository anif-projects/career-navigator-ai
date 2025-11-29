import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def test_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment variables.")
        return

    print(f"API Key found: {api_key[:5]}...{api_key[-5:]}")

    # Configure the library
    genai.configure(api_key=api_key)

    # List available models to confirm access
    print("\nChecking available models...")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"Error listing models: {e}")

    # Initialize the model
    model_name = 'gemini-2.5-flash-lite'
    print(f"\nInitializing model: {model_name}")
    
    try:
        model = genai.GenerativeModel(model_name)
        
        # Generate content
        prompt = "Hello, explain quantum computing in one sentence."
        print(f"Sending prompt: '{prompt}'")
        
        response = model.generate_content(prompt)
        
        print("\nResponse from Gemini:")
        print("-" * 20)
        print(response.text)
        print("-" * 20)
        print("\nTest completed successfully!")

    except Exception as e:
        print(f"\nError generating content: {e}")

if __name__ == "__main__":
    test_gemini()
