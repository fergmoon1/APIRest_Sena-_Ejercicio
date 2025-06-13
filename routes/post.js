const express = require('express');
const router = express.Router();
const Post = require('../models/post.js'); // Importar el modelo Post

router.post('/', async (req, res) => {
    //console.log(req.body); se utiliza para la respuesta del post en consola
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();//método para guardar el post en la base de datos
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Bloque para mostrar solo un post por el Id
 */
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);//encuentra un post por su Id
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/** 
 * Bloque para borrar un post por el Id
 */
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId }); // Eliminar un post por su Id
        if (!removedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Bloque para actualizar un post por el Id
 */
router.patch('/:postId', async (req, res) => { //patch para actualizar
    try {
        const updatedPost = await Post.updateOne(//actualiza de uno en uno
            { _id: req.params.postId }, // Busca el post por su Id
            { $set: { title: req.body.title }});
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // Devuelve como módulo lo que se le asigna a router