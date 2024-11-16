import express from "express"
import { createContact, deleteContact, getAllContact, updateContact } from "../controller/contactController.js"
const router = express.Router()

router.post("/contacts", createContact);
router.get("/contacts", getAllContact)
router.put("/contacts/:id", updateContact)
router.delete("/contacts/:id", deleteContact)

export default router;


 