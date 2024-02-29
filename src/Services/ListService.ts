import api from '../config/Api';
import { ListEntry } from '../types/models/ListEntry.model';

const baseURL = '/api/v1/mylistentries'; // Base URL for ListEntry API

const ListService = {
    getListEntry: async (listEntryId: string): Promise<ListEntry> => {
        try {
            const response = await api.get<ListEntry>(`${baseURL}/${listEntryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch list entry');
        }
    },

    updateListEntry: async (listEntry: ListEntry): Promise<ListEntry> => {
        try {
            console.log(listEntry)
            const response = await api.put(`${baseURL}/${listEntry.id}`, listEntry);
            return response.data;

        } catch (error) {
            throw new Error('Failed to update list entry');
        }
    },

    addListEntry: async (listEntry : ListEntry) => {
        try {
            const response = await api.post<ListEntry>(baseURL, listEntry);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add list entry');
        }
    },

    getAllListEntries: async (): Promise<ListEntry[]> => {
        try {
            const response = await api.get<ListEntry[]>(baseURL);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch all list entries');
        }
    },

    deleteListEntry: async (id: string): Promise<void> => {
        try {
            const authToken = localStorage.getItem('authToken');
            await api.delete(`${baseURL}/${id}`, {
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
