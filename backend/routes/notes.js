const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// ROUTE-1: GET ALL NOTES (GET request)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// ROUTE-2: ADD NOTES (POST request)
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error("Error:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }
  }
);

// ROUTE-3: UPDATE NOTES (PUT request)
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});
// ROUTE-4: DELETE NOTES (DELETE request)
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Not Found!" });
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed!" });
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", deletedNote: note });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});


module.exports = router;
