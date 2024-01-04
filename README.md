# Tana Vision
Tana Vision is a small service based on Node.js that utilizes OpenAI's GPT-4 Vision API to examine and depict images. It handles Tana Paste inputs that include image URLs, and provides detailed descriptions of the images. The associated Tana Template ensures the output from GPT is displayed in a new field.

## Features

 - Utilizes GPT-4 Vision API from OpenAI.
 - Accepts text inputs with Tana Paste-formatted image URLs.
 - Processes and extracts image URLs from the provided text.
 - Returns descriptive analysis of images.

 ## Getting Started
 ### Prerequisites

 - Node.js
 - NPM (Node Package Manager)

### Installation

1. Clone the repository:
```git clone https://github.com/TanaNodes/TanaVision.git ```
2. Navigate to the project directory:
3. ```cd tana-vision ```
4. Install the dependencies: ```npm install ```
5. Create a `.env` file in the root of the project and add your OpenAI API key: ```OPENAI_API_KEY=your_openai_api_key_here ```

### Usage

 1. Start the server: ```npm start ```
 2. Make a POST request to `http://localhost:3000/describe-image` with Tana Paste text containing an image URL - [Install the Tana Template](https://app.tana.inc/?bundle=CJLxnNW36m.oqsiSLlnc-JP).
