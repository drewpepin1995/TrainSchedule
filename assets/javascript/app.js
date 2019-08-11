$(document).ready(function () {
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

        console.log(childSnapshot.val().Name);
        console.log(childSnapshot.val().Time);
        console.log(childSnapshot.val().Destination);
        console.log(childSnapshot.val().Frequency);


        let newRow = $("<tr>")
        let newRowName = $("<td>").text(childSnapshot.val().Name);
        let newRowDiv = newRow.append(newRowName);
        $("#tableBody").append(newRowDiv);

        let rowDestination = $("<td>").text(childSnapshot.val().Destination);
        newRow.append(rowDestination);

        let rowFrequency = $("<td>").text(childSnapshot.val().Frequency);
        newRow.append(rowFrequency);


    });
});

