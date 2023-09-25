import express from "express";
import { saveArtist, getAllArtists, getSingleArtist,updateArtist,deleteArtist } from "../controller/artistController.js";

const router=express.Router();
router.post('/artist',saveArtist);
router.get('/artist',getAllArtists);
router.get('/artist/:id',getSingleArtist)
router.put('/artist/:id',updateArtist)
router.delete('/artist/:id',deleteArtist)

export default router;