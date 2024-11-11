const express = require("express");
const {
  URLeer,
  UrlAgregar,
  UrlEliminar,
  UrlEditar,
  editarUrlForm,
  redireccionamiento,
} = require("../controllers/homeController");
const { nanoid } = require("nanoid");
const urlValidar = require("../middlewares/urlValidar");
const router = express.Router();

router.get("/", URLeer);
router.post("/", urlValidar, UrlAgregar);
router.get("/eliminar/:id", UrlEliminar);
router.post("/editar/:id", urlValidar, UrlEditar);
router.get("/editar/:id", editarUrlForm);
router.get("/:shortURL", redireccionamiento);

module.exports = router;
