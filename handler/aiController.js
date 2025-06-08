const { chatWithAi} = require('./aiSystem');

const handleChatRequest = async (req, res) => {
    try {
        const {prompt} = req.body;

        console.log(prompt);

        if(!prompt) {
            return res.status(400).json({
                success:false,
                error: 'Prompt is required',
                
            });
        }

        const result = await chatWithAi(prompt);

        if(result.success) {
            res.json({
                success:true,
                answer: result.answer,
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Our ai is currently out of work, please try later',
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            error:'internal server error',
        });
    }
};

module.exports = { handleChatRequest};