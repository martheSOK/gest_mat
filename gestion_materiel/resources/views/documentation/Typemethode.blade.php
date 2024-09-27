<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h3>Methode pour afficher tous les type matériel</h3>

    <h2>Store</h2>
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/type_materiels</td>
                <td style="border: 1px solid lightgray; padding: 8px;">GET</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>

    <h3>Methode pour créer un type matériel</h3>

    <h2>Store</h2>
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/type_materiels</td>
                <td style="border: 1px solid lightgray; padding: 8px;">POST</td>
            </tr>
        </tbody>
    </table>

    <h2>Données à renseigner au niveau du formulaire</h2>

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
                <td style="border: 1px solid lightgray; padding: 8px;">libelle</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le nom du type matériel</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>

    <h3>Methode pour modifer un type matériel</h3>

    <h2>Update</h2>

    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/type_materiels/{id}</td>
                <td style="border: 1px solid lightgray; padding: 8px;">PUT</td>
            </tr>
        </tbody>
    </table>

    <h2>paramètre url</h2>
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
                <td style="border: 1px solid lightgray; padding: 8px;">id</td>
                <td style="border: 1px solid lightgray; padding: 8px;">integer</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">L'identifiant du type matériel qu'on veux modifier</td>
            </tr>
        <tbody>
    </table>


    <h2>Données à renseigner au niveau du formulaire</h2>

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
                <td style="border: 1px solid lightgray; padding: 8px;">libelle</td>
                <td style="border: 1px solid lightgray; padding: 8px;">string</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">Le nom du type matériel</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <br>
    <br>


    <h3>Methode pour afficher un type matériel Donné</h3>
    <p>Show</p>
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/type_materiels/{id}</td>
                <td style="border: 1px solid lightgray; padding: 8px;">GET</td>
            </tr>
        </tbody>
    </table>

    <h2>paramètre url</h2>

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
                <td style="border: 1px solid lightgray; padding: 8px;">id</td>
                <td style="border: 1px solid lightgray; padding: 8px;">integer</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">L'identifiant du type matériel dont on veux voir le detaille</td>
            </tr>

        </tbody>
    </table>
    <br>
    <br>
    <br>
    <br>

    <h3>Methode pour supprimer un type matériel donné</h3>
    <p>Delete</p>
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid lightgray; padding: 8px;">Endpoint (URL de l'api)</th>
                <th style="border: 1px solid lightgray; padding: 8px;">Méthode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid lightgray; padding: 8px;">http://127.0.0.1:8000/api/type_materiels/{id}</td>
                <td style="border: 1px solid lightgray; padding: 8px;">DELETE</td>
            </tr>
        </tbody>
    </table>
    <h2>paramètre url</h2>

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
                <td style="border: 1px solid lightgray; padding: 8px;">id</td>
                <td style="border: 1px solid lightgray; padding: 8px;">integer</td>
                <td style="border: 1px solid lightgray; padding: 8px;">oui</td>
                <td style="border: 1px solid lightgray; padding: 8px;">L'identifiant du type matériel qu'on veux supprimer</td>
            </tr>

        </tbody>
    </table>

</body>
</html>
