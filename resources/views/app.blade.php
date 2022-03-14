<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <!-- Scripts -->
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
        <script src="https://tabinote.herokuapp.com/js/app.js"></script>
    </head>
    <body class="font-sans antialiased">
        @inertia

        @yield('content')

        @env ('local')
            <script src="http://localhost:8080/js/bundle.js"></script>
        @endenv
        <script src="https://kit.fontawesome.com/8ad5270078.js" crossorigin="anonymous"></script>
    </body>
</html>
