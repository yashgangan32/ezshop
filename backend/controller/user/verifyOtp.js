async function verifyOtp(req,res) {
    try{
        const {genotp,userotp}=req.body
        if(genotp===userotp)
        {
            res.status(200).json({ message: 'OTP verified' });
        }
        else
        {
            res.status(400).json({ error: 'Invalid OTP' });
        }

    }catch(err){
        res.status(500).json({ error: 'Could not verify OTP' });


    }
    
}

module.exports=verifyOtp