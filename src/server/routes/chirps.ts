import { Router } from 'express';
import chirpstore from '../utils/chirpstore';

const router = Router();

router.get('/', (req, res) => {
    let chirps = chirpstore.GetChirps();
    res.json(chirps);
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    res.json(chirpstore.GetChirp(id))
});

router.post('/', (req, res) => { 
    chirpstore.CreateChirp(req.body);
    res.sendStatus(200);       
});

router.put('/:id', (req, res) => { 
    let id = req.params.id;
    let chirp = req.body;
    chirpstore.UpdateChirp(id, chirp);
    res.sendStatus(200);            
});

router.delete('/:id', (req, res) => { 
    let id = req.params.id;
    chirpstore.DeleteChirp(id);
    res.sendStatus(200);            
});

export default router;