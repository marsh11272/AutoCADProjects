# External Database Setup Guide

Your AutoCAD Projects application now supports external database storage! Here are several options to choose from:

## Option 1: JSONBin.io (Recommended - Easy Setup)

JSONBin.io is a simple, free JSON storage service that's perfect for this project.

### Setup Steps:

1. Go to https://jsonbin.io
2. Sign up for a free account
3. Create a new bin with this initial data:
   ```json
   {
     "projects": [],
     "lastUpdated": "2025-08-31T00:00:00.000Z"
   }
   ```
4. Copy your API key and bin ID
5. Open `database.js` and replace:
   - `$2a$10$your-api-key-here` with your actual API key
   - `your-bin-id-here` with your actual bin ID

### Free Tier Limits:

- 10,000 API calls per month
- Perfect for classroom use

## Option 2: Supabase (More Advanced)

Supabase provides a full PostgreSQL database with real-time features.

### Setup Steps:

1. Go to https://supabase.com
2. Create a new project
3. Create a table called `projects` with these columns:
   ```sql
   CREATE TABLE projects (
     id SERIAL PRIMARY KEY,
     level VARCHAR(20) NOT NULL,
     time INTEGER NOT NULL,
     title VARCHAR(255) NOT NULL,
     description TEXT NOT NULL,
     skills JSONB NOT NULL,
     deliverables JSONB NOT NULL,
     steps JSONB NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Get your project URL and anon key from Settings > API
5. Modify `database.js` to use Supabase client

## Option 3: Google Sheets (Alternative)

You can also use Google Sheets as a simple database via the Google Sheets API.

### Setup Steps:

1. Create a Google Sheet with project data
2. Enable Google Sheets API
3. Create service account credentials
4. Modify `database.js` to use Google Sheets API

## Current Configuration

The application is currently configured to:

- **Fallback to localStorage** if no external database is configured
- **Automatically save to both** external database and localStorage as backup
- **Handle errors gracefully** and fall back to local storage

## Testing

To test your setup:

1. Configure your chosen database service
2. Update the API credentials in `database.js`
3. Add a new project through the admin panel
4. Check that the project appears on the home page
5. Verify the data is stored in your external database

## Benefits of External Storage

- **Persistence**: Data survives browser clearing/reinstalls
- **Sharing**: Multiple users can share the same project database
- **Backup**: Automatic cloud backup of your projects
- **Scalability**: Can handle many more projects than localStorage
- **Synchronization**: Changes sync across different devices/browsers

## Security Notes

- Keep your API keys secure and never commit them to public repositories
- Consider using environment variables for production deployments
- The current password protection is client-side only - consider server-side authentication for production use

## Need Help?

If you need assistance setting up any of these options, please let me know which service you'd prefer to use!
