const express = require("express");
const router = express.Router();

router.get("/", async(req, res)=>{
    if (req.token) {
        return await res.status(200).json({
            token: req.token
        });
    }else{
        return await res.status(400).send({error: "Token error"});
    }    
});
module.exports = router;