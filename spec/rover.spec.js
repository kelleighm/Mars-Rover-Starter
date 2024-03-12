const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

 //TEST 7 

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1); 
    expect(rover.position).toEqual(1);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });


// TEST 8 
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; 
    let message = new Message("TESTING", commands) 
    let rover = new Rover(1); 
    let msg = rover.receiveMessage(message).message; 
    expect(msg).toEqual(message.name); 
 });

// TEST 9 
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(1);
    expect(rover.receiveMessage(new Message('Test message with two commands', ['MODE_CHANGE', 'LOW_POWER'])).results.length).toEqual(2);
  });

//TEST 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("TESTING", commands)
    let rover = new Rover(1); 
    let actualStatusCheck = rover.receiveMessage(message).results[0];
    let hopefullyCorrect = {
      completed: true,
      roverStatus: {
        mode : 'NORMAL',
        generatorWatts : 110,
        position : 1
      }
    }
    expect(actualStatusCheck).toEqual(hopefullyCorrect); 
  });

// TEST 11 
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')]
    let message = new Message("TESTING", commands)
    let rover = new Rover(1);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(response.results[0].completed).toBe(true); 
  });

// TEST 12 
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 4000)]
    let message = new Message("TESTING", commands)
    let rover = new Rover(1);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toEqual(1);
    expect(response.results[1].completed).toBe(false);   
  });

// TEST 13 
  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 5000)]
    let message = new Message("TESTING", commands)
    let rover = new Rover(1);
    rover.receiveMessage(message); 
    expect(rover.position).toBe(5000); 
  });

//resending file up to github 

});
