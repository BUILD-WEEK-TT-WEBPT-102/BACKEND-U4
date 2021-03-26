Backend for Water My Plants - TT WEBPT 102 BW <br/>
baseURL: https://backend-u4-ttwebpt102.herokuapp.com/api/


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

### USERS

| User Action | METHOD | ROUTE              | SEND TO DB                      |
| :---------: | ------ | ------------------ | ------------------------------- |
|    Login    | POST   | /api/auth/login    | {username,password}             |
|   Create    | POST   | /api/auth/register | {username,password,phoneNumber} |
|    Read     | GET    | /api/users/:id     | n/a                             |
|    Read     | GET    | /api/users/        | n/a                             |
|    Edit     | PUT    | /api/users/:id     | {username,password,phoneNumber} |
|     Del     | DELETE | /api/users/:id     | n/a                             |

### Plants

| User Action | METHOD | ROUTE           | SEND TO DB                                    |
| :---------: | ------ | --------------- | --------------------------------------------- |
|    Read     | GET    | /api/plants     |
|   Create    | POST   | /api/plants     | {nickname,water_frequency,species_id,user_id} |
|    Read     | GET    | /api/plants/:id | n/a                                           |
|    Edit     | PUT    | /api/plants/:id | {nickname,water_frequency,species_id,user_id} |
|     Del     | DELETE | /api/plants/:id | n/a                                           |
