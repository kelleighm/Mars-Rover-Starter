const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

//TEST ONE 

  it("throws error if a command type is NOT passed into the constructor as the first parameter", function() {
    expect(function () {new Command();}).toThrow(Error('Command type required.'));
  });

//TEST TWO 

  it("constructor sets command type", function() {
    expect(new Command("STATUS_CHECK").commandType).toBe("STATUS_CHECK"); 
  });

//TEST THREE 

  it("constructor sets a value passed in as the 2nd argument", function() {
    expect(new Command("string","LOW_POWER").value).toBe("LOW_POWER");
  });


});