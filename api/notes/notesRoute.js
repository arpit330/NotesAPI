const { User, isMailUsed } = require('../../models/user');
const Note = require('../../models/notes');
const express = require('express');
const router = express.Router();
const path = require('path');

const saltRounds = 10;


router.get('/', async (req, res) => {

    const userId = req.userId;

    try {

        const allNotes = await Note.find({ owner: userId });

        res.status(200).json(allNotes);

    }
    catch (error) {
        console.error('Error fetching user notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.get('/:id', async (req, res) => {
    const noteId = req.params.id;
    const userId = req.userId;
    try {

        const userNote = await Note.findOne({ _id: noteId, owner: userId });

        if (!userNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(userNote);
    }
    catch (error) {
        console.error('Error fetching user note by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;

    try {
        const newNote = new Note({
            title,
            content,
            owner: userId,
        });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating a new note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const userId = req.userId;

    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, owner: userId },
            { title, content },
            { new: true } 
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found or not owned by the user' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating user note by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/:id', async (req, res) => {
    const noteId = req.params.id;

    try {
        const deletedNote = await Note.findOneAndDelete({ _id: noteId, owner: req.userId });

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found or not owned by the user' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting user note by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id/share', async (req, res) => {
    const noteId = req.params.id;
    const { shareWithUserId } = req.body;

    try {
        const noteToShare = await Note.findOne({ _id: noteId, owner: req.userId });

        if (!noteToShare) {
            return res.status(404).json({ error: 'Note not found or not owned by the user' });
        }

        noteToShare.sharedWith.push(shareWithUserId);
        await noteToShare.save();

        res.json(noteToShare);
    } 
    catch (error) {

        console.error('Error sharing user note by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;