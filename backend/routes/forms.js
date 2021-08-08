const router = require('express').Router();
let Form = require('../models/form.model');

router.route('/').get((req,res) => {
    Form.find()
        .then(forms => res.json(forms))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const address = req.body.address;
    const email = req.body.email;

    const newForm = new Form({name, contact, address, email});

    newForm.save()
        .then(() => res.json('Form added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
    Form.findById(req.params.id)
        .then(form => res.json(form))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Form.findByIdAndDelete(req.params.id)
        .then(form => res.json('Form deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/upemail/:id').post((req,res) => {
    Form.findById(req.params.id)
        .then(form => {
            form.name = req.body.name;
            form.contact = req.body.contact;
            form.address = req.body.address;
            form.email = req.body.email;

            form.save()
                .then(() => res.json('Form upemaild !'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;