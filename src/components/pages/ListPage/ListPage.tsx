import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Navbar from "../../../Router/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ListEntry } from '../../../types/models/ListEntry.model';
import ListService from '../../../Services/ListService';
import SaveButton from "../../atoms/SaveButton";

const ListPage: React.FC = () => {
    // Initialize two hardcoded cards
    const initialListEntries: ListEntry[] = [

        {title: "",
            text: "",
            creationDate: "",
            importance: 0
        }
    ];

    const [listEntries, setListEntries] = useState<ListEntry[]>(initialListEntries);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const [newEntry, setNewEntry] = useState<ListEntry>({
        title: "",
        text: "",
        creationDate: "",
        importance: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date only
            const updatedEntry = { ...newEntry, creationDate: currentDate }; // Update creation date before sending to backend
            const createdEntry = await ListService.addListEntry(updatedEntry);
            setListEntries(prevState => [...prevState, createdEntry]);
            setNewEntry({ // Reset form fields
                title: "",
                text: "",
                creationDate: "",
                importance: 0
            });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating list entry:', error);
        }
    };


    const handleCancel = () => {
        setNewEntry({ // Reset form fields
            title: "",
            text: "",
            creationDate: "",
            importance: 0
        });
        setShowCreateForm(false);
    };

    useEffect(() => {
        const fetchListEntries = async () => {
            try {
                const entries = await ListService.getAllListEntries();
                setListEntries(entries);
            } catch (error) {
                console.error('Error fetching list entries:', error);
            }
        };
        fetchListEntries();
    }, []);

    return (
        <>
            <Navbar />
            <Box sx={{ textAlign: 'center' }}>
                <h1>Lists</h1>
                <IconButton
                    data-cy="list-create-button"
                    onClick={() => setShowCreateForm(true)}
                    color="primary"
                >
                    <AddIcon />
                </IconButton>
                {showCreateForm && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Card style={{ padding: 20, width: 400 }}>
                            <CardContent>
                                <TextField
                                    data-cy="list-title-field"
                                    id="title"
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={newEntry.title}
                                    onChange={handleChange}
                                />
                                <TextField
                                    data-cy="list-text-field"
                                    id="text"
                                    name="text"
                                    label="Text"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={newEntry.text}
                                    onChange={handleChange}
                                />
                                <TextField
                                    data-cy="list-number-field"
                                    id="importance"
                                    name="importance"
                                    label="Importance (1-5)"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={newEntry.importance.toString()}
                                    onChange={handleChange}
                                    inputProps={{ min: "1", max: "5" }}
                                />
                                <SaveButton
                                    data-cy="list-save-button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </SaveButton>
                                <Button
                                    data-cy="list-cancel-button"
                                    variant='contained'
                                    color='error'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {listEntries.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {listEntries.map((entry, index) => (
                                <Card key={index} style={{ padding: 20, width: 400, margin: '10px auto' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {entry.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {entry.text}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Creation Date: {entry.creationDate}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Importance: {entry.importance}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size='small'
                                            color='primary'
                                            variant='contained'
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size='small'
                                            color='error'
                                            variant='contained'
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    )}
                    {listEntries.length === 0 && (
                        <Typography variant="body1">No entries available</Typography>
                    )}
                </Box>

            </Box>
        </>
    );
}

export default ListPage;
