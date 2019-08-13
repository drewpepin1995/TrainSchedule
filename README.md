# TrainSchedule

The Train schedule app is a train schedule that is constantly updating by pulling data from firebase, and calculating details about the train like what time the next train is arriving as well as how many minutes until arrival. It also allows you to manually add a new train to the schedule, which also adds the data to the firebase database. 

![](/assets/images/schedule.png)

The train schedule is where the train times are constantly updating. The next arrival and minutes until arrival are udpating by the minute on refresh so you always know when the next train is set to arrive. 

![](/assets/images/addTrain.png)

The add train form is where you can choose to add your own train to the schedule. The data is then submitted on click of the add button and the new train will be shown in the train schedule, and the times will begin constantly updating.

![](/assets/images/firebase.png)

The firebase is where the train data is stored, and whenever a new train is added, it is pulled from firebase and added to the train schedule.