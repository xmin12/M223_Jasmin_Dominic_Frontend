import api from '../config/Api';
import { ListEntry } from '../types/models/ListEntry.model';

const ListService = {
    getListEntry: async (listEntryId: string): Promise<ListEntry> => {
        try {
            const response = await api.get<ListEntry>(`/mylistentries/${listEntryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch list entry');
        }
    },

    updateListEntry: async (listEntry: ListEntry): Promise<ListEntry> => {
        try {
            const response = await api.put(`/mylistentries/${listEntry.id}`, listEntry);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update list entry');
        }
    },

    addListEntry: async (listEntry: ListEntry) => {
        try {
            // Retrieve the authentication token from local storage
            const authToken = localStorage.getItem('authToken');

            // Make a POST request to the backend API with the authorization header
            const response = await api.post('/mylistentries', listEntry, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Include the authentication token in the headers
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('Failed to add list entry'); // Throw an error if adding list entry fails
        }
    },

    getAllListEntries: async (): Promise<ListEntry[]> => {
        try {
            const response = await api.get<ListEntry[]>('/mylistentries');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch all list entries');
        }
    },

    deleteListEntry: async (id: string): Promise<void> => {
        try {
            const authToken = localStorage.getItem('authToken');
            await api.delete(`/mylistentries/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        } catch (error) {
            throw new Error('Failed to delete list entry');
        }
    },
};

export default ListService;
