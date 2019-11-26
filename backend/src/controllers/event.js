const generalEventObject = async (req, res) => {
    res.status(200).json();
};

const getEventById = async (req, res) => {
    const {
        eventId
    } = req.params;
    res.status(200).json();
};

const deleteEventById = async (req, res) => {
  const {
      eventId
  } = req.params;
  res.status(200).json();
};

module.exports = {
    generalEventObject,// List all chefsdelete
    getEventById,
    deleteEventById
};
