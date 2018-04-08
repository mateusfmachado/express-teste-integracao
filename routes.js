const router = require('express').Router();

router.get( '/', (req,res,next) => res.send({ ok: true }) );
router.post( '/', (req,res,next) => res.send({ ok: req.body.text }) );

module.exports = router;