
const { User, isMailUsed } = require('../../models/user');
const express = require('express');
const router = express.Router();
const path = require('path');
const Note = require('../../models/notes');



router.get('/', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const userNotes = await Note.find({
            owner: req.userId,
            $text: { $search: searchQuery },
        });

        res.json(userNotes);
    } catch (error) {
        console.error('Error searching user notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;