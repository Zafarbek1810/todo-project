// let tasks = [
//     {
//         title: "task1",
//         desc: "desc1",
//         staff: "Ali",
//         startDate: "12.20.20",
//         finishDate: "12.20.20",
//         status: "Pending",
//         price: 200
//     },
//     {
//         title: "task1",
//         desc: "desc1111",
//         staff: "Vali",
//         startDate: "12.20.20",
//         finishDate: "12.20.20",
//         status: "Doing",
//         price: 200
//     },
//     {
//         title: "task1",
//         desc: "desc1",
//         staff: "Jack",
//         startDate: "12.20.20",
//         finishDate: "12.20.20",
//         status: "Done",
//         price: 200
//     },
//     {
//         title: "task1",
//         desc: "desc1",
//         staff: "Dilshod",
//         startDate: "12.20.20",
//         finishDate: "12.20.20",
//         status: "Closed",
//         price: 200
//     },
//     {
//         title: "task1",
//         desc: "desc1",
//         staff: "Ali",
//         startDate: "12.20.20",
//         finishDate: "12.20.20",
//         status: "Rejected",
//         price: 200
//     }
// ]

let myForm = document.forms["myForm"]
let title = document.forms["myForm"]["title"]
let desc = document.forms["myForm"]["desc"]
let staff = document.forms["myForm"]["staff"]
let startDate = document.forms["myForm"]["startDate"]
let finishDate = document.forms["myForm"]["finishDate"]
let status = document.forms["myForm"]["status"]
let price = document.forms["myForm"]["price"]
let addTaskBtn = document.querySelector(".addTask")
let tableBody=document.querySelector(".tableBody")


let workers = []
let salary = []

// localStorage.setItem("tasks", JSON.stringify(tasks))
let tasks
if(JSON.parse(localStorage.getItem("tasks"))){
   tasks= JSON.parse(localStorage.getItem("tasks"))
}else{
    tasks=[]
}

const countSalary = () => {
    for (let i = 0; i < tasks.length; i++) {
        if (!workers.includes(tasks[i].staff)) {
            workers.push(tasks[i].staff)
            salary.push({ name: tasks[i].staff, count: 0, price: 0 })
        }
    }
    for (let i = 0; i < salary.length; i++) {
        let counter = 0
        let price = 0
        for (let j = 0; j < tasks.length; j++) {
            if (salary[i].name === tasks[j].staff && tasks[j].status === "Closed") {
                counter++;
                price += +tasks[j].price
            }
        }
        salary[i].count = counter
        salary[i].price = price
    }
    tableBodyHtml=""
    for(let i=0; i<salary.length;i++){
        tableBodyHtml+=`
          <tr>
            <th scope="row">${i+1}</th>
            <td>${salary[i].name}</td>
            <td>${salary[i].count}</td>
            <td>${salary[i].price}$</td>
          </tr>`

    }
    tableBody.innerHTML=tableBodyHtml

}



addTaskBtn.addEventListener("click", () => {
    let task = {
        title: title.value,
        desc: desc.value,
        staff: staff.value,
        startDate: startDate.value,
        finishDate: finishDate.value,
        status: status.value,
        price: price.value
    }
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    chiz()


})


const chiz = () => {
    countSalary()
    let pending = document.querySelector(".pending")
    let doing = document.querySelector(".doing")
    let done = document.querySelector(".done")
    let closed = document.querySelector(".closed")
    let rejected = document.querySelector(".rejected")
    pending.innerHTML = ``
    doing.innerHTML = ``
    done.innerHTML = ``
    closed.innerHTML = ``
    rejected.innerHTML = ``
    tasks.forEach((task, index) => {
        if (task.status === "Pending") {
            pending.innerHTML +=
                `<h3>${task.staff}</h3>
            <h4>${task.title}</h4>
            <h4>Price:${task.price}</h4>
            <p>Description: ${task.desc}</p>
            <p><b>Start date:</b> ${task.startDate}</p>
            <p><b>finish date:</b> ${task.finishDate}</p>
            <select name="status" class="form-select mb-2" id="mySelect${index}">
              <option value="">Select status</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <div class="d-flex align-items-center justify-content-between">
              <button class="btn btn-warning text-white" onclick="editStatus(${index})">Edit status</button>
              <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
            <hr>`
        } else if (task.status === "Doing") {
            doing.innerHTML +=
                `<h3>${task.staff}</h3>
        <h4>${task.title}</h4>
        <h4>Price:${task.price}</h4>
        <p>Description: ${task.desc}</p>
        <p><b>Start date:</b> ${task.startDate}</p>
        <p><b>finish date:</b> ${task.finishDate}</p>
        <select name="status" class="form-select mb-2" id="mySelect${index}">
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <div class="d-flex align-items-center justify-content-between">
          <button class="btn btn-warning text-white" onclick="editStatus(${index})">Edit status</button>
          <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>
        <hr>`
        } else if (task.status === "Done") {
            done.innerHTML +=
                `<h3>${task.staff}</h3>
        <h4>${task.title}</h4>
        <h4>Price:${task.price}</h4>
        <p>Description: ${task.desc}</p>
        <p><b>Start date:</b> ${task.startDate}</p>
        <p><b>finish date:</b> ${task.finishDate}</p>
        <select name="status" class="form-select mb-2" id="mySelect${index}">
          <option value="">Select status</option>
          <option value="Closed">Closed</option>
          <option value="Doing">Doing</option>
        </select>
        <div class="d-flex align-items-center justify-content-between">
          <button class="btn btn-warning text-white" onclick="editStatus(${index})">Edit status</button>
          <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
          </div>
          <button class="btn btn-secondary mt-2" onclick="rejectTask(${index})">Rejected</button>
        <hr>`
        } else if (task.status === "Closed") {
            closed.innerHTML +=
                `<h3>${task.staff}</h3>
        <h4>${task.title}</h4>
        <h4>Price:${task.price}</h4>
        <p>Description: ${task.desc}</p>
        <p><b>Start date:</b> ${task.startDate}</p>
        <p><b>finish date:</b> ${task.finishDate}</p>
        <hr>`
        } else if (task.status === "Rejected") {
            rejected.innerHTML +=
                `<h3>${task.staff}</h3>
        <h4>${task.title}</h4>
        <h4>Price:${task.price}</h4>
        <p>Description: ${task.desc}</p>
        <p><b>Start date:</b> ${task.startDate}</p>
        <p><b>finish date:</b> ${task.finishDate}</p>
        <hr>`
        }
    })
}

chiz()


myForm.addEventListener("submit", e => {
    e.preventDefault()
})

const deleteTask = (index) => {
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    chiz()
}

const rejectTask = (index) => {
    tasks[index].status = "Rejected"
    localStorage.setItem("tasks", JSON.stringify(tasks))
    chiz()
}

const editStatus = (index) => {
    let mySelect = document.querySelector(`#mySelect${index}`)
    if(mySelect.value!=""){
        tasks[index].status = mySelect.value

    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
    chiz()

}

