const { Contact } = require("../models/model")

//User ucin

module.exports.AllContactGet = async (req, res) => {
    await Contact.findAll().then((contacts) => {
        res.json({ contacts: contacts })
    }).catch((err) => {
        res.status(500).json({ err })
    })
}

module.exports.singleContact = async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            res.json({ contact: contact })
        } else {
            res.json({ error: "Tapylmady" })
        }
    })
}

module.exports.createContactPost = async (req, res) => {
    await Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        comment: req.body.comment
    })
        .then(() => {
            res.json({ success: "Teswir ustunlikli ugrdyldy" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


module.exports.editContactGet = async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    })
        .then((contact) => {
            res.json({ contact: contact })
        })
}

module.exports.editContactPost = async (req, res) => {
    await Contact.update(
        {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            comment: req.body.comment
        },
        { where: { id: req.params.contactId } })
        .then(() => {
            res.json({ success: "ustunlikli uytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
}

module.exports.destroy = async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            contact.destroy();
            return res.json({ success: "Teswir ustunlikli pozuldy" })
        } else {
            res.json({ error: "Teswir tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
}