const listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    let listings = await listing.find();
    // console.log(listings); 
    res.render("listings/index.ejs", { listings });
}

module.exports.createRoute = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.createPostRoute = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let list = req.body.Listing;
    const newListing = new listing(list);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", " Add new Listing");
    res.redirect("/listings");
}

module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id);
    if (!listings) {
        req.flash("error", "Listing you requested for updated does not exit!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listings.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listings, originalImageUrl });
}

module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    let newListing = await listing.findByIdAndUpdate(id, { ...req.body.Listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename };
        await newListing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);

}

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", " Listing deleted");
    res.redirect("/listings");
}

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listings) {
        req.flash("error", "Listing you requested for delete does not exit!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listings });
}