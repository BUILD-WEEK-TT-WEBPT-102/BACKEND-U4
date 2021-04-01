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

| User Action | METHOD | ROUTE                 | SEND TO DB                           |
| :---------: | :----: | --------------------- | ------------------------------------ |
|    Login    |  POST  | /api/auth/login       | {username(string) , password(string) }               |
|   Create    |  POST  | /api/auth/register    | {username(string) , password(string) , phoneNumber(string) } |
|    Read     |  GET   | /api/users/:id        | n/a                                  |
|    Read     |  GET   | /api/users/           | n/a                                  |
|    Edit     |  PUT   | /api/users/:id        | {username(string) , password(string) , phoneNumber(string) } |
|     Del     | DELETE | /api/users/:id        | n/a                                  |
|   Plants    |  GET   | /api/users/:id/plants | n/a                                  |

### Plants

| User Action | METHOD | ROUTE           | SEND TO DB                                          |
| :---------: | :----: | --------------- | --------------------------------------------------- |
|    Read     |  GET   | /api/plants     | n/a                                                 |
|   Create    |  POST  | /api/plants     | { nickname(string) ,water_frequency(string) , species(string) , user_id(number)} |
|    Read     |  GET   | /api/plants/:id | n/a                                                 |
|    Edit     |  PUT   | /api/plants/:id | { nickname(string) ,water_frequency(string) , species(string) , user_id(number)} |
|     Del     | DELETE | /api/plants/:id | n/a                                                 |

### Species

| User Action | METHOD | ROUTE            | SEND TO DB                                            |
| :---------: | :----: | ---------------- | ----------------------------------------------------- |
|    Read     |  GET   | /api/species     | n/a                                                   |
|   Create    |  POST  | /api/species     | {species(string)} |
|    Read     |  GET   | /api/species/:id | n/a                                                   |
|     Del     | DELETE | /api/species/:id | n/a                                                   |
