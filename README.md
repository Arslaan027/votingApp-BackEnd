<h1>API Documentation</h1>

<h2>User API</h2>
<ul>
    <li>
        <strong>Sign Up User</strong><br>
        <strong>Method:</strong> POST<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/user/signup</code><br>
        <strong>Description:</strong> Registers a new user.
    </li>
    <li>
        <strong>Login User</strong><br>
        <strong>Method:</strong> POST<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/user/login</code><br>
        <strong>Description:</strong> Logs in a user with AdharcardNumber and Password.
    </li>
    <li>
        <strong>Get User Profile</strong><br>
        <strong>Method:</strong> GET<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/user/profile</code><br>
        <strong>Description:</strong> Retrieves the profile information of the logged-in user.
    </li>
    <li>
        <strong>Update Password</strong><br>
        <strong>Status:</strong> Still in process
    </li>
</ul>

<h2>Admin/Candidate API</h2>
<ul>
    <li>
        <strong>Delete Candidate</strong><br>
        <strong>Method:</strong> DELETE<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/candidate/:candidateId</code><br>
        <strong>Description:</strong> Deletes a candidate. (Admin Accessible)
    </li>
    <li>
        <strong>Update Candidate</strong><br>
        <strong>Method:</strong> PUT<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/candidate/:candidateId</code><br>
        <strong>Description:</strong> Updates candidate information. (Admin Accessible)
    </li>
    <li>
        <strong>Create Candidate</strong><br>
        <strong>Method:</strong> POST<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/candidate</code><br>
        <strong>Description:</strong> Creates a new candidate. (Admin Accessible)
    </li>
</ul>

<h2>Public APIs</h2>
<ul>
    <li>
        <strong>Get Live Vote Count</strong><br>
        <strong>Method:</strong> GET<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/vote/count</code><br>
        <strong>Description:</strong> Allows the public to check the live vote count.
    </li>
</ul>

<h2>Voting API</h2>
<ul>
    <li>
        <strong>Vote for Candidate</strong><br>
        <strong>Method:</strong> POST<br>
        <strong>Endpoint:</strong> <code>http://localhost:5000/vote/:candidateId</code><br>
        <strong>Description:</strong> Allows users to vote for a candidate.
    </li>
</ul>
