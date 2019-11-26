const generalLocationObjecr = async (req, res) => {
    res.status(200).json();
};

const updateLocationById = async (req, res) => {
    const {
        location_id
    } = req.params;
    res.status(200).json();
};

const deleteLocationById = async (req, res) => {
    const {
        location_id
    } = req.params;
    res.status(200).json();
};

module.exports = {
    generalLocationObjecr,// List all chefsdelete
    updateLocationById,
    deleteLocationById
};