// Example configuration for JSONBin.io
// Copy this content and paste into database.js, replacing the placeholder values

class ProjectDatabase {
    constructor() {
        // REPLACE THESE VALUES with your actual JSONBin.io credentials:
        this.apiKey = '$2a$10$abcdef123456789...'; // Your JSONBin.io Master Key
        this.binId = '66c7d8e4ad19ca34f8abcdef'; // Your Bin ID

        this.baseUrl = 'https://api.jsonbin.io/v3/b';
        this.useLocalStorage = !this.apiKey.includes('$2a$10$') || !this.binId.includes('66c7d8e4');
    }

    // ... rest of the methods remain the same
}

/* 
SETUP INSTRUCTIONS:

1. Go to https://jsonbin.io and create a free account
2. Create a new bin with this JSON structure:
   {
     "projects": [],
     "lastUpdated": "2025-08-31T00:00:00.000Z"
   }
3. Copy your Master Key from the dashboard
4. Copy your Bin ID from the bin URL
5. Replace the values above with your actual credentials
6. Save the file

That's it! Your projects will now be stored in the cloud.
*/
