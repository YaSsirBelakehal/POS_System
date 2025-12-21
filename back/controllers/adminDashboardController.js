import Admin from "../models/Admin.js"
import Invoice from "../models/Invoice.js"
import Product from "../models/Product.js"


export const getDashboardStats = async (req, res) => {
  try {
    const totalAdmins = await Admin.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    
    const totalSalesAgg = await Invoice.aggregate([
      { $group: { _id: null, sum: { $sum: "$finalTotal" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.sum || 0;

    res.json({
      totalAdmins,
      totalInvoices,
      totalProducts,
      totalSales,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
