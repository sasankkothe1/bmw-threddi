const generalTwitterObject = async (req, res) => {
    res.status(200).json();
};

// const getEventById = async (req, res) => {
//     const {
//         eventId
//     } = req.params;
//     res.status(200).json();
// };

const deleteEventById = async (req, res) => {
    const {
        tweet_id
    } = req.params;
    res.status(200).json();
};

module.exports = {
    generalTwitterObject,
    deleteEventById
};

