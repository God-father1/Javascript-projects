const data = [
    {
        name:'Jhon Doe',
        age:32,
        gender:'male',
        lookingfor:'female',
        location:'Boston MA',
        image:'images.jfif'
    },
    {
        name:'Jhonny',
        age:31,
        gender:'female',
        lookingfor:'male',
        location:'Pauri MA',
        image:'gig.jfif'
    },
    {
        name:'Wiiliam Johnson',
        age:23,
        gender:'male',
        lookingfor:'female',
        location:'Boston MA',
        image:'gig.jpg'
    },
];

const profiles = profileIterator(data);

//call first profile
nextProfile();        

//next event
document.getElementById('next').addEventListener('click',
nextProfile);

//next Profile Display
function nextProfile() {
    const currentProfile = profiles.next().value;
    if(currentProfile!==undefined) {
    document.getElementById('profileDisplay').innerHTML = `
    <ul class = "list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking for
         ${currentProfile.lookingfor}</li>
    </ul>    
    `;

    document.getElementById('imageDisplay').innerHTML = `<img
    src="${currentProfile.image}">`;
}else{
    //no more profiles
    window.location.reload();
}
}
//Profile Iterator
function profileIterator(profiles){
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ? 
            {value: profiles[nextIndex++],done: false} :
            {done:true}
        }
    };
}