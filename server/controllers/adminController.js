const fs = require("fs-extra");
const path = require("path");
const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Feature = require("../models/Feature");
const Activity = require("../models/Activity");
const Item = require("../models/Item");
const Image = require("../models/Image");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard.ejs", {
      title: "Staycation | Dashboard",
    });
  },

  //category control
  viewCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/category/view_category.ejs", {
        categories,
        alert,
        title: "Staycation | Category",
      });
    } catch (error) {
      res.render("/admin/category");
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/category");
    }
  },

  // BANK Control
  viewBank: async (req, res) => {
    try {
      const bank = await Bank.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/bank/view_bank.ejs", {
        bank,
        alert,
        title: "Staycation | Bank",
      });
    } catch (error) {
      res.render("/admin/bank");
    }
  },
  addBank: async (req, res) => {
    try {
      const { nameBank, nomerRekening, name } = req.body;
      await Bank.create({
        nameBank,
        nomerRekening,
        name,
        imageUrl: `images/${req.file.filename}`,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  editBank: async (req, res) => {
    try {
      const { id, nameBank, nomerRekening, name } = req.body;
      const bank = await Bank.findOne({ _id: id });
      if (req.file == undefined) {
        bank.nameBank = nameBank;
        bank.nomerRekening = nomerRekening;
        bank.name = name;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.nameBank = nameBank;
        bank.nomerRekening = nomerRekening;
        bank.name = name;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      }
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      bank.remove();
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/bank");
    }
  },

  //Item control
  viewItem: async (req, res) => {
    try {
      const item = await Item.find()
        .populate({ path: `imageId`, select: `id imageUrl` })
        .populate({ path: `categoryId`, select: `id name` });
      const category = await Category.find();
      const image = await Image.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/item/view_item.ejs", {
        title: "Staycation | Item",
        alert,
        category,
        item,
        action: "view",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },

  addItem: async (req, res) => {
    try {
      const { categoryId, title, price, city, country } = req.body;
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newItem = {
          categoryId,
          title,
          price,
          city,
          country,
          description: "about",
        };
        const item = await Item.create(newItem);
        category.itemId.push({ _id: item._id });
        await category.save();
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }
        req.flash("alertMessage", "Success Add Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },

  showImageItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate({
        path: `imageId`,
        select: `id imageUrl`,
      });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/item/view_item.ejs", {
        title: "Staycation | Sho image item",
        alert,
        item,
        action: "show image",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },
  showEditItem: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const item = await Item.findOne({ _id: id })
        .populate({ path: `imageId`, select: `id imageUrl` })
        .populate({ path: `categoryId`, select: `id name` });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/item/view_item.ejs", {
        title: "Staycation | Edit Item",
        alert,
        item,
        category,
        action: "edit item",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },
  EditItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryId, title, price, city, country, about } = req.body;
      const item = await Item.findOne({ _id: id })
        .populate({ path: `imageId`, select: `id imageUrl` })
        .populate({ path: `categoryId`, select: `id name` });

      if (req.files.length > 0) {
        for (let i = 0; i < item.imageId.length; i++) {
          const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        item.title = title;
        item.price = price;
        item.city = city;
        item.country = country;
        item.description = about;
        item.categoryId = categoryId;
        await item.save();
        req.flash("alertMessage", "Success Edit Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      } else {
        item.title = title;
        item.price = price;
        item.city = city;
        item.country = country;
        item.description = about;
        item.categoryId = categoryId;
        await item.save();
        req.flash("alertMessage", "Success Edit Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate(`imageId`);
      for (let i = 0; i < item.imageId.length; i++) {
        Image.findOne({ _id: item.imageId[i]._id })
          .then((image) => {
            fs.unlink(path.join(`public/${image.imageUrl}`));
            image.remove();
          })
          .catch((error) => {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/admin/item");
          });
      }
      await item.remove();
      req.flash("alertMessage", "Success Delete image");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/admin/item");
    }
  },

  //view detail item
  viewDetailItem: async (req, res) => {
    const { itemId } = req.params;
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const feature = await Feature.find({ itemId: itemId });
      const activity = await Activity.find({ itemId: itemId });
      res.render("admin/item/detailItem/show-detail-item.ejs", {
        title: "Staycation | Detail Item",
        alert,
        itemId,
        feature,
        activity,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect(`/admin/item/show-datail-item/${itemId}`);
    }
  },

  addFeature: async (req, res) => {
    const { name, qty, itemId } = req.body;
    console.log(name);
    try {
      if (!req.file) {
        req.flash("alertMessage", "Image not found");
        req.flash("alertStatus", "danger");
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
      const feature = await Feature.create({
        name,
        qty,
        itemId,
        imageUrl: `images/${req.file.filename}`,
      });

      const item = await Item.findOne({ _id: itemId });
      item.featureId.push({ _id: feature._id });
      await item.save();
      req.flash("alertMessage", "Success Add Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  editFeature: async (req, res) => {
    const { id, name, qty, itemId } = req.body;
    try {
      const feature = await Feature.findOne({ _id: id });
      if (req.file == undefined) {
        feature.name = name;
        feature.qty = qty;
        await feature.save();
        req.flash("alertMessage", "Success Update Feature");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      } else {
        await fs.unlink(path.join(`public/${feature.imageUrl}`));
        feature.name = name;
        feature.qty = qty;
        feature.imageUrl = `images/${req.file.filename}`;
        await feature.save();
        req.flash("alertMessage", "Success Update Feature");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  deleteFeature: async (req, res) => {
    const { id, itemId } = req.params;
    try {
      const feature = await Feature.findOne({ _id: id });
      const item = await Item.findOne({ _id: itemId }).populate("featureId");
      for (let i = 0; i < item.featureId.length; i++) {
        if (item.featureId[i].toString() == feature._id.toString()) {
          item.featureId.pull({ _id: feature._id });
          await item.save();
        }
      }
      await fs.unlink(path.join(`public/${feature.imageUrl}`));
      feature.remove();
      req.flash("alertMessage", "Success Delete Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking.ejs", {
      title: "Staycation | Booking",
    });
  },
};
