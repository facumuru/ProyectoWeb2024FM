const Url = require("../models/url");
const { nanoid } = require("nanoid");

const URLeer = async (req, res) => {
  try {
    const urls = await Url.find().lean();
    res.render("home", { urls: urls });
  } catch (error) {
    console.log(error);
    res.send("algo salio mal");
  }
};


const UrlAgregar = async (req, res) => {
  try {
    const { origin } = req.body;
    const url = new Url({ origin: origin, shortURL: nanoid(8) });
    await url.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("algo falló");
  }
};

const UrlEliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await Url.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("algo falló");
  }
};

const editarUrlForm = async (req, res) => {
  const { id } = req.params;
  try {
    const urlDB = await Url.findById(id).lean();
   
    res.render("home", { urlDB });
  } catch (error) {
    console.log(error);
    res.send("algo falló");
  }
};

const UrlEditar = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.body;
  try {
    await Url.findByIdAndUpdate(id, { origin: origin });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const redireccionamiento = async (req, res) => {
  const { shortURL } = req.params;
  try {
    const urlDB = await Url.findOne({ shortURL: shortURL });
    res.redirect(urlDB.origin);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  URLeer,
  UrlAgregar,
  UrlEliminar,
  UrlEditar,
  editarUrlForm,
  redireccionamiento,
};
