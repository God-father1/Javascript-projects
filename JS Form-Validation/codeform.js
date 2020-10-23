const form = document.getElementById('form');


form.addEventListener('submit',(event) =>{
    event.preventDefault();
    validate();
})


//useful in validating email

const isvalidEmail = (emailVal) =>{
	var atSymbol = emailVal.indexOf("@");
    if(atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol +3)return false;
    if(dot === emailVal.length -1)return false;
    return true;
}


     //validating username
     function validateusername(usernameVal){
       
       usernameVal = usernameVal.trim();
        
     if(usernameVal === ""){
     	setErrorMsg(username,'username cannot be blank');
     }else if(usernameVal.length <= 2){
         setErrorMsg(username,'username with min 3 characters');
     }else{
     	setSuccessMsg(username);
     }
       }

     //validating email
     function validateemail(emailVal){

      emailVal = emailVal.trim();      

     if(emailVal === ""){
     	setErrorMsg(email,'email cannot be blank');
     }else if(!isvalidEmail(emailVal)){
         setErrorMsg(email,'Not a valid email');
     }else{
     	setSuccessMsg(email);
     }
       }

    //validating college name
    function validatecollegename(collegenameVal){

        collegenameVal = collegenameVal.trim();
        
     if(collegenameVal === ""){
        setErrorMsg(institute,'the name cannot be blank');
     }else if(collegenameVal.length <= 2){
         setErrorMsg(institute,'the name with min 3 characters');
     }else{
        setSuccessMsg(institute);
     }

    }
       
     
     //validating phone number
     function validatephone(phoneVal){

      phoneVal = phoneVal.trim();
        
     if(phoneVal === ""){
     	setErrorMsg(phone, 'phone num cannot be blank');
     }else if(phoneVal.length != 10){
        setErrorMsg(phone,'Not a valid phone num');
     }else {
     	setSuccessMsg(phone);
     }
        }

     //validating password
     function validatepassword(passwordVal){

      passwordVal = passwordVal.trim();

     if(passwordVal === ""){
     	setErrorMsg(password, 'password cannot be blank');
     }else if(passwordVal.length <= 5){
        setErrorMsg(password,'Minimum 6 characters');
     }else {
     	setSuccessMsg(password);
     }
       }

     //validating conform password

     function validatecnfpass(cnfpasswordVal){  

         const passwordVal = document.getElementById('password').value.trim();
         cnfpasswordVal = cnfpasswordVal.trim();

     if(cnfpasswordVal === ""){
     	setErrorMsg(cnfpassword, 'password cannot be blank');
     }else if(passwordVal !== cnfpasswordVal){
        setErrorMsg(cnfpassword,'password are not matching');
     }else {
     	setSuccessMsg(cnfpassword);
     }
       }
     
     //validating checkbox
     
     function validatecheckbox(checkobj){

        if(checkobj.checked == true)
        {
            const par = checkobj.parentElement;
            const small = par.querySelector('small');
            small.innerHTML = "";
        }
        else
        {
            const par = checkobj.parentElement;
            const small = par.querySelector('small');
            small.innerHTML = "Agree to Terms & Conditions checkbox ";
        }
     }



     function setErrorMsg(input, errormsg){
     	const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = "form-control error"
        small.innerHTML = errormsg;
     }
    
     function setSuccessMsg(input){
     	const formControl = input.parentElement;
        formControl.className = "form-control success"
        
     }


     //checking is all valid for submitting form


     function validate()
     {
        const usernameVal = document.getElementById('username').value;
        finalSuccessMsg(usernameVal);
     }

     function sendcnts  (usernameVal,sRate, count) {

        let checkobj = document.getElementById('terms');
        if(checkobj.checked) sRate += 1;

    if(sRate === count)
        {alert('registration successful');
          swal({
               title: "Welcome! " + usernameVal,
               text: "Registration Successful",
               icon: "success",
               button: "Let's Code!",
               });
        
         // location.href = 'storedata.html?username=${usernameVal}';
         }
    }

    function finalSuccessMsg (usernameVal) {
    
    let formCon = document.getElementsByClassName('form-control');
   
    var count = formCon.length ;
    
    for(var i = 0; i < formCon.length ; i++)
    {
        if(formCon[i].className === "form-control success")
            {var sRate = 0 + i ;
             sendcnts(usernameVal,sRate,count);}
         else{
            return false;
            }
    }

    }
