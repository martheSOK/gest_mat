<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h3>Methode pour créer un compte</h3>
    <h2>Register</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/register</td>
                <td style="border: 1px solid lightgray; padding: 8px;">POST</td>
            </tr>
        </tbody>
    </table>

    <h2>paramètres</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Nom</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Type</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Est requis</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">name</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le nom de l'utilisateur</td>
            </tr>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">prenom</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le prenom de l'utilisateur</td>
            </tr>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">contact</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le numéro de téléphone de l'utilisateur</td>
            </tr>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">email</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">L'adresse de courrier électronique</td>
            </tr>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">password</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le mot de passe pour le compte</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>
    <br>

    <h3>Methode pour se connecter à un compte</h3>

    <h2>Login</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/login</td>
                <td style="border: 1px solid lightgray; padding: 8px;">POST</td>
            </tr>
        </tbody>
    </table>

    <h2>paramètres</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Nom</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Type</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Est requis</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">email</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">L'adresse de courrier électronique</td>
            </tr>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">password</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le mot de passe pour le compte</td>
            </tr>
        </tbody>
    </table>
<br>
<br>
<br>
<br>
    <h3>Methode pour se déconnecter</h3>

    <h2>Logout</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/logout</td>
                <td style="border: 1px solid lightgray; padding: 8px;">POST</td>
            </tr>
        </tbody>
    </table>

    <h2>paramètres</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Nom</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Type</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Est requis</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">request</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Request</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le token du user connecter</td>
            </tr>

        </tbody>
    </table>

</body>
</html>
