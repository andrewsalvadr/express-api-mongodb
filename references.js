///
///Exercise

// # Get all published courses that are $15 or more,
// # or have the word 'by' in their title


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean 
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({
        isPublished: true
    })
    .or([ 
     { price: { $gte: 15 }},
     { name: /.*by*./i }
    ])
    .select('name author price');
}

async function run() {
    const course = await getCourses();
    console.log(course)
}

// run()

async function updateCourse(id) {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Andrew',
            isPublished: false,
        }
    }, { new: true });
    console.log(result);
}

updateCourse('65f7ff9cba17333dcecf6dd7');

// async function removeCourse(id) {
//     const result = await Course.deleteOne({ _id: id })
//     console.log(result)
// }

// removeCourse('65f7ff9cba17333dcecf6dd7');



async function removeCourse(id) {
    // const result = await Course.deleteMany({ _id: id })
    const course = await Course.findByIdAndDelete(id);
    console.log(course)
}

removeCourse('65f7ff9cba17333dcecf6dd7');

///////////////////////////


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/playground')
// .then(() => console.log('Connected to MongoDB...'))
// .catch(err => console.error('Could not connect to MongoDB..', err))

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [ String ],
//     date: { type: Date, default: Date.now },
//     isPublished: Boolean
// })

// const Course = mongoose.model('Course', courseSchema);

// async function createCourse() {

//     const course =  new Course({
//         name: 'Angular Course',
//         author: 'Andrew',
//         tags: ['angular', 'frontend'],
//         isPublished: true
//     });

//     const result = await course.save();
//     console.log(result);

// }

// // createCourse();


// /// SYNTAX FOR MONGODB
//     // eq (equal)
//     // ne (not equal)
//     // gt (greater than)
//     // gte (greater than or equal to)
//     // lt (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in)

// async function getCourses() {

//     const courses = await Course
//     .find({
//         author: 'Andrew', 
//         isPublished: true,
//     })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//     console.log(courses)
// }

// getCourses();

// async function getCourses() {

//  const pageNumber = 2;
//  const pageSize = 10;

// real world
// /api/courses?pageNumber=2&pageSizes=10


//     const courses = await Course
//     // .find({
//     //     author: 'Andrew', 
//     //     isPublished: true,
//     // })

//     // .find({ price: { $gt: 10, $lte: 20 } })

//     // .find({ price: { $in: [10, 15, 20] }})
//     // .find()
//     // .or([ {author: 'Andrew'}, {isPublished: true}])

//     /// /^Andrew/ represent strings that start with something (Andrew)
//     // it doesnt have what we after those course will return
//     // .find({ author: /pattern/ })

//     // Ends with Salvador - case sensitive
//     // .find({ author: /Salvador$/i })

//     // Course Contains Andrew
//     // we can have 0 or more characters before or after Andrew
//     // .find ({ author: /.*Andrew*./ })
//     // .and([])


//      // Counting document instead of using select()
//      .count() 

/// We need to skip in the previous page formula for pagination
// skip((pageNumber -1 ) * pageSize)
// .limit(pageSize)

//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//     console.log(courses)
// }

// getCourses();
