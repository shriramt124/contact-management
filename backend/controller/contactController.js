import Contact from "../model/contact.js"



export const getAllContact = async (req, res) => {
    try {
        const contact = await Contact.find();

        return res.status(200).json({
            message: "contacts fetched successFully",
            contact: contact
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching contacts",
            error: error.message,
            stack: process.env.environment === 'DEVELOPMENT' ? error.stack : ""
        })
    }
}

 
//post the contact
export const createContact = async (req, res) => {

    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    if (!firstName || !lastName || !email || !phone  ) {
        return res.status(400).json({ message: "Please provide all fields" });
    }
    try {
        //if candidate is already present then just throw the error 
        const isPresent = await Contact.findOne({ email });
        if (isPresent) {
            return res.status(400).json({
                message: "Contact already exists",
                error: "Contact already exists",
            });
        }
        const contact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle
        });
        await contact.save();
        return res.status(201).json({
            status: true,
            message: "contact created successfully",
            contact: contact
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating contact",
            error: error.message,
            stack: process.env.environment === 'DEVELOPMENT' ? error.stack : ""
        })
    }
}

//update the contact by id
export const updateContact = async (req, res) => {
    const { id } = req.params;
    console.log(req.params ," params ")
   
    if (!id) {
        return res.status(400).json({ message: "Please provide id" });
    }
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await Contact.findByIdAndUpdate(id, req.body, { new: true });

        await contact.save();

        return res.status(200).json({
            status: true,
            message: "Contact updated successfully",
            contact: contact
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating contact",
            error: error.message,
            stack:error.stack
        })
    }
}
//delete a contact by id
export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Please provide id" });
    }
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await contact.deleteOne({ _id: id });
        return res.status(200).json({
            status: true,
            message: "Contact deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting contact",
            error: error.message,
            stack: error.stack
        })
    }
}
