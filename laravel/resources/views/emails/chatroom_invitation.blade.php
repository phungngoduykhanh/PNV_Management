<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Chatroom Invitation</title>
</head>

<body>
    <h2>Chatroom Invitation</h2>
    <p>You have been invited to join the chatroom "{{ $chatroom->chatroomname }}".</p>
    <p>Chatroom Details:</p>
    <ul>
        <li>Chatroom Name: {{ $chatroom->chatroomname }}</li>
        <li>Owner: {{ $chatroom->owner->name }}</li>
    </ul>
    <p>Please click the following link to confirm your participation:</p>
    <a href="http://127.0.0.1:8000/api/confirm/{{$token}}">Confirm Invitation</a>
    <p>If you have any questions, please feel free to contact us.</p>
    <p>Thank you!</p>
</body>

</html>