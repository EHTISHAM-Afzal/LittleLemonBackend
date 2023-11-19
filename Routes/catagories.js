import express from "express"
import { Catagory, validateCatagory } from "../Models/CatagoryModel.js";

const catagoriesRouter = express.Router();


catagoriesRouter.get("/", async (req, res) => {
    await Catagory
        .find()
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Catagory", error: err.message })
        );
});

catagoriesRouter.get("/:id", async (req, res) => {
    await Catagory
        .findById(req.params.id)
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant find the Catagory", error: err.message })
        );
});

catagoriesRouter.post("/", (req, res) => {
    const catagory = new Catagory({
        name: req.body.name,
    });
    const { error } = validateCatagory(req.body);
    if (error) return res.status(400).send(error.message);
    catagory.save()
        .then((r) => res.send(r))
        .catch((err) => {
            if (err.code === 11000) {
                // Duplicate cataory
                return res.status(422).send({ message: 'catagory already exists!' });
            }
            // Some other error
            return res.status(400).send({ message: "Oops cant save", error: err.message })
        }
        );
});

catagoriesRouter.put("/:id", async (req, res) => {
    const { error } = validateCatagory(req.body);
    if (error) return res.status(400).send(error.message);
    await Catagory
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) =>
            res.send({
                message: "Catagory updated the new data is ",
                response: response,
            })
        )
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant update the Catagory", error: err.message })
        );
});

catagoriesRouter.delete("/:id", async (req, res) => {
    await Catagory
        .findOneAndDelete( req.params.id )
        .then((response) => res.send(response))
        .catch((err) =>
            res
                .status(400)
                .send({ message: "Oops cant delete the Catagory", error: err.message })
        );
});



export default catagoriesRouter;