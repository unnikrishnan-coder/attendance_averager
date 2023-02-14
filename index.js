const create_courseBtn = document.querySelector('.course-adder-btn')
const courses = document.querySelector('.courses')
const overlay = document.querySelector('.overlay')
const course_popup = document.querySelector('.course-popup')
const close_popup = document.querySelector('span')
const form = document.querySelector('form')


const delete_course = (index)=>{
    const courses_data = JSON.parse(localStorage.getItem('courses'));
    if(window.confirm(`Do you really want to delete course ${courses_data[index].name}?`)){
        courses_data.splice(index,1);
        courses.childNodes.forEach(course => {
            console.log(course.dataset.id)
            if(Number(course.dataset.id) === index){
                courses.removeChild(course);
            }
        });
        if(courses_data.length !== 0){
            localStorage.setItem('courses',JSON.stringify(courses_data));
        }else{
            localStorage.removeItem('courses');
            courses.style.display = 'none'
        }
    }
}

const createCourse = (name,index)=>{
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const a = document.createElement('a');
    const deletebtn = document.createElement('button');
    deletebtn.innerText = "Delete";
    deletebtn.addEventListener('click',()=>{
        delete_course(index)
    })
    deletebtn.classList.add('delete-course-btn');
    a.href = `course.html?id=${index}`
    h4.innerText = name;
    a.appendChild(h4);
    div.appendChild(a);
    div.appendChild(deletebtn);
    div.dataset.id = index;
    return div;
}

window.addEventListener('load',()=>{
    const course_data = JSON.parse(localStorage.getItem("courses"));
    if(course_data != null){
        course_data.forEach((value,index)=>{
            courses.appendChild(createCourse(value.name,index))
        })
    }else{
        courses.style.display = 'none'
    }
})

const setActive =  ()=>{
    course_popup.style.display = 'block';
    overlay.style.display = 'block';
}

const setInactive = ()=>{
    course_popup.style.display = 'none';
    overlay.style.display = 'none';
}

const submit_form = (event)=>{
    event.preventDefault()
    let name = form.elements["name"].value
    let total_hours = Number(form.elements['total-hours'].value)
    let attended_hours = Number(form.elements["attended-hours"].value)
    let data = {
        "name":name,
        "attendedhrs":attended_hours,
        "totalhrs":total_hours
    }
    let stored_data = JSON.parse(localStorage.getItem("courses"));

    if(attended_hours > total_hours){
        window.alert("attended hours cant be greater than total hours")
    }else{
        if(stored_data !== null){
            stored_data.push(data)
        }else{
            courses.style.display = 'flex'
            stored_data = [data]
        }
        localStorage.setItem("courses",JSON.stringify(stored_data))
        courses.appendChild(createCourse(data.name,stored_data.length-1))
        form.reset()
        setInactive()
    }
}

create_courseBtn.addEventListener('click',setActive);
close_popup.addEventListener('click',setInactive);
form.addEventListener('submit',submit_form)