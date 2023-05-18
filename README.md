# Hi Whats up!!
## Here you will find all about the green-run application and its APIs

This application tries to simulate a betting application, it contains APIs that allow you to manage and manage users, a money wallet per user and of course APIs for betting administration.

## The Stack

The project was developed under the hapiJs stack as framework, nodeJs and AWS.

- Hapi: server framework, here I develop the APIs.
- MySQL: All the persistence and APP data is stored in Mysql. The Instance of MySQL and Database is hosted in AWS and it was instantiated with AWS RDS.
- Github: As the code version control using Git.
    - Also, the CI/CD pipeline was build here.
- AWS EC2: The APP Host server was instantiated on AWS EC2. In this case, the Github pipeline connects with the EC2 instance and hosting the App.
- AWS S3: All the sensible information is saved on AWS S3.

## The Endpoints

/createUser: to create users and admins | all roles can access to this endpoint

```sh
{
   "role": "role",
   "first_name": "first_name",
   "last_name": "last_name",
   "phone": "phone",
   "email": "email",
   "username": "username",
   "city": "city",
   "country": "country",
   "document_id": "document_id",
   "address": "addres",
   "gender": "gender",
   "birth_date": 642805827,
   "password": "password"
}
```
/login: all roles can access to this endpoint
```sh
{
   "username": "userName",
   "password": "password"
}
```
/updateUser: only the fields that you wanna update | only for user role
```sh
{
   "city": "city"
}
```
/updateUser/{id}: only the fields that you wanna update in an user | only for admin role
```sh
{
   "username": "userName",
   "password": "password"
}
```
/blockUser/{id}:to block an user | only for admin role
```sh
{
   "username": "userName",
   "password": "password"
}
```
/createBet: to create bets
```sh
{
   "bet_option": number,
   "sport": "sport",
   "status": "status",
   "name": "names",
   "event_id": number,
   "odd": number,
   "result": "open"
}
```
/updateBet/{id}: to update the bet status | only for admin role
```sh
{
   "status": "cancelled"
}
```
/settledBet/{bet_id}: to update the bet result | only for admin role
```sh
{
   "username": "userName",
   "password": "password"
}
```
/depositMoney: | only for users
```sh
{
   "username": "userName",
   "password": "password"
}
```
/withdrawMoney: | only for users
```sh
{
   "username": "userName",
   "password": "password"
}
```
/balance: to get the user balance | can access users and admins
```sh
{
   "username": "userName",
   "password": "password"
}
```
/placeBet/{id}: to place a bet | only for users
```sh
{
   "username": "userName",
   "password": "password"
}
```
/transactions: to get the user transactions | can access users and admins
```sh
{
   "username": "userName",
   "password": "password"
}
```
/bets: to list the bets | only for admins
```sh
{
   "username": "userName",
   "password": "password"
}
```

#### Test the app

You can test the endpoints with this postman collection

```sh
https://api.postman.com/collections/13307927-5f1c5b78-1023-453a-92b2-10108e04818f?access_key=PMAT-01H0PKE3Y9XVR22W8MB2WTV31Q
```
To run the APP in local execute
```sh
npm run start 
```

## License

Apache 2.0

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[dill]: <https://github.com/joemccann/dillinger>
[git-repo-url]: <https://github.com/joemccann/dillinger.git>
[john gruber]: <http://daringfireball.net>
[df1]: <http://daringfireball.net/projects/markdown/>
[markdown-it]: <https://github.com/markdown-it/markdown-it>
[Ace Editor]: <http://ace.ajax.org>
[node.js]: <http://nodejs.org>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
[jQuery]: <http://jquery.com>
[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[Gulp]: <http://gulpjs.com>

[PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
[PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
[PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
[PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
[PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
[PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
