# PharmacyX
A scalable system design of an Ecommerce Api for Pharmaceautical stores
<br><br>
<img src='./PharmacyX System Design.png'>
<p>The system architecture consists of four major layers, 
<ul>
<li>Routes layer
<li>Controller layer
<li>Service Layer
<li>Storage Layer
</ul>
<p>The client request is received by the routes which then calls the rquired controller to handle the request. If the request is an existing request in the cache the controller fetches it and returns it to the client else it calls a service whic then queries the database or perform some manipulation and retutns the result to the controller which in turn returns the result to the client. These layers are closed since the request coing from the client has to go through each one of them. The Routes, Controllers and Services handles the business logic of the system. The model in the architecture ascts as a proxy between the service layer and the database.
There is an open layer between the controoler and the storage layer. The Elastic Search middleware helps to perform faster search queries. The search request cannot be handled by the service layer hence the opened layer.
<p>In the service layer, we have some tasks that would take some time to be completed such as sending of emails and payment tasks. These tasks can slow down our application. To avoid this we can run these tasks by a worker in the background. The tasks are added to a job queue and a worker picks each job from the queue and executes them. When a worker is done with a job, an event is fired which triggers the right service for corresponding action.

<p>The system exhibits great seperation of concern since each layers are isolated. It is also very easy to develop. But in the long run it becomes a pain in the neck since each request has to go through each of the layers sometimes with no significant business logic performed. 

