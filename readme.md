# ICOGEMS Vote Service

## Description
This Node.js application sends multiple GET requests to the ICOGEMS voting page using ScraperAPI to simulate voting.

## Features
- Sends multiple requests to ICOGEMS to fetch the vote page.
- Uses ScraperAPI to bypass restrictions.
- Configurable number of requests via environment variables.
- Custom User-Agent for request headers.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Mucahitakin/IcoGems-Vote-Service.git
   cd IcoGems-Vote-Service
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root and configure the required environment variables:
   ```sh
   PORT=9999
   API_KEY=YOUR_API_KEY
   REQUEST_COUNT=10
   TARGET=8432  # Target ID for the vote page
   ```

## Usage

1. Start the server:
   ```sh
   node index.js
   ```
   or
   ```sh
   npm start
   ```

2. Send the vote requests by accessing the following endpoint:
   ```sh
   http://localhost:9999/vote
   ```

## API Endpoint

### `GET /vote`
Sends multiple requests to the ICOGEMS voting page.

**Response:**
```json
{
    "success": true,
    "message": "10 Sent request to ICOGEMS.COM.",
    "successCount": 8,
    "failCount": 2,
    "results": [
        { "success": true, "status": 200, "data": "..." },
        { "success": false, "status": 500, "message": "Request failed" }
    ]
}
```

## Troubleshooting

Authentication Issues: Ensure your ScraperAPI key is correct.
Request Failures: Some requests may fail due to rate limits; try reducing SEND_VOTE.
CORS Issues: Use a tool like Postman if your frontend has CORS restrictions.
