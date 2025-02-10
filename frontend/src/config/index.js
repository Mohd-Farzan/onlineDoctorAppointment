export const registerFormControls=[
    {
        name:'userName',
        label:"user Name",
        placeholder:"enter your name ",
        componentType:"input",
        type:"text",
        unique:true
    },
    {
        name:'email',
        label:"email",
        placeholder:"enter your email ",
        componentType:"input",
        type:"email",
        unique:true
    },
    {
        name:'password',
        label:"password",
        placeholder:"enter your password ",
        componentType:"input",
        type:"password",
    },
    {
        name:'role',
        label:'Role',
        placeholder:'select your role',
        componentType:'select',
        type:'select'
        
    }
];
export const loginFormControls=[
    {
        name:'email',
        label:"email",
        placeholder:"enter your email ",
        componentType:"input",
        type:"email",
        unique:true
    },
    {
        name:'password',
        label:"password",
        placeholder:"enter your password ",
        componentType:"input",
        type:"password",
    }
   
]
export const navbarItems=[
    {
    id:'home',
    lable:'Home',
    path:'/home/welcome'
    },
    {
        id:'doctor',
        lable:'Find doctor',
        path:'/home/doctorlist'
    },
    {
        id:'appointment',
        lable:'Appointment',
        path:'/home/medicines'
    },
    {
        id:'chat',
        lable:'Chat',
        path:'/home/chat'
    },
    {
        id:'profile',
        lable:'Profile',
        path:'/home/profile'
    }
    
]
export const forgotpswrd=[
    {
        name:'email',
        label:"Email",
        placeholder:'enter your registered email',
        componentType:"input",
        type:'email',
    }
]
export const profileFormControls=[
    {
        name:'email',
        label:'Email',
        placeholder:'ENter your email',
        componentType:'input',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'ENter your Password',
        componentType:'input',
        type:'password',
    },
    {
        name:'userName',
        label:'user name',
        placeholder:'ENter your user name',
        componentType:'input',
        type:'text',
    }
    
]
export const doctorRegistrationFormControl=[
    {
        name:'name',
        label:"Name",
        placeholder:"enter your Name ",
        componentType:"input",
        type:"text",
        unique:true
    },
    {
        name:'email',
        label:"email",
        placeholder:"enter your email ",
        componentType:"input",
        type:"email",
        unique:true
    },
    {
        name:'address',
        label:"Address",
        placeholder:"Write Complete Address ",
        componentType:"input",
        type:"text",
    },
    {
        name:'speciality',
        label:"Speciality",
        placeholder:"What is Your speciality ",
        componentType:"input",
        type:"text",
    },
    {
        name:'availablity',
        label:"Availablity",
        placeholder:" Select Availablity",
        componentType:"select",
        type:"select",
    },
    {
        name:'time',
        label:"Time",
        placeholder:"What Is Your Woking Time ",
        componentType:"input",
        type:"number",
    },
    {
        name:'fees',
        label:"Fees",
        placeholder:"Write Your Charges",
        componentType:"number",
        type:"number",
    }
   
]
