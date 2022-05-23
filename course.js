const params = new URLSearchParams(window.location.search)

const div = document.querySelector('.course')
const h2 = document.querySelector('.course-name')
const p1 = document.querySelector('.attended-hours')
const p2 = document.querySelector('.total-hours')
const h4 = document.querySelector('.percentage')
const absentBtn = document.querySelector('.absent-btn')
const presentBtn = document.querySelector('.present-btn')
const overlay = document.querySelector('.overlay')
const course_popup = document.querySelector('.course-popup')
const close_popup = document.querySelector('span')
const form = document.querySelector('form')
const reset = document.querySelector('.reset')

const setActive =  ()=>{
    course_popup.style.display = 'block';
    overlay.style.display = 'block';
}

const setInactive = ()=>{
    course_popup.style.display = 'none';
    overlay.style.display = 'none';
}

const calc_average = (total,attended)=>{
    let average = (attended/total) * 100;
    average = average.toFixed(2)
    return average;
}

window.addEventListener('load',()=>{
    const id = params.get('id');
    const course_data = JSON.parse(localStorage.getItem('courses'))[id];
    form.elements["name"].value = course_data.name;
    form.elements['total-hours'].value = course_data.totalhrs;
    form.elements["attended-hours"].value = course_data.attendedhrs
})

window.addEventListener('load',()=>{
    if(params.has('id')){
        const id = params.get('id');
        const course_data = JSON.parse(localStorage.getItem('courses'))[id];
        
        if(course_data !== null){
            h2.innerText = course_data.name;
            p1.innerText = `Attended Hours : ${course_data.attendedhrs}`;
            p2.innerText = `Total hours : ${course_data.totalhrs}`
            let average = calc_average(course_data.totalhrs,course_data.attendedhrs);
            h4.innerText = `Attendance percentage : ${average}%`
            }
    }
})

absentBtn.onclick = ()=>{
    let courses = JSON.parse(localStorage.getItem('courses'));
    if(params.has('id')){
        const id = params.get('id')
        let course = courses[id];
        let totalhrs = Number(course.totalhrs);
        let attendedhrs = course.attendedhrs;
        totalhrs = totalhrs + 1;
        course.totalhrs = totalhrs;
        courses[id] = course;
        localStorage.setItem('courses',JSON.stringify(courses));
        p2.innerText = `Total hours : ${totalhrs}`
        let average = calc_average(totalhrs,attendedhrs);
        h4.innerText = `Attendance percentage : ${average}%`

    }
    
}

presentBtn.onclick = ()=>{
    let courses = JSON.parse(localStorage.getItem('courses'));
    if(params.has('id')){
        const id = params.get('id')
        let course = courses[id];
        let totalhrs = Number(course.totalhrs);
        let attendedhrs = Number(course.attendedhrs);
        totalhrs = totalhrs + 1;
        attendedhrs += 1;
        course.totalhrs = totalhrs;
        course.attendedhrs = attendedhrs
        courses[id] = course;
        localStorage.setItem('courses',JSON.stringify(courses));
        p1.innerText = `Attended Hours : ${attendedhrs}`;
        p2.innerText = `Total hours : ${totalhrs}`
        let average = calc_average(totalhrs,attendedhrs);
        h4.innerText = `Attendance percentage : ${average}%`

    }
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
            stored_data[params.get('id')] = data;
        }
        localStorage.setItem("courses",JSON.stringify(stored_data))
        h2.innerText = name;
        p1.innerText = `Attended Hours : ${attended_hours}`;
        p2.innerText = `Total hours : ${total_hours}`
        let average = calc_average(total_hours,attended_hours);
        h4.innerText = `Attendance percentage : ${average}%`
        setInactive()
    }
}

form.addEventListener('submit',submit_form)
reset.addEventListener('click',setActive);
close_popup.addEventListener('click',setInactive)