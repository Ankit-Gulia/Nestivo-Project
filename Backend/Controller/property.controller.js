
const propertyModel = require("../Models/property.model");

module.exports.properties = async(req, res) => {
    let properties = await propertyModel.find({});
    return res.json({message : "All Properties", properties});
};

module.exports.propertyDetails = async (req, res, next) => {
    let { id } = req.params;
    let property = await propertyModel.findById(id).populate({path : "reviews", populate:{path : "author"}}).populate('owner');
    return res.json({message : "Property Details", property});
};

module.exports.addProperty = async (req, res, next) => {
    let property = new propertyModel(req.body);
    const {filename, path} = req.file;
    property.image = {url : path, filename};
    property.owner = req.user._id;
    await property.save();
    res.json({message : "New Property Added"});
};

module.exports.editProperty = async(req, res) => {
    const updatedProperty = await propertyModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //it return new updated property
    );
    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedProperty.image = {url, filename};
    await updatedProperty.save();
    }
    return res.json({message : "Property Updated", updatedProperty});
};


module.exports.deleteProperty = async (req, res) => {
    await propertyModel.findByIdAndDelete(req.params.id);
    return res.json({message : "Property Deleted"});
};