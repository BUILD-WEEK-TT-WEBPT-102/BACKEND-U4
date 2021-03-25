Current working endpoints

baseURL: https://backend-u4-ttwebpt102.herokuapp.com/api/

current working routes
:[<br/>
/auth/register<br/>
/users<br/>
/users/:id<br/>
]

(/api/auth/register)<br/>
Send a .post() to the endpoint with the following information.<br/>
{<br/>
username: string, required, unique<br/>
password: string, required<br/>
phoneNumber: string, required<br/>
}<br/>

(/api/auth/login)<br/>
Send a .post() to the endpoint with the following information:<br/>
{<br/>
username: string, required<br/>
password: string, required<br/>
}<br/>
You will receive a token back for authentication<br/>
