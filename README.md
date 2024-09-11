API Documentation
User API
Sign Up User

Method: POST
Endpoint: http://localhost:5000/user/signup
Description: Registers a new user.
Login User

Method: POST
Endpoint: http://localhost:5000/user/login
Description: Logs in a user with AdharcardNumber and Password.
Get User Profile

Method: GET
Endpoint: http://localhost:5000/user/profile
Description: Retrieves the profile information of the logged-in user.
Update Password

Status: Still in process
Admin/Candidate API
Delete Candidate

Method: DELETE
Endpoint: http://localhost:5000/candidate/:candidateId
Description: Deletes a candidate. (Admin Accessible)
Update Candidate

Method: PUT
Endpoint: http://localhost:5000/candidate/:candidateId
Description: Updates candidate information. (Admin Accessible)
Create Candidate

Method: POST
Endpoint: http://localhost:5000/candidate
Description: Creates a new candidate. (Admin Accessible)
Public APIs
Get Live Vote Count
Method: GET
Endpoint: http://localhost:5000/vote/count
Description: Allows the public to check the live vote count.
Voting API
Vote for Candidate
Method: POST
Endpoint: http://localhost:5000/vote/:candidateId
Description: Allows users to vote for a candidate.
