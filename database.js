// Database configuration and API functions
class ProjectDatabase {
    constructor() {
        // Using JSONBin.io as a simple external JSON database
        // You can replace this with your preferred service
        this.apiKey = '$2a$10$AgHZFgzRn9jhCP2779NBceL.p8j/KRUZK9N7gTmhPH6vxSKzpCNrS'; // Replace with your actual API key
        this.binId = 'y68b48912ae596e708fde00f9'; // Replace with your actual bin ID
        this.baseUrl = 'https://api.jsonbin.io/v3/b';

        // Fallback to localStorage if API is not configured
        this.useLocalStorage = !this.apiKey.includes('$2a$10$AgHZFgzRn9jhCP2779NBceL.p8j/KRUZK9N7gTmhPH6vxSKzpCNrS') || !this.binId.includes('y68b48912ae596e708fde00f9');

        // Debug logging
        console.log('🔧 ProjectDatabase initialized');
        console.log(`📡 Using external database: ${!this.useLocalStorage}`);
        console.log(`🔑 API Key: ${this.apiKey.substring(0, 10)}...`);
        console.log(`📦 Bin ID: ${this.binId}`);
    }

    async loadProjects() {
        console.log('📥 Loading projects...');

        if (this.useLocalStorage) {
            console.log('💾 Using localStorage as fallback...');
            return JSON.parse(localStorage.getItem('additionalProjects') || '[]');
        }

        try {
            console.log(`🌐 Fetching from JSONBin.io: ${this.baseUrl}/${this.binId}/latest`);

            const response = await fetch(`${this.baseUrl}/${this.binId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });

            console.log(`📡 Response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Successfully loaded from external database:', data);
            return data.record.projects || [];
        } catch (error) {
            console.error('❌ Error loading from external database:', error);
            console.log('💾 Falling back to localStorage...');
            return JSON.parse(localStorage.getItem('additionalProjects') || '[]');
        }
    }

    async saveProjects(projects) {
        console.log('💾 Saving projects...', projects.length, 'projects');

        // Always save to localStorage as backup
        localStorage.setItem('additionalProjects', JSON.stringify(projects));
        console.log('✅ Saved to localStorage');

        if (this.useLocalStorage) {
            console.log('💾 Only using localStorage (external database not configured)');
            return true;
        }

        try {
            console.log(`🌐 Saving to JSONBin.io: ${this.baseUrl}/${this.binId}`);

            const payload = {
                projects: projects,
                lastUpdated: new Date().toISOString()
            };

            console.log('📤 Payload:', payload);

            const response = await fetch(`${this.baseUrl}/${this.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify(payload)
            });

            console.log(`📡 Response status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('✅ Projects saved to external database successfully');
            return true;
        } catch (error) {
            console.error('❌ Error saving to external database:', error);
            console.log('💾 Projects saved to localStorage as fallback');
            return false;
        }
    }

    async addProject(project) {
        try {
            const existingProjects = await this.loadProjects();

            // Calculate new ID
            const newId = Math.max(...existingProjects.map(p => p.id || 0), 12) + 1;
            project.id = newId;

            const updatedProjects = [...existingProjects, project];
            await this.saveProjects(updatedProjects);

            return project;
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    }

    async deleteProject(projectId) {
        try {
            const existingProjects = await this.loadProjects();
            const filteredProjects = existingProjects.filter(p => p.id !== projectId);
            await this.saveProjects(filteredProjects);
            return true;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
}

// Initialize database instance
const projectDB = new ProjectDatabase();
