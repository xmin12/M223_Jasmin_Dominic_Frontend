import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Navbar from "../../../Router/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface ListEntry {
    title: string;
    text: string;
    creationDate: string;
    importance: number; // Changed from string to number
}

const ListPage: React.FC = () => {
    const [listEntries, setListEntries] = useState<ListEntry[]>([]);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const [newEntry, setNewEntry] = useState<ListEntry>({
        title: "",
        text: "",
        creationDate: "",
        importance: 0 // Set default importance as 0
    });

    useEffect(() => {
        const storedListEntries = localStorage.getItem('listEntries');
        if (storedListEntries) {
            setListEntries(JSON.parse(storedListEntries));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('listEntries', JSON.stringify(listEntries));
    }, [listEntries]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'importance') {
            // Ensure the input value is a number between 1 and 5
            const importanceValue = parseInt(value);
            if (!isNaN(importanceValue) && importanceValue >= 1 && importanceValue <= 5) {
                setNewEntry(prevState => ({
                    ...prevState,
                    [name]: importanceValue
                }));
            }
        } else {
            setNewEntry(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = () => {
        if (newEntry.title && newEntry.text && newEntry.creationDate && newEntry.importance) {
            setListEntries(prevState => [...prevState, newEntry]);
            setNewEntry({
                title: "",
                text: "",
                creationDate: "",
                importance: 0 // Reset importance to default value after submission
            });
            setShowCreateForm(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleCancel = () => {
        setNewEntry({
            title: "",
            text: "",
            creationDate: "",
            importance: 0 // Reset importance to default value
        });
        setShowCreateForm(false);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Navbar />
            <h1>Lists</h1>
            <IconButton onClick={() => setShowCreateForm(true)} color="primary">
                <AddIcon />
            </IconButton>
            {showCreateForm && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Card style={{ padding: 20, width: 400 }}>
                        <CardContent>
                            <TextField
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
                                id="creationDate"
                                name="creationDate"
                                label="Creation Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newEntry.creationDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="importance"
                                name="importance"
                                label="Importance (1-5)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="number" // Set input type to number
                                value={newEntry.importance.toString()} // Convert importance back to string for the input field
                                onChange={handleChange}
                                inputProps={{ min: "1", max: "5" }} // Limit input to 1-5
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Save
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
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
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default ListPage;
