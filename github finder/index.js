//INIT GITHUB
const github = new Github;

//INIT UI
const ui = new UI;

//SEARCH INPUT
const searchUser = document.getElementById('searchUser');

//SEARCH INPUT EVENT LISTENER
searchUser.addEventListener('keyup', (e) =>{
    //GET INPUT TEXT
    const userText = e.target.value;

    if(userText !== '') {
       // console.log(userText);

       //MAKE HTTP CALL
       github.getUser(userText)
       .then(data => {
           //console.log(data)
           if(data.profile.message === 'Not Found'){
               //show alert
               ui.showAlert('User not found' , 'alert alert-danger');

           } else  {
               //show profile
               ui.showProfile(data.profile);
               ui.showRepos(data.repos);

           }
       })
   } else {
       //clear profile
       ui.clearProfile();
   }
})