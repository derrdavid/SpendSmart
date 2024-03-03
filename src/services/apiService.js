const BASE_URL = process.env.REACT_APP_API_URL;

const apiService = {
    fetch: async (collectionName) => {
        try {
            const response = await fetch(`${BASE_URL}/${collectionName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch collection: ' + collectionName);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    fetchByYear: async (collectionName, year) => {
        try {
            const response = await fetch(`${BASE_URL}/${collectionName}/${year}`);
            if (!response.ok) {
                throw new Error('Failed to fetch collection by year: ' + collectionName);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    addOne: async (collectionName, itemData) => {
        try {
            const response = await fetch((`${BASE_URL}/${collectionName}`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });

            if (!response.ok) {
                throw new Error(`Failed to add item to ${collectionName}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error adding item to ${collectionName}:`, error);
            throw error;
        }
    },

    updateOne: async (collectionName, itemData) => {
        try {
            const response = await fetch(`${BASE_URL}/${collectionName}/${itemData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });
            if (!response.ok) {
                throw new Error(`Failed to update item in ${collectionName}`);
            }
            return await response.json();

        } catch (error) {
            console.error(`Error updating item in ${collectionName}:`, error);
            throw error;
        }
    },

    deleteOne: async (collectionName, id) => {
        try {
            const response = await fetch(`${BASE_URL}/${collectionName}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item from ${collectionName}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error deleting item from ${collectionName}:`, error);
            throw error;
        }
    },

    deleteMany: async (collectionName, itemIds) => {
        try {
            const response = await fetch(`${BASE_URL}/${collectionName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: itemIds })
            });

            if (!response.ok) {
                throw new Error(`Failed to delete items from ${collectionName}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error deleting items from ${collectionName}:`, error);
            throw error;
        }
    }
}

export default apiService;