import Invoice from "../models/Invoice.js"

export const getAdminReports = async(req,res)=>{
    try{
        const dailyReportsRaw = await Invoice.aggregate([
            {
                $group:{
                    _id:{
                        day:{$dayOfMonth: "$createdAt"},
                        month:{$month: "$createdAt"},
                        year:{$year: "$createdAt"}
                    },
                    totalSales: {$sum: "$finalTotal"},
                    count: {$sum: 1},
                    createdAt: {$first: "$createdAt"}
                }
            },
            {$sort: {createdAt: -1}}
        ])

        const dailyReports = dailyReportsRaw.map(r=>({
            _id: `${r._id.year}-${r._id.month}-${r._id.day}`,
            totalSales: r.totalSales,
            count: r.count,
            createdAt: r.createdAt
        }))

        const last7Days = await Invoice.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte: new Date(Date.now() - 7 * 24 * 60 * 1000)
                    }
                }
            },
            {
                $group:{
                    _id: null,
                    totalSales:{$sum: "$finalTotal"},
                    count:{$sum:1}
                }
            }
        ])

        const last30Days = await Invoice.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalSales:{$sum:"$finalTotal"},
                    count:{$sum:1}
                }
            }
        ])

        const topProducts = await Invoice.aggregate([
            {$unwind: "$items"},
            {
                $group:{
                    _id:"$items.productId",
                    name:{$first:"$items.name"},
                    totalQty:{$sum:"$items.qty"},
                    totalAmount:{$sum:"$items.total"}
                }
            },
            {$sort:{totalQty:-1}},
            {$limit:5}
        ])

        const paymentStats = await Invoice.aggregate([
            {
                $group:{
                    _id:"$paymentMethod",
                    totalSales:{$sum:"$finalTotal"},
                    count:{$sum:1}
                }
            }
        ])

        return res.status(200).json({
            dailyReports,
            last7Days: last7Days[0] || {totalSales:0, count:0},
            last30Days: last30Days[0] || {totalSales:0, count:0},
            topProducts,
            paymentStats

        })
    }catch(err){
        console.error(err)
    }
}