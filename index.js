const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Cousre', courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["Node", "Backend"],
    isPublished: true
  });
  
  const result = await course.save();
  console.log(result);
}

async function getCourses() {

  const courses = await Course
  // .find({ author: "Mosh", isPublished: true})
  .find({ price: { $gt: 10 } })
  .limit(10)
  .sort({ name: 1 })
  .select({ name: 1, tags: 1 });
  console.log(courses);
}

createCourse();
