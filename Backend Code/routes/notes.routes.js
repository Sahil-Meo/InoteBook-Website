const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes.models');
const fetchUser = require('../middleware/fetchuser.mw');

// Route 1: this route for fetching all notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Server error while find notes" })
    }
})

//Route2: for create one notes
router.post('/createnotes', [
    body('title').exists().isLength({ min: 3 }).withMessage('Please enter your notes title'),
    body('description').isLength({ min: 5 }).withMessage('Please enter description of the notes'),
    body('tag').isLength({ min: 1 }).withMessage('you need to enter tag of the notes')
], fetchUser, async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({ errors: error.array() });
    }

    const { title, description, tag } = req.body


    try {
        const notes = new Notes({ title, description, tag, user: req.user.id })
        const savenotes = await notes.save()
        res.json(savenotes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Server errror while creating notes" })
    }

});

//Route3: to update the notes
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Build updated note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Update and return the new note
        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


//Route4: This route is create for delete the notes
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(404).send("Note not found") }

    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed") }
    console.log(req.user.id);

    try {
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }

})


module.exports = router;