const mongoose = require('mongoose');
const noteSchema = require('../models/note');


exports.creatNote = async (req, res, next) => {
  let imagePath = req.body.imagePath;
  console.log("exports.creatNote -> imagePath", imagePath)
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
    const note = new noteSchema({
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    const result = await note.save();
    res.status(201).json({
        message: 'Note created',
        result: result
    });
}

exports.getNotes = async (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedPosts;
    const postQuery = noteSchema.find({creator: req.userData.userId});
    if (pageSize && currentPage) {
      postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    }
    postQuery.find().then(documents => {
        fetchedPosts = documents;
        return noteSchema.count();
      
      }).then(result => {
        res.status(200).json({
            message: 'Notes fetched successfully',
            notes: fetchedPosts,
            totalNotes: result
          });
    }).catch(err => {
        res.status(400).json({
            errorMessage: err
        })
    })
}


exports.deleteNote = (req, res, next) => {
    noteSchema.deleteOne({_id: req.params.id}).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Delete successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }).catch(() => {
      res.status(500).json({
        message: "Deleting Note failed!"
      })
    });
}

exports.editNote = async (req, res, next) => {
  console.log("exports.editNote -> req.params.id", req.params.id)
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  // const note = new noteSchema();
  // console.log("exports.editNote -> note", note)
  try {
  const result = await noteSchema.updateOne({_id: req.params.id}, {$set: {
    title: req.body.title,
    content: req.body.content,
    color: req.body.color,
    imagePath: imagePath,
    creator: req.userData.userId,
}})
  // console.log("exports.editNote -> result", result)
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }
  catch {
    res.status(500).json({
      message: "Couldn't update note"
    })
  }
}
