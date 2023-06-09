import Router from "express";
import {
  createNewNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notesController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

export default router;
