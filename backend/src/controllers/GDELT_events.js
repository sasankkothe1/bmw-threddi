const generalGDELTObject = async (req, res) => {
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
        GlobalEventID
    } = req.params;
    res.status(200).json();
};

module.exports = {
    generalGDELTObject,// List all chefsdelete
    deleteEventById
};
