## Bitovi Happy Birthday Proposal Solution

<p>
The Client application, “Happy Birthday!”, is a service that sends a celebratory email to a person's email address on their birthday. The application’s user interface is a wizard that collects a person's name, birth month and day, and email address.
</p>

### ISSUE

__*Problem*__: Only the last “name”, “birthMonth”, “birthDay”, “birthYear”, and “email” was submitted to the service.
<br><br>
<br><br>
__*Why*__: The original solution had a 'Reset' button and a 'Submit' button at the last transition. When doing the update on the last transition to include “Would you like to add another person?”, the 'Reset' button text was replaced with 'Yes' and the 'Submit' button text was replaced with 'No'. Unfortunatly the 'Yes' functionality was missed and continuted to only reset.
<br><br>__*Suggestions*__: There are three proposed solutions:
1. Keep the 'Yes' functionality as is, add each entered birthday in an array, when the 'No' button is selected submit the array to the server.
  - PROS:
    - Reduced number of calls to the server, having to only submit once per session (Benficial if there happends to be a cost per request)
    - Ensures content is being saved into a seperate array, ensuring the data will be sent to the server
  - CONS:
    - If the server fails, all the entered data will not be saved. Instead of the the last entered birthday information.
    - Depending on the size of the array, it could cause a heavy load on the front end / back end
	- Addtional cost to the client as far as time, as there will need to be front end and back end work to be completed
2. Keep the 'Yes' functionality as is, add each entered birthday in an array. Once the 'No' button is selected, iterate over the array and submit each instance to the server.
  - PROS:
    - Front end work is only needed
    - Ensures content is being saved into a seperate array, ensuring the data will be sent to the server
  - CONS:
    - If the server fails, possibly some or all the entered data will not be saved. It will be hard to determine for the user what was saved and what wasn't until they view the list.
    - Depending on the size of the array, and if it is HTTP / HTTPS with the amount of concurrent requests, it may take time to complete. It will require to present a 'Submitting' screen to make sure the user doesn't leave the site in the middle of the submissions. Not the best as far as performance goes.
	- Increased number of calls to the server
3. Update the 'Yes' button to submit to the service and reset the wizard.
   - PROS:
    - Front end work is only needed
    - Low cost to the user as it only requires updating the 'Yes' button to and refactoring the submittion function to support resetting the wizard.
  - CONS:
	- Increased number of calls to the server

 ### RECOMMENDATION
 
 <p>
 The recommendation is to go with Option #3, as it is a small effort to complete and the customer will be happy as it will be resolved quickly. The completed solution is Option #3
</p>

1. Download this repo locally.
2. Run `npm install`
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### SUGGESTION

<p>
I would also suggest to include unit testing. There will be added time to create the unit tests, but it will help the avoid having difficult conversations with the customer over small bugs and will show expected behaviour if it is going through a Peer Review process.
</p>

1. Run `ng test` to execute the unit tests
