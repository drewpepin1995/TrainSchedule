$(document).ready(function () {


    let currentTime = moment().format("hh:mm")




    let firebaseConfig = {
        apiKey: "AIzaSyCuvwZjCDz2FzvKfmyEhkCSDf_zmZvFSWQ",
        authDomain: "train-schedule-40081.firebaseapp.com",
        databaseURL: "https://train-schedule-40081.firebaseio.com/",
        projectId: "train-schedule-40081",
        storageBucket: "train-schedule-40081.appspot.com",
        messagingSenderId: "861788756312",
        appId: "1:861788756312:web:cf3114dd0a12c914"
    };


    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();



    let trainRef = database.ref("/trainSchedule")

    trainRef.on("value", function (snap) {
        trainName = snap.val().trainName;
        trainDestination = snap.val().trainDestination;
        trainTime = snap.val().trainTime;
        trainFrequency = snap.val().trainFrequency;

    });


    $("#submitBtn").on("click", function (event) {
        event.preventDefault()

        let trainName = $("#trainName").val().trim();
        let trainDestination = $("#trainDestination").val().trim();
        let trainTime = $("#trainTime").val().trim();
        let trainFrequency = $("#trainFrequency").val().trim();



        alert("New train added!")

        $("#trainName").val("")
        $("#trainDestination").val("")
        $("#trainTime").val("")
        $("#trainFrequency").val("")




        trainRef.push({
            Name: trainName,
            Destination: trainDestination,
            Time: trainTime,
            Frequency: trainFrequency,
        });
    });

    trainRef.on("child_added", function (childSnapshot) {
        const data = childSnapshot.val();

        let trainName = childSnapshot.val().Name;
        let trainTime = childSnapshot.val().Time;
        let trainDestination = childSnapshot.val().Destination;
        let trainFrequency = childSnapshot.val().Frequency;

        console.log(trainName);
        console.log(trainFrequency);


        let newTrainTime = moment(trainTime, 'hh:mm').format('hh:mm a')
        console.log(newTrainTime);

        let trainTimeConverted = moment(trainTime, 'hh:mm').subtract(1, 'years');

        let timeDiff = moment().diff(trainTimeConverted, "minutes");
        console.log(timeDiff);

        let tRemainder = timeDiff % trainFrequency;
        console.log(tRemainder);

        let minutesTillTrain = trainFrequency - tRemainder;
        console.log(minutesTillTrain);

        let nextTrain = moment().add(minutesTillTrain, 'minutes');
        nextTrain = moment(nextTrain).format('hh:mm a');

        
        

        


        let newRow = $("<tr>")
        let newRowName = $("<td>").text(childSnapshot.val().Name);
        let newRowDiv = newRow.append(newRowName);
        $("#tableBody").append(newRowDiv);

        let rowDestination = $("<td>").text(childSnapshot.val().Destination);
        newRow.append(rowDestination);

        let rowFrequency = $("<td>").text(childSnapshot.val().Frequency);
        newRow.append(rowFrequency);

        let rowNextArrival = $("<td>").text(nextTrain);
        newRow.append(rowNextArrival);
        
        let rowMinutesAway = $("<td>").text(minutesTillTrain);
        newRow.append(rowMinutesAway);


    });
});

