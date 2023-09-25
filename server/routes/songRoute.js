import express from "express";
import { saveSong, getAllSongs, getSingleSong,updateSong,deleteSong } from "../controller/songController.js";

const router=express.Router();
router.post('/song',saveSong);
router.get('/song',getAllSongs);
router.get('/song/:id',getSingleSong)
router.put('/song/:id',updateSong)
router.delete('/song/:id',deleteSong)

export default router;