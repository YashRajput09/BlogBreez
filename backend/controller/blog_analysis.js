import blogModel from "../models/blog_model.js";
function getDateRange(period) {
  const now = new Date();
  const past = new Date();
  

  if (period === "7d") past.setDate(now.getDate() - 6);
  if (period === "30d") past.setDate(now.getDate() - 29);
  if (period === "90d") past.setDate(now.getDate() - 89);
  if (period === "1y") past.setFullYear(now.getFullYear() - 1);

  return { from: past, to: now };
}

export const getAnalysisData = async(req, res)=>{
  try {
    const period = req.query.period || '1y';
    console.log(period);
    
    const {from, to} = getDateRange(period);

    const data = await blogModel.aggregate([
        {
            $match:{
                createdAt: { $gte: from, $lte: to }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },  
                totalBlogs: {$sum: 1},
                totalViews: {$sum: "$views"},
                totalLikes: {$sum: "$likes"} 
            } 
        },
        {$sort: {_id: 1}}
    ]);
    console.log(data);
    
    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
       res.status(500).json({ success: false, message: "Server Error" });
    
  }
}