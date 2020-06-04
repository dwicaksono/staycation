const Category = require("../models/Category");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard.ejs");
  },

  viewCategory: async (req, res) => {
    const categories = await Category.find();
    res.render("admin/category/view_category.ejs", { categories });
  },

  addCategory: async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.redirect("/admin/category");
  },
  updateCategory: async (req, res) => {
    const { id, name } = req.body;
    const category = await Category.findOne({ _id: id });
    category.name = name;
    await category.save();
    res.redirect("/admin/category");
  },

  viewBank: (req, res) => {
    res.render("admin/bank/view_bank.ejs");
  },

  viewItem: (req, res) => {
    res.render("admin/item/view_item.ejs");
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking.ejs");
  },
};
