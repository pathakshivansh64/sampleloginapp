const express = require("express");
const Contact = require("../models/Contact.js");
const router = express.Router();

// Add contact
router.post("/", async (req, res) => {
  const { userId, name, mobile, email } = req.body;
  try {
    const contact = new Contact({ userId, name, mobile, email });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all contacts
router.get("/:userId", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update contact
router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
