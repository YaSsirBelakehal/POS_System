import Invoice from "../models/Invoice.js"

export const dailyReport = async(req,res)=>{
    const today = new Date()
    today.setHours(0,0,0,0)

    const invoices = await Invoice.find({createdAt:{$gte:today}})

    const totalSales = invoices.reduce((acc,inv)=> acc + inv.finalTotal,0)

    res.json({
        date:today,
        totalSales,
        count:invoices.length
    })
}

export const rangeReport = async(req,res)=>{
    const {start, end} = req.body

    const invoices = await Invoice.find({
        createdAt:{$gte:new Date(start), $lte:new Date(end)}
    })

    const total = invoices.reduce((acc, i)=> acc + i.finalTotal,0)

    res.json({
        invoices,
        total
    })
}

export const topProducts = async(req,res)=>{
    const data = await Invoice.aggregate([
        {$unwind:"$items"},
        {$group:{_id:"$items.productId", sold:{$sum:"$items.qty"}}},
        {$sort:{sold:-1}},
        {$limit:10},
        {
            $lookup: {
                from: "products",           // collection name
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },

        { $unwind: "$product" },

        {
            $project: {
                _id: 1,
                sold: 1,
                name: "$product.name"
            }
        }
    ])

    
    res.json(data)
}