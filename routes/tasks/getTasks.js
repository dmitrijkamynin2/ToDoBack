const router = require('express').Router()
const Tasks = require('../../model/Tasks.js')

// const getTasks = (req) => {
//     let out = [];
//     switch (req.query.filterBy) {
//         case 'done':
//             out = Data.tasks.filter((task) => task.done == true);
//             break;
//         case 'undone':
//             out = Data.tasks.filter((task) => task.done == false);
//             break;
//         case 'all':
//             out = Data.tasks;
//             break;
//     }
//     switch (req.query.order) {
//         case 'asc':
//             out.sort((a, b) => {
//                 const dateA = new Date(a.createdAt);
//                 const dateB = new Date(b.createdAt);
//                 return  dateA - dateB
//             });
//             break;
//         case 'desc':
//             out.sort((a, b) => {
//                 const dateA = new Date(a.createdAt);
//                 const dateB = new Date(b.createdAt);
//                 return  dateB - dateA
//             });
//             break;
//     }
//     console.log(out);
//     const result = {
//         count: out.length,
//         tasks: out
//     };

//     const startIndex = +req.query.pp * (+req.query.page - 1);
//     const endIndex = startIndex + +req.query.pp;
//     console.log(startIndex);
//     console.log(endIndex);
//     console.log(req.query.pp);
//     console.log(req.query.page);
//     result.tasks = result.tasks.slice(startIndex, endIndex);
//     return result
// }


router.route('/tasks').get(async (req, res) => {
    let myData = await Tasks.getTasks();
    let out = [];
    switch (req.query.filterBy) {
        case 'done':
            out = myData.tasks.filter((task) => task.done == true);
            break;
        case 'undone':
            out = myData.tasks.filter((task) => task.done == false);
            break;
        case 'all':
            out = myData.tasks;
            break;
    }
    switch (req.query.order) {
        case 'asc':
            out.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return  dateA - dateB
            });
            break;
        case 'desc':
            out.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return  dateB - dateA
            });
            break;
    }
    const result = {
        count: out.length,
        tasks: out
    };
    const startIndex = +req.query.pp * (+req.query.page - 1);
    const endIndex = startIndex + +req.query.pp;
    result.tasks = result.tasks.slice(startIndex, endIndex);
    res.status(200);
    res.send(result);
})

module.exports = router;