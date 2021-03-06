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
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
  // .find({ author: "Mosh", isPublished: true})
  .find({ price: { $gt: 10 } })
  .or([ { author: "Mosh"}, { isPublished: true } ])
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
  .sort({ name: 1 })
  .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";
  course.set({
    isPublished: true,
    author: "Another Author"
  });

  const result = await course.save();
}

async function updateCourse2(id) {
  const result = await Course.findByIdAndUpdate({ _id: id }, {
    $set: {
      author: "Mosh",
      isPublished: false
    }
  }, { new: true });

  console.log(result);
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove({ _id: id });
  console.log(course);
}

createCourse();
