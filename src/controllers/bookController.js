const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")


//3rd
const createBook= async function (req, res) {
    let book = req.body
    if(data.author && data.publisher){
        let aCheck=await authorModel.find({_id:data.author}).select("_id")
        let pCheck=await publisherModel.find({_id:data.publisher}).select("_id").lean()
        if(!aCheck.length && !pCheck.length)
        res.send({msg:"author and publisher id fields is not match the data , hence invalid !"})
        else if(!aCheck.length && pCheck.length)
        res.send({msg:"author id doesn't match our data, hence invalid !"})
        else if(aCheck.length && !pCheck.length)
        res.send({msg:"publisher id don't match to our data,hence invalid !"})
        else{
            if(!await bookModel.exists(req.body)){
                let saveData=await bookModel.create(req.body)
                res.send({msg:saveData})
            }else res.send({msg: "this book already present in the collection"})
        }
    }
    else if(!data.author && data.publisher)res.send({msg:"you must input auther objectId"})
    else if(data.author && !data.publisher)res.send({msg:"you must input publisher objectId"})
    else res.send({msg:"you must input author and publisher objectId in Book Data"})

}
module.exports.createBook=createBook





























//4


const getBooksData=async function(req,res){
    let books=await bookModel.find().populate(['author','publisher'])
    res.send({data:books})
}
module.exports.getBooksData=getBooksData

//5a
const updateBook=async function(req,res){
    let pId=await publisherModel.findOne({publisherName:req.body.publisher})
    let data=await bookModel.updateMany(
        {publisher:pId},
{$set:{isHardCover:true}},
    )
        res.send({msg:data})
}
module.exports.updateBook=updateBook

//5b

const updateB=async (req,res)=>{
    let a_filter=await authorModel.find({rating:{$gt:3.5}})
    await bookModel.updateMany({author:a_filter},{$inc:{price:10}})
    let data=await bookModel.find()
    res.send({msg:data})
}
module.exports.updateB=updateB


